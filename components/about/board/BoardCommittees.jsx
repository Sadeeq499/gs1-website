import { Separator } from "@/components/ui/separator";

export const BoardCommittees = ({ data }) => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-black text-primary mb-12 text-center">{data.title}</h2>
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {data.items.map((item, i) => (
          <div key={i} className="space-y-6 animate-in fade-in duration-1000">
            <h4 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
              {item.title}
            </h4>
            <Separator className="bg-secondary/30 h-[2px] w-12" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);