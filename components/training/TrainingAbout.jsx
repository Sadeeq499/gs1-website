import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export const TrainingAbout = ({ data }) => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-secondary/20 rounded-[3rem] blur-2xl group-hover:bg-secondary/30 transition-all" />
          <img src={data.image} alt={data.title} className="relative rounded-[2.5rem] shadow-2xl h-[500px] w-full object-cover" />
        </div>
        <div className="space-y-8">
          <Badge variant="outline" className="border-secondary text-primary font-bold px-4 py-1">{data.badge}</Badge>
          <h2 className="text-4xl lg:text-5xl font-black text-primary leading-tight">
            {data.title} <br />
            <span className="text-secondary italic text-2xl">{data.subtitle}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{data.description}</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 font-bold" asChild>
            <a href={data.url} target="_blank">
              {data.buttonText} <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);