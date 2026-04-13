import Service from "../Cards/Service"

const ServiceEvent = () => {
  return (
    <section className="flex my-15 p-4 bg-stone-100/80 h-fit py-15 items-center -skew-y-6 2xl:py-30">
            <div className="w-full skew-y-6">
                <h1 className="p-4 text-5xl md:text-6xl font-bold text-emerald-800 shadow-2xl">
                    Our Services
                </h1>
                <div className="grid lg:grid-cols-3 gap-4 w-full h-fit p-2 bg-black rounded-lg">
                    <Service 
                        title="Protege"
                        time="Thursdays | 6:00 PM"
                        description="A discipleship program for new believers to grow in their faith and knowledge of God."
                        imageUrl="/protege-bg.jpg"
                    />
                    <Service 
                        title="Prayer Encounter"
                        time="Saturdays | 5:30 AM"
                        description="A time for believers to come together and pray for one another and the church."
                        imageUrl="/prayer_encounter-bg.jpg"
                    />
                    <Service 
                        title="Sunday Service"
                        time="Sundays | 8:00 AM & 10:45 AM"
                        description="A time for believers to come together and worship God."
                        imageUrl="/sunday_service-bg.jpg" 
                    />
                </div>
            </div>
    </section>
  )
}

export default ServiceEvent