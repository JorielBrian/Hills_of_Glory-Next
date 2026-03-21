const Dashboard = () => {
  return (
    <main className="dashboard_main">
      <section className="bg-white font-bold">
          <h1 className="text-6xl p-10">Dashboard</h1>
      </section>
      <section className="bg-white p-2">
          <div className="grid grid-cols-3 grid-rows-2 gap-4 p-2 *:h-20">
              <div className="col-span-2 row-span-1 relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <h1>Service Attendance</h1>
              </div>
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <h1>Life Guides</h1>
              </div>
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <h1>Members</h1>
              </div>
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <h1>Donations</h1>
              </div>
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <h1>Life Groups</h1>
              </div>
          </div>
      </section>
    </main>
  )
}

export default Dashboard