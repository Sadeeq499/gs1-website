import { BoardCommittees } from "@/components/about/board/BoardCommittees";
import { BoardGrid } from "@/components/about/board/BoardGrid";
import { InsightsHero } from "@/components/about/board/InsightsHero";
import { BOARD_DATA } from "@/components/about/board/management-board-data";
import { getTranslations } from "next-intl/server";

// Local Image Imports
import ChairmanImage from "@/public/images/chairman.png";
import CEOImage from "@/public/images/ceo.jpg";

export default async function ManagementBoardPage() {
  const t = await getTranslations("about.board");

  const localizedHero = {
    ...BOARD_DATA.hero,
    badge: t("hero.badge"),
    title: t("hero.title"),
    titleHighlight: t("hero.titleHighlight"),
    titleSuffix: t("hero.titleSuffix"),
    description: t("hero.description"),
    stats: BOARD_DATA.hero.stats.map((stat, i) => ({
      ...stat,
      value: t(`hero.stats.${i}.value`),
      label: t(`hero.stats.${i}.label`),
    })),
  };

  const localizedBoardSection = {
    ...BOARD_DATA.boardSection,
    heading: t("boardSection.heading"),
    highlight: t("boardSection.highlight"),
    description: t("boardSection.description"),
    members: BOARD_DATA.boardSection.members.map((member, i) => ({
      ...member,
      name: t(`boardSection.members.${i}.name`),
      role: t(`boardSection.members.${i}.role`),
      desc: t(`boardSection.members.${i}.desc`),
      image: i === 0 ? ChairmanImage : i === 1 ? CEOImage : member.image,
    })),
    executiveTeam: {
      ...BOARD_DATA.boardSection.executiveTeam,
      role: t("boardSection.executiveTeam.role"),
      name: t("boardSection.executiveTeam.name"),
      desc: t("boardSection.executiveTeam.desc"),
    },
  };

  const localizedCommittees = {
    ...BOARD_DATA.committees,
    title: t("committees.title"),
    items: BOARD_DATA.committees.items.map((item, i) => ({
      ...item,
      title: t(`committees.items.${i}.title`),
      desc: t(`committees.items.${i}.desc`),
    })),
  };

  return (
    <main className="min-h-screen bg-white">
      <InsightsHero data={localizedHero} />
      <BoardGrid data={localizedBoardSection} />
      <BoardCommittees data={localizedCommittees} />
    </main>
  );
}
