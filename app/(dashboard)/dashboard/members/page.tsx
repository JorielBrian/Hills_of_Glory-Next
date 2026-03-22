// import members from "@/app/api/db"
import { sampleMembers } from "@/constants";
import { Button } from "@/components/ui/button";

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

        {/* Filters */}
        {/* <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search members..."
            className="w-full border px-3 py-2 rounded-md"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div> */}

        {/* Members Grid */}
        {sampleMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-lg p-4 hover:shadow cursor-pointer shadow shadow-stone-500"
              >
                <div className="flex items-center gap-4">
                  {member.member_photo ? (
                    <img
                      src={member.member_photo}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {member.first_name[0]}
                      {member.last_name[0]}
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold">
                      {member.first_name} {member.last_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {member.member_role}
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600 space-y-1">
                  <p>{member.contact || "No contact"}</p>
                  <p>{member.birth_date || "No birthday"}</p>
                  {member.ministry && <p>{member.ministry}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p>No members found</p>
          </div>
        )}
      </div>
    </main>
  );
}


export default Members