import { UserCheck, Building2 } from "lucide-react";

export const GovernanceSection = ({ data }) => (
  <section className="py-24 bg-slate-50">
    <div className="container mx-auto px-4 text-center">
      <div className="max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-black text-primary">
          {data.title} <span className="text-secondary italic">{data.titleHighlight}</span>
        </h2>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          {data.desc}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {data.members.map((member, i) => (
          <div 
            key={i} 
            className="flex items-center gap-6 p-8 bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow border border-slate-100 group"
          >
            <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary transition-colors">
              {i === 0 ? (
                <UserCheck className="w-8 h-8 text-primary group-hover:text-white" />
              ) : (
                <Building2 className="w-8 h-8 text-primary group-hover:text-white" />
              )}
            </div>
            <div className="text-left">
              <h4 className="text-xl font-bold text-primary">{member.name}</h4>
              <p className="text-secondary font-black text-[10px] uppercase tracking-widest">
                {member.role}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {member.org}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);