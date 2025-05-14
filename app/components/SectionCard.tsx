import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '../utils/supabase';
import { SectionPills } from './SectionPills';
import { ExpandableTableOfContents } from './ExpandableTableOfContents';
import Image from 'next/image';
import { processTextArray } from '../utils/formatText';

interface SectionCardProps {
  section: Section;
  navigateToSection: (section: Section) => void;
}

export function SectionCard({ section, navigateToSection }: SectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFullTOC, setShowFullTOC] = useState(false);

  const hasChildSections = Array.isArray(section.children) &&
                          section.children.length > 0 &&
                          typeof section.children[0] !== 'string';

  const childSections = hasChildSections ? section.children as Section[] : [];

  return (
		<motion.div
			layout
			className={`w-full overflow-hidden mb-6 group ${
				isExpanded
					? "bg-white rounded-lg shadow-md border border-gray-200"
					: ""
			}`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			{/* Top section with image, title, and short summary */}
			<div
				className={`flex w-full ${isExpanded ? "p-4 pb-2" : ""}`}
				onClick={() => setIsExpanded(!isExpanded)}
				style={{ cursor: "pointer" }}
			>
				{/* Image container */}
				<div
					className={`bg-gray-200 w-24 h-24 flex items-center justify-center flex-shrink-0 ${
						isExpanded ? "rounded-md" : ""
					}`}
				>
					{section.imageUrl ? (
						<Image
							src={section.imageUrl}
							alt={processTextArray(section.heading)}
							width={96}
							height={96}
							className={`object-cover w-full h-full saturate-75 ${
								isExpanded ? "rounded-md" : ""
							}`}
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
			<div className={`w-full ${isExpanded ? "px-4 pb-4" : ""}`}>
				<AnimatePresence>
					{isExpanded && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="w-full overflow-hidden mb-4"
						>
							{section.longSummary &&
								section.longSummary.length > 0 && (
									<p className="text-gray-700 mt-2 mb-3 break-words">
										{section.longSummary.join(" ")}
									</p>
								)}

							{/* Direct content will be implemented later */}

							{/* Horizontal scrolling section pills */}
							{hasChildSections && childSections.length > 0 && (
								<div className="w-full">
									{/* <SectionPills
										sections={childSections}
										onNavigate={navigateToSection}
									/> */}

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
									<ExpandableTableOfContents
										sections={childSections}
										onNavigate={navigateToSection}
										isVisible={showFullTOC}
									/>
								</div>
							)}
						</motion.div>
					)}
				</AnimatePresence>

				{/* Button controls */}
				<div
					className={`flex justify-end w-full ${
						isExpanded ? "" : "pb-4"
					}`}
				>
					<button
						onClick={(e) => {
							e.stopPropagation(); // In case of event bubbling
							setIsExpanded(!isExpanded);
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
