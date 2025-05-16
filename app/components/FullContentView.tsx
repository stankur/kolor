// "use client";

// import React from 'react';
// import { motion } from 'framer-motion';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import { Section } from '../utils/supabase';
// import { processTextArray } from '../utils/formatText';
// // import Image from 'next/image';

// interface FullContentViewProps {
//   section: Section;
//   depth?: number;
//   showTitle?: boolean;
// }

// export function FullContentView({ section, depth = 0, showTitle = false }: FullContentViewProps) {
//   // Generate heading based on depth - only used if showTitle is true
//   const HeadingTag = `h${Math.min(depth + 1, 6)}` as keyof JSX.IntrinsicElements;
  
//   return (
//     <div className="full-content-view mb-8">
//       {/* Section heading - only shown if showTitle is true or for child sections */}
//       {(showTitle || depth > 0) && (
//         <motion.div
//           className="mb-6 mt-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3, delay: depth * 0.1 }}
//         >
//           <HeadingTag className={`font-bold text-gray-900 ${
//             depth === 0 ? 'text-3xl mb-4' : 
//             depth === 1 ? 'text-2xl mb-3' : 
//             'text-xl mb-2'
//           }`}>
//             {processTextArray(section.heading)}
//           </HeadingTag>
//         </motion.div>
//       )}
      
//       {/* Section content - render direct content if it exists */}
//       {Array.isArray(section.children) && section.children.some(child => typeof child === 'string') && (
//         <motion.div 
//           className="prose prose-lg max-w-none mb-8 text-gray-800 space-y-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3, delay: depth * 0.1 + 0.1 }}
//         >
//           {section.children
//             .filter(child => typeof child === 'string' && (child as string).trim().length > 0)
//             .map((content, idx) => {
//               // Make sure we never pass an empty string to ReactMarkdown
//               const markdownContent = (content as string).trim();
//               if (!markdownContent) return null;
              
//               return (
//                 <ReactMarkdown 
//                   key={idx} 
//                   remarkPlugins={[remarkGfm]}
//                   components={{
//                     // Custom handler for images to prevent empty src errors
//                     img: ({ node, ...props }) => {
//                       // Skip rendering images with empty src
//                       if (!props.src || props.src === '') {
//                         return null;
//                       }
                      
//                       // Return regular img with non-empty src
//                       return (
//                         <img
//                           alt={props.alt || ''}
//                           {...props}
//                           className="max-w-full h-auto my-6 rounded shadow-md"
//                         />
//                       );
//                     },
//                     // Enhance paragraph styling
//                     p: ({children}) => (
//                       <p className="my-4 leading-relaxed">{children}</p>
//                     ),
//                     // Enhance heading styling
//                     h1: ({children}) => (
//                       <h1 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
//                     ),
//                     h2: ({children}) => (
//                       <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h2>
//                     ),
//                     h3: ({children}) => (
//                       <h3 className="text-lg font-bold text-gray-900 mt-5 mb-2">{children}</h3>
//                     )
//                   }}
//                 >
//                   {markdownContent}
//                 </ReactMarkdown>
//               );
//             })}
//         </motion.div>
//       )}
      
//       {/* Render child sections recursively - ALWAYS show child sections */}
//       {Array.isArray(section.children) && section.children.some(child => typeof child !== 'string') && (
//         <div className={depth === 0 ? "mt-8" : "pl-6 border-l-2 border-blue-100 mt-8 mb-8 pb-2"}>
//           {section.children
//             .filter(child => typeof child !== 'string')
//             .map((childSection, index) => (
//               <FullContentView 
//                 key={`${processTextArray(childSection.heading)}-${index}`} 
//                 section={childSection as Section} 
//                 depth={depth + 1}
//                 showTitle={true} // ALWAYS show titles for subsections
//               />
//             ))}
//         </div>
//       )}
//     </div>
//   );
// }
