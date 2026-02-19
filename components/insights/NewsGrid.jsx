import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export function NewsGrid({ news }) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item, i) => (
            <Card key={i} className="group border-none shadow-none bg-white rounded-[2rem] hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary">{item.category}</span>
                  <ArrowUpRight className="w-5 h-5 text-primary opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <h4 className="text-xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors leading-tight">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {item.excerpt}
                </p>
                <span className="text-[10px] font-medium text-slate-400">{item.date}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}