import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const solutions = [
  {
    title: "Healthcare & Pharma",
    description:
      "Ensure patient safety with end-to-end traceability for pharmaceuticals, medical devices, and hospital supplies using GS1 standards.",
    image: "/images/solutions-healthcare.jpg",
    tag: "Traceability",
    href: "#",
  },
  {
    title: "Retail & FMCG",
    description:
      "Streamline point-of-sale, inventory management, and omnichannel commerce with globally recognized barcodes and data standards.",
    image: "/images/solutions-retail.jpg",
    tag: "Commerce",
    href: "#",
  },
  {
    title: "Logistics & Supply Chain",
    description:
      "Gain real-time visibility across your entire supply chain with standardized identification and EPCIS event tracking.",
    image: "/images/solutions-logistics.jpg",
    tag: "Visibility",
    href: "#",
  },
  {
    title: "Food Safety & Agriculture",
    description:
      "Meet regulatory compliance and build consumer trust with farm-to-fork traceability powered by GS1 Digital Link.",
    image: "/images/solutions-food.jpg",
    tag: "Compliance",
    href: "#",
  },
  {
    title: "E-Commerce & Digital",
    description:
      "Enable seamless product discovery, authentication, and enriched digital experiences with GS1-powered QR codes.",
    image: "/images/solutions-ecommerce.jpg",
    tag: "Digital",
    href: "#",
  },
  {
    title: "Construction & Assets",
    description:
      "Track fixed assets, building materials, and equipment with reliable identification standards that reduce loss and improve audits.",
    image: "/images/solutions-construction.jpg",
    tag: "Asset Tracking",
    href: "#",
  },
  {
    title: "Apparel & Fashion",
    description:
      "Optimize inventory accuracy and combat counterfeiting with item-level tagging and RFID standards tailored for the fashion industry.",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1000",
    tag: "Inventory",
    href: "#",
  },
  {
    title: "Government & Public Sector",
    description:
      "Enhance public procurement, safety, and operational efficiency with standardized identification and data exchange protocols.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
    tag: "Efficiency",
    href: "#",
  },
];

export function SolutionsSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold text-secondary">
            Industry Solutions
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-5xl">
            Powering Every Industry with Global Standards
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            From healthcare to e-commerce, GS1 Saudi Arabia delivers scalable
            identification, traceability, and data standards that drive
            efficiency, compliance, and consumer trust.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {solutions.map((solution) => (
            <Card
              key={solution.title}
              className="group overflow-hidden border-0 bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl p-0 pb-6"
            >
              {/* Card Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-70" />
                <span className="absolute bottom-3 left-3 rounded-md bg-secondary/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-sm">
                  {solution.tag}
                </span>
              </div>

              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">
                  {solution.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="line-clamp-3 text-base leading-relaxed text-muted-foreground">
                  {solution.description}
                </CardDescription>
              </CardContent>

              <CardFooter>
                <Button
                  variant="link"
                  className="h-auto p-0 text-secondary hover:text-secondary/80"
                  asChild
                >
                  <a href={solution.href}>
                    Explore solution
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-muted-foreground">
            {
              "Don't see your industry? We serve 25+ sectors across Saudi Arabia."
            }
          </p>
          <Button
            size="lg"
            className="bg-secondary text-white hover:bg-secondary/90"
            asChild
          >
            <a href="#">
              View all industries
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div> */}
      </div>
    </section>
  );
}
