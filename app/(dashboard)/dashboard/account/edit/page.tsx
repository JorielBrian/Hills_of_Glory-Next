import { auth } from "@/auth";
import { db } from "@/database/db";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import AccountForm from "@/components/Dashboard/AccountForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AccountEditPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  const userId = session.user.id;

  // Fetch current user data
  const [userData] = await db
    .select({
      id: users.id,
      birthDate: users.birthDate,
      contactNumber: users.contactNumber,
      address: users.address,
      facebook: users.facebook,
      occupation: users.occupation,
      firstDateAttended: users.firstDateAttended,
      firstEvent: users.firstEvent,
      memberType: users.memberType,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!userData) {
    return <div>User not found</div>;
  }

  // Format data for the form
  const formattedUserData = {
    ...userData,
    birthDate: userData.birthDate ? new Date(userData.birthDate).toISOString().split('T')[0] : null,
    firstDateAttended: userData.firstDateAttended ? new Date(userData.firstDateAttended).toISOString().split('T')[0] : null,
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" asChild className="flex items-center gap-2 border-[#b8bd9e] text-[#b8bd9e] hover:bg-[#b8bd9e]/10">
            <a href="/dashboard/account">
              <ArrowLeft className="h-4 w-4" />
              Back to Account
            </a>
          </Button>
          <h1 className="text-3xl font-bold text-black">Edit My Account</h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <AccountForm userData={formattedUserData} />
        </div>
      </div>
    </div>
  );
};

export default AccountEditPage;