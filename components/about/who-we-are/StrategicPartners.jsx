import { Card, CardContent } from "@/components/ui/card";

export const StrategicPartners = ({ data }) => (
  <section className="py-24 bg-slate-50">
    <div className="container mx-auto px-4">
      <div className="mb-16">
        <h2 className="text-4xl font-black text-primary">{data.title}</h2>
        <p className="text-muted-foreground mt-2">{data.subtitle}</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.logos.map((partner, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-3xl group cursor-default">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors">
                <span className="font-black text-primary group-hover:text-white">{partner.name}</span>
              </div>
              <p className="text-sm font-medium text-slate-600 leading-snug">
                {partner.link}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);