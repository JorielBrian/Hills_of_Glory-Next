const Aside = () => {
  return (
    <aside className="bg-[#182920]">
      <nav className="flex-1 p-2 space-y-2">
        <a href="/dashboard" className="block p-2 rounded-lg hover:bg-gray-100">Home</a>
        <a href="/dashboard/members" className="block p-2 rounded-lg hover:bg-gray-100">Members</a>
        <a href="/dashboard/lifegroups" className="block p-2 rounded-lg hover:bg-gray-100">Life Groups</a>
      </nav>
    </aside>
  )
}

export default Aside