const Home = () => {
  return (
    <main className="h-full">
        <section className="w-full">
            <h1 className="text-xl 2xl:text-6xl p-8 2xl:w-1/2">TO HONOR GOD AND TO RAISE COMMITTED DISCIPLES</h1>
            <h2 className="h-fit text:lg 2xl:text-4xl text-[#fdc53a] px-10">Who are able to discple multitudes</h2>
        </section>
        <section className="flex flex-col md:flex-row mt-20 2xl:w-1/2 2xl:p-20 2xl:mt-50">
            <div>
                <h3 className="py-3 text-md text-white font-[Century Gothic] font-bold 2xl:text-3xl">Announcements</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia doloribus fuga autem vel quasi porro. Placeat, quibusdam officia dolore culpa repudiandae doloribus eius doloremque ratione sequi cupiditate nostrum asperiores porro?</p>
            </div>
            <div className="border border-white ml-5 mr-15 hidden md:block"></div>
            <div>
                <h3 className="py-3 text-md text-white font-[Century Gothic] font-bold 2xl:text-3xl">Upcoming Events</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia ab, hic sint ratione ea voluptatem aut veniam aperiam pariatur. Tenetur eum dolore reiciendis veritatis illum, dolores aut numquam quibusdam velit.</p>
            </div>
        </section>
    </main>
  )
}

export default Home