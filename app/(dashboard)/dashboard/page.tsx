import { auth } from "@/auth";
import { db } from "@/database/db";
import { users, lifegroups, lifegroupMembers } from "@/database/schema";
import { eq, count, sql, or } from "drizzle-orm";
import { USER_TYPE } from "@/constants/enums/member/user_type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import {
  LucideIcon,
  Users,
  Calendar,
  DollarSign,
  Target,
  TrendingUp,
  ChevronRight,
  Home,
} from "lucide-react";

// ================= TYPES =================
type UserTypeValue = (typeof USER_TYPE)[number];

const ADMIN_ROLES = ["Admin", "Super Admin", "Developer"] as const;
const LIFEGROUP_VIEW_ROLES = [
  "Ministry Director",
  "Admin",
  "Super Admin",
  "Developer",
] as const;

type AdminRole = (typeof ADMIN_ROLES)[number];
type LifegroupViewRole = (typeof LIFEGROUP_VIEW_ROLES)[number];

// ================= TYPE GUARDS =================
const isAdminRole = (role: UserTypeValue): role is AdminRole =>
  ADMIN_ROLES.includes(role as AdminRole);

const canViewLifegroupsRole = (
  role: UserTypeValue
): role is LifegroupViewRole =>
  LIFEGROUP_VIEW_ROLES.includes(role as LifegroupViewRole);

// ================= HELPERS =================
const formatUserType = (type: UserTypeValue): string =>
  type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

// ================= UI COMPONENTS =================
const DashboardSkeleton = () => (
  <main className="dashboard_main p-4 md:p-6 space-y-8">
    <div className="space-y-3">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-5 w-40" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-32 rounded-xl" />
      ))}
    </div>
    <Skeleton className="h-64 rounded-xl" />
  </main>
);

const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "primary",
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: "primary" | "blue" | "green" | "purple" | "orange";
}) => {
  const colorClasses = {
    primary:
      "from-[#b8bd9e]/20 to-[#b8bd9e]/5 border-[#b8bd9e]/30",
    blue:
      "from-blue-100 to-blue-50 border-blue-200 dark:from-blue-950/30 dark:to-blue-900/20 dark:border-blue-800/30",
    green:
      "from-green-100 to-green-50 border-green-200 dark:from-green-950/30 dark:to-green-900/20 dark:border-green-800/30",
    purple:
      "from-purple-100 to-purple-50 border-purple-200 dark:from-purple-950/30 dark:to-purple-900/20 dark:border-purple-800/30",
    orange:
      "from-orange-100 to-orange-50 border-orange-200 dark:from-orange-950/30 dark:to-orange-900/20 dark:border-orange-800/30",
  };

  return (
    <Card
      className={`relative overflow-hidden border bg-linear-to-br ${colorClasses[color]} shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-[#b8bd9e]" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const QuickAction = ({
  href,
  icon: Icon,
  label,
  color,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  color: string;
}) => (
  <Link
    href={href}
    className="group flex flex-col items-center justify-center gap-3 rounded-xl border bg-card p-6 transition-all duration-200 hover:shadow-md hover:border-[#b8bd9e]/50 hover:bg-accent/5"
  >
    <div
      className={`rounded-full ${color} p-3 text-white transition-transform group-hover:scale-110`}
    >
      <Icon className="h-5 w-5" />
    </div>
    <span className="text-sm font-medium text-card-foreground">
      {label}
    </span>
    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
  </Link>
);

// ================= MAIN =================
const Dashboard = async () => {
  const session = await auth();
  if (!session?.user) return null;

  const userId = session.user.id;
  const userType: UserTypeValue =
    (session.user.userType as UserTypeValue) ?? "Regular";

  const isAdmin = isAdminRole(userType);
  const canViewAllMembers = isAdmin;
  const canViewAllLifegroups = canViewLifegroupsRole(userType);
  const isLifeGuide = userType === "Ministry Leader";

  try {
    const [userData, globalStatsRaw, userLifegroupsRaw] =
      await Promise.all([
        db
          .select({
            name: users.firstName,
            email: users.email,
            lastLogin: users.lastActivityDate,
            isActive: users.isActive,
          })
          .from(users)
          .where(eq(users.id, userId))
          .then((res) => res[0]),

        canViewAllMembers || canViewAllLifegroups
          ? db
              .select({
                totalMembers: count(users.id),
                activeMembers: sql<number>`count(case when ${users.isActive} = true then 1 end)`,
                totalLifegroups: count(lifegroups.id),
                activeLifegroups: sql<number>`count(case when ${lifegroups.isActive} = true then 1 end)`,
              })
              .from(users)
              .leftJoin(
                lifegroups,
                eq(lifegroups.networkLeader, users.id)
              )
              .then((res) => res[0])
          : null,

        canViewAllLifegroups || isLifeGuide
          ? db
              .select({
                id: lifegroups.id,
                name: lifegroups.name,
                description: lifegroups.description,
                isActive: lifegroups.isActive,
                memberCount: count(lifegroupMembers.userId),
                role: sql<string | null>`CASE 
                WHEN ${lifegroups.networkLeader} = ${userId} THEN 'Network Leader'
                WHEN ${lifegroups.lifeguide} = ${userId} THEN 'Life Guide'
              END`,
              })
              .from(lifegroups)
              .leftJoin(
                lifegroupMembers,
                eq(lifegroupMembers.lifegroupId, lifegroups.id)
              )
              .where(
                or(
                  eq(lifegroups.networkLeader, userId),
                  eq(lifegroups.lifeguide, userId)
                )
              )
              .groupBy(
                lifegroups.id,
                lifegroups.name,
                lifegroups.description,
                lifegroups.isActive
              )
          : [],
      ]);

    const lastLoginFormatted = userData?.lastLogin
      ? new Date(userData.lastLogin).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "First time here!";

    return (
      <main className="dashboard_main min-h-screen bg-linear-to-br from-background to-muted/20 p-4 md:p-6 lg:p-8">
        <div className="mx-auto w-full space-y-8">
          {/* Welcome */}
          <section className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#b8bd9e]/10 via-background to-background border border-[#b8bd9e]/20 p-6 md:p-8">
            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-[#b8bd9e]/5 blur-3xl" />

            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold md:text-4xl">
                  Welcome back, {userData?.name || session.user.name}!
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <Badge className="bg-[#b8bd9e] text-black">
                    {formatUserType(userType)}
                  </Badge>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Last login: {lastLoginFormatted}</span>
                  </div>

                  <Badge
                    variant="outline"
                    className={
                      userData?.isActive
                        ? "border-green-500 text-green-600"
                        : "border-red-500 text-red-600"
                    }
                  >
                    {userData?.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </div>
            </div>
          </section>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {canViewAllMembers && globalStatsRaw && (
              <StatsCard
                title="Total Members"
                value={globalStatsRaw.totalMembers || 0}
                subtitle={`${globalStatsRaw.activeMembers || 0} active members`}
                icon={Users}
                color="blue"
              />
            )}

            {canViewAllLifegroups && globalStatsRaw && (
              <StatsCard
                title="Life Groups"
                value={globalStatsRaw.totalLifegroups || 0}
                subtitle={`${globalStatsRaw.activeLifegroups || 0} active groups`}
                icon={Target}
                color="green"
              />
            )}

            <StatsCard
              title="Service Attendance"
              value="--"
              subtitle="This week"
              icon={Calendar}
              color="purple"
            />

            {isAdmin && (
              <StatsCard
                title="Donations"
                value="--"
                subtitle="This month"
                icon={DollarSign}
                color="orange"
              />
            )}
          </div>

          {/* Lifegroups */}
          {userLifegroupsRaw.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Life Groups</h2>
                <Link
                  href="/lifegroups"
                  className="text-sm text-[#b8bd9e] flex items-center gap-1"
                >
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {userLifegroupsRaw.map((group) => (
                  <Card key={group.id}>
                    <CardHeader>
                      <CardTitle>{group.name}</CardTitle>
                      <CardDescription>
                        {group.description || "No description"}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex justify-between">
                        <span>{group.memberCount} members</span>
                        <span>{group.role ?? "Member"}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Actions */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {canViewAllMembers && (
                <QuickAction
                  href="/members"
                  icon={Users}
                  label="Manage Members"
                  color="bg-blue-600"
                />
              )}
              {canViewAllLifegroups && (
                <QuickAction
                  href="/lifegroups"
                  icon={Target}
                  label="Life Groups"
                  color="bg-green-600"
                />
              )}
              <QuickAction
                href="/services"
                icon={Calendar}
                label="Services"
                color="bg-purple-600"
              />
              {isAdmin && (
                <QuickAction
                  href="/reports"
                  icon={TrendingUp}
                  label="Reports"
                  color="bg-orange-600"
                />
              )}
            </div>
          </section>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    return (
      <main className="p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <p className="text-red-600">
              Unable to load dashboard data.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  );
}
