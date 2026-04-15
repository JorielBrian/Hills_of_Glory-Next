import { auth } from "@/auth";
import { db } from "@/database/db";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Facebook, Briefcase, Calendar, Church } from "lucide-react";

const AccountPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return <div>Unauthorized</div>;
  }

  const userId = session.user.id;

  // Fetch current user data
  const [userData] = await db
    .select({
      id: users.id,
      userName: users.userName,
      email: users.email,
      firstName: users.firstName,
      middleName: users.middleName,
      lastName: users.lastName,
      gender: users.gender,
      birthDate: users.birthDate,
      contactNumber: users.contactNumber,
      address: users.address,
      facebook: users.facebook,
      occupation: users.occupation,
      firstDateAttended: users.firstDateAttended,
      firstEvent: users.firstEvent,
      memberType: users.memberType,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!userData) {
    return <div>User not found</div>;
  }

  const fullName = `${userData.firstName} ${userData.middleName ? userData.middleName + ' ' : ''}${userData.lastName}`;

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">My Account</h1>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <a href="/dashboard/account/edit">Edit My Account</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Your basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-lg font-semibold">{fullName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Username</label>
                <p className="text-lg">{userData.userName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-lg flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {userData.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Gender</label>
                <p className="text-lg">{userData.gender}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Birth Date</label>
                <p className="text-lg">
                  {userData.birthDate ? new Date(userData.birthDate).toLocaleDateString() : 'Not provided'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Member Since</label>
                <p className="text-lg">
                  {new Date(userData.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
              <CardDescription>How to reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Contact Number</label>
                <p className="text-lg flex items-center gap-2">
                  {userData.contactNumber ? (
                    <>
                      <Phone className="h-4 w-4" />
                      {userData.contactNumber}
                    </>
                  ) : (
                    'Not provided'
                  )}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Address</label>
                <p className="text-lg flex items-start gap-2">
                  {userData.address ? (
                    <>
                      <MapPin className="h-4 w-4 mt-1" />
                      {userData.address}
                    </>
                  ) : (
                    'Not provided'
                  )}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Facebook</label>
                <p className="text-lg flex items-center gap-2">
                  {userData.facebook ? (
                    <>
                      <Facebook className="h-4 w-4" />
                      {userData.facebook}
                    </>
                  ) : (
                    'Not provided'
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Professional Information
              </CardTitle>
              <CardDescription>Your occupation and work details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Occupation</label>
                <p className="text-lg">{userData.occupation}</p>
              </div>
            </CardContent>
          </Card>

          {/* Church Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Church className="h-5 w-5" />
                Church Information
              </CardTitle>
              <CardDescription>Your journey with Hills of Glory</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Member Type</label>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {userData.memberType}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">First Date Attended</label>
                <p className="text-lg flex items-center gap-2">
                  {userData.firstDateAttended ? (
                    <>
                      <Calendar className="h-4 w-4" />
                      {new Date(userData.firstDateAttended).toLocaleDateString()}
                    </>
                  ) : (
                    'Not provided'
                  )}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">First Event Attended</label>
                <p className="text-lg">
                  {userData.firstEvent || 'Not provided'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;