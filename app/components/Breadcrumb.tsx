import React, { useEffect, useRef } from 'react';
import { Section } from '../utils/supabase';
import { cleanMarkdown } from '../utils/formatText';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  id: string;
  label: string;
  section?: Section;
}

interface BreadcrumbProps {
  path: BreadcrumbItem[];
  onNavigate: (index: number) => void;
}

export function Breadcrumb({ path, onNavigate }: BreadcrumbProps) {
  const scrollContainerRef = useRef<HTMLElement>(null);
  
  // Scroll to the end whenever the path changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [path]);
  return (
    <motion.nav 
      ref={scrollContainerRef}
      className="mb-12 overflow-x-auto w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ol className="flex items-center space-x-2 text-sm min-w-max">
        {path.map((item, index) => (
          <motion.li 
            key={item.id} 
            className="flex items-center whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
          >
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            <button 
              onClick={() => onNavigate(index)}
              className={`${
                index === path.length - 1 
                  ? "text-blue-600 font-medium" 
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {cleanMarkdown(item.label)}
            </button>
          </motion.li>
        ))}
      </ol>
    </motion.nav>
  );
}
