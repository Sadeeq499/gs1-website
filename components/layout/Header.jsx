"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  Globe,
  ChevronDown,
  User,
  Phone,
  LogIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const mainNavItems = [
  {
    title: "About Us",
    href: "/about",
    type: "columns",
    columns: [
      {
        title: "Who we are",
        items: [
          { title: "Our history", href: "/about/history" },
          { title: "Our president", href: "/about/president" },
          { title: "Our board", href: "/about/board" },
          { title: "Our leadership team", href: "/about/leadership" },
          { title: "Our three-year strategy", href: "/about/strategy" },
          { title: "Governance", href: "/about/governance" },
        ],
      },
      {
        title: "Membership",
        items: [{ title: "Meet our members", href: "/about/members" }],
        extras: [
          {
            title: "Annual General Meeting 2025",
            href: "/about/agm-2025",
            highlight: true,
          },
        ],
      },
      {
        items: [
          { title: "Careers", href: "/about/careers" },
          {
            title: "Our annual review",
            href: "/about/review",
            hasSeparator: true,
          },
          {
            title: "Our nominated charity",
            href: "/about/charity",
            hasSeparator: true,
          },
          { title: "Public policy", href: "/about/policy", hasSeparator: true },
        ],
      },
    ],
  },
  {
    title: "Standards",
    href: "/standards",
    items: [
      {
        title: "Identify",
        href: "/standards/identify",
        description: "GS1 identification numbers (GTIN, GLN, etc.).",
      },
      {
        title: "Capture",
        href: "/standards/capture",
        description: "Barcodes and EPC/RFID tags.",
      },
      {
        title: "Share",
        href: "/standards/share",
        description: "Interoperability and data sharing standards.",
      },
    ],
  },
  {
    title: "Services",
    href: "/services",
    items: [
      {
        title: "Get a Barcode",
        href: "/services/get-barcode",
        description: "Start identifying your products.",
      },
      {
        title: "Training",
        href: "/services/training",
        description: "Workshops and educational resources.",
      },
      {
        title: "Consultancy",
        href: "/services/consultancy",
        description: "Expert advice on implementation.",
      },
    ],
  },
  {
    title: "Industries",
    href: "/industries",
    items: [
      {
        title: "Retail",
        href: "/industries/retail",
        description: "Omnichannel retail and marketplaces.",
      },
      {
        title: "Healthcare",
        href: "/industries/healthcare",
        description: "Patient safety and supply chain.",
      },
      {
        title: "Logistics",
        href: "/industries/logistics",
        description: "Transport and logistics efficiency.",
      },
    ],
  },
  {
    title: "Resources",
    href: "/resources",
    items: [
      {
        title: "Tools & Apps",
        href: "/resources/tools",
        description: "Check Digit Calculator, GEPIR, and more.",
      },
      {
        title: "Document Library",
        href: "/resources/documents",
        description: "Access technical standards and guides.",
      },
      {
        title: "Success Stories",
        href: "/resources/success-stories",
        description: "Real-world implementation examples.",
      },
      {
        title: "Help Center",
        href: "/resources/help",
        description: "FAQs and technical support.",
      },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "w-full z-50 sticky top-0 font-sans transition-all duration-300",
        isScrolled ? "shadow-md" : "",
      )}
    >
      {/* Top Bar - Dark Blue */}
      <div className="bg-primary text-white hidden lg:block">
        <div className="container mx-auto px-4 h-10 flex justify-between items-center text-xs font-medium">
          <span className="opacity-90 tracking-wide">
            The Global Language of Business
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/insights"
              className="hover:text-secondary transition-colors"
            >
              Insights & News
            </Link>
            <Link
              href="/events"
              className="hover:text-secondary transition-colors"
            >
              Events
            </Link>
            <Link
              href="/training"
              className="hover:text-secondary transition-colors"
            >
              Training
            </Link>
            <Link
              href="/contact"
              className="hover:text-secondary transition-colors flex items-center gap-1"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white border-b border-gray-100 relative">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-1 group">
            <div className="relative h-10 w-20 lg:h-12 lg:w-24">
              <Image
                src="/logo-gs1.svg"
                alt="GS1 Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Menu (Shadcn) */}
          <div className="hidden lg:flex flex-1 justify-center px-4">
            <NavigationMenu>
              <NavigationMenuList>
                {mainNavItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.type === "columns" ? (
                      <>
                        <NavigationMenuTrigger className="text-sm font-semibold text-primary data-[state=open]:text-primary bg-transparent hover:bg-transparent focus:bg-transparent focus:text-primary">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="flex gap-12 p-8 w-[800px] bg-white rounded-xl">
                            {item.columns.map((col, idx) => (
                              <div
                                key={idx}
                                className="flex-1 flex flex-col gap-6"
                              >
                                {col.title && (
                                  <div className="space-y-4">
                                    <h4 className="font-bold text-lg text-primary">
                                      {col.title}
                                    </h4>
                                    <ul className="space-y-3">
                                      {col.items.map((subItem) => (
                                        <li key={subItem.title}>
                                          <Link
                                            href={subItem.href}
                                            className="text-[15px] font-medium text-muted-foreground hover:text-secondary transition-colors block"
                                          >
                                            {subItem.title}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {!col.title && col.items && (
                                  <ul className="space-y-2">
                                    {col.items.map((subItem) => (
                                      <li key={subItem.title}>
                                        <Link
                                          href={subItem.href}
                                          className={cn(
                                            "text-[15px] font-bold text-primary hover:text-secondary transition-colors block py-1",
                                            subItem.hasSeparator &&
                                              "border-t border-gray-100 pt-3 mt-2",
                                          )}
                                        >
                                          {subItem.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                                {col.extras && (
                                  <div className="mt-auto pt-4 border-t border-gray-100">
                                    {col.extras.map((extra) => (
                                      <Link
                                        key={extra.title}
                                        href={extra.href}
                                        className="text-base font-bold text-primary hover:text-secondary transition-colors block"
                                      >
                                        {extra.title}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : item.items ? (
                      <>
                        <NavigationMenuTrigger className="text-sm font-semibold text-primary data-[state=open]:text-primary bg-transparent hover:bg-transparent focus:bg-transparent focus:text-primary">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
                            {item.items.map((subItem) => (
                              <ListItem
                                key={subItem.title}
                                title={subItem.title}
                                href={subItem.href}
                              >
                                {subItem.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "text-base font-medium text-foreground/80 hover:text-primary bg-transparent hover:bg-transparent focus:bg-transparent focus:text-primary",
                          )}
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-primary px-2"
            >
              <Globe className="h-4 w-4" />
              <span>العربية</span>
            </Button>

            {/* Login */}
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-medium text-primary transition-colors"
            >
              <User className="h-4 w-4" />
              <span>Sign in</span>
            </Link>

            {/* CTA Button */}
            <Button className="bg-secondary text-white hover:bg-secondary/90 font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 animate-in fade-in zoom-in duration-300">
              Get a barcode
            </Button>
          </div>

          {/* Mobile Menu Trigger & Sheet */}
          <div className="lg:hidden flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:bg-primary/5"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] overflow-y-auto"
              >
                <SheetHeader className="border-b pb-4 mb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <Image
                      src="/logo.png"
                      alt="GS1 Logo"
                      width={60}
                      height={30}
                      className="object-contain"
                    />
                    <span className="text-secondary font-bold text-lg">
                      Saudi Arabia
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-1">
                  {mainNavItems.map((item) => (
                    <div key={item.title} className="flex flex-col">
                      {item.items ? (
                        <div className="py-2">
                          <h4 className="font-semibold text-primary mb-2 px-2">
                            {item.title}
                          </h4>
                          <div className="pl-4 border-l-2 border-gray-100 flex flex-col gap-2">
                            {item.type === "columns"
                              ? item.columns.map((col, idx) => (
                                  <div
                                    key={idx}
                                    className="flex flex-col gap-2 mb-2"
                                  >
                                    {col.title && (
                                      <span className="text-xs font-bold text-primary uppercase tracking-wider mt-2">
                                        {col.title}
                                      </span>
                                    )}
                                    {col.items &&
                                      col.items.map((subItem) => (
                                        <SheetClose asChild key={subItem.title}>
                                          <Link
                                            href={subItem.href}
                                            className="text-muted-foreground hover:text-secondary py-1 text-sm block"
                                          >
                                            {subItem.title}
                                          </Link>
                                        </SheetClose>
                                      ))}
                                    {col.extras &&
                                      col.extras.map((extra) => (
                                        <SheetClose asChild key={extra.title}>
                                          <Link
                                            href={extra.href}
                                            className="text-primary font-medium hover:text-secondary py-1 text-sm block"
                                          >
                                            {extra.title}
                                          </Link>
                                        </SheetClose>
                                      ))}
                                  </div>
                                ))
                              : item.items.map((subItem) => (
                                  <SheetClose asChild key={subItem.title}>
                                    <Link
                                      href={subItem.href}
                                      className="text-muted-foreground hover:text-secondary py-1 text-sm block"
                                    >
                                      {subItem.title}
                                    </Link>
                                  </SheetClose>
                                ))}
                          </div>
                        </div>
                      ) : (
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            className="font-semibold text-primary py-3 px-2 hover:bg-gray-50 rounded-md transition-colors"
                          >
                            {item.title}
                          </Link>
                        </SheetClose>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="mt-8 flex flex-col gap-4 pt-6 border-t">
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold">
                    Get a barcode
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2 justify-start"
                  >
                    <User className="h-4 w-4" />
                    MO Zone login
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full gap-2 justify-start text-muted-foreground"
                  >
                    <Globe className="h-4 w-4" />
                    Switch to Arabic
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
              {title}
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-muted-foreground/80">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
