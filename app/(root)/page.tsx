import Hero from "@/components/Sections/Hero"
import Services from "@/components/Sections/Services"

const Home = () => {
  return (
    <main className="h-full">
        <Hero />
        <Services />
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