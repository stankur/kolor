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
	imageUrl?: string;
    parentSection?: Section;
}

export type SectionContainer = Section[];

export interface Document {
	title: string[];
	summary: string[];
	longSummary: string[];
	children: SectionContainer;
}

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
		return data?.document as Document;
	} catch (error) {
		console.error("Error fetching document:", error);
		return null;
	}
}

