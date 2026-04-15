import { auth } from "@/auth";
import { db } from "@/database/db";
import { users, lifegroups, lifegroupMembers } from "@/database/schema";
import { eq, count, sql } from "drizzle-orm";
import { USER_TYPE } from "@/constants/enums/member/user_type";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, Calendar, DollarSign, Target, TrendingUp } from "lucide-react";

const Dashboard = async () => {
  const session = await auth();

  if (!session?.user) {
    return null; // This should be handled by middleware, but just in case
  }

  const userId = session.user.id;
  const userType = session.user.userType || USER_TYPE[0];

  // Fetch user stats
  const [userStats] = await db
    .select({
      totalMembers: count(users.id),
      activeMembers: sql<number>`count(case when ${users.isActive} = true then 1 end)`,
      totalLifegroups: count(lifegroups.id),
      activeLifegroups: sql<number>`count(case when ${lifegroups.isActive} = true then 1 end)`,
    })
    .from(users)
    .leftJoin(lifegroups, eq(lifegroups.networkLeader, users.id))
    .where(eq(users.id, userId));

  // Fetch user's lifegroups if they are a leader or guide
  const userLifegroups = await db
    .select({
      id: lifegroups.id,
      name: lifegroups.name,
      description: lifegroups.description,
      isActive: lifegroups.isActive,
      memberCount: count(lifegroupMembers.userId),
    })
    .from(lifegroups)
    .leftJoin(lifegroupMembers, eq(lifegroupMembers.lifegroupId, lifegroups.id))
    .where(sql`${lifegroups.networkLeader} = ${userId} OR ${lifegroups.lifeguide} = ${userId}`)
    .groupBy(lifegroups.id, lifegroups.name, lifegroups.description, lifegroups.isActive);

  // Determine what features to show based on user type
  const canViewAllMembers = (userType === USER_TYPE[3] || userType === USER_TYPE[4] || userType === USER_TYPE[5]); // Admin, Super Admin, Developer
  const canViewAllLifegroups = (userType === USER_TYPE[2] || userType === USER_TYPE[3] || userType === USER_TYPE[4] || userType === USER_TYPE[5]); // Ministry Director and above
  const isAdmin = (userType === USER_TYPE[3] || userType === USER_TYPE[4] || userType === USER_TYPE[5]);

  return (
    <main className="dashboard_main p-6">
      {/* Welcome Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {session.user.name}!
            </h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {userType}
              </Badge>
              <span className="text-gray-600 text-sm">
                Last login: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {canViewAllMembers && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats?.totalMembers || 0}</div>
              <p className="text-xs text-muted-foreground">
                {userStats?.activeMembers || 0} active members
              </p>
            </CardContent>
          </Card>
        )}

        {canViewAllLifegroups && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Life Groups</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats?.totalLifegroups || 0}</div>
              <p className="text-xs text-muted-foreground">
                {userStats?.activeLifegroups || 0} active groups
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>

        {isAdmin && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* User's Life Groups */}
      {userLifegroups.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Life Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userLifegroups.map((group) => (
              <Card key={group.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {group.memberCount} members
                      </span>
                    </div>
                    <Badge variant={group.isActive ? "default" : "secondary"}>
                      {group.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {canViewAllMembers && (
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium">Manage Members</span>
              </CardContent>
            </Card>
          )}

          {canViewAllLifegroups && (
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Target className="h-8 w-8 text-green-600 mb-2" />
                <span className="text-sm font-medium">Life Groups</span>
              </CardContent>
            </Card>
          )}

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Calendar className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium">Services</span>
            </CardContent>
          </Card>

          {isAdmin && (
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <TrendingUp className="h-8 w-8 text-orange-600 mb-2" />
                <span className="text-sm font-medium">Reports</span>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;