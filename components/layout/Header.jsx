"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  Globe,
  User,
  ShieldCheck,
  FileText,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
  { title: "Home", href: "/" },
   {
    title: "About Us",
    href: "/about",
    items: [
      { title: "Who We Are", href: "/about/who-we-are" },
      { title: "Mission & Vision", href: "/about/mission-vision" },
      { title: "Management Board", href: "/about/board" },
      { title: "Our Strategy", href: "/about/strategy" },
      { title: "Our Partners", href: "/about/partners" },
    ],
  },
  { title: "Standards", href: "/standards" },
  { title: "Services", href: "/services" },
  { title: "Industries", href: "/industries" },
 
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
        isScrolled ? "shadow-md" : ""
      )}
    >
      {/* Top Bar - Dark Blue */}
      <div className="bg-primary text-white hidden lg:block">
        <div className="container mx-auto px-4 h-10 flex justify-between items-center text-xs font-medium">
          <span className="opacity-90 tracking-wide uppercase text-[10px]">
            The Global Language of Business
          </span>
          <div className="flex items-center gap-6">
            <Link href="/insights" className="hover:text-secondary transition-colors">
              Insights & News
            </Link>
            <Link href="/events" className="hover:text-secondary transition-colors">
              Events
            </Link>
            <Link href="/training" className="hover:text-secondary transition-colors">
              Training
            </Link>
            <Link href="/contact" className="hover:text-secondary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white border-b border-gray-100 relative">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          
          {/* Dual Logo Section */}
          <div className="flex items-center gap-3 md:gap-5">
            <Link href="/" className="flex items-center group">
              <div className="relative h-9 w-18 lg:h-11 lg:w-24 transition-transform group-hover:scale-105">
                <Image
                  src="/logo-gs1.svg"
                  alt="GS1 Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Elegant Vertical Divider */}
            <div className="h-7 w-[1.5px] bg-gray-200 hidden xs:block" />

            {/* FSC Logo */}
            <div className="relative h-7 w-14 lg:h-9 lg:w-18 transition-opacity">
              <Image
                src="/images/fsc.png" 
                alt="FSC Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>

          {/* Desktop Navigation Menu - Hidden on 'lg' to avoid crowding due to dual logos */}
          <div className="hidden xl:flex flex-1 justify-center px-4">
            <NavigationMenu>
              <NavigationMenuList>
                {mainNavItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger className="text-[14px] font-semibold text-primary hover:text-secondary bg-transparent hover:bg-transparent focus:bg-transparent focus:text-secondary data-[state=open]:text-secondary transition-colors">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="absolute top-0 left-0">
                          <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]  border-t-4 border-secondary ">
                            {item.items.map((subItem) => (
                              <ListItem
                                key={subItem.title}
                                title={subItem.title}
                                href={subItem.href}
                              />
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "text-[14px] font-semibold text-primary hover:text-secondary px-4 py-2 block transition-colors",
                            pathname === item.href && "text-secondary"
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
          <div className="hidden lg:flex items-center gap-3">
            {/* Verified Badge Button */}
            <Button
              asChild
              variant="outline"
              className="relative hidden xl:flex items-center gap-2 border-green-500/30 text-green-800 px-4 py-2 rounded-full font-bold hover:bg-green-50 transition-all group overflow-hidden"
            >
              <Link href="/verify/product">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <div className="bg-green-500/10 rounded-full p-0.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-green-700 stroke-[3px]" />
                </div>
                <span className="text-[12px] tracking-tight">Verified By GS1</span>
              </Link>
            </Button>

            {/* Language */}
            <Button variant="ghost" size="sm" className="gap-1.5 text-primary font-bold">
              <Globe className="h-4 w-4" />
              <span className="text-xs">العربية</span>
            </Button>

            {/* Sign In */}
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors"
            >
              <User className="h-4 w-4" />
              <span>Sign in</span>
            </Link>

            {/* Main CTA */}
            <Button className="bg-secondary text-white hover:bg-secondary/90 font-bold px-5 rounded-md shadow-md hover:shadow-lg transition-all text-xs">
              Get a barcode
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="xl:hidden flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-primary bg-green-50 hover:bg-green-100" asChild>
               <Link href="/verify/product" className="lg:hidden">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
               </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px] overflow-y-auto">
                <SheetHeader className="border-b pb-6 mb-6">
                  <SheetTitle className="flex items-center gap-3">
                    <Image src="/logo-gs1.svg" alt="GS1" width={60} height={30} />
                    <div className="h-6 w-px bg-gray-200" />
                    <Image src="/images/fsc.png" alt="FSC" width={40} height={20} />
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-2">
                  {mainNavItems.map((item) => (
                    <div key={item.title}>
                      {item.items ? (
                        <div className="py-2">
                          <h4 className="font-bold text-primary px-2 mb-2">{item.title}</h4>
                          <div className="pl-4 border-l-2 border-gray-100 flex flex-col gap-1">
                            {item.items.map((subItem) => (
                              <SheetClose asChild key={subItem.title}>
                                <Link
                                  href={subItem.href}
                                  className="text-muted-foreground hover:text-secondary py-2 text-sm block transition-colors"
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
                            className="font-bold text-primary py-3 px-2 hover:bg-gray-50 rounded-md block transition-colors"
                          >
                            {item.title}
                          </Link>
                        </SheetClose>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="mt-8 flex flex-col gap-3 pt-6 border-t">
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-12">
                    Get a barcode
                  </Button>
                  <Button asChild variant="outline" className="w-full h-12 border-primary text-primary font-bold">
                    <Link href="/login">MO Zone Login</Link>
                  </Button>
                  <Button variant="ghost" className="w-full gap-2 text-muted-foreground justify-center">
                    <Globe className="h-4 w-4" /> Switch to Arabic
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

// 1. Add this CSS to your globals.css or a style tag to ensure smooth movement
// .NavigationMenuViewport { transition: width, height, 300ms ease; }

// 2. Updated ListItem with 'ref' and 'passHref' fix
const ListItem = React.forwardRef(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-slate-50 group",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none group-hover:text-secondary transition-colors">
            {title}
          </div>
          {children && (
            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground pt-1">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";