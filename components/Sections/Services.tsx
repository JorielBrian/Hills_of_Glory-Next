const Services = () => {
  return (
    <section className="grid grid-cols-3 w-screen p-4 bg-white text-black h-100">
        <article className="bg-[url('/protege-bg.jpg')] bg-cover bg-center">
            <h1>Protege</h1>
        </article>
        <article className="bg-[url('/prayer-bg.jpg')] bg-cover bg-center">
            <h1>Prayer Encounter</h1>
        </article>
        <article className="bg-[url('/sunday-bg.jpg')] bg-cover bg-center">
            <h1>Sunday Service</h1>
        </article>
    </section>
  )
}

export default Services