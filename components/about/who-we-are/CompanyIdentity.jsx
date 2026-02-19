import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileDown, ShieldCheck } from "lucide-react";

export const CompanyIdentity = ({ data }) => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1 font-bold">
            {data.badge}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-black text-primary leading-tight">
            {data.title} <br />
            <span className="text-secondary italic">{data.titleHighlight}</span>
          </h2>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-secondary pl-6">
              {data.description}
            </p>
            <div className="flex items-center gap-4 text-primary font-bold">
              <ShieldCheck className="w-6 h-6 text-secondary" />
              <span>Official Member of GS1 Global Network</span>
            </div>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8 h-14" asChild>
            <button>
              <FileDown className="mr-2 w-5 h-5" /> {data.buttonText}
            </button>
          </Button>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-secondary/10 rounded-[3rem] rotate-3 group-hover:rotate-0 transition-transform duration-700" />
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img 
              src={data.image} 
              alt="GS1 Saudi Arabia HQ" 
              className="w-full h-[550px] object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);