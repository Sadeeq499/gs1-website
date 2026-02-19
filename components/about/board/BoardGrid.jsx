import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const BoardGrid = ({ data }) => (
  <section className="py-24 bg-slate-50">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12">
        {data.members.map((member, i) => (
          <div key={i} className="flex flex-col md:flex-row bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group">
            <div className="md:w-1/2 relative min-h-[400px]">
              <Image 
                src={member.image} 
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
            <div className="p-10 md:w-1/2 flex flex-col justify-center space-y-4">
              <Badge variant="outline" className="w-fit border-secondary text-secondary font-bold">
                {member.role}
              </Badge>
              <h3 className="text-2xl font-black text-primary uppercase">
                {member.name}
              </h3>
              <Separator className="bg-slate-100" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {member.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);