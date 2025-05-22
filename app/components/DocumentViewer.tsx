"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
// import { FullContentView } from "./FullContentView";
import { Document, Section, fetchDocumentByTitle } from "../utils/supabase";
// import { getMockDocument } from "../utils/supabase";
import { SectionCard } from "./SectionCard";
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
	const [activePath, setActivePath] = useState<BreadcrumbItem[]>([]);
	const [currentSections, setCurrentSections] = useState<Section[]>([]);
	const [compactMode, setCompactMode] = useState(false);

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Load the document and handle URL-based navigation
	useEffect(() => {
		const fetchDocument = async () => {
            setLoading(true)
			const doc = await fetchDocumentByTitle(documentTitle);
			// const doc = getMockDocument();

			if (doc) {
				setDocument(doc);
                setLoading(false)

				// Initialize breadcrumb with home and document title
				const initialPath = [
					{ id: "home", label: "Home" },
					{ id: "document", label: doc.title.join(" ") },
				];

				// Check if there's a section parameter in the URL
				const sectionPath = searchParams.get("section");
				if (sectionPath) {
					// Parse the section path from the URL
					const sectionIds = sectionPath.split("/");

					// Recursively find sections based on IDs in the path
					let currentSectionList = doc.children;
					const newPath = [...initialPath];

					for (const sectionId of sectionIds) {
						// Find the section that matches this ID
						const matchedSection = currentSectionList.find(
							(s: Section) => {
								const id = s.heading
									.join("-")
									.toLowerCase()
									.replace(/[^a-z0-9-]/g, "-");
								return id === sectionId;
							}
						);

						if (matchedSection) {
							// Add this section to the path
							newPath.push({
								id: sectionId,
								label: processTextArray(matchedSection.heading),
								// section: matchedSection,
							});

							// Update current sections to this section's children
							if (
								Array.isArray(matchedSection.children) &&
								matchedSection.children.length > 0 &&
								matchedSection.children.some((child) =>
									Array.isArray(child)
								)
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
		};

		fetchDocument();
	}, [documentTitle, searchParams]);

	// Handle navigation through sections
	const navigateToSection = (section: Section) => {
		// Check if section has a URL - if so, it's a PG essay
		if (section.url) {
			// Open the URL in a new tab
			window.open(section.url, "_blank");
			return;
		}

		// No parent section, proceed as before
		const newPath = [
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
		const sectionPath = newPath
			.slice(2)
			.map((item) => item.id)
			.join("/");
		const newUrl = new URLSearchParams(searchParams);
		newUrl.set("section", sectionPath);
		router.push(`${pathname}?${newUrl.toString()}`);
	};


	const [loading, setLoading] = useState(true);

	// Show loading state while fetching document
	if (loading) {
		return <div className="p-8 text-center">Loading document...</div>;
	}

	if (!document) {
		return <div className="p-8 text-center">Document not found</div>;
	}

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-4xl mx-auto">
				{/* Document header - only shown at the document level */}
				{activePath.length === 2 && (
					<motion.div
						key="document-header"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						layout
					>
						<motion.h1
							className="text-3xl font-bold mb-6 text-gray-800 text-center"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.1, duration: 0.3 }}
							layout
						>
							{processTextArray(document.title)}
						</motion.h1>

						{/* Display toggle - centered below title */}
						<div className="flex justify-center mb-8">
							<motion.button
								onClick={() => setCompactMode(!compactMode)}
								className={`flex-shrink-0 w-28 h-8 rounded-full flex items-center justify-center ${
									compactMode
										? 'bg-blue-600 text-white'
										: 'bg-blue-50 hover:bg-blue-100 text-blue-700'
								}`}
								whileTap={{ scale: 0.95 }}
								layout
								transition={{
									type: "spring",
									stiffness: 500,
									damping: 30
								}}
							>
								Compact
							</motion.button>
						</div>

					</motion.div>
				)}

				{/* Section header - shown when viewing a specific section */}
				{activePath.length > 2 && (
					<motion.div
						key={`section-header-${
							activePath[activePath.length - 1].id
						}`}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className="section-header"
						id="section-header-container"
						layout
					>
						<motion.h1
							className="text-2xl font-bold text-gray-800 mb-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.1, duration: 0.3 }}
							layout
						>
							{activePath[activePath.length - 1].label}
						</motion.h1>

						{/* {activePath[activePath.length - 1].section?.summary &&
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
 */}
						<div className="mt-12 mb-6"></div>
					</motion.div>
				)}

				{/* Section cards */}
				{/* Content Display */}
				{!false ? (
					<motion.div
						key={`section-cards-${activePath
							.map((p) => p.id)
							.join("-")}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.3 }}
						className="divide-y divide-gray-200"
						layout
					>
						{currentSections.map((section, index) => (
							<SectionCard
								key={section.heading.join("")}
								section={section}
								navigateToSection={navigateToSection}
								animationDelay={index * 0.05}
								compactMode={compactMode}
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
						{/* {activePath.length === 2 && document ? (
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
						)} */}
					</motion.div>
				)}

				{/* Show "no contents" message if no sections exist */}
				{currentSections.length === 0 && activePath.length > 2 && (
					<p className="text-center text-gray-500 my-8">
						This section has no subsections.
					</p>
				)}
			</div>
		</div>
	);
}
