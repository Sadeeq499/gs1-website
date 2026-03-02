import React from "react";
import VerifyHero from "@/components/verify/VerifyHero";
import VerifyTabs from "@/components/verify/VerifyTabs";

export const metadata = {
  title: "Verified by GS1 | GS1 Saudi Arabia",
  description:
    "Verified by GS1 is a program that certifies the authenticity of products, locations, and member organisations registered with GS1 Saudi Arabia.",
};

function page() {
  return (
    <div>
      <VerifyHero />
      <VerifyTabs />
    </div>
  );
}

export default page;
