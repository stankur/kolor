"use client";

import { AnimatePresence, motion } from "framer-motion";

export const CATEGORIES = [
	"Starting Up",
	"Running a Company",
	"Money & Growth",
	"Programming & Tech",
	"Big Ideas",
	"Life & Career",
	"Success Stories",
	"Silicon Valley Culture",
];

export const CATEGORY_DESCRIPTIONS = [
	"The foundational phase of creating a company - from conception to early traction",
	"Day-to-day operations and challenges of scaling an established startup",
	"Financial aspects of startups and strategies for rapid expansion",
	"Technical aspects of building software and technology decisions",
	"Broad societal, economic, and philosophical topics that extend beyond startups",
	"Personal development, decision-making frameworks, and individual life choices",
	"Analysis of specific companies, founders, and successful outcomes with lessons learned",
	"The unique ecosystem, norms, and cultural aspects of the tech industry hub",
];

interface CategoryTabsProps {
	selectedCategory: string | null;
	onSelectCategory: (category: string | null) => void;
	categoryItems: number;
}

export function CategoryTabs({
	selectedCategory,
	onSelectCategory,
	categoryItems,
}: CategoryTabsProps) {
	return (
		<div className="flex flex-col items-center w-full mb-14">
			<div className="flex flex-wrap gap-2 justify-center mb-8 px-4 max-w-full overflow-x-auto">
				{/* "All" tab */}
				<motion.button
					onClick={() => onSelectCategory(null)}
					className={`px-3 py-1 rounded-md text-sm ${
						selectedCategory === null
							? "text-gray-600 font-medium"
							: "text-gray-500 hover:text-gray-600"
					}`}
					whileTap={{ scale: 0.95 }}
				>
					All
				</motion.button>

				{/* Category tabs */}
				{CATEGORIES.map((category) => (
					<motion.button
						key={category}
						onClick={() => onSelectCategory(category)}
						className={`px-3 py-1 rounded-md text-sm ${
							selectedCategory === category
								? "text-blue-600 font-medium"
								: "text-gray-500 hover:text-gray-600"
						}`}
						whileTap={{ scale: 0.95 }}
					>
						{(() => {
							if (category === "Money & Growth") {
								return "Growth";
							}

							if (category === "Programming & Tech") {
								return "Programming";
							}

							return category;
						})()}
					</motion.button>
				))}
			</div>

			<AnimatePresence mode="wait">
				{selectedCategory && (
					<motion.div
						key={selectedCategory}
						className="max-w-xl mx-auto px-6 py-2 flex flex-col gap-6"
						initial={{ opacity: 0, y: 5 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 5 }}
						transition={{ duration: 0.2 }}
					>
						<p className="text-gray-600 italic text-sm text-center leading-relaxed">
							{
								CATEGORY_DESCRIPTIONS[
									CATEGORIES.indexOf(selectedCategory)
								]
							}
							{" -"}&nbsp;{categoryItems}&nbsp;essays
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
