"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
// import { FullContentView } from "./FullContentView";
import { Document, Section, fetchDocumentByTitle } from "../utils/supabase";
// import { getMockDocument } from "../utils/supabase";
import { SectionCard } from "./SectionCard";
import { CategoryTabs } from "./CategoryTabs";
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
	const [filteredSections, setFilteredSections] = useState<Section[]>([]);
	const [compactMode, setCompactMode] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

	// Filter sections based on selected category
	useEffect(() => {
		if (currentSections.length > 0) {
			if (selectedCategory === null) {
				// Show all sections when no category is selected
				setFilteredSections(currentSections);
			} else {
				// Filter sections that have the selected category
				setFilteredSections(
					currentSections.filter(section => 
						section.categories?.includes(selectedCategory)
					)
				);
			}
		} else {
            setFilteredSections([]);
        }
	}, [currentSections, selectedCategory]);

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

	// State for drawer
	const [drawerOpen, setDrawerOpen] = useState(false);

	// Toggle drawer function
	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen);
	};

	// Show loading state while fetching document
	if (loading) {
		return <div className="p-8 text-center">Loading document...</div>;
	}

	if (!document) {
		return <div className="p-8 text-center">Document not found</div>;
	}

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-4xl mx-auto relative">
				{/* Simple menu icon in top right */}
				<div className="flex justify-end mb-8">
					<button
						onClick={toggleDrawer}
						className="text-gray-500 hover:text-gray-700 transition-colors"
						aria-label="Menu"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<line x1="3" y1="12" x2="21" y2="12"></line>
							<line x1="3" y1="6" x2="21" y2="6"></line>
							<line x1="3" y1="18" x2="21" y2="18"></line>
						</svg>
					</button>
				</div>

				{/* Side drawer */}
				<AnimatePresence>
					{drawerOpen && (
						<>
							{/* Overlay */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 0.3 }}
								exit={{ opacity: 0 }}
								className="fixed inset-0 bg-black z-20"
								onClick={toggleDrawer}
							/>

							{/* Drawer */}
							<motion.div
								initial={{ x: "100%" }}
								animate={{ x: 0 }}
								exit={{ x: "100%" }}
								transition={{ type: "spring", stiffness: 300, damping: 30 }}
								className="fixed right-0 top-0 h-full w-64 bg-white z-30 p-4 shadow-lg"
							>
								<div className="flex justify-between items-center mb-6">
									<h3 className="text-lg font-medium">Settings</h3>
									<button
										onClick={toggleDrawer}
										className="text-gray-400 hover:text-gray-600"
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<line x1="18" y1="6" x2="6" y2="18"></line>
											<line x1="6" y1="6" x2="18" y2="18"></line>
										</svg>
									</button>
								</div>

								<div className="py-2">
									<div className="flex items-center justify-between py-3 border-b border-gray-100">
										<span className="text-sm text-gray-700">Compact Mode</span>
										<button
											onClick={() => setCompactMode(!compactMode)}
											className={`relative inline-flex items-center h-6 rounded-full w-11 ${compactMode ? 'bg-blue-600' : 'bg-gray-200'}`}
										>
											<span
												className={`inline-block w-4 h-4 transform transition bg-white rounded-full ${compactMode ? 'translate-x-6' : 'translate-x-1'}`}
											/>
										</button>
									</div>
								</div>
							</motion.div>
						</>
					)}
				</AnimatePresence>

				{/* Document header - only shown at the document level */}
				{activePath.length === 2 && (
					<motion.div
						key="document-header"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						layout={false}
					>
						<motion.h1
							className="text-3xl font-bold mb-14 text-gray-800 text-center"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.1, duration: 0.3 }}
							layout={false}
						>
							{processTextArray(document.title)}
						</motion.h1>
						{/* Category tabs */}
						<CategoryTabs
							selectedCategory={selectedCategory}
							onSelectCategory={setSelectedCategory}
						/>
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
						layout={false}
					>
						<motion.h1
							className="text-2xl font-bold text-gray-800 mb-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.1, duration: 0.3 }}
							layout={false}
						>
							{activePath[activePath.length - 1].label}
						</motion.h1>

						<div className="mt-12 mb-6"></div>
					</motion.div>
				)}

				{/* Section cards */}
				{/* Content Display */}
				{!false ? (
					<motion.div
						key={`section-cards-${activePath
							.map((p) => p.id)
							.join("-")}-${selectedCategory || "all"}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.3 }}
						className="divide-y divide-gray-200"
						layout={false}
					>
						{/* Use filteredSections instead of currentSections */}
						{filteredSections.map((section, index) => (
							<SectionCard
								key={`${section.heading.join("")}-${
									selectedCategory || "all"
								}-${index}`}
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
						layout={false}
					>
						{/* Full content view code removed for brevity */}
					</motion.div>
				)}

				{/* Show "no contents" message if no sections exist */}
				{filteredSections.length === 0 && activePath.length > 2 && (
					<p className="text-center text-gray-500 my-8">
						This section has no subsections.
					</p>
				)}

				{/* Show "no results" message when filtering returns no results */}
				{filteredSections.length === 0 &&
					currentSections.length > 0 &&
					selectedCategory !== null && (
						<p className="text-center text-gray-500 my-8">
							No essays found in the category.
						</p>
					)}
			</div>
		</div>
	);
}
