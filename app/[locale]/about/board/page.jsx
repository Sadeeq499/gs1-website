import { BoardCommittees } from "@/components/about/board/BoardCommittees";
import { BoardGrid } from "@/components/about/board/BoardGrid";
import { InsightsHero } from "@/components/about/board/InsightsHero";
import { BOARD_DATA } from "@/components/about/board/management-board-data";

// Local Image Imports
import ChairmanImage from '@/public/images/chairman.png'; 
import CEOImage from '@/public/images/ceo.jpg';

export default function ManagementBoardPage() {
  // Inject the local images into the data object before passing to component
  const boardWithImages = {
    ...BOARD_DATA.boardSection,
    members: [
      { ...BOARD_DATA.boardSection.members[0], image: ChairmanImage },
      { ...BOARD_DATA.boardSection.members[1], image: CEOImage },
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <InsightsHero data={BOARD_DATA.hero} />
      
      {/* Pass the fixed data with local images */}
      <BoardGrid data={boardWithImages} />
      
      <BoardCommittees data={BOARD_DATA.committees} />
    </main>
  );
}