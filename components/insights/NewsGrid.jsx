import { Card, CardContent } from "@/components/ui/card";

export function NewsGrid({ data }) {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        {data.heading && (
          <h2 className="text-3xl lg:text-4xl font-black text-primary mb-12 text-center">
            {data.heading}
          </h2>
        )}
        <div className="grid md:grid-cols-3 gap-8">
          {data.items.map((item, i) => (
            <Card
              key={i}
              className="group border-none shadow-none bg-white rounded-[2rem] hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6 font-bold">
                  <span className="text-[10px] uppercase tracking-widest text-secondary">
                    {item.category}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors leading-tight">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-auto pt-6 border-t border-slate-50">
                  <span className="text-[10px] font-medium text-slate-400">
                    {item.date}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
