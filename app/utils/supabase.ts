import { createClient } from "@supabase/supabase-js";

// These environment variables would typically be set in your project
// For production, use proper environment variable configuration
const supabaseUrl =
	process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co";
const supabaseKey =
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key";

// Create a single supabase client for the entire application
export const supabase = createClient(supabaseUrl, supabaseKey);

// Interface definitions based on your specifications
export interface Section {
	heading: string[];
	children: (SectionContainer | string)[];
	summary: string[];
	longSummary: string[];
	initial?: string;
	imageUrl?: string;
	parentSection?: Section;
	url?: string; // Added for PG essays
	categories?: string[]; // Added for category filtering
	recommendations?: Recommendation[];
}

export interface Recommendation {
	personName: string;
	company: string;
	squareImage: string;
	source: string;
}

export type SectionContainer = Section[];

export interface Document {
	title: string[];
	summary: string[];
	longSummary: string[];
	children: SectionContainer;
    recommendations?: Recommendation[]; // Added for recommendations
}

export interface PGEssay {
    title: string[];
    summary: string[];
    longSummary: string[];
    url: string;
    imageUrl: string;
    categories?: string[];
    recommendations?: Recommendation[];
}

export type PGProject = PGEssay[];

// Example: Fetch document by title
export async function fetchDocumentByTitle(
	title: string
): Promise<Document | null> {
	try {
		const { data, error } = await supabase
			.from("documents")
			.select("document")
			.eq("title", title)
			.single();

		if (error) throw error;

		// If we got essays data (PGProject)
		if (title === "essays") {
			const essays = data?.document as PGProject;

			// Convert PGProject to Document format
			const document: Document = {
				title: ["Paul Graham Essays"],
				summary: [],
				longSummary: [],
				children: essays.map(essay => ({
					heading: essay.title,
					summary: essay.summary,
					longSummary: essay.longSummary,
					imageUrl: essay.imageUrl,
					url: essay.url,
					categories: essay.categories,
					children: [], // No subsections
                    recommendations: essay.recommendations, // No recommendations for essays
				})).toReversed(),
			};

			return document;
		}

		return data?.document as Document;
	} catch (error) {
		console.error("Error fetching document:", error);
		return null;
	}
}
