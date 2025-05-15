"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FullContentView } from "./FullContentView";
import {
	Document,
	Section,
	getMockDocument,
} from "../utils/supabase";
import { Breadcrumb } from "./Breadcrumb";
import { SectionCard } from "./SectionCard";
import { DocumentSummary } from "./DocumentSummary";
import { processTextArray } from "../utils/formatText";

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
	const [showFullContent, setShowFullContent] = useState(false);
	
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Load the document and handle URL-based navigation
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
				const initialPath = [
					{ id: "home", label: "Home" },
					{ id: "document", label: doc.title.join(" ") },
				];

				// Check if there's a section parameter in the URL
				const sectionPath = searchParams.get('section');
				if (sectionPath) {
					// Parse the section path from the URL
					const sectionIds = sectionPath.split('/');
					
					// Recursively find sections based on IDs in the path
					let currentSectionList = doc.children;
					let newPath = [...initialPath];
					
					for (const sectionId of sectionIds) {
						// Find the section that matches this ID
						const matchedSection = currentSectionList.find((s: Section) => {
							const id = s.heading
								.join("-")
								.toLowerCase()
								.replace(/[^a-z0-9-]/g, "-");
							return id === sectionId;
						});
						
						if (matchedSection) {
							// Add this section to the path
							newPath.push({
								id: sectionId,
								label: processTextArray(matchedSection.heading),
								section: matchedSection,
							});
							
							// Update current sections to this section's children
							if (
								Array.isArray(matchedSection.children) &&
								matchedSection.children.length > 0 &&
								matchedSection.children.some((child) => Array.isArray(child))
							) {
								currentSectionList = matchedSection.children
									.filter((child) => Array.isArray(child))
									.flat();
							} else {
								currentSectionList = [];
							}
						} else {
							// If section not found, stop processing
							break;
						}
					}
					
					// Set the final path and sections
					setActivePath(newPath);
					setCurrentSections(currentSectionList);
				} else {
					// No section parameter, show top-level view
					setActivePath(initialPath);
					setCurrentSections(doc.children);
				}
			}

			setLoading(false);
		};

		fetchDocument();
	}, [documentTitle, searchParams]);

	// Handle navigation through sections
	const navigateToSection = (section: Section) => {
		// Check if this section has parent information (added by SectionCard)
		const parentSection = (section as any).parentSection;
		
		// Build the path differently based on whether we have parent information
		let newPath;
		
		if (parentSection) {
			// Find parent section in the current path if it exists
			const parentIndex = activePath.findIndex(item => 
				item.section && 
				item.section.heading.join('') === parentSection.heading.join('')
			);
			
			if (parentIndex !== -1) {
				// Parent exists in path, add this section after the parent
				newPath = [...activePath.slice(0, parentIndex + 1), {
					id: section.heading
						.join("-")
						.toLowerCase()
						.replace(/[^a-z0-9-]/g, "-"),
					label: processTextArray(section.heading),
					section: { ...section, parentSection: undefined }, // Remove circular reference
				}];
			} else {
				// Parent not in path (rare case), build path with parent + this section
				newPath = [
					...activePath,
					{
						id: parentSection.heading
							.join("-")
							.toLowerCase()
							.replace(/[^a-z0-9-]/g, "-"),
						label: processTextArray(parentSection.heading),
						section: parentSection,
					},
					{
						id: section.heading
							.join("-")
							.toLowerCase()
							.replace(/[^a-z0-9-]/g, "-"),
						label: processTextArray(section.heading),
						section: { ...section, parentSection: undefined }, // Remove circular reference
					},
				];
			}
		} else {
			// No parent section, proceed as before
			newPath = [
				...activePath,
				{
					id: section.heading
						.join("-")
						.toLowerCase()
						.replace(/[^a-z0-9-]/g, "-"),
					label: processTextArray(section.heading),
					section,
				},
			];
		}

		setActivePath(newPath);

		// If this section has child sections, set them as current
		if (
			Array.isArray(section.children) &&
			section.children.length > 0 &&
			section.children.some((child) => Array.isArray(child))
		) {
			setCurrentSections(
				section.children.filter((child) => Array.isArray(child)).flat()
			);
		} else {
			setCurrentSections([]);
		}

		// Update the URL with the section path
		const sectionPath = newPath.slice(2).map(item => item.id).join('/');
		const newUrl = new URLSearchParams(searchParams);
		newUrl.set('section', sectionPath);
		router.push(`${pathname}?${newUrl.toString()}`);
	};

	// Handle breadcrumb navigation
	const handleBreadcrumbNavigation = (index: number) => {
		if (index === 0) {
			// Home navigation - redirect to home page
			router.push('/');
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
			
			// Clear the section parameter from URL
			const newUrl = new URLSearchParams(searchParams);
			newUrl.delete('section');
			router.push(`${pathname}?${newUrl.toString()}`);
		} else if (index > 1) {
			// Section level - show its children if any
			const section = newPath[index].section;
			if (
				section &&
				Array.isArray(section.children) &&
				section.children.length > 0 &&
				typeof section.children[0] !== "string"
			) {
				setCurrentSections(
					section.children
						.filter((child) => Array.isArray(child))
						.flat()
				);
			} else {
				setCurrentSections([]);
			}
			
			// Update the URL with the section path
			const sectionPath = newPath.slice(2).map(item => item.id).join('/');
			const newUrl = new URLSearchParams(searchParams);
			newUrl.set('section', sectionPath);
			router.push(`${pathname}?${newUrl.toString()}`);
		}
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
						<motion.div
							key="document-header"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							<motion.h1 
								className="text-3xl font-bold mb-4 text-gray-800"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.1, duration: 0.3 }}
							>
								{processTextArray(document.title)}
							</motion.h1>

							{document.summary && document.summary.length > 0 && (
								<motion.p 
									className="text-gray-600 mb-4"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.2, duration: 0.3 }}
								>
									{document.summary.join(" ")}
								</motion.p>
							)}

							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3, duration: 0.3 }}
							>
								<DocumentSummary
									content={document.longSummary}
									onViewOriginal={() => setShowFullContent(!showFullContent)}
									isSimpleView={showFullContent}
								/>
							</motion.div>

							{/* Bigger gap between main content and section cards */}
							<div className="mt-12 mb-6"></div>
						</motion.div>
					)}

				{/* Section header - shown when viewing a specific section */}
					{activePath.length > 2 && (
						<motion.div
							key={`section-header-${activePath[activePath.length - 1].id}`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							<motion.h1 
								className="text-2xl font-bold text-gray-800 mb-4"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.1, duration: 0.3 }}
							>
								{activePath[activePath.length - 1].label}
							</motion.h1>

							{activePath[activePath.length - 1].section?.summary &&
								(
									activePath[activePath.length - 1]
										.section as Section
								).summary.length > 0 && (
									<motion.p 
										className="text-gray-600 mb-4"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.2, duration: 0.3 }}
									>
										{
											(
												activePath[activePath.length - 1]
													.section as Section
											).summary
										}
									</motion.p>
								)}

							{activePath[activePath.length - 1].section
								?.longSummary &&
								(
									activePath[activePath.length - 1]
										.section as Section
								).longSummary.length > 0 && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.3, duration: 0.3 }}
									>
										<DocumentSummary
											content={
												(
													activePath[activePath.length - 1]
														.section as Section
												).longSummary
											}
											onViewOriginal={() => setShowFullContent(!showFullContent)}
											isSimpleView={showFullContent}
										/>
									</motion.div>
								)}

							{/* Direct content will be implemented later */}

							{/* Bigger gap between section content and subsection cards */}
							<div className="mt-12 mb-6"></div>
						</motion.div>
					)}

				{/* Section cards */}
				{/* Content Display */}
				{!showFullContent ? (
					<motion.div
						key={`section-cards-${activePath.map(p => p.id).join('-')}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.3 }}
					>
						{currentSections.map((section, index) => (
							<SectionCard
								key={section.heading.join("")}
								section={section}
								navigateToSection={navigateToSection}
								animationDelay={index * 0.05}
							/>
						))}
					</motion.div>
				) : (
					<motion.div
						key="full-content-view"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
						className="prose prose-lg max-w-none"
					>
						{activePath.length === 2 && document ? (
							<FullContentView 
								section={document as unknown as Section}
								showTitle={false}
							/>
						) : activePath.length > 2 && activePath[activePath.length - 1].section ? (
							<FullContentView 
								section={activePath[activePath.length - 1].section as Section}
								showTitle={false}
							/>
						) : (
							<p>No content available</p>
						)}
					</motion.div>
				)}

				{/* Show "no contents" message if no sections exist */}
				{!showFullContent && currentSections.length === 0 && activePath.length > 2 && (
					<p className="text-center text-gray-500 my-8">
						This section has no subsections.
					</p>
				)}
			</div>
		</div>
	);
}
