import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../utils/supabase";
// import { ExpandableTableOfContents } from './ExpandableTableOfContents';
import Image from "next/image";
import { processTextArray } from "../utils/formatText";

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
	compactMode = false,
}: SectionCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState(false);

	// Check if this section is bookmarked in localStorage
	useEffect(() => {
		const checkBookmarkStatus = () => {
			if (typeof window !== "undefined") {
				// Get existing bookmarks from localStorage
				const bookmarksString = localStorage.getItem("bookmarks");
				if (bookmarksString) {
					try {
						const bookmarks: { id: string }[] =
							JSON.parse(bookmarksString);
						// Create a unique ID for this section based on its heading
						const sectionId = section.heading
							.join("-")
							.toLowerCase()
							.replace(/[^a-z0-9-]/g, "-");
						// Check if this section is in the bookmarks
						setIsBookmarked(
							bookmarks.some(
								(bookmark: { id: string }) =>
									bookmark.id === sectionId
							)
						);
					} catch (error) {
						console.error(
							"Error parsing bookmarks from localStorage:",
							error
						);
					}
				}
			}
		};

		checkBookmarkStatus();
	}, [section]);

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
						className="text-lg text-gray-600 font-bold mb-1 break-words hover:underline cursor-pointer"
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
									<div className="flex flex-col space-y-5 mt-6 mb-2">
										{section.longSummary.map(
											(paragraph, i) => (
												<p
													key={i}
													className="text-gray-600 break-words"
												>
													{paragraph}
												</p>
											)
										)}
									</div>
								)}

							{/* Subsections */}
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
						{/* Bookmark button */}
						<button
							onClick={(e) => {
								e.stopPropagation(); // In case of event bubbling

								// Toggle bookmark status
								const newBookmarkStatus = !isBookmarked;
								setIsBookmarked(newBookmarkStatus);

								// Create a unique ID for this section
								const sectionId = section.heading
									.join("-")
									.toLowerCase()
									.replace(/[^a-z0-9-]/g, "-");

								// Get existing bookmarks from localStorage
								const bookmarksString =
									localStorage.getItem("bookmarks") || "[]";
								let bookmarks = [];

								try {
									bookmarks = JSON.parse(bookmarksString);

									if (newBookmarkStatus) {
										// Add to bookmarks if not already there
										if (
											!bookmarks.some(
												(bookmark: { id: string }) =>
													bookmark.id === sectionId
											)
										) {
											bookmarks.push({
												id: sectionId,
												heading: section.heading,
												summary: section.summary,
												longSummary:
													section.longSummary,
												imageUrl: section.imageUrl,
												url: section.url,
												categories: section.categories,
											});
										}
									} else {
										// Remove from bookmarks
										bookmarks = bookmarks.filter(
											(bookmark: { id: string }) =>
												bookmark.id !== sectionId
										);
									}

									// Save back to localStorage
									localStorage.setItem(
										"bookmarks",
										JSON.stringify(bookmarks)
									);
								} catch (error) {
									console.error(
										"Error updating bookmarks in localStorage:",
										error
									);
								}
							}}
							className="flex-shrink-0  hover:bg-blue-100 text-gray-400 w-8 h-8 rounded-full flex items-center justify-center"
							aria-label={
								isBookmarked
									? "Remove from bookmarks"
									: "Add to bookmarks"
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill={isBookmarked ? "currentColor" : "none"}
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
							</svg>
						</button>

						{/* Expand/collapse button */}
						<button
							onClick={(e) => {
								e.stopPropagation(); // In case of event bubbling
								setIsExpanded(!isExpanded);
								// Reset subsections when collapsing
							}}
							className="flex-shrink-0  hover:bg-blue-100 text-gray-400 w-8 h-8 rounded-full flex items-center justify-center"
						>
							{isExpanded ? "−" : "+"}
						</button>
					</div>
				</div>
			</AnimatePresence>
		</motion.div>
	);
}
