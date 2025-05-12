'use client';

import { useState, useEffect } from 'react';
import { Document, Section, getMockDocument } from '../utils/supabase';
import { Breadcrumb } from './Breadcrumb';
import { SectionCard } from './SectionCard';
import { DocumentSummary } from './DocumentSummary';

interface BreadcrumbItem {
  id: string;
  label: string;
  section?: Section;
}

interface DocumentViewerProps {
  documentTitle: string;
}

export function DocumentViewer({ documentTitle }: DocumentViewerProps) {
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePath, setActivePath] = useState<BreadcrumbItem[]>([]);
  const [currentSections, setCurrentSections] = useState<Section[]>([]);
  
  // Load the document
  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      // In a real implementation, this would fetch from Supabase
      // const doc = await fetchDocumentByTitle(documentTitle);
      
      // Using mock data for now
      const doc = getMockDocument();
      
      if (doc) {
        setDocument(doc);
        
        // Initialize breadcrumb with home and document title
        setActivePath([
          { id: 'home', label: 'Home' },
          { id: 'document', label: doc.title.join(' ') }
        ]);
        
        // Set the top-level sections as current
        setCurrentSections(doc.children as Section[]);
      }
      
      setLoading(false);
    };
    
    fetchDocument();
  }, [documentTitle]);
  
  // Handle navigation through sections
  const navigateToSection = (section: Section) => {
    // Add this section to the breadcrumb path
    const newPath = [...activePath, {
      id: section.heading.join('-').toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      label: section.heading.join(' '),
      section
    }];
    
    setActivePath(newPath);
    
    // If this section has child sections, set them as current
    if (Array.isArray(section.children) && 
        section.children.length > 0 && 
        typeof section.children[0] !== 'string') {
      setCurrentSections(section.children as Section[]);
    } else {
      setCurrentSections([]);
    }
    
    // In a real implementation, this might update the URL
    // window.history.pushState(null, '', `/${documentTitle}/${newPath.slice(2).map(item => item.id).join('/')}`);
  };
  
  // Handle breadcrumb navigation
  const handleBreadcrumbNavigation = (index: number) => {
    if (index === 0) {
      // Home navigation - would typically redirect to home page
      window.location.href = '/';
      return;
    }
    
    // Truncate the path to the selected level
    const newPath = activePath.slice(0, index + 1);
    setActivePath(newPath);
    
    if (index === 1) {
      // Document level - show top-level sections
      if (document) {
        setCurrentSections(document.children as Section[]);
      }
    } else if (index > 1) {
      // Section level - show its children if any
      const section = newPath[index].section;
      if (section && Array.isArray(section.children) && 
          section.children.length > 0 && 
          typeof section.children[0] !== 'string') {
        setCurrentSections(section.children as Section[]);
      } else {
        setCurrentSections([]);
      }
    }
    
    // In a real implementation, this might update the URL
    // window.history.pushState(null, '', `/${documentTitle}/${newPath.slice(2).map(item => item.id).join('/')}`);
  };
  
  if (loading) {
    return <div className="p-8 text-center">Loading document...</div>;
  }
  
  if (!document) {
    return <div className="p-8 text-center">Document not found</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb navigation */}
        <Breadcrumb 
          path={activePath} 
          onNavigate={handleBreadcrumbNavigation} 
        />
        
        {/* Document header - only shown at the document level */}
        {activePath.length === 2 && (
          <>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{document.title.join(' ')}</h1>

            {document.summary && document.summary.length > 0 && (
              <p className="text-gray-600 mb-4">{document.summary.join(' ')}</p>
            )}

            <DocumentSummary
              content={document.longSummary}
              onViewOriginal={() => alert('This will link to the original content in a future version')}
            />

            {/* Bigger gap between main content and section cards */}
            <div className="mt-12 mb-6 border-t border-gray-200"></div>
          </>
        )}

        {/* Section header - shown when viewing a specific section */}
        {activePath.length > 2 && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {activePath[activePath.length - 1].label}
            </h1>

            {activePath[activePath.length - 1].section?.summary &&
             activePath[activePath.length - 1].section.summary.length > 0 && (
              <p className="text-gray-600 mb-4">{activePath[activePath.length - 1].section.summary.join(' ')}</p>
            )}

            {activePath[activePath.length - 1].section?.longSummary &&
             activePath[activePath.length - 1].section.longSummary.length > 0 && (
              <DocumentSummary
                content={activePath[activePath.length - 1].section.longSummary}
                onViewOriginal={() => alert('This will link to the original content in a future version')}
              />
            )}

            {activePath[activePath.length - 1].section?.directContent &&
             activePath[activePath.length - 1].section.directContent.length > 0 && (
              <div className="text-gray-700 mb-8 prose">
                {activePath[activePath.length - 1].section.directContent.map((content, index) => (
                  <p key={index} className="mb-2">{content}</p>
                ))}
              </div>
            )}

            {/* Bigger gap between section content and subsection cards */}
            <div className="mt-12 mb-6 border-t border-gray-200"></div>
          </>
        )}
        
        {/* Section cards */}
        {currentSections.map((section, index) => (
          <SectionCard 
            key={index} 
            section={section} 
            navigateToSection={navigateToSection}
          />
        ))}
        
        {/* Show "no contents" message if no sections exist */}
        {currentSections.length === 0 && activePath.length > 2 && (
          <p className="text-center text-gray-500 my-8">This section has no subsections.</p>
        )}
      </div>
    </div>
  );
}