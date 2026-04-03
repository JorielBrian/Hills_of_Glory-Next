interface ServiceProps {
    title: string;
    time: string;
    description: string;
    imageUrl: string;
}

const Service = (props: ServiceProps) => {
  return (
    <article 
        style={{ backgroundImage: `url(${props.imageUrl})` }}
        className="min-h-80 bg-cover bg-center content-end"
    >
        <div className="w-full p-2 bg-black/70">
            <h1 className="font-bold text-xl text-[#fdc53a]">{props.title}</h1>
            <h2 className="text-lg text-gray-300">{props.time}</h2>
            <div>
                <p className="text-sm text-white">{props.description}</p>
            </div>
        </div>
    </article>
    )
}

export default Service