export const MissionSection = ({ data }) => (
  <section className="py-24 bg-primary text-white rounded-[4rem] mx-4 lg:mx-auto container shadow-2xl">
    <div className="px-8 lg:px-20">
      <div className="max-w-3xl mb-16">
        <span className="text-secondary font-bold uppercase tracking-widest text-sm">{data.tag}</span>
        <h2 className="text-4xl lg:text-5xl font-black mt-4 leading-tight">
          {data.title} <span className="text-secondary italic">{data.titleHighlight}</span>
        </h2>
        <p className="mt-6 text-white/60 text-lg leading-relaxed">{data.description}</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {data.points.map((point, i) => (
          <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <div className="text-secondary text-2xl font-black mb-4">0{i + 1}</div>
            <h4 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors">{point.title}</h4>
            <p className="text-sm text-white/50 leading-relaxed">{point.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);