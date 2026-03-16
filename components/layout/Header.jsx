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
      { title: t("nav.managementBoard"), href: "/about/board" },
      { title: t("nav.ourStrategy"), href: "/about/strategy" },
      { title: t("nav.ourPartners"), href: "/about/partners" },
    ],
  },
  { title: t("nav.services"), href: "/services" },
  { title: t("nav.standards"), href: "/standards" },
  { title: t("nav.industries"), href: "/industries" },
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
        "w-full z-50 sticky top-0 transition-all duration-300",
        isScrolled ? "shadow-md" : "",
      )}
    >
      {/* Top Bar - Dark Blue — NO CHANGES */}
      <div className="bg-primary text-white hidden lg:block">
        <div className="mx-auto px-4 h-10 flex justify-between items-center text-xs font-medium">
          <span className="opacity-90 tracking-wide uppercase text-[10px]">
            {t("topBar.slogan")}
          </span>
          <div className="flex items-center gap-6">
            <Link href="/insights" className="hover:text-secondary transition-colors">
              {t("topBar.insights")}
            </Link>
            <Link href="/events" className="hover:text-secondary transition-colors">
              {t("topBar.events")}
            </Link>
            <Link href="/training" className="hover:text-secondary transition-colors">
              {t("topBar.training")}
            </Link>
            <Link href="/contact" className="hover:text-secondary transition-colors">
              {t("topBar.contact")}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Middle Identity Bar ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 sm:gap-6" style={{ minHeight: "clamp(70px, 10vh, 90px)", paddingTop: "8px", paddingBottom: "8px" }}>

          {/* LEFT — GS1 logo + text only */}
          <Link href="/" className="flex items-center gap-2 sm:gap-4 group shrink-0">
            {/* responsive size container */}
            <div
              className="relative w-[100px] h-[55px] sm:w-[140px] sm:h-[80px] shrink-0 transition-transform duration-200 group-hover:scale-105"
            >
              <Image
                src="/logos/gs1-logo.png"
                alt={t("brand.name")}
                fill
                sizes="(max-width: 640px) 100px, 140px"
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col leading-snug">
              <span className="text-primary font-semibold text-lg tracking-tight">
                {t("brand.name")}
              </span>
              <span className="text-primary text-[13px] font-normal">
                {t("brand.slogan")}
              </span>
            </div>
          </Link>

          {/* CENTER — CTAs + Language toggle */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Verified By GS1 */}
            <Button
              asChild
              variant="outline"
              className="relative flex items-center gap-2 border border-green-200 bg-gradient-to-b from-green-50 to-green-100/50 hover:from-green-100 hover:to-green-200/50 text-green-900 px-4 py-2.5 rounded-full font-bold shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden"
            >
              <Link href="/verified-by-gs1">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <div className="bg-green-600/90 group-hover:bg-green-600 rounded-full p-1.5 shadow-inner flex items-center justify-center transition-colors">
                  <ShieldCheck className="h-3.5 w-3.5 text-white stroke-[3px]" />
                </div>
                <span className="text-[13px] tracking-tight">
                  {t("actions.verifiedByGs1")}
                </span>
              </Link>
            </Button>

            {/* Thin separator */}
            <div className="h-8 w-px bg-gray-200" />

            {/* Get a Barcode — primary dark blue */}
            <Button
              asChild
              className="bg-primary text-white hover:bg-primary/90 font-bold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all text-sm h-10"
            >
              <a
                href={process.env.NEXT_PUBLIC_MEMBER_REGISTER}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("actions.getBarcode")}
              </a>
            </Button>

            {/* Sign In — secondary orange */}
            <Button
              asChild
              className="bg-secondary text-white hover:bg-secondary/90 font-bold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all text-sm h-10"
            >
              <a
                href={process.env.NEXT_PUBLIC_MEMBER_LOGIN}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("actions.signIn")}
              </a>
            </Button>

            {/* Language toggle — Moved to last */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-1.5 text-primary font-bold cursor-pointer border border-gray-200 rounded-lg px-3 h-10 hover:bg-gray-50 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">{t("language.toggle")}</span>
            </Button>
          </div>

          {/* RIGHT — Chamber / FSC logo (bigger, with label) */}
          <div className="hidden md:flex flex-col items-center gap-1 shrink-0">
            <div
              className="relative"
              style={{ width: "120px", height: "70px" }}
            >
              <Image
                src="https://saudisteelconference.com/_images/logo-federation.png"
                alt="Federation of Saudi Chambers of Commerce"
                fill
                sizes="120px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Mobile — shield icon + hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="bg-gradient-to-b from-green-50 to-green-100/50 border-green-200 hover:from-green-100 hover:to-green-200/50 rounded-full shadow-sm"
              asChild
            >
              <Link href="/verified-by-gs1">
                <div className="bg-green-600/90 rounded-full p-1 shadow-inner flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-white stroke-[2.5px]" />
                </div>
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <MobileMenuContent
                pathname={pathname}
                t={t}
                toggleLanguage={toggleLanguage}
                mainNavItems={mainNavItems}
              />
            </Sheet>
          </div>
        </div>
      </div>

      {/* ── Navigation Bar ── */}
      <div className="bg-white border-b border-gray-100 hidden xl:block">
        <div className="mx-auto px-4">
          <NavigationMenu className="mx-auto">
            <NavigationMenuList className="flex justify-center">
              {mainNavItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.items ? (
                    <>
                      <NavigationMenuTrigger className="text-[16px] font-normal text-primary hover:text-secondary bg-transparent hover:bg-transparent focus:bg-transparent focus:text-secondary data-[state=open]:text-secondary data-[state=open]:bg-transparent transition-colors px-5 py-4">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="absolute top-0 left-0">
                        <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] border-t-4 border-secondary">
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
                    <NavigationMenuLink asChild className="bg-transparent hover:bg-transparent focus:bg-transparent">
                      <Link
                        href={item.href}
                        className={cn(
                          "text-[16px] font-normal text-primary hover:text-secondary px-5 py-4 block transition-colors",
                          pathname === item.href && "text-secondary",
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
                alt="FSC" 
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

        <div className="mt-3 pt-3 border-t border-gray-100">
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
        </div>
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
              {t("actions.signUp")}
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