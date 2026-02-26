// app/verify/layout.jsx  (Server Component)
import VerifyHero from "@/components/verify/VerifyHero";
import VerifyTabs from "@/components/verify/VerifyTabs";

export const metadata = {
  title: "Verify | GS1 Saudi Arabia",
  description:
    "Verify the authenticity of GS1 products, locations, and member organisations registered with GS1 Saudi Arabia.",
};

export default function VerifyLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <VerifyHero />
      <VerifyTabs />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}