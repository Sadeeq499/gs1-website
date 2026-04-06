"use client";

import * as React from "react";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import {
  Menu,
  Globe,
  User,
  ShieldCheck,
  FileText,
  Calendar,
  ChevronDown,
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

const getMainNavItems = (t) => [
  { title: t("nav.home"), href: "/" },
  {
    title: t("nav.aboutUs"),
    href: "/about",
    items: [
      { title: t("nav.whoWeAre"), href: "/about/who-we-are" },
      { title: t("nav.missionVision"), href: "/about/mission-vision" },
      // { title: t("nav.managementBoard"), href: "/about/board" },
      { title: t("nav.ourStrategy"), href: "/about/strategy" },
      { title: t("nav.ourPartners"), href: "/about/partners" },
    ],
  },
  { title: t("nav.services"), href: "/services" },
  { title: t("nav.standards"), href: "/standards" },
  { title: t("nav.industries"), href: "/industries" },
  { title: t("nav.contact"), href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();

  const mainNavItems = getMainNavItems(t);

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  const isHome = pathname === "/";

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
        "w-full z-50 transition-all duration-500",
        isHome ? "fixed left-0 right-0" : "sticky top-0",
        isHome && !isScrolled ? "top-0 px-0 md:top-4 md:px-6 lg:top-6 lg:px-8" : "top-0 px-0"
      )}
    >
      <div className={cn(
        "mx-auto w-full transition-all duration-500",
        isHome && !isScrolled 
          ? "max-w-7xl rounded-none md:rounded-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]" 
          : "max-w-full bg-white shadow-md border-b border-gray-100"
      )}>
        
        {/* Top Row: Logo, Action Buttons, Chamber Logo */}
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 py-3 sm:py-4 border-b border-gray-100/80">
          
          {/* LEFT: GS1 Logo */}
          <Link href="/" className="flex items-center gap-4 group shrink-0">
            <div className="relative w-[120px] h-[45px] sm:w-[150px] sm:h-[55px] shrink-0 transition-transform">
              <Image src="/logos/gs1-logo.png" alt={t("brand.name")} fill sizes="150px" className="object-contain object-left" priority />
            </div>
            <div className="hidden lg:flex flex-col justify-center">
              <span className={cn(
                "text-[#002c6c] font-bold leading-tight mb-0.5",
                locale === "ar" ? "text-[16px]" : "text-[18px]"
              )}>
                {t("brand.name")}
              </span>
              <span className={cn(
                "text-[#002c6c] leading-tight",
                locale === "ar" ? "text-[13px]" : "text-[15px]"
              )}>
                {t("brand.slogan")}
              </span>
            </div>
          </Link>

          {/* MIDDLE: Desktop Action Buttons */}
          <div className="hidden lg:flex items-center justify-center gap-2 lg:gap-3 flex-1">
            {/* Verified By GS1 (Light Green Pill) */}
            <Button
              asChild
              variant="outline"
              className="relative flex items-center gap-2 border-green-200 bg-[#ebfbf3] hover:bg-green-100 text-green-800 px-4 h-8 rounded-full font-bold shadow-sm transition-colors group"
            >
              <Link href="/verified-by-gs1">
                <div className="bg-[#10b981] rounded-full p-1 shadow-inner flex items-center justify-center">
                  <ShieldCheck className="h-3 w-3 text-white stroke-[3px]" />
                </div>
                <span className="text-[12px] tracking-tight">{t("actions.verifiedByGs1")}</span>
              </Link>
            </Button>

            {/* Get a barcode (Dark Blue) */}
            <Button asChild className="bg-[#1a2b56] hover:bg-[#1a2b56]/90 text-white font-semibold px-4 h-8 rounded-md text-[12px] shadow-sm transition-colors">
              <a href={process.env.NEXT_PUBLIC_MEMBER_REGISTER} target="_blank" rel="noopener noreferrer">
                {t("actions.getBarcode")}
              </a>
            </Button>

            {/* GS1 Member Login (Orange) */}
            <Button asChild className="bg-[#EF5323] hover:bg-[#d9481d] text-white font-semibold px-4 h-8 rounded-md text-[12px] shadow-sm transition-colors">
              <a href={process.env.NEXT_PUBLIC_MEMBER_LOGIN} target="_blank" rel="noopener noreferrer">
                {t("actions.signIn")}
              </a>
            </Button>

            {/* Language Toggle (Outline) */}
            <Button variant="outline" size="sm" onClick={toggleLanguage} className="flex gap-2 text-primary hover:bg-gray-50 h-8 px-3 rounded-md border-gray-200 ml-1">
              <Globe className="h-3.5 w-3.5" />
              <span className="text-[12px] font-medium text-gray-700">{t("language.toggle")}</span>
            </Button>
          </div>

          {/* RIGHT: Chamber / FSC logo */}
          <div className="hidden shrink-0 lg:flex items-center justify-end w-[150px]">
            <div className="relative w-[110px] h-[55px]">
              <Image src="https://saudisteelconference.com/_images/logo-federation.png" alt={t("brand.fsc")} fill sizes="110px" className="object-contain object-right" />
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-1 shrink-0">
            {/* Get a Barcode */}
            <Button asChild className="bg-[#1a2b56] hover:bg-[#1a2b56]/90 text-white font-semibold px-2 sm:px-3 h-7 sm:h-8 rounded-md text-[10px] sm:text-[11px] shadow-sm whitespace-nowrap">
              <a href={process.env.NEXT_PUBLIC_MEMBER_REGISTER} target="_blank" rel="noopener noreferrer">{t("actions.getBarcode")}</a>
            </Button>
            {/* Sign In */}
            <Button asChild className="bg-[#EF5323] hover:bg-[#d9481d] text-white font-semibold px-2 sm:px-3 h-7 sm:h-8 rounded-md text-[10px] sm:text-[11px] shadow-sm whitespace-nowrap">
              <a href={process.env.NEXT_PUBLIC_MEMBER_LOGIN} target="_blank" rel="noopener noreferrer">{t("actions.signIn")}</a>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary hover:bg-gray-100 h-8 w-8 ml-0.5">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <MobileMenuContent pathname={pathname} t={t} toggleLanguage={toggleLanguage} mainNavItems={mainNavItems} />
            </Sheet>
          </div>
        </div>

        {/* Bottom Row: Nav Menu */}
        <div className="hidden lg:flex w-full justify-center px-4 py-1.5">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-6">
              {mainNavItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.items ? (
                    <>
                      <NavigationMenuTrigger className="text-[13px] font-semibold text-gray-700 hover:text-[#EF5323] focus:text-[#EF5323] data-[state=open]:text-[#EF5323] bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent h-8 px-2 transition-colors">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="absolute top-0 left-0">
                        <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] border-t-4 border-[#EF5323]  rounded-b-lg ">
                          {item.items.map((subItem) => (
                            <ListItem key={subItem.title} title={subItem.title} href={subItem.href} />
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "inline-flex h-8 w-max items-center justify-center rounded-md bg-transparent px-2 text-[13px] font-semibold text-gray-700 transition-colors hover:text-[#EF5323]",
                          pathname === item.href && "text-[#EF5323]"
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
      </div>
    </header>
  );
}

/* ── Mobile Sheet ── */
function MobileMenuContent({ pathname, t, toggleLanguage, mainNavItems }) {
  const [openSection, setOpenSection] = React.useState(null);

  const toggleSection = (title) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  return (
    <SheetContent
      side="right"
      className="w-[300px] sm:w-[340px] p-0 flex flex-col overflow-hidden"
    >
      <SheetHeader className="px-4 pt-4 pb-3 border-b border-gray-100 bg-white shrink-0">
        <SheetTitle asChild>
          <div className="flex items-center gap-3">
            <div className="relative w-[80px] h-[45px]">
              <Image src="/logos/gs1-logo.png" alt={t("brand.name")} fill sizes="80px" className="object-contain object-left" />
            </div>
            <div className="h-6 w-px bg-gray-200" />
            <div className="relative w-[80px] h-[40px]">
              <Image 
                src="https://saudisteelconference.com/_images/logo-federation.png" 
                alt={t("brand.fsc")} 
                fill 
                sizes="80px" 
                className="object-contain object-left" 
              />
            </div>
          </div>
        </SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-100 shrink-0">
        <a
          href={process.env.NEXT_PUBLIC_MEMBER_LOGIN}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-secondary transition-colors"
        >
          <div className="bg-primary/10 rounded-full p-1">
            <User className="h-3 w-3 text-primary" />
          </div>
          {t("actions.signIn")}
        </a>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLanguage}
          className="gap-1.5 text-xs font-semibold text-primary h-7 px-2"
        >
          <Globe className="h-3.5 w-3.5" />
          {t("language.toggle")}
        </Button>
      </div>

      <div className="p-2">
        <Button
          asChild
          variant="outline"
          className="relative flex items-center gap-2 border-green-200 bg-[#ebfbf3] hover:bg-green-100 text-green-800 px-4 h-10 rounded-full font-bold shadow-sm transition-colors group"
        >
          <Link href="/verified-by-gs1">
            <div className="bg-[#10b981] rounded-full p-1 shadow-inner flex items-center justify-center">
              <ShieldCheck className="h-3 w-3 text-white stroke-[3px]" />
            </div>
            <span className="text-[12px] tracking-tight">{t("actions.verifiedByGs1")}</span>
          </Link>
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          const isOpen = openSection === item.title;

          return (
            <div key={item.title} className="mb-1">
              {item.items ? (
                <div className="rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection(item.title)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 text-left rounded-lg transition-all duration-200 text-[16px] font-normal",
                      isOpen ? "bg-primary text-white" : "text-primary hover:bg-primary/5",
                    )}
                  >
                    <span>{item.title}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                      className={cn("transition-transform duration-300 shrink-0", isOpen ? "rotate-180" : "rotate-0")}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
                    <div className="mx-2 mb-2 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                      {item.items.map((subItem, idx) => {
                        const isSubActive = pathname === subItem.href;
                        return (
                          <SheetClose asChild key={subItem.title}>
                            <Link
                              href={subItem.href}
                              className={cn(
                                "flex items-center gap-2.5 px-3 py-2 text-[16px] font-normal transition-colors",
                                idx !== item.items.length - 1 && "border-b border-gray-100",
                                isSubActive ? "text-secondary bg-secondary/5" : "text-gray-600 hover:text-primary hover:bg-white",
                              )}
                            >
                              <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", isSubActive ? "bg-secondary" : "bg-gray-300")} />
                              {subItem.title}
                            </Link>
                          </SheetClose>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2.5 rounded-lg text-[16px] font-normal transition-all duration-200",
                      isActive ? "bg-secondary/10 text-secondary" : "text-primary hover:bg-primary/5",
                    )}
                  >
                    {item.title}
                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary" />}
                  </Link>
                </SheetClose>
              )}
            </div>
          );
        })}

        {/* <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="px-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
            {t("actions.quickLinks")}
          </p>
          {[
            { title: t("topBar.insights"), href: "/insights", icon: FileText },
            { title: t("topBar.events"), href: "/events", icon: Calendar },
            { title: t("topBar.training"), href: "/training", icon: ShieldCheck },
            { title: t("topBar.contact"), href: "/contact", icon: User },
          ].map(({ title, href, icon: Icon }) => (
            <SheetClose asChild key={title}>
              <Link
                href={href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-500 hover:text-primary hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                {title}
              </Link>
            </SheetClose>
          ))}
        </div> */}
      </nav>

      <div className="shrink-0 px-3 py-3 border-t border-gray-100 bg-white space-y-2">
        <Button
          asChild
          className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-10 text-sm rounded-xl shadow-sm"
        >
          <a href={process.env.NEXT_PUBLIC_MEMBER_REGISTER} target="_blank" rel="noopener noreferrer">
            {t("actions.getBarcode")}
          </a>
        </Button>
        <SheetClose asChild>
          <Button
            asChild
            variant="outline"
            className="w-full h-10 border-primary/30 text-primary font-bold text-sm rounded-xl hover:bg-primary/5"
          >
            <a href={process.env.NEXT_PUBLIC_MEMBER_LOGIN} target="_blank" rel="noopener noreferrer">
              {t("actions.signIn")}
            </a>
          </Button>
        </SheetClose>
      </div>
    </SheetContent>
  );
}

const ListItem = React.forwardRef(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-slate-50 group",
            className,
          )}
          {...props}
        >
          <div className="text-[16px] font-normal leading-none group-hover:text-secondary transition-colors">
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