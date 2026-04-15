// import members from "@/app/api/db"
import Image from "next/image";
import { sampleMembers } from "@/constants";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MembersSection = () => {
  return (
    sampleMembers.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleMembers.map((member) => (
              <Card key={member.id} className="relative w-full p-5 shadow-lg border-[#b8bd9e] hover:shadow-xl transition-shadow">
                {member.member_photo ? (
                    <Image
                      src={member.member_photo}
                      alt={`${member.first_name} ${member.last_name} profile picture`}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-[#b8bd9e] flex items-center justify-center text-white font-bold">
                      {member.first_name[0]}
                      {member.last_name[0]}
                    </div>
                  )}
                <CardHeader className="bg-[#b8bd9e]/10 border-b border-[#b8bd9e]/20">
                  <CardTitle className="text-black">{member.first_name + " " + member.last_name}</CardTitle>
                  <CardDescription>
                    <div className="mt-4 text-sm text-gray-600 space-y-1">
                      <p>{member.contact || "No contact"}</p>
                      <p>{member.birth_date || "No birthday"}</p>
                      {member.ministry && <p>{member.ministry}</p>}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full bg-[#fdc53a] hover:bg-[#e6b835] text-black border border-[#b8bd9e]">View Member</Button>
                </CardFooter>
              </Card>
            ))}
          </section>
        ) : (
          <section className="text-center py-12">
            <p>No members found</p>
          </section>
        )
  )
}

export default MembersSection