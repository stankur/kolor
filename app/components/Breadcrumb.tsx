import React from 'react';
import { Section } from '../utils/supabase';
import { cleanMarkdown } from '../utils/formatText';

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
  return (
    <nav className="mb-12 overflow-x-auto w-full">
      <ol className="flex items-center space-x-2 text-sm min-w-max">
        {path.map((item, index) => (
          <li key={item.id} className="flex items-center whitespace-nowrap">
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
          </li>
        ))}
      </ol>
    </nav>
  );
}
