// PositionCatalog.tsx
import Card from '@/components/PositionCard';
import Link from 'next/link';
import { PositionJson, PositionItem } from '@/../../interface';
import RefreshButton from './RefreshButton'; // Import the client component

type PositionCatalogProps = {
  positionJson: PositionJson;
  searchKey?: string | null;
  filterSkills?: string[] | null;
  salaryRange?: {
    min: any;
    max: any;
  } | null;
};


export default function PositionCatalog({positionJson, searchKey, filterSkills,salaryRange}:PositionCatalogProps) {

  const filteredPositions:any = positionJson.data.filter((position: PositionItem) => {

    const matchesSearch =
      !searchKey?.trim() || position.title.toLowerCase().includes(searchKey.toLowerCase());
  
    const matchesSkills =
      !filterSkills?.length ||
      position.skill?.some((skill: string) =>
        filterSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
      );
  
    const matchesSalary =
      !salaryRange ||
      (
        (!salaryRange.min || position.salary?.min >= salaryRange.min) &&
        (!salaryRange.max || position.salary?.max <= salaryRange.max)
      );
  console.log()
    return matchesSearch && matchesSkills && matchesSalary;
  });
  
  
  
  return (
    <div className="relative">
      {/* Add the refresh button in the top right */}
      <div className="absolute top-0 right-0">
        <RefreshButton />
      </div>




      {positionJson.count === 0 ? (
  <div className="col-span-full flex flex-col items-center justify-center p-10 bg-gray-100 rounded-xl shadow-sm">
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Positions Available</h2>
    <p className="text-gray-600 text-center max-w-md">
      We currently don't have any open positions. Please check back later!
    </p>
  </div>
) : (
  <h2 className="text-2xl text-gray-800 text-center mb-8 pt-10">
  Explore {filteredPositions.length} amazing positions that you might be interested
</h2>
)}


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
       
        {filteredPositions.map((position: PositionItem) => (
          <Link 
            href={`/position/${position._id}`} 
            className="w-full max-w-sm" 
            key={position._id}
          >
            <Card
              title={position.title}
              company={position.company.name}
              workArrangement={position.workArrangement}
              location={position.location}
              interviewStart={position.interviewStart}
              interviewEnd={position.interviewEnd}
              openingPosition={position.openingPosition}
              salary={position.salary}
              skills={position.skill}
            />
          </Link>
        ))
      
        
        }
      </div>
    </div>
  );
}
