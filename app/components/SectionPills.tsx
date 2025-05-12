import { Section } from '../utils/supabase';

interface SectionPillsProps {
  sections: Section[];
  onNavigate: (section: Section) => void;
}

export function SectionPills({ sections, onNavigate }: SectionPillsProps) {
  return (
    <div className="mt-3 mb-2 w-full overflow-x-auto pb-2">
      <div className="flex space-x-2 min-w-max">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the card's onClick
              onNavigate(section);
            }}
            className="flex-shrink-0 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm whitespace-nowrap"
          >
            {section.heading.join(' ')}
          </button>
        ))}
      </div>
    </div>
  );
}
