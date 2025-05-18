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
}

export function SectionCard({ section, navigateToSection, animationDelay = 0 }: SectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSubsections, setShowSubsections] = useState(false);
//   const [showFullTOC, setShowFullTOC] = useState(false);

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
			layout
			className="w-full overflow-hidden group"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: animationDelay }}
		>
			{/* Top section with image, title, and short summary */}
			<div
				className="flex w-full py-4"
				onClick={() => setIsExpanded(!isExpanded)}
				style={{ cursor: "pointer" }}
			>
				{/* Image container */}
				<div className="bg-gray-200 w-24 h-24 flex items-center justify-center flex-shrink-0 rounded-md">
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

				{/* Title and short summary */}
				<div className="pl-4 flex-grow overflow-hidden">
					<h3
						className="text-lg text-blue-600 font-bold mb-1 break-words hover:underline cursor-pointer"
						onClick={(e) => {
							e.stopPropagation(); // Prevent expandable click
							navigateToSection(section);
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
			<div className="w-full">
				<AnimatePresence>
					{isExpanded && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="w-full overflow-hidden mb-2"
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

							{/* Direct content will be implemented later */}

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

									{/* Toggle button for expanded TOC */}
									{/* {childSections.length > 0 && (
										<button
											onClick={(e) => {
												e.stopPropagation(); // Prevent triggering the card's onClick
												setShowFullTOC(!showFullTOC);
											}}
											className="text-blue-500 text-xs hover:text-blue-700 flex items-center mt-1"
										>
											{showFullTOC ? (
												<>
													<span className="mr-1">
														▲
													</span>{" "}
													Hide detailed contents
												</>
											) : (
												<>
													<span className="mr-1">
														▼
													</span>{" "}
													Show detailed contents
												</>
											)}
										</button>
									)} */}

									{/* Expanded Table of Contents (conditional) */}
									{/* <ExpandableTableOfContents
										sections={childSections}
										onNavigate={navigateToChildSection}
										isVisible={showFullTOC}
									/> */}
								</div>
							)}
						</motion.div>
					)}
				</AnimatePresence>

				{/* Button controls */}
				<div className="flex justify-end items-center w-full pb-4 pt-6 gap-2">
					<AnimatePresence>
						{isExpanded &&
							hasChildSections &&
							childSections.length > 0 && (
								<motion.button
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.2 }}
									onClick={(e) => {
										e.stopPropagation();
										setShowSubsections(!showSubsections);
									}}
									className="flex-shrink-0 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs mr-auto"
								>
									{showSubsections ? "Hide" : "Show"}{" "}
									{childSections.length} Subsection
									{childSections.length !== 1 ? "s" : ""}
								</motion.button>
							)}
					</AnimatePresence>
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
		</motion.div>
  );
}
