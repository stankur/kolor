// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface DocumentSummaryProps {
//   content: string[];
//   onViewOriginal?: () => void;
//   isSimpleView?: boolean;
// }

// export function DocumentSummary({ content }: DocumentSummaryProps) {
//   const [isExpanded, setIsExpanded] = useState(false);
  
//   if (!content || content.length === 0) return null;
  
//   return (
// 		<div
// 			className={`mb-24 ${
// 				isExpanded
// 					? "bg-white rounded-lg shadow-md border border-gray-200 p-4"
// 					: ""
// 			}`}
// 		>
// 			<AnimatePresence initial={false}>
// 				{isExpanded && (
// 					<motion.div
// 						key="expanded"
// 						initial={{ opacity: 0, height: 0 }}
// 						animate={{ opacity: 1, height: "auto" }}
// 						exit={{ opacity: 0, height: 0 }}
// 						className="text-gray-700 mb-2"
// 					>
// 						{content.map((paragraph) => (
// 							<p key={paragraph} className="mb-2">
// 								{paragraph}
// 							</p>
// 						))}
// 					</motion.div>
// 				)}
// 			</AnimatePresence>

// 			{/* <div className="flex justify-end gap-3 mt-2">
// 				<button
// 					onClick={() => setIsExpanded(!isExpanded)}
// 					className="flex items-center gap-2 h-8 flex-shrink-0 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm whitespace-nowrap"
// 				>
// 					<span>{isExpanded ? "Hide" : "Longer"}</span>
// 				</button>

// 				{onViewOriginal && (
// 					<button
// 						onClick={onViewOriginal}
// 						className="flex items-center h-8 gap-2 flex-shrink-0 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm whitespace-nowrap"
// 					>
// 						<span>{isSimpleView ? 'Simple' : 'Original'}</span>
// 					</button>
// 				)}
// 			</div> */}
// 		</div>
//   );
// }
