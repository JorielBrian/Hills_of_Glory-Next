import { Button } from "@/components/ui/button";
import MembersSection from "@/components/Dashboard/Sections/MembersSection";

const Members = () => {

  return (
    <main className="dashboard_main">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Members</h1>
          </div>
          <div className="flex flex-col mt-4 sm:mt-0">
            <Button className="p-5 bg-transparent text-black border shadow shadow-stone-400">
              <a href="/dashboard/members/create">
                Add Member
              </a>
            </Button>
          </div>
        </div>

        {/* Members Grid */}
        <MembersSection />
      </div>
    </main>
  );
}


export default Members