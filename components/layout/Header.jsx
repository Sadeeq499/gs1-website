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
  { title: t("nav.standards"), href: "/standards" },
  { title: t("nav.services"), href: "/services" },
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
        "w-full z-50 sticky top-0 font-sans transition-all duration-300",
        isScrolled ? "shadow-md" : "",
      )}
    >
      {/* Top Bar - Dark Blue */}
      <div className="bg-primary text-white hidden lg:block">
        <div className="container mx-auto px-4 h-10 flex justify-between items-center text-xs font-medium">
          <span className="opacity-90 tracking-wide uppercase text-[10px]">
            {t("topBar.slogan")}
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/insights"
              className="hover:text-secondary transition-colors"
            >
              {t("topBar.insights")}
            </Link>
            <Link
              href="/events"
              className="hover:text-secondary transition-colors"
            >
              {t("topBar.events")}
            </Link>
            <Link
              href="/training"
              className="hover:text-secondary transition-colors"
            >
              {t("topBar.training")}
            </Link>
            <Link
              href="/contact"
              className="hover:text-secondary transition-colors"
            >
              {t("topBar.contact")}
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

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Verified Badge Button */}
            <Button
              asChild
              variant="outline"
              className="relative hidden xl:flex items-center gap-2 border border-green-200 bg-linear-to-b from-green-50 to-green-100/50 hover:from-green-100 hover:to-green-200/50 text-green-900 px-4 py-2 rounded-full font-bold shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden"
            >
              <Link href="/verified-by-gs1">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <div className="bg-green-600/90 group-hover:bg-green-600 rounded-full p-1 shadow-inner flex items-center justify-center transition-colors">
                  <ShieldCheck className="h-3.5 w-3.5 text-white stroke-[3px]" />
                </div>
                <span className="text-[13px] tracking-tight">
                  {t("actions.verifiedByGs1")}
                </span>
              </Link>
            </Button>

            {/* Language */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="gap-1.5 text-primary font-bold cursor-pointer"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs">{t("language.toggle")}</span>
            </Button>

            {/* Sign In */}
            <a
              href="http://213.136.82.130:1323/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors"
            >
              <User className="h-4 w-4" />
              <span>{t("actions.signIn")}</span>
            </a>

            {/* Main CTA */}
            <Button
              asChild
              className="bg-secondary text-white hover:bg-secondary/90 font-bold px-5 rounded-md shadow-md hover:shadow-lg transition-all text-xs"
            >
              <a
                href="http://213.136.82.130:1323/register/account-setup"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("actions.getBarcode")}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="xl:hidden flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="bg-linear-to-b from-green-50 to-green-100/50 border-green-200 hover:from-green-100 hover:to-green-200/50 rounded-full shadow-sm"
              asChild
            >
              <Link href="/verified-by-gs1" className="xl:hidden">
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
    </header>
  );
}

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
      {/* Sheet Header with logos */}
      <SheetHeader className="px-4 pt-4 pb-3 border-b border-gray-100 bg-white shrink-0">
        <SheetTitle asChild>
          <div className="flex items-center gap-2">
            <div className="relative h-7 w-14">
              <Image
                src="/logo-gs1.svg"
                alt="GS1"
                fill
                className="object-contain object-left"
              />
            </div>
            <div className="h-6 w-px bg-gray-200" />
            <div className="relative h-6 w-12">
              <Image
                src="/images/fsc.png"
                alt="FSC"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
        </SheetTitle>
      </SheetHeader>

      {/* Utility Row */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-100 shrink-0">
        <Link
          href="/login"
          className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-secondary transition-colors"
        >
          <div className="bg-primary/10 rounded-full p-1">
            <User className="h-3 w-3 text-primary" />
          </div>
          {t("actions.signIn")}
        </Link>
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

      {/* Scrollable Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {mainNavItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          const isOpen = openSection === item.title;

          return (
            <div key={item.title} className="mb-1">
              {item.items ? (
                <div className="rounded-xl overflow-hidden">
                  {/* Accordion toggle */}
                  <button
                    onClick={() => toggleSection(item.title)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 text-left rounded-lg transition-all duration-200 font-semibold text-sm",
                      isOpen
                        ? "bg-primary text-white"
                        : "text-primary hover:bg-primary/5",
                    )}
                  >
                    <span>{item.title}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={cn(
                        "transition-transform duration-300 shrink-0",
                        isOpen ? "rotate-180" : "rotate-0",
                      )}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {/* Sub-items */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="mx-2 mb-2 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                      {item.items.map((subItem, idx) => {
                        const isSubActive = pathname === subItem.href;
                        return (
                          <SheetClose asChild key={subItem.title}>
                            <Link
                              href={subItem.href}
                              className={cn(
                                "flex items-center gap-2.5 px-3 py-2 text-sm transition-colors",
                                idx !== item.items.length - 1 &&
                                  "border-b border-gray-100",
                                isSubActive
                                  ? "text-secondary font-semibold bg-secondary/5"
                                  : "text-gray-600 hover:text-primary hover:bg-white font-medium",
                              )}
                            >
                              <div
                                className={cn(
                                  "w-1.5 h-1.5 rounded-full shrink-0",
                                  isSubActive ? "bg-secondary" : "bg-gray-300",
                                )}
                              />
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
                      "flex items-center px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
                      isActive
                        ? "bg-secondary/10 text-secondary"
                        : "text-primary hover:bg-primary/5",
                    )}
                  >
                    {item.title}
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary" />
                    )}
                  </Link>
                </SheetClose>
              )}
            </div>
          );
        })}

        {/* Quick Links */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="px-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
            {t("actions.quickLinks")}
          </p>
          {[
            { title: t("topBar.insights"), href: "/insights", icon: FileText },
            { title: t("topBar.events"), href: "/events", icon: Calendar },
            {
              title: t("topBar.training"),
              href: "/training",
              icon: ShieldCheck,
            },
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

      {/* Sticky CTA Footer */}
      <div className="shrink-0 px-3 py-3 border-t border-gray-100 bg-white space-y-2">
        <Button
          asChild
          className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-10 text-sm rounded-xl shadow-sm"
        >
          <a
            href="http://213.136.82.130:1323/register/account-setup"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("actions.getBarcode")}
          </a>
        </Button>
        <SheetClose asChild>
          <Button
            asChild
            variant="outline"
            className="w-full h-10 border-primary/30 text-primary font-bold text-sm rounded-xl hover:bg-primary/5"
          >
            <a
              href="http://213.136.82.130:1323/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("actions.signUp")}
            </a>
          </Button>
        </SheetClose>
      </div>
    </SheetContent>
  );
}

// 1. Add this CSS to your globals.css or a style tag to ensure smooth movement
// .NavigationMenuViewport { transition: width, height, 300ms ease; }

// 2. Updated ListItem with 'ref' and 'passHref' fix
const ListItem = React.forwardRef(
  ({ className, title, children, href, ...props }, ref) => {
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
  },
);
ListItem.displayName = "ListItem";
