import Hero from "@/components/Sections/Hero"
import PropheticWord from "@/components/Sections/PropheticWord"
import ServiceEvent from "@/components/Sections/ServiceEvent"

const Home = () => {
  return (
    <main className="h-full">
        <Hero />
        <PropheticWord />
        <ServiceEvent />
    </main>
  )
}

export default Home