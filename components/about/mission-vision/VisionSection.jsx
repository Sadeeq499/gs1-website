import { Badge } from "@/components/ui/badge";

export const VisionSection = ({ data }) => (
  <section className="py-24 overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1 font-bold">{data.tag}</Badge>
          <h2 className="text-4xl lg:text-6xl font-black text-primary leading-tight">
            {data.title} <br />
            <span className="text-secondary italic">{data.titleHighlight}</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {data.description}
          </p>
        </div>
        <div className="relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
          <img src={data.image} alt="Vision 2030 Logistics" className="rounded-[3rem] shadow-2xl h-[500px] w-full object-cover" />
        </div>
      </div>
    </div>
  </section>
);