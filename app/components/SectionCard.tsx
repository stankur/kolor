import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../utils/supabase';
import { SectionPills } from './SectionPills';
// import { ExpandableTableOfContents } from './ExpandableTableOfContents';
import Image from 'next/image';
import { processTextArray } from '../utils/formatText';

interface SectionCardProps {
  section: Section;
  navigateToSection: (section: Section) => void;
  animationDelay?: number;
  isFirst?: boolean;
  isLast?: boolean;
  compactMode?: boolean;
}

export function SectionCard({
  section,
  navigateToSection,
  animationDelay = 0,
  compactMode = false
}: SectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSubsections, setShowSubsections] = useState(false);

  const hasChildSections = section.children.some((child) => Array.isArray(child))

  // Process child sections to ensure we have proper Section objects
  const childSections = hasChildSections 
    ? section.children.filter((child) => Array.isArray(child)).flat() as Section[]
    : []

  // Enhanced navigate function for child sections
  // This maintains the parent section's context
  const navigateToChildSection = (childSection: Section) => {
    // First, we need to enrich the child section with parent information
    // We do this by creating a parent reference in the child section
    // The DocumentViewer will use this to build the correct URL path
    
    navigateToSection(childSection);
  };

  return (
		<motion.div
			className="w-full overflow-hidden group"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.3,
				delay: animationDelay,
			}}
			layout={false} // Disable layout animation
		>
			{/* Top section with image, title, and short summary */}
			<div
				className="flex w-full pt-4"
				onClick={() => setIsExpanded(!isExpanded)}
				style={{ cursor: "pointer" }}
			>
				{/* Image container with fixed size but variable opacity and transform */}
				<div
					className="relative flex-shrink-0 w-24 h-24 overflow-hidden"
					style={{
						transform: compactMode ? "scale(0.01)" : "scale(1)",
						opacity: compactMode ? 0 : 1,
						marginRight: compactMode ? 0 : "1rem",
						width: compactMode ? 0 : "6rem",
						transition:
							"transform 0.3s ease, opacity 0.3s ease, margin-right 0.3s ease, width 0.3s ease",
						position: "relative",
					}}
				>
					<div className="bg-gray-200 absolute inset-0 flex items-center justify-center rounded-md overflow-hidden">
						{section.imageUrl ? (
							<Image
								src={section.imageUrl}
								alt={processTextArray(section.heading)}
								width={96}
								height={96}
								className="object-cover w-full h-full saturate-75 rounded-md"
							/>
						) : (
							<div className="text-4xl text-gray-400">📖</div>
						)}
					</div>
				</div>

				{/* Title and short summary */}
				<div className="flex-grow overflow-hidden">
					<h3
						className="text-lg text-blue-600 font-bold mb-1 break-words hover:underline cursor-pointer"
						onClick={(e) => {
							e.stopPropagation(); // Prevent expandable click
							if (section.url) {
								// Open URL in new tab if available
								window.open(section.url, "_blank");
							} else {
								// Otherwise navigate to section
								navigateToSection(section);
							}
						}}
					>
						{processTextArray(section.heading)}
					</h3>
					{section.summary && section.summary.length > 0 && (
						<p className="text-sm text-gray-600 break-words">
							{processTextArray(section.summary)}
						</p>
					)}
				</div>
			</div>

			{/* Bottom section with expandable content and buttons */}
			<AnimatePresence>
				<div className={`w-full`}>
					{isExpanded && !compactMode && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="w-full overflow-hidden mb-2"
							layout={false} // Disable layout animation
						>
							{section.longSummary &&
								section.longSummary.length > 0 && (
									<div className="flex flex-col space-y-5 mt-2 mb-2">
										{section.longSummary.map(
											(paragraph, i) => (
												<p
													key={i}
													className="text-gray-700 break-words"
												>
													{paragraph}
												</p>
											)
										)}
									</div>
								)}

							{/* Subsections */}
							{hasChildSections && childSections.length > 0 && (
								<div className="w-full">
									<AnimatePresence>
										{showSubsections && (
											<SectionPills
												sections={childSections}
												onNavigate={
													navigateToChildSection
												}
											/>
										)}
									</AnimatePresence>
								</div>
							)}
						</motion.div>
					)}

					{/* Button controls that fade in/out rather than appearing/disappearing */}
					<div
						className="flex justify-end items-center w-full py-2 gap-2"
						style={{
							opacity: compactMode ? 0 : 1,
							height: compactMode ? 0 : "56px",
							transform: compactMode ? "scale(0.01)" : "scale(1)",
							overflow: "hidden",
							transition:
								"opacity 0.3s ease, height 0.3s ease, transform 0.3s ease",
						}}
					>
						<button
							onClick={(e) => {
								e.stopPropagation(); // In case of event bubbling
								setIsExpanded(!isExpanded);
								// Reset subsections when collapsing
								if (!isExpanded) {
									setShowSubsections(false);
								}
							}}
							className="flex-shrink-0 bg-blue-50 hover:bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center"
						>
							{isExpanded ? "−" : "+"}
						</button>
					</div>
				</div>
			</AnimatePresence>
		</motion.div>
  );
}