import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../utils/supabase';

interface ExpandableTableOfContentsProps {
  sections: Section[];
  onNavigate: (section: Section) => void;
  isVisible: boolean;
}

export function ExpandableTableOfContents({
  sections,
  onNavigate,
  isVisible
}: ExpandableTableOfContentsProps) {
  // Recursively render all sections and their children in a flat list
  const renderSections = (items: Section[], level: number = 0) => {
    return items.map((section, index) => {
      const hasChildSections = Array.isArray(section.children) &&
                              section.children.length > 0 &&
                              typeof section.children[0] !== 'string';

      return (
        <li key={`${level}-${index}`} className="w-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(section);
            }}
            className={`${level === 0 ? "text-blue-600 text-sm" : "text-blue-500 text-xs"}
                       hover:text-blue-800 font-medium text-left break-words w-full
                       ${level > 0 ? "ml-" + (level * 4) : ""}`}
          >
            {section.heading.join(' ')}
          </button>

          {hasChildSections && (
            <ul className="w-full mt-1 space-y-1">
              {renderSections(section.children as Section[], level + 1)}
            </ul>
          )}
        </li>
      );
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 p-3 rounded-md mt-1 mb-2 border-l-4 border-blue-400 w-full overflow-hidden"
        >
          <ul className="space-y-1 w-full">
            {renderSections(sections)}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}