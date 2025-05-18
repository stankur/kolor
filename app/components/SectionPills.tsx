import { processTextArray } from "../utils/formatText";
import { Section } from "../utils/supabase";
import { motion } from "framer-motion";

interface SectionPillsProps {
	sections: Section[];
	onNavigate: (section: Section) => void;
	showSubsections?: boolean;
}

export function SectionPills({ sections, onNavigate, showSubsections = true }: SectionPillsProps) {
	// Only show the subsections if showSubsections is true
	if (!showSubsections) return null;

	return (
		<motion.div 
			initial={{ opacity: 0, height: 0 }}
			animate={{ opacity: 1, height: "auto" }}
			exit={{ opacity: 0, height: 0 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="mt-3 mb-2 w-full overflow-hidden"
		>
			<div className="space-y-4 mt-4">
				{sections.map((section, index) => (
					<motion.div 
						key={index}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.2, delay: index * 0.05 }}
						className="cursor-pointer"
					>
						<h4 
							className="text-blue-600 text-sm font-semibold hover:underline inline-block"
							onClick={(e) => {
								e.stopPropagation();
								onNavigate(section);
							}}
						>
							{processTextArray(section.heading)}
						</h4>
						{section.summary && section.summary.length > 0 && (
							<p className="text-gray-600 text-xs mt-0.5">
								{processTextArray(section.summary)}
							</p>
						)}
					</motion.div>
				))}
			</div>
		</motion.div>
	);
}
