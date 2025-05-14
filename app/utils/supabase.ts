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

// Mock data implementation for development
export function getMockDocument(): Document {
	// This is an example mock document that follows your structure
	const mockDocument: Document = {
		title: ["The Story of Everything"],
		summary: ["A journey from the Big Bang to consciousness"],
		longSummary: [
			"This comprehensive book takes you through the entire history of the universe, from the first moments after the Big Bang, through the formation of stars and planets, to the emergence of life and consciousness on Earth.",
		],
		children: [
			{
				heading: ["The Beginning of Time"],
				summary: [
					"How the universe came to be in its earliest moments.",
				],
				longSummary: [
					"This chapter explores the fascinating theories about the birth of our universe, from the Big Bang to inflation theory. We examine the evidence from cosmic background radiation and what it tells us about the universe's origins. The chapter also discusses how the fundamental forces of nature emerged in the first fractions of a second after creation.",
				],
				directContent: [],
				children: [
					{
						heading: ["The Big Bang Theory"],
						summary: [
							"Evidence and development of the Big Bang model.",
						],
						longSummary: [
							"The Big Bang theory is the prevailing cosmological model explaining the existence of the observable universe from the earliest known periods through its subsequent large-scale evolution. The model describes how the universe expanded from an initial state of high density and temperature, and offers a comprehensive explanation for a broad range of observed phenomena.",
						],
						directContent: [
							"The theory was initially proposed by Georges Lemaître in 1927.",
						],
						children: [
							{
								heading: ["Historical Development"],
								summary: [
									"How the Big Bang theory evolved over time.",
								],
								longSummary: [
									"The concept of the Big Bang has evolved significantly since it was first proposed, incorporating new observations and theoretical developments in physics.",
								],
								directContent: [
									"The term 'Big Bang' was coined by Fred Hoyle during a radio broadcast in 1949.",
								],
								children: [] as string[],
							},
							{
								heading: ["Observable Evidence"],
								summary: [
									"Key observations supporting the Big Bang theory.",
								],
								longSummary: [
									"Multiple lines of observational evidence support the Big Bang theory, including cosmic microwave background radiation, the abundance of light elements, and the redshift of distant galaxies.",
								],
								directContent: [
									"The cosmic microwave background radiation, discovered in 1965, is considered the strongest evidence for the Big Bang.",
								],
								children: [] as string[],
							},
						],
					},
					{
						heading: ["The First Three Minutes"],
						summary: [
							"What happened immediately after the Big Bang.",
						],
						longSummary: [
							"The first three minutes after the Big Bang were crucial for the development of the universe as we know it. During this brief period, the fundamental forces separated, quarks formed hadrons, and light elements began to form.",
						],
						directContent: [],
						children: [
							{
								heading: ["Planck Epoch"],
								summary: [
									"The earliest known period of the universe.",
								],
								longSummary: [
									"During the Planck epoch, from zero to approximately 10^-43 seconds after the Big Bang, all four fundamental forces were unified as a single force.",
								],
								directContent: [
									"This epoch is named after Max Planck, the founder of quantum theory.",
								],
								children: [] as string[],
							},
							{
								heading: ["Inflationary Period"],
								summary: [
									"The rapid expansion of the early universe.",
								],
								longSummary: [
									"The inflationary period was an extremely rapid expansion of the universe that occurred between 10^-36 to 10^-32 seconds after the Big Bang.",
								],
								directContent: [
									"Cosmic inflation explains why the universe appears flat and uniform at large scales.",
								],
								children: [] as string[],
							},
						],
					},
					{
						heading: ["Formation of Fundamental Forces"],
						summary: ["How the four fundamental forces separated."],
						longSummary: [
							"The four fundamental forces—gravity, electromagnetism, the strong nuclear force, and the weak nuclear force—were unified in the extreme heat of the early universe and separated as the universe cooled.",
						],
						directContent: [],
						children: [
							{
								heading: ["Symmetry Breaking"],
								summary: ["The process of force separation."],
								longSummary: [
									"Symmetry breaking is a phenomenon in which the universe transitions from a symmetric state to one with reduced symmetry, allowing the fundamental forces to separate.",
								],
								directContent: [
									"The concept of symmetry breaking in physics was developed by Yoichiro Nambu in the 1960s.",
								],
								children: [] as string[],
							},
							{
								heading: ["Electroweak Separation"],
								summary: [
									"The separation of electromagnetic and weak forces.",
								],
								longSummary: [
									"The electroweak interaction is the unified description of two of the four fundamental forces: electromagnetism and the weak interaction.",
								],
								directContent: [
									"The electroweak theory was developed by Sheldon Glashow, Abdus Salam, and Steven Weinberg, who shared the 1979 Nobel Prize in Physics for this work.",
								],
								children: [] as string[],
							},
						],
					},
				],
			},
			{
				heading: ["The Rise of Complexity"],
				summary: ["From simple atoms to the first complex molecules."],
				longSummary: [
					"Following the initial expansion and cooling of the universe, this chapter tracks how simple hydrogen and helium atoms formed, then clustered into stars where nuclear fusion created heavier elements. We explore stellar lifecycles and how supernovae scattered these elements across space, enabling the formation of planets and eventually complex organic molecules.",
				],
				directContent: [],
				children: [
					{
						heading: ["Element Formation in Stars"],
						summary: ["How fusion creates heavier elements."],
						longSummary: [
							"Stars act as cosmic factories, fusing lighter elements into heavier ones through nuclear fusion. This process, known as stellar nucleosynthesis, is responsible for creating most of the elements in the universe.",
						],
						directContent: [],
						children: [
							{
								heading: ["Hydrogen Fusion"],
								summary: [
									"The primary energy source in main sequence stars.",
								],
								longSummary: [
									"Hydrogen fusion is the process by which four hydrogen nuclei combine to form a helium nucleus, releasing energy that powers stars like our sun.",
								],
								directContent: [
									"The primary fusion path in our sun is called the proton-proton chain.",
								],
								children: [] as string[],
							},
							{
								heading: ["Helium Burning"],
								summary: ["The next stage of stellar fusion."],
								longSummary: [
									"When stars exhaust their hydrogen fuel, they begin to fuse helium into carbon and oxygen in a process called helium burning or the triple-alpha process.",
								],
								directContent: [
									"Helium burning typically occurs at temperatures around 100 million Kelvin.",
								],
								children: [] as string[],
							},
						],
					},
					{
						heading: ["Supernovae and Element Dispersal"],
						summary: ["How elements spread throughout galaxies."],
						longSummary: [
							"Supernovae are powerful explosions that mark the end of a star's life. These cosmic events distribute heavy elements throughout space, enriching the interstellar medium with the building blocks for new stars, planets, and eventually life.",
						],
						directContent: [],
						children: [
							{
								heading: ["Types of Supernovae"],
								summary: [
									"Different mechanisms for stellar explosions.",
								],
								longSummary: [
									"There are two main types of supernovae: Type Ia, which occur in binary star systems when a white dwarf accretes material from its companion; and Type II, which result from the collapse of massive stars.",
								],
								directContent: [
									"Type Ia supernovae are used as 'standard candles' to measure cosmic distances.",
								],
								children: [] as string[],
							},
							{
								heading: ["Heavy Element Creation"],
								summary: [
									"Formation of elements heavier than iron.",
								],
								longSummary: [
									"Elements heavier than iron cannot be produced through fusion in stellar cores because these reactions would consume rather than release energy. Instead, these elements form during supernovae through rapid neutron capture processes.",
								],
								directContent: [
									"Gold, platinum, and uranium are primarily created in neutron star mergers and supernovae.",
								],
								children: [] as string[],
							},
						],
					},
				],
			},
			{
				heading: ["The Emergence of Life"],
				summary: [
					"How chemistry transformed into biology on early Earth.",
				],
				longSummary: [
					"This chapter examines the conditions of early Earth and how they facilitated the transition from complex organic chemistry to self-replicating systems. We explore leading theories about the origin of life, from deep-sea hydrothermal vents to RNA world hypotheses, and how the first primitive cells may have developed their basic metabolic processes and protective membranes.",
				],
				directContent: [],
				children: [
					{
						heading: ["Prebiotic Chemistry"],
						summary: ["Chemical precursors to biological systems."],
						longSummary: [
							"Prebiotic chemistry refers to the chemical reactions that occurred on early Earth before the emergence of life, producing the organic compounds necessary for biological processes.",
						],
						directContent: [],
						children: [
							{
								heading: ["Miller-Urey Experiment"],
								summary: ["Simulating early Earth conditions."],
								longSummary: [
									"The Miller-Urey experiment, conducted in 1952, demonstrated that organic compounds including amino acids could be synthesized from simple inorganic precursors under conditions simulating early Earth's atmosphere.",
								],
								directContent: [
									"The experiment produced at least 11 of the 20 amino acids used in proteins by living organisms.",
								],
								children: [] as string[],
							},
							{
								heading: ["Formation of Amino Acids"],
								summary: ["Building blocks of proteins."],
								longSummary: [
									"Amino acids, the building blocks of proteins, could have formed on early Earth through various mechanisms, including atmospheric reactions, hydrothermal vents, and extraterrestrial delivery via meteorites.",
								],
								directContent: [
									"Amino acids have been found in meteorites, suggesting they may be common throughout the universe.",
								],
								children: [] as string[],
							},
						],
					},
					{
						heading: ["RNA World Hypothesis"],
						summary: [
							"RNA as the original self-replicating molecule.",
						],
						longSummary: [
							"The RNA world hypothesis suggests that before DNA and proteins, life was based on RNA molecules that could both store genetic information and catalyze chemical reactions.",
						],
						directContent: [],
						children: [
							{
								heading: ["RNA Catalysis"],
								summary: ["RNA molecules acting as enzymes."],
								longSummary: [
									"Ribozymes are RNA molecules that can catalyze chemical reactions, similar to protein enzymes. Their discovery supported the RNA world hypothesis by showing that RNA could have both carried genetic information and facilitated metabolism.",
								],
								directContent: [
									"The discovery of ribozymes by Thomas Cech and Sidney Altman earned them the Nobel Prize in Chemistry in 1989.",
								],
								children: [] as string[],
							},
							{
								heading: ["From RNA to DNA"],
								summary: ["The transition to modern genetics."],
								longSummary: [
									"The transition from an RNA-based world to the DNA-protein world we see today likely occurred gradually, with DNA evolving as a more stable storage medium for genetic information and proteins taking over most catalytic functions.",
								],
								directContent: [
									"DNA is more stable than RNA because its sugar component lacks an oxygen atom, making it less prone to degradation.",
								],
								children: [] as string[],
							},
						],
					},
					{
						heading: ["First Cell Membranes"],
						summary: [
							"Development of contained biological systems.",
						],
						longSummary: [
							"Cell membranes were crucial for the origin of life, providing enclosed environments where biochemical reactions could occur concentrated and protected from the external environment.",
						],
						directContent: [],
						children: [
							{
								heading: ["Lipid Formation"],
								summary: ["Self-assembling molecules."],
								longSummary: [
									"Lipids can spontaneously form bilayers in water due to their amphipathic nature, with hydrophilic heads facing the water and hydrophobic tails clustering together. This self-assembly property may have facilitated the formation of the first cell membranes.",
								],
								directContent: [
									"Simple lipids can form spontaneously under prebiotic conditions.",
								],
								children: [] as string[],
							},
							{
								heading: ["Protocells"],
								summary: ["Primitive cell-like structures."],
								longSummary: [
									"Protocells were simple membrane-bound compartments that preceded true cells, potentially providing environments where early metabolic reactions and replication could occur with some isolation from the external environment.",
								],
								directContent: [
									"Laboratory experiments have created protocells capable of growth and division.",
								],
								children: [] as string[],
							},
						],
					},
				],
			},
		],
	};

	const accelerateChapter1: Document = {
		title: ["CHAPTER 1", "ACCELERATE"],
		children: [
			{
				heading: ["FOCUS ON CAPABILITIES, NOT MATURITY"],
				children: [
					"Technology leaders need to deliver software quickly and reliably to win in the market. For many companies, this requires significant changes to the way we deliver software. The key to successful change is measuring and understanding the right things with a focus on capabilities—not on maturity.",
					"While maturity models are very popular in the industry, we cannot stress enough that maturity models are not the appropriate tool to use or mindset to have. Instead, shifting to a capabilities model of measurement is essential for organizations wanting to accelerate software delivery. This is due to four factors.",
					"First, maturity models focus on helping an organization “arrive” at a mature state and then declare themselves done with their journey, whereas technology transformations should follow a continuous improvement paradigm. Alternatively, capability models focus on helping an organization continually improve and progress, realizing that the technological and business landscape is ever-changing. The most innovative companies and highest-performing organizations are always striving to be better and never consider themselves “mature” or “done” with their improvement or transformation journey—and we see this in our research.",
					"Second, maturity models are quite often a “lock-step” or linear formula, prescribing a similar set of technologies, tooling, or capabilities for every set of teams and organizations to progress through. Maturity models assume that “Level 1” and “Level 2” look the same across all teams and organizations, but those of us who work in technology know this is not the case. In contrast, capability models are multidimensional and dynamic, allowing different parts of the organization to take a customized approach to improvement, and focus on capabilities that will give them the most benefit based on their current context and their short and long-term goals. Teams have their own context, their own systems, their own goals, and their own constraints, and what we should focus on next to accelerate our transformation depends on those things.",
					"Third, capability models focus on key outcomes and how the capabilities, or levers, drive improvement in those outcomes—that is, they are outcome based. This provides technical leadership with clear direction and strategy on high-level goals (with a focus on capabilities to improve key outcomes). It also enables team leaders and individual contributors to set improvement goals related to the capabilities their team is focusing on for the current time period. Most maturity models simply measure the technical proficiency or tooling install base in an organization without tying it to outcomes. These end up being vanity metrics: while they can be relatively easy to measure, they don’t tell us anything about the impact they have on the business.",
					"Fourth, maturity models define a static level of technological, process, and organizational abilities to achieve. They do not take into account the ever-changing nature of the technology and business landscape. Our own research and data have confirmed that the industry is changing: what is good enough and even “high-performing” today is no longer good enough in the next year. In contrast, capability models allow for dynamically changing environments and allow teams and organizations to focus on developing the skills and capabilities needed to remain competitive.",
					"By focusing on a capabilities paradigm, organizations can continuously drive improvement. And by focusing on the right capabilities, organizations can drive improvements in their outcomes, allowing them to develop and deliver software with improved speed and stability. In fact, we see that the highest performers do exactly this, continually reaching for gains year over year and never settling for yesterday’s accomplishments.",
				],
				summary: [
					"Focus on capabilities, not maturity, to deliver software faster and more reliably.",
				],
				longSummary: [
					"To succeed in the market, technology leaders must deliver software quickly and reliably, necessitating changes in delivery methods. The focus should be on measuring capabilities rather than maturity. Maturity models are inadequate because they emphasize a final state over continuous improvement, enforce linear approaches instead of allowing customized progress, measure technical skills without linking to business outcomes, and define static abilities rather than adapting to changes. By concentrating on capabilities, organizations can continuously enhance outcomes, delivering software with greater speed and stability. Top performers consistently strive for improvement, never resting on past achievements.",
				],
				imageUrl:
					"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747118087/blog-cover-images/vurzbjckk1ortnfucjxx.webp",
			},
			{
				heading: [
					"EVIDENCE-BASED TRANSFORMATIONS FOCUS ON KEY CAPABILITIES",
				],
				children: [
					"Within both capability and maturity model frameworks, there are disagreements about which capabilities to focus on. Product vendors often favor capabilities that align with their product offerings. Consultants favor capabilities that align with their background, their offering, and their homegrown assessment tool. We have seen organizations try to design their own assessment models, choose solutions that align with the skill sets of internal champions, or succumb to analysis paralysis because of the sheer number of areas that need improvement in their organization.",
					"A more guided, evidence-based solution is needed, and the approach discussed in this book describes such a solution.",
					"Our research has yielded insights into what enables both software delivery performance and organizational performance as seen in profitability, productivity, and market share. In fact, our research shows that none of the following often-cited factors predicted performance:",
					"-   age and technology used for the application (for example, mainframe “systems of record” vs. greenfield “systems of engagement”)\n-   whether operations teams or development teams performed deployments\n-   whether a change approval board (CAB) is implemented",
					"The things that do make a difference in the success of software delivery and organizational performance are those that the highest performers and most innovative companies use to get ahead. Our research has identified 24 key capabilities that drive improvement in software delivery performance and, in turn, organizational performance. These capabilities are easy to define, measure, and improve.[1](blob:https://johnfactotum.github.io/b23d1f9e-06ce-4628-b67b-e1d158a07526#F1) This book will get you started on defining and measuring these capabilities. We will also point you to some fantastic resources for improving them, so you can accelerate your own technology transformation journey.",
				],
				summary: [
					"Discover 24 key capabilities driving top software delivery and organizational performance improvements.",
				],
				longSummary: [
					"In capability and maturity model frameworks, there's debate over which capabilities to prioritize, often influenced by product vendors and consultants promoting their own offerings. Organizations frequently struggle by creating their own assessment models, relying on internal champions' skills, or getting stuck in analysis paralysis due to numerous improvement areas. This book offers a guided, evidence-based solution, revealing that software delivery and organizational performance aren't determined by application age, technology, team type, or change approval boards. Instead, the top performers excel by utilizing 24 key capabilities that are straightforward to define, measure, and improve, with the book providing guidance and resources for enhancement.",
				],
				imageUrl:
					"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747118098/blog-cover-images/azi2mbmbehgxexfme1pk.webp",
			},
			{
				heading: ["THE VALUE OF ADOPTING DEVOPS"],
				children: [
					"You may be asking yourself: How do we know that these capabilities are drivers of technology and organizational performance, and why can we say it with such confidence?",
					"The findings from our research program show clearly that the value of adopting DevOps is even larger than we had initially thought, and the gap between high and low performers continues to grow.",
					"We discuss how we measure software delivery performance and how our cohort performs in detail in the following chapter. To summarize, in 2017 we found that, when compared to low performers, the high performers have:",
					"-   46 times more frequent code deployments\n-   440 times faster lead time from commit to deploy\n-   170 times faster mean time to recover from downtime\n-   5 times lower change failure rate (1/5 as likely for a change to fail)",
					"When compared to the 2016 results, the gap between high performers and low performers narrowed for tempo (deployment frequency and change lead time) and widened for stability (mean time to recover and change failure rate). We speculate that this is due to low-performing teams working to increase tempo but not investing enough in building quality into the process. The result is larger deployment failures that take more time to restore service. High performers understand that they don’t have to trade speed for stability or vice versa, because by building quality in they get both.",
					"You may be wondering: How do high-performing teams achieve such amazing software delivery performance? They do this by turning the right levers—that is, by improving the right capabilities.",
					"Over our four-year research program we have been able to identify the capabilities that drive performance in software delivery and impact organizational performance, and we have found that they work for all types of organizations. Our research investigated organizations of all sizes, in all industries, using legacy and greenfield technology stacks around the world—so the findings in this book will apply to the teams in your organization too.",
					"* * *",
					"[1](blob:https://johnfactotum.github.io/b23d1f9e-06ce-4628-b67b-e1d158a07526#Ch1)These 24 capabilities are listed, along with a pointer to the chapter that discusses them, in Appendix A.",
				],
				summary: [
					"DevOps boosts performance: high performers deploy faster, recover quicker, and maintain stability effortlessly.",
				],
				longSummary: [
					"Our research reveals that the benefits of adopting DevOps are greater than initially anticipated, with the disparity between high and low performers widening. In 2017, high performers achieved significantly more frequent code deployments, drastically faster lead times from commit to deploy, quicker recovery from downtime, and a lower change failure rate compared to low performers. Despite changes in tempo and stability since 2016, high performers demonstrate that speed and stability can coexist by integrating quality into their processes. Our four-year study identifies 24 key capabilities that enhance software delivery and organizational performance across various industries and technology stacks.",
				],
				imageUrl:
					"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747118108/blog-cover-images/fhlmmaoocmvvslyjr7cb.webp",
			},
		],
		summary: [
			"Unlock competitive edge: Embrace DevOps capabilities for rapid, reliable software delivery and transformation.",
		],
		longSummary: [
			"To stay competitive, organizations must shift from traditional, lengthy projects to agile methods, using small teams and rapid user feedback to deliver value quickly. Software is crucial in this transformation, with DevOps practices enabling the creation of secure, resilient systems at scale. Despite some success, 31% of the industry lacks essential practices like continuous integration and Lean principles. There's a disconnect between executive and practitioner views on DevOps maturity, emphasizing the need to measure capabilities rather than maturity. High performers excel by focusing on 24 key capabilities that enhance software delivery and organizational performance, achieving remarkable results without sacrificing stability. This book provides guidance on defining, measuring, and improving these capabilities, demonstrating that the benefits of DevOps are greater than initially realized.",
		],
	};

	const designing_data_intesive_2: Document = {
		title: ["# **Chapter 2. Data Models and Query Languages**"],
		children: [
			{
				heading: ["# **Relational Model Versus Document Model**"],
				children: [
					{
						heading: ["## **The Birth of NoSQL**"],
						children: [
							"Now, in the 2010s, *NoSQL* is the latest attempt to overthrow the relational model’s dominance. The name “NoSQL” is unfortunate, since it doesn’t actually refer to any particular technology—it was originally intended simply as a catchy Twitter hashtag for a meetup on open source, distributed, nonrelational databases in 2009 \\[[3]()\\]. Nevertheless, the term struck a nerve and quickly spread through the web startup community and beyond. A number of interesting database systems are now associated with the #NoSQL hashtag, and it has been retroactively reinterpreted as *Not Only SQL* \\[[4]()\\].",
							"There are several driving forces behind the adoption of NoSQL databases, including:",
							"* A need for greater scalability than relational databases can easily achieve, including very large datasets or very high write throughput",
							"* A widespread preference for free and open source software over commercial database products",
							"* Specialized query operations that are not well supported by the relational model",
							"* Frustration with the restrictiveness of relational schemas, and a desire for a more dynamic and expressive data model \\[[5]()\\]",
							"Different applications have different requirements, and the best choice of technology for one use case may well be different from the best choice for another use case. It therefore seems likely that in the foreseeable future, relational databases will continue to be used alongside a broad variety of nonrelational datastores—an idea that is sometimes called *polyglot persistence* \\[[3]()\\].",
						],
						summary: [
							"NoSQL revolutionized data management, challenging relational databases with scalability and flexibility.",
						],
						longSummary: [
							"In the 2010s, NoSQL emerged as a significant challenge to the dominance of relational databases. Initially a Twitter hashtag for a 2009 meetup on open source, distributed, nonrelational databases, NoSQL quickly evolved to mean 'Not Only SQL.' Its adoption was driven by the need for greater scalability, a preference for open source software, specialized query operations, and frustration with restrictive relational schemas. Different applications have varying requirements, making technology choices dependent on use cases. Relational databases are likely to continue being used alongside nonrelational datastores, a strategy known as 'polyglot persistence.'",
						],
						imageUrl:
							"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747123916/blog-cover-images/rv9cnamc0dll12i3wim6.webp",
					},
					{
						heading: ["## **The Object-Relational Mismatch**"],
						children: [
							"Most application development today is done in object-oriented programming languages, which leads to a common criticism of the SQL data model: if data is stored in relational tables, an awkward translation layer is required between the objects in the application code and the database model of tables, rows, and columns. The disconnect between the models is sometimes called an *impedance mismatch*.[i]()",
							"Object-relational mapping (ORM) frameworks like ActiveRecord and Hibernate reduce the amount of boilerplate code required for this translation layer, but they can’t completely hide the differences between the two models.",
							"For example, [Figure 2-1](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_billgates_relational) illustrates how a résumé (a LinkedIn profile) could be expressed in a relational schema. The profile as a whole can be identified by a unique identifier, `user_id`. Fields like `first_name` and `last_name` appear exactly once per user, so they can be modeled as columns on the `users` table. However, most people have had more than one job in their career (positions), and people may have varying numbers of periods of education and any number of pieces of contact information. There is a one-to-many relationship from the user to these items, which can be represented in various ways:",
							"* In the traditional SQL model (prior to SQL:1999), the most common normalized representation is to put positions, education, and contact information in separate tables, with a foreign key reference to the `users` table, as in [Figure 2-1](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_billgates_relational).",
							"* Later versions of the SQL standard added support for structured datatypes and XML data; this allowed multi-valued data to be stored within a single row, with support for querying and indexing inside those documents. These features are supported to varying degrees by Oracle, IBM DB2, MS SQL Server, and PostgreSQL \\[[6](), [7]()\\]. A JSON datatype is also supported by several databases, including IBM DB2, MySQL, and PostgreSQL \\[[8]()\\].",
							"* A third option is to encode jobs, education, and contact info as a JSON or XML document, store it on a text column in the database, and let the application interpret its structure and content. In this setup, you typically cannot use the database to query for values inside that encoded column.",
							"![ddia 0201](blob:https://johnfactotum.github.io/c9da0fff-af6e-4d30-85c1-33ed257637fa)",
							"###### *Figure 2-1. Representing a LinkedIn profile using a relational schema. Photo of Bill Gates courtesy of Wikimedia Commons, Ricardo Stuckert, Agência Brasil.*",
							"For a data structure like a résumé, which is mostly a self-contained *document*, a JSON representation can be quite appropriate: see [Example 2-1](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_billgates_json). JSON has the appeal of being much simpler than XML. Document-oriented databases like MongoDB \\[[9]()\\], RethinkDB \\[[10]()\\], CouchDB \\[[11]()\\], and Espresso \\[[12]()\\] support this data model.",
							"##### *Example 2-1. Representing a LinkedIn profile as a JSON document*",
							'```\n{\n  "user_id":     251,\n  "first_name":  "Bill",\n  "last_name":   "Gates",\n  "summary":     "Co-chair of the Bill & Melinda Gates... Active blogger.",\n  "region_id":   "us:91",\n  "industry_id": 131,\n  "photo_url":   "/p/7/000/253/05b/308dd6e.jpg",\n  "positions": [\n    {"job_title": "Co-chair", "organization": "Bill & Melinda Gates Foundation"},\n    {"job_title": "Co-founder, Chairman", "organization": "Microsoft"}\n  ],\n  "education": [\n    {"school_name": "Harvard University",       "start": 1973, "end": 1975},\n    {"school_name": "Lakeside School, Seattle", "start": null, "end": null}\n  ],\n  "contact_info": {\n    "blog":    "http://thegatesnotes.com",\n    "twitter": "http://twitter.com/BillGates"\n  }\n}\n```',
							"Some developers feel that the JSON model reduces the impedance mismatch between the application code and the storage layer. However, as we shall see in [Chapter 4](), there are also problems with JSON as a data encoding format. The lack of a schema is often cited as an advantage; we will discuss this in [“Schema flexibility in the document model”](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#sec_datamodels_schema_flexibility).",
							"The JSON representation has better *locality* than the multi-table schema in [Figure 2-1](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_billgates_relational). If you want to fetch a profile in the relational example, you need to either perform multiple queries (query each table by `user_id`) or perform a messy multi-way join between the `users` table and its subordinate tables. In the JSON representation, all the relevant information is in one place, and one query is sufficient.",
							"The one-to-many relationships from the user profile to the user’s positions, educational history, and contact information imply a tree structure in the data, and the JSON representation makes this tree structure explicit (see [Figure 2-2](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_json_tree)).",
							"![ddia 0202](blob:https://johnfactotum.github.io/d654869b-6fd9-4a64-a52b-88835c083399)",
							"###### *Figure 2-2. One-to-many relationships forming a tree structure.*",
						],
						summary: [
							"Overcome SQL-object mismatch: explore JSON in MongoDB for seamless one-to-many relationships.",
						],
						longSummary: [
							"Object-oriented programming languages often struggle with the impedance mismatch between application objects and SQL data models, necessitating awkward translations. ORM frameworks help but can't fully bridge these differences. For instance, while simple fields like first_name map easily to database columns, one-to-many relationships such as positions or education require more complex solutions. These include using separate tables with foreign keys, structured datatypes, or storing data as JSON/XML. Document-oriented databases like MongoDB, which support JSON, are favored by some developers for reducing impedance mismatch and improving data locality, though JSON has its own limitations as a data format.",
						],
						imageUrl:
							"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747123927/blog-cover-images/uzhqvjycoqo4jvqkwdwv.webp",
					},
					{
						heading: [
							"## **Many-to-One and Many-to-Many Relationships**",
						],
						children: [
							'In [Example 2-1](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_billgates_json) in the preceding section, `region_id` and `industry_id` are given as IDs, not as plain-text strings `"Greater Seattle Area"` and `"Philanthropy"`. Why?',
							"If the user interface has free-text fields for entering the region and the industry, it makes sense to store them as plain-text strings. But there are advantages to having standardized lists of geographic regions and industries, and letting users choose from a drop-down list or autocompleter:",
							"* Consistent style and spelling across profiles",
							"* Avoiding ambiguity (e.g., if there are several cities with the same name)",
							"* Ease of updating—the name is stored in only one place, so it is easy to update across the board if it ever needs to be changed (e.g., change of a city name due to political events)",
							"* Localization support—when the site is translated into other languages, the standardized lists can be localized, so the region and industry can be displayed in the viewer’s language",
							'* Better search—e.g., a search for philanthropists in the state of Washington can match this profile, because the list of regions can encode the fact that Seattle is in Washington (which is not apparent from the string `"Greater Seattle Area"`)',
							"Whether you store an ID or a text string is a question of duplication. When you use an ID, the information that is meaningful to humans (such as the word *Philanthropy*) is stored in only one place, and everything that refers to it uses an ID (which only has meaning within the database). When you store the text directly, you are duplicating the human-meaningful information in every record that uses it.",
							"The advantage of using an ID is that because it has no meaning to humans, it never needs to change: the ID can remain the same, even if the information it identifies changes. Anything that is meaningful to humans may need to change sometime in the future—and if that information is duplicated, all the redundant copies need to be updated. That incurs write overheads, and risks inconsistencies (where some copies of the information are updated but others aren’t). Removing such duplication is the key idea behind *normalization* in databases.[ii]()",
							"###### **Note**",
							"Database administrators and developers love to argue about normalization and denormalization, but we will suspend judgment for now. In [Part III]() of this book we will return to this topic and explore systematic ways of dealing with caching, denormalization, and derived data.",
							"Unfortunately, normalizing this data requires *many-to-one* relationships (many people live in one particular region, many people work in one particular industry), which don’t fit nicely into the document model. In relational databases, it’s normal to refer to rows in other tables by ID, because joins are easy. In document databases, joins are not needed for one-to-many tree structures, and support for joins is often weak.[iii]()",
							"If the database itself does not support joins, you have to emulate a join in application code by making multiple queries to the database. (In this case, the lists of regions and industries are probably small and slow-changing enough that the application can simply keep them in memory. But nevertheless, the work of making the join is shifted from the database to the application code.)",
							"Moreover, even if the initial version of an application fits well in a join-free document model, data has a tendency of becoming more interconnected as features are added to applications. For example, consider some changes we could make to the résumé example:",
							"Organizations and schools as entities",
							"In the previous description, `organization` (the company where the user worked) and `school_name` (where they studied) are just strings. Perhaps they should be references to entities instead? Then each organization, school, or university could have its own web page (with logo, news feed, etc.); each résumé could link to the organizations and schools that it mentions, and include their logos and other information (see [Figure 2-3](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_datamodels_linked_entity) for an example from LinkedIn).",
							"Recommendations",
							"Say you want to add a new feature: one user can write a recommendation for another user. The recommendation is shown on the résumé of the user who was recommended, together with the name and photo of the user making the recommendation. If the recommender updates their photo, any recommendations they have written need to reflect the new photo. Therefore, the recommendation should have a reference to the author’s profile.",
							"![ddia 0203](blob:https://johnfactotum.github.io/2dc99fa9-3ee5-493e-b977-3de3decc3f05)",
							"###### *Figure 2-3. The company name is not just a string, but a link to a company entity. Screenshot of linkedin.com.*",
							"[Figure 2-4](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_datamodels_many_to_many) illustrates how these new features require many-to-many relationships. The data within each dotted rectangle can be grouped into one document, but the references to organizations, schools, and other users need to be represented as references, and require joins when queried.",
							"![ddia 0204](blob:https://johnfactotum.github.io/37d0117a-8e89-4b05-8db6-3c7a58438923)",
							"###### *Figure 2-4. Extending résumés with many-to-many relationships.*",
						],
						summary: [
							"Using IDs instead of strings enhances consistency, localization, and searchability in databases.",
						],
						longSummary: [
							"Using IDs instead of plain-text strings offers several advantages, such as consistent style, avoiding ambiguity, ease of updating, localization support, and improved search capabilities. This approach aligns with database normalization by reducing duplication, as human-meaningful information is stored once and referenced through unchanging IDs. However, document databases struggle with these many-to-one relationships due to weak join support, requiring application code to emulate joins. As applications evolve, data becomes more interconnected, necessitating many-to-many relationships, such as linking organizations and schools to résumés or user recommendations. This complexity challenges document models, prompting discussions on normalization and denormalization.",
						],
						imageUrl:
							"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747123935/blog-cover-images/sottgrdmxm35s1rqs8qh.webp",
					},
					{
						heading: [
							"## **Are Document Databases Repeating History?**",
						],
						children: [
							"While many-to-many relationships and joins are routinely used in relational databases, document databases and NoSQL reopened the debate on how best to represent such relationships in a database. This debate is much older than NoSQL—in fact, it goes back to the very earliest computerized database systems.",
							"The most popular database for business data processing in the 1970s was IBM’s *Information Management System* (IMS), originally developed for stock-keeping in the Apollo space program and first commercially released in 1968 \\[[13]()\\]. It is still in use and maintained today, running on OS/390 on IBM mainframes \\[[14]()\\].",
							"The design of IMS used a fairly simple data model called the *hierarchical model*, which has some remarkable similarities to the JSON model used by document databases \\[[2]()\\]. It represented all data as a tree of records nested within records, much like the JSON structure of [Figure 2-2](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_json_tree).",
							"Like document databases, IMS worked well for one-to-many relationships, but it made many-to-many relationships difficult, and it didn’t support joins. Developers had to decide whether to duplicate (denormalize) data or to manually resolve references from one record to another. These problems of the 1960s and ’70s were very much like the problems that developers are running into with document databases today \\[[15]()\\].",
							"Various solutions were proposed to solve the limitations of the hierarchical model. The two most prominent were the *relational model* (which became SQL, and took over the world) and the *network model* (which initially had a large following but eventually faded into obscurity). The “great debate” between these two camps lasted for much of the 1970s \\[[2]()\\].",
							"Since the problem that the two models were solving is still so relevant today, it’s worth briefly revisiting this debate in today’s light.",
							[
								{
									heading: ["### **The network model**"],
									children: [
										"The network model was standardized by a committee called the Conference on Data Systems Languages (CODASYL) and implemented by several different database vendors; it is also known as the *CODASYL model* \\[[16]()\\].",
										'The CODASYL model was a generalization of the hierarchical model. In the tree structure of the hierarchical model, every record has exactly one parent; in the network model, a record could have multiple parents. For example, there could be one record for the `"Greater Seattle Area"` region, and every user who lived in that region could be linked to it. This allowed many-to-one and many-to-many relationships to be modeled.',
										"The links between records in the network model were not foreign keys, but more like pointers in a programming language (while still being stored on disk). The only way of accessing a record was to follow a path from a root record along these chains of links. This was called an *access path*.",
										"In the simplest case, an access path could be like the traversal of a linked list: start at the head of the list, and look at one record at a time until you find the one you want. But in a world of many-to-many relationships, several different paths can lead to the same record, and a programmer working with the network model had to keep track of these different access paths in their head.",
										"A query in CODASYL was performed by moving a cursor through the database by iterating over lists of records and following access paths. If a record had multiple parents (i.e., multiple incoming pointers from other records), the application code had to keep track of all the various relationships. Even CODASYL committee members admitted that this was like navigating around an *n*\\-dimensional data space \\[[17]()\\].",
										"Although manual access path selection was able to make the most efficient use of the very limited hardware capabilities in the 1970s (such as tape drives, whose seeks are extremely slow), the problem was that they made the code for querying and updating the database complicated and inflexible. With both the hierarchical and the network model, if you didn’t have a path to the data you wanted, you were in a difficult situation. You could change the access paths, but then you had to go through a lot of handwritten database query code and rewrite it to handle the new access paths. It was difficult to make changes to an application’s data model.",
									],
									summary: [
										"CODASYL model: complex, inflexible database querying with manual access paths and multiple parent records.",
									],
									longSummary: [
										"The CODASYL network model, a generalization of the hierarchical model, allowed records to have multiple parents, enabling many-to-one and many-to-many relationships. Unlike foreign keys, links between records acted like pointers, requiring access through paths from root records. Queries involved moving a cursor through the database along these access paths, with application code managing relationships. While this manual path selection was efficient for the limited hardware of the 1970s, it complicated and inflexibly tied database querying and updating to specific paths. Any data model changes necessitated extensive rewriting of query code to accommodate new access paths.",
									],
									imageUrl:
										"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747123956/blog-cover-images/zoipbjaumrpev0ubkih7.webp",
								},
								{
									heading: ["### **The relational model**"],
									children: [
										"What the relational model did, by contrast, was to lay out all the data in the open: a relation (table) is simply a collection of tuples (rows), and that’s it. There are no labyrinthine nested structures, no complicated access paths to follow if you want to look at the data. You can read any or all of the rows in a table, selecting those that match an arbitrary condition. You can read a particular row by designating some columns as a key and matching on those. You can insert a new row into any table without worrying about foreign key relationships to and from other tables.[iv]()",
										"In a relational database, the query optimizer automatically decides which parts of the query to execute in which order, and which indexes to use. Those choices are effectively the “access path,” but the big difference is that they are made automatically by the query optimizer, not by the application developer, so we rarely need to think about them.",
										"If you want to query your data in new ways, you can just declare a new index, and queries will automatically use whichever indexes are most appropriate. You don’t need to change your queries to take advantage of a new index. (See also [“Query Languages for Data”](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#sec_datamodels_query).) The relational model thus made it much easier to add new features to applications.",
										"Query optimizers for relational databases are complicated beasts, and they have consumed many years of research and development effort \\[[18]()\\]. But a key insight of the relational model was this: you only need to build a query optimizer once, and then all applications that use the database can benefit from it. If you don’t have a query optimizer, it’s easier to handcode the access paths for a particular query than to write a general-purpose optimizer—but the general-purpose solution wins in the long run.",
									],
									summary: [
										"The relational model revolutionized data access with tables, simplifying queries and optimizing performance.",
									],
									longSummary: [
										"The relational model revolutionized data access by organizing data into tables of rows, eliminating complex nested structures and access paths. This allows users to easily read rows based on conditions or keys and insert rows without managing relationships. Query optimizers enhance this process by automatically determining execution order and index usage, freeing developers from these tasks. New indexes can be added without altering queries, as the system selects the most suitable ones. Although complex and research-intensive, query optimizers offer a significant advantage by being universally applicable, unlike hand-coded paths that may suit specific queries but lack long-term benefits.",
									],
									imageUrl:
										"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747123970/blog-cover-images/hglnlxxqdiqnbgr46odg.webp",
								},
								{
									heading: [
										"### **Comparison to document databases**",
									],
									children: [
										"Document databases reverted back to the hierarchical model in one aspect: storing nested records (one-to-many relationships, like `positions`, `education`, and `contact_info` in [Figure 2-1](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_billgates_relational)) within their parent record rather than in a separate table.",
										"However, when it comes to representing many-to-one and many-to-many relationships, relational and document databases are not fundamentally different: in both cases, the related item is referenced by a unique identifier, which is called a *foreign key* in the relational model and a *document reference* in the document model \\[[9]()\\]. That identifier is resolved at read time by using a join or follow-up queries. To date, document databases have not followed the path of CODASYL.",
									],
									summary: [
										"Document databases nest records, using unique identifiers for complex relationships, unlike CODASYL.",
									],
									longSummary: [
										"Document databases have returned to a hierarchical model by storing nested records within parent records instead of separate tables. Despite this, they handle many-to-one and many-to-many relationships similarly to relational databases, using unique identifiers—foreign keys in relational models and document references in document models—resolved at read time through joins or follow-up queries. Unlike CODASYL's approach, document databases maintain their distinct methodology.",
									],
									imageUrl:
										"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747123980/blog-cover-images/iej15lekhdtwa2myzksb.webp",
								},
							],
						],
						summary: [
							"The debate on database models from the 1960s still influences modern database design.",
						],
						longSummary: [
							"The debate on representing many-to-many relationships in databases, dating back to the 1960s, remains relevant today. IBM's IMS used a hierarchical model akin to modern JSON structures, excelling in one-to-many relationships but struggling with many-to-many ones, lacking support for joins. This led to data duplication or manual reference resolution, issues still faced by document database developers. The relational model, which became SQL, simplified data access by using tables and query optimizers, unlike the complex access paths of the CODASYL network model. Document databases, while reverting to hierarchical models, handle many-to-many relationships similarly to relational databases using unique identifiers.",
						],
						imageUrl:
							"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747123945/blog-cover-images/qcvbx82sfmj4u2dtfbgo.webp",
					},
				],
				summary: [
					"Relational databases, dominant since the 1980s, face ongoing challenges from NoSQL and document models.",
				],
				longSummary: [
					"The relational model, introduced by Edgar Codd in 1970, underpins SQL by organizing data into tables with rows, and despite initial skepticism, it became dominant by the mid-1980s. It originated in business data processing and aimed to simplify interfaces by hiding implementation details. Despite challenges from network, hierarchical, object, and XML databases, the relational model has prevailed, extending beyond business to power diverse web applications. In the 2010s, NoSQL emerged, driven by the need for scalability, open-source preferences, and specialized queries. While relational databases excel at many-to-many relationships, document databases like MongoDB offer advantages in reducing impedance mismatch and improving data locality. However, they struggle with many-to-many relationships, requiring manual joins. The debate between relational and document models echoes past discussions on hierarchical and network models, highlighting the trade-offs between simplicity and flexibility in data management.",
				],
				imageUrl:
					"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747123906/blog-cover-images/yyopzq1aewzq11pzxkmi.webp",
			},
			{
				heading: ["## **Relational Versus Document Databases Today**"],
				children: [
					
						{
							heading: [
								"### **Which data model leads to simpler application code?**",
							],
							children: [
								"If the data in your application has a document-like structure (i.e., a tree of one-to-many relationships, where typically the entire tree is loaded at once), then it’s probably a good idea to use a document model. The relational technique of *shredding*—splitting a document-like structure into multiple tables (like `positions`, `education`, and `contact_info` in [Figure 2-1](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_billgates_relational))—can lead to cumbersome schemas and unnecessarily complicated application code.",
								"The document model has limitations: for example, you cannot refer directly to a nested item within a document, but instead you need to say something like “the second item in the list of positions for user 251” (much like an access path in the hierarchical model). However, as long as documents are not too deeply nested, that is not usually a problem.",
								"The poor support for joins in document databases may or may not be a problem, depending on the application. For example, many-to-many relationships may never be needed in an analytics application that uses a document database to record which events occurred at which time \\[[19]()\\].",
								"However, if your application does use many-to-many relationships, the document model becomes less appealing. It’s possible to reduce the need for joins by denormalizing, but then the application code needs to do additional work to keep the denormalized data consistent. Joins can be emulated in application code by making multiple requests to the database, but that also moves complexity into the application and is usually slower than a join performed by specialized code inside the database. In such cases, using a document model can lead to significantly more complex application code and worse performance \\[[15]()\\].",
								"It’s not possible to say in general which data model leads to simpler application code; it depends on the kinds of relationships that exist between data items. For highly interconnected data, the document model is awkward, the relational model is acceptable, and graph models (see [“Graph-Like Data Models”](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#sec_datamodels_graph)) are the most natural.",
							],
							summary: [
								"Choose the right data model: document for trees, relational for joins, graph for networks.",
							],
							longSummary: [
								"If your application involves a document-like data structure, using a document model is recommended, as shredding in relational models can result in cumbersome schemas and complex code. Document models have limitations, such as difficulty referencing nested items and poor join support, but these are manageable unless documents are deeply nested. However, for applications with many-to-many relationships, document models are less suitable due to the need for denormalization or emulating joins, which complicates and slows down performance. Ultimately, the best data model depends on the relationships: document models for tree-structured data, relational models for interconnected data, and graph models for highly interconnected data.",
							],
							imageUrl:
								"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747123999/blog-cover-images/gejjkz6okpoxktrxe4nt.webp",
						},
						{
							heading: [
								"### **Schema flexibility in the document model**",
							],
							children: [
								"Most document databases, and the JSON support in relational databases, do not enforce any schema on the data in documents. XML support in relational databases usually comes with optional schema validation. No schema means that arbitrary keys and values can be added to a document, and when reading, clients have no guarantees as to what fields the documents may contain.",
								"Document databases are sometimes called *schemaless*, but that’s misleading, as the code that reads the data usually assumes some kind of structure—i.e., there is an implicit schema, but it is not enforced by the database \\[[20]()\\]. A more accurate term is *schema-on-read* (the structure of the data is implicit, and only interpreted when the data is read), in contrast with *schema-on-write* (the traditional approach of relational databases, where the schema is explicit and the database ensures all written data conforms to it) \\[[21]()\\].",
								"Schema-on-read is similar to dynamic (runtime) type checking in programming languages, whereas schema-on-write is similar to static (compile-time) type checking. Just as the advocates of static and dynamic type checking have big debates about their relative merits \\[[22]()\\], enforcement of schemas in database is a contentious topic, and in general there’s no right or wrong answer.",
								"The difference between the approaches is particularly noticeable in situations where an application wants to change the format of its data. For example, say you are currently storing each user’s full name in one field, and you instead want to store the first name and last name separately \\[[23]()\\]. In a document database, you would just start writing new documents with the new fields and have code in the application that handles the case when old documents are read. For example:",
								'```\nif (user && user.name && !user.first_name) {\n    // Documents written before Dec 8, 2013 don\'t have first_name\n    user.first_name = user.name.split(" ")[0];\n}\n```',
								"On the other hand, in a “statically typed” database schema, you would typically perform a *migration* along the lines of:",
								"```\nALTER TABLE users ADD COLUMN first_name text;\nUPDATE users SET first_name = split_part(name, ' ', 1);      -- PostgreSQL\nUPDATE users SET first_name = substring_index(name, ' ', 1);      -- MySQL\n```",
								"Schema changes have a bad reputation of being slow and requiring downtime. This reputation is not entirely deserved: most relational database systems execute the `ALTER TABLE` statement in a few milliseconds. MySQL is a notable exception—it copies the entire table on `ALTER TABLE`, which can mean minutes or even hours of downtime when altering a large table—although various tools exist to work around this limitation \\[[24](), [25](), [26]()\\].",
								"Running the `UPDATE` statement on a large table is likely to be slow on any database, since every row needs to be rewritten. If that is not acceptable, the application can leave `first_name` set to its default of `NULL` and fill it in at read time, like it would with a document database.",
								"The schema-on-read approach is advantageous if the items in the collection don’t all have the same structure for some reason (i.e., the data is heterogeneous)—for example, because:",
								"* There are many different types of objects, and it is not practical to put each type of object in its own table.",
								"* The structure of the data is determined by external systems over which you have no control and which may change at any time.",
								"In situations like these, a schema may hurt more than it helps, and schemaless documents can be a much more natural data model. But in cases where all records are expected to have the same structure, schemas are a useful mechanism for documenting and enforcing that structure. We will discuss schemas and schema evolution in more detail in [Chapter 4]().",
							],
							summary: [
								"Document databases adapt easily to changing data formats, unlike rigid relational databases.",
							],
							longSummary: [
								"Document databases, often termed schemaless, actually employ schema-on-read, interpreting structure when data is accessed, unlike traditional relational databases that use schema-on-write with explicit schemas. This distinction is crucial when altering data formats; document databases allow new documents with new fields, managing old formats in application code, while relational databases typically need migrations using ALTER TABLE and UPDATE statements. Although schema changes in relational databases are usually swift, MySQL is an exception, requiring table copies. Schema-on-read is advantageous for heterogeneous data collections with varied structures, but schemas are beneficial for documenting and enforcing uniform structures when records are similar.",
							],
							imageUrl:
								"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747124010/blog-cover-images/cgxsaogpqdkdptpnjgyp.webp",
						},
						{
							heading: ["### **Data locality for queries**"],
							children: [
								"A document is usually stored as a single continuous string, encoded as JSON, XML, or a binary variant thereof (such as MongoDB’s BSON). If your application often needs to access the entire document (for example, to render it on a web page), there is a performance advantage to this *storage locality*. If data is split across multiple tables, like in [Figure 2-1](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_billgates_relational), multiple index lookups are required to retrieve it all, which may require more disk seeks and take more time.",
								"The locality advantage only applies if you need large parts of the document at the same time. The database typically needs to load the entire document, even if you access only a small portion of it, which can be wasteful on large documents. On updates to a document, the entire document usually needs to be rewritten—only modifications that don’t change the encoded size of a document can easily be performed in place \\[[19]()\\]. For these reasons, it is generally recommended that you keep documents fairly small and avoid writes that increase the size of a document \\[[9]()\\]. These performance limitations significantly reduce the set of situations in which document databases are useful.",
								"It’s worth pointing out that the idea of grouping related data together for locality is not limited to the document model. For example, Google’s Spanner database offers the same locality properties in a relational data model, by allowing the schema to declare that a table’s rows should be interleaved (nested) within a parent table \\[[27]()\\]. Oracle allows the same, using a feature called *multi-table index cluster tables* \\[[28]()\\]. The *column-family* concept in the Bigtable data model (used in Cassandra and HBase) has a similar purpose of managing locality \\[[29]()\\].",
								"We will also see more on locality in [Chapter 3]().",
							],
							summary: [
								"Document databases excel in locality but struggle with large documents and frequent updates.",
							],
							longSummary: [
								"Documents stored as continuous strings in formats like JSON or XML offer performance benefits through storage locality, reducing the need for multiple index lookups required in relational models. However, this advantage is limited to scenarios where large portions of the document are accessed simultaneously, as the entire document is loaded even for small queries. This inefficiency is exacerbated with large documents, as updates often necessitate rewriting the entire document unless the size remains unchanged. To mitigate this, it's advisable to keep documents small and avoid size-increasing writes. Similar data locality benefits are found in systems like Google's Spanner, Oracle's multi-table index cluster tables, and column-family concepts in Bigtable, Cassandra, and HBase.",
							],
							imageUrl:
								"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747124019/blog-cover-images/mxliy9vtqe3jefhzrbjt.webp",
						},
						{
							heading: [
								"### **Convergence of document and relational databases**",
							],
							children: [
								"Most relational database systems (other than MySQL) have supported XML since the mid-2000s. This includes functions to make local modifications to XML documents and the ability to index and query inside XML documents, which allows applications to use data models very similar to what they would do when using a document database.",
								"PostgreSQL since version 9.3 \\[[8]()\\], MySQL since version 5.7, and IBM DB2 since version 10.5 \\[[30]()\\] also have a similar level of support for JSON documents. Given the popularity of JSON for web APIs, it is likely that other relational databases will follow in their footsteps and add JSON support.",
								"On the document database side, RethinkDB supports relational-like joins in its query language, and some MongoDB drivers automatically resolve database references (effectively performing a client-side join, although this is likely to be slower than a join performed in the database since it requires additional network round-trips and is less optimized).",
								"It seems that relational and document databases are becoming more similar over time, and that is a good thing: the data models complement each other.[v]() If a database is able to handle document-like data and also perform relational queries on it, applications can use the combination of features that best fits their needs.",
								"A hybrid of the relational and document models is a good route for databases to take in the future.",
							],
							summary: [
								"Relational and document databases converge, blending strengths for a hybrid future in data management.",
							],
							longSummary: [
								"Since the mid-2000s, most relational databases have supported XML, offering functions for local modifications, indexing, and querying. PostgreSQL, MySQL, and IBM DB2 have similarly embraced JSON, reflecting its popularity in web APIs. Document databases like RethinkDB now support relational-like joins, while MongoDB provides client-side join functionality through database references. This convergence of relational and document databases is advantageous, as their data models complement each other. A hybrid approach, combining relational and document models, is a promising direction for future database development.",
							],
							imageUrl:
								"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747124031/blog-cover-images/wzw5g98qcjljxeuti6vl.webp",
						},
					
				],
				summary: [
					"Relational vs. document databases: Choose based on data structure, relationships, and performance needs.",
				],
				longSummary: [
					"When comparing relational and document databases, key differences include fault-tolerance, concurrency handling, and data model flexibility. Document databases offer schema flexibility, performance benefits from data locality, and alignment with application data structures, making them ideal for tree-structured data. However, they struggle with many-to-many relationships, requiring denormalization or complex joins in application code. Relational databases excel in supporting joins and structured data relationships but can become cumbersome with document-like data. Schema-on-read in document databases allows easy format changes, while relational databases require migrations. Both models are converging, with relational databases supporting JSON and document databases offering join-like features, suggesting a hybrid approach is beneficial.",
				],
				imageUrl:
					"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747123989/blog-cover-images/hz0lk0yj6sdubtnjunxl.webp",
			},
			{
				heading: ["# **Query Languages for Data**"],
				children: [
					
						{
							heading: ["## **Declarative Queries on the Web**"],
							children: [
								"The advantages of declarative query languages are not limited to just databases. To illustrate the point, let’s compare declarative and imperative approaches in a completely different environment: a web browser.",
								"Say you have a website about animals in the ocean. The user is currently viewing the page on sharks, so you mark the navigation item “Sharks” as currently selected, like this:",
								'```\n<ul>\n    <li class="selected"> \n```',
								"[![1](blob:https://johnfactotum.github.io/8c04f3a5-edc3-4bec-800d-97b8aea6bc21)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#callout_data_models_and_query_languages_CO1-1)",
								"**`<p>`**`Sharks`**`</p>`**[![2](blob:https://johnfactotum.github.io/4fb37c6d-0cd4-4ef8-ad77-0a2954542bc4)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#callout_data_models_and_query_languages_CO1-2)**`<ul>`** **`<li>`**`Great White Shark`**`</li>`** **`<li>`**`Tiger Shark`**`</li>`** **`<li>`**`Hammerhead Shark`**`</li>`** **`</ul>`** **`</li>`** **`<li>`** **`<p>`**`Whales`**`</p>`** **`<ul>`** **`<li>`**`Blue Whale`**`</li>`** **`<li>`**`Humpback Whale`**`</li>`** **`<li>`**`Fin Whale`**`</li>`** **`</ul>`** **`</li>`** **`</ul>`**",
								"[![1](blob:https://johnfactotum.github.io/8c04f3a5-edc3-4bec-800d-97b8aea6bc21)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#co_data_models_and_query_languages_CO1-1)",
								'The selected item is marked with the CSS class `"selected"`.',
								"[![2](blob:https://johnfactotum.github.io/4fb37c6d-0cd4-4ef8-ad77-0a2954542bc4)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#co_data_models_and_query_languages_CO1-2)",
								"`<p>Sharks</p>` is the title of the currently selected page.",
								"Now say you want the title of the currently selected page to have a blue background, so that it is visually highlighted. This is easy, using CSS:",
								"```\nli.selected > p {\n    background-color: blue;\n}\n```",
								'Here the CSS selector `li.selected > p` declares the pattern of elements to which we want to apply the blue style: namely, all `<p>` elements whose direct parent is an `<li>` element with a CSS class of `selected`. The element `<p>Sharks</p>` in the example matches this pattern, but `<p>Whales</p>` does not match because its `<li>` parent lacks `class="selected"`.',
								"If you were using XSL instead of CSS, you could do something similar:",
								'```\n<xsl:template match="li[@class=\'selected\']/p">\n    <fo:block background-color="blue">\n        <xsl:apply-templates/>\n    </fo:block>\n</xsl:template>\n```',
								"Here, the XPath expression `li[@class='selected']/p` is equivalent to the CSS selector `li.selected > p` in the previous example. What CSS and XSL have in common is that they are both *declarative* languages for specifying the styling of a document.",
								"Imagine what life would be like if you had to use an imperative approach. In JavaScript, using the core Document Object Model (DOM) API, the result might look something like this:",
								'```\nvar liElements = document.getElementsByTagName("li");\nfor (var i = 0; i < liElements.length; i++) {\n    if (liElements[i].className === "selected") {\n        var children = liElements[i].childNodes;\n        for (var j = 0; j < children.length; j++) {\n            var child = children[j];\n            if (child.nodeType === Node.ELEMENT_NODE && child.tagName === "P") {\n                child.setAttribute("style", "background-color: blue");\n            }\n        }\n    }\n}\n```',
								"This JavaScript imperatively sets the element `<p>Sharks</p>` to have a blue background, but the code is awful. Not only is it much longer and harder to understand than the CSS and XSL equivalents, but it also has some serious problems:",
								"* If the `selected` class is removed (e.g., because the user clicks a different page), the blue color won’t be removed, even if the code is rerun—and so the item will remain highlighted until the entire page is reloaded. With CSS, the browser automatically detects when the `li.selected > p` rule no longer applies and removes the blue background as soon as the `selected` class is removed.",
								'* If you want to take advantage of a new API, such as `document.getElementsByClassName("selected")` or even `document.evaluate()`—which may improve performance—you have to rewrite the code. On the other hand, browser vendors can improve the performance of CSS and XPath without breaking compatibility.',
								"In a web browser, using declarative CSS styling is much better than manipulating styles imperatively in JavaScript. Similarly, in databases, declarative query languages like SQL turned out to be much better than imperative query APIs.[vi]()",
							],
							summary: [
								"Declarative languages simplify tasks, like CSS styling, outperforming complex imperative methods.",
							],
							longSummary: [
								'Declarative query languages offer significant advantages over imperative approaches, as seen in both databases and web browsers. For instance, on a website about ocean animals, marking a navigation item as "selected" when viewing the sharks page can be easily achieved with CSS: "li.selected > p { background-color: blue; }". This simple declarative solution efficiently highlights the title with a blue background. In contrast, the imperative JavaScript equivalent is longer, harder to understand, and less adaptable, as it doesn\'t automatically update styling when selections change. Just as CSS outperforms JavaScript for styling, declarative languages like SQL excel over imperative query APIs for databases.',
							],
							imageUrl:
								"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747124059/blog-cover-images/trwnewfozzck3ht7gu6z.webp",
						},
						{
							heading: ["## **MapReduce Querying**"],
							children: [
								"*MapReduce* is a programming model for processing large amounts of data in bulk across many machines, popularized by Google \\[[33]()\\]. A limited form of MapReduce is supported by some NoSQL datastores, including MongoDB and CouchDB, as a mechanism for performing read-only queries across many documents.",
								"MapReduce in general is described in more detail in [Chapter 10](). For now, we’ll just briefly discuss MongoDB’s use of the model.",
								"MapReduce is neither a declarative query language nor a fully imperative query API, but somewhere in between: the logic of the query is expressed with snippets of code, which are called repeatedly by the processing framework. It is based on the `map` (also known as `collect`) and `reduce` (also known as `fold` or `inject`) functions that exist in many functional programming languages.",
								"To give an example, imagine you are a marine biologist, and you add an observation record to your database every time you see animals in the ocean. Now you want to generate a report saying how many sharks you have sighted per month.",
								"In PostgreSQL you might express that query like this:",
								"```\nSELECT date_trunc('month', observation_timestamp) AS observation_month, \n```",
								"[![1](blob:https://johnfactotum.github.io/8c04f3a5-edc3-4bec-800d-97b8aea6bc21)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#callout_data_models_and_query_languages_CO2-1)",
								"**`sum`**`(num_animals)`**`AS`**`total_animals`**`FROM`**`observations`**`WHERE`**`family = 'Sharks'`**`GROUP`** **`BY`**`observation_month;`",
								"[![1](blob:https://johnfactotum.github.io/8c04f3a5-edc3-4bec-800d-97b8aea6bc21)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#co_data_models_and_query_languages_CO2-1)",
								"The `date_trunc('month', timestamp)` function determines the calendar month containing `timestamp`, and returns another timestamp representing the beginning of that month. In other words, it rounds a timestamp down to the nearest month.",
								"This query first filters the observations to only show species in the `Sharks` family, then groups the observations by the calendar month in which they occurred, and finally adds up the number of animals seen in all observations in that month.",
								"The same can be expressed with MongoDB’s MapReduce feature as follows:",
								"```\ndb.observations.mapReduce(\n    function map() { \n```",
								"[![2](blob:https://johnfactotum.github.io/4fb37c6d-0cd4-4ef8-ad77-0a2954542bc4)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#callout_data_models_and_query_languages_CO3-2)",
								'**`var`**`year =`**`this`**`.observationTimestamp.getFullYear();`**`var`**`month =`**`this`**`.observationTimestamp.getMonth() + 1; emit(year + "-" + month,`**`this`**`.numAnimals);`[![3](blob:https://johnfactotum.github.io/71ac6ac2-169c-4fad-b494-59f09ef3781a)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#callout_data_models_and_query_languages_CO3-3)`},`**`function`**`reduce(key, values) {`[![4](blob:https://johnfactotum.github.io/959e9794-1908-4e32-9394-14cf23e3de62)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#callout_data_models_and_query_languages_CO3-4)**`return`**`Array.sum(values);`[![5](blob:https://johnfactotum.github.io/31106dc7-5697-4559-b11f-2375ba48ee3e)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#callout_data_models_and_query_languages_CO3-5)`}, { query: { family: "Sharks" },`[![1](blob:https://johnfactotum.github.io/8c04f3a5-edc3-4bec-800d-97b8aea6bc21)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#callout_data_models_and_query_languages_CO3-1)`out: "monthlySharkReport"`[![6](blob:https://johnfactotum.github.io/f7dd9cd2-14dd-4e78-979d-1b7e8d78497b)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#callout_data_models_and_query_languages_CO3-6)`} );`',
								"[![1](blob:https://johnfactotum.github.io/8c04f3a5-edc3-4bec-800d-97b8aea6bc21)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#co_data_models_and_query_languages_CO3-5)",
								"The filter to consider only shark species can be specified declaratively (this is a MongoDB-specific extension to MapReduce).",
								"[![2](blob:https://johnfactotum.github.io/4fb37c6d-0cd4-4ef8-ad77-0a2954542bc4)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#co_data_models_and_query_languages_CO3-1)",
								"The JavaScript function `map` is called once for every document that matches `query`, with `this` set to the document object.",
								"[![3](blob:https://johnfactotum.github.io/71ac6ac2-169c-4fad-b494-59f09ef3781a)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#co_data_models_and_query_languages_CO3-2)",
								'The `map` function emits a key (a string consisting of year and month, such as `"2013-12"` or `"2014-1"`) and a value (the number of animals in that observation).',
								"[![4](blob:https://johnfactotum.github.io/959e9794-1908-4e32-9394-14cf23e3de62)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#co_data_models_and_query_languages_CO3-3)",
								"The key-value pairs emitted by `map` are grouped by key. For all key-value pairs with the same key (i.e., the same month and year), the `reduce` function is called once.",
								"[![5](blob:https://johnfactotum.github.io/31106dc7-5697-4559-b11f-2375ba48ee3e)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#co_data_models_and_query_languages_CO3-4)",
								"The `reduce` function adds up the number of animals from all observations in a particular month.",
								"[![6](blob:https://johnfactotum.github.io/f7dd9cd2-14dd-4e78-979d-1b7e8d78497b)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#co_data_models_and_query_languages_CO3-6)",
								"The final output is written to the collection `monthlySharkReport`.",
								"For example, say the `observations` collection contains these two documents:",
								'```\n{\n    observationTimestamp: Date.parse("Mon, 25 Dec 1995 12:34:56 GMT"),\n    family:     "Sharks",\n    species:    "Carcharodon carcharias",\n    numAnimals: 3\n}\n{\n    observationTimestamp: Date.parse("Tue, 12 Dec 1995 16:17:18 GMT"),\n    family:     "Sharks",\n    species:    "Carcharias taurus",\n    numAnimals: 4\n}\n```',
								'The `map` function would be called once for each document, resulting in `emit("1995-12", 3)` and `emit("1995-12", 4)`. Subsequently, the `reduce` function would be called with `reduce("1995-12", [3, 4])`, returning `7`.',
								"The `map` and `reduce` functions are somewhat restricted in what they are allowed to do. They must be *pure* functions, which means they only use the data that is passed to them as input, they cannot perform additional database queries, and they must not have any side effects. These restrictions allow the database to run the functions anywhere, in any order, and rerun them on failure. However, they are nevertheless powerful: they can parse strings, call library functions, perform calculations, and more.",
								"MapReduce is a fairly low-level programming model for distributed execution on a cluster of machines. Higher-level query languages like SQL can be implemented as a pipeline of MapReduce operations (see [Chapter 10]()), but there are also many distributed implementations of SQL that don’t use MapReduce. Note there is nothing in SQL that constrains it to running on a single machine, and MapReduce doesn’t have a monopoly on distributed query execution.",
								"Being able to use JavaScript code in the middle of a query is a great feature for advanced queries, but it’s not limited to MapReduce—some SQL databases can be extended with JavaScript functions too \\[[34]()\\].",
								"A usability problem with MapReduce is that you have to write two carefully coordinated JavaScript functions, which is often harder than writing a single query. Moreover, a declarative query language offers more opportunities for a query optimizer to improve the performance of a query. For these reasons, MongoDB 2.2 added support for a declarative query language called the *aggregation pipeline* \\[[9]()\\]. In this language, the same shark-counting query looks like this:",
								'```\ndb.observations.aggregate([\n    { $match: { family: "Sharks" } },\n    { $group: {\n        _id: {\n            year:  { $year:  "$observationTimestamp" },\n            month: { $month: "$observationTimestamp" }\n        },\n        totalAnimals: { $sum: "$numAnimals" }\n    } }\n]);\n```',
								"The aggregation pipeline language is similar in expressiveness to a subset of SQL, but it uses a JSON-based syntax rather than SQL’s English-sentence-style syntax; the difference is perhaps a matter of taste. The moral of the story is that a NoSQL system may find itself accidentally reinventing SQL, albeit in disguise.",
							],
							summary: [
								"MapReduce processes big data with JavaScript functions, but MongoDB's aggregation pipeline simplifies queries.",
							],
							longSummary: [
								"MapReduce is a programming model for processing large datasets across multiple machines, popularized by Google and supported by NoSQL datastores like MongoDB and CouchDB. It operates between declarative and imperative query languages, using code snippets repeatedly called by the processing framework. In MongoDB, MapReduce involves writing map and reduce JavaScript functions to emit key-value pairs and aggregate results, such as counting shark sightings per month. These functions must be pure, without side effects. Due to usability challenges, MongoDB 2.2 introduced a declarative 'aggregation pipeline' with JSON-based syntax, reflecting a trend of NoSQL systems reinventing SQL-like functionality.",
							],
							imageUrl:
								"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747124069/blog-cover-images/vikqeqgafslfihgq2syc.webp",
						},
					
				],
				summary: [
					"SQL's declarative power surpasses imperative code, optimizing performance and simplifying complex queries.",
				],
				longSummary: [
					"The relational model introduced SQL, a declarative query language, which contrasts with imperative languages like those used in IMS and CODASYL. Unlike imperative programming that requires step-by-step instructions, SQL allows you to declare the desired data pattern, such as using 'SELECT * FROM animals WHERE family = 'Sharks'', without detailing the process. This approach is more concise, hides implementation details, and enables database optimization and parallel execution. Declarative languages, like CSS for web styling, offer simplicity and efficiency over imperative methods like JavaScript. Similarly, MapReduce, used in NoSQL databases like MongoDB, combines declarative and imperative elements but faces usability challenges, leading to the development of more SQL-like declarative languages.",
				],
				imageUrl:
					"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747124044/blog-cover-images/vivoi5mict7tvrkf0nft.webp",
			},
			{
				heading: ["# **Graph-Like Data Models**"],
				children: [
					
						{
							heading: ["## **Property Graphs**"],
							children: [
								"In the property graph model, each vertex consists of:",
								"* A unique identifier",
								"* A set of outgoing edges",
								"* A set of incoming edges",
								"* A collection of properties (key-value pairs)",
								"Each edge consists of:",
								"* A unique identifier",
								"* The vertex at which the edge starts (the *tail vertex*)",
								"* The vertex at which the edge ends (the *head vertex*)",
								"* A label to describe the kind of relationship between the two vertices",
								"* A collection of properties (key-value pairs)",
								"You can think of a graph store as consisting of two relational tables, one for vertices and one for edges, as shown in [Example 2-2](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_graph_sql_schema) (this schema uses the PostgreSQL `json` datatype to store the properties of each vertex or edge). The head and tail vertex are stored for each edge; if you want the set of incoming or outgoing edges for a vertex, you can query the `edges` table by `head_vertex` or `tail_vertex`, respectively.",
								"##### *Example 2-2. Representing a property graph using a relational schema*",
								"```\nCREATE TABLE vertices (\n    vertex_id   integer PRIMARY KEY,\n    properties  json\n);\n\nCREATE TABLE edges (\n    edge_id     integer PRIMARY KEY,\n    tail_vertex integer REFERENCES vertices (vertex_id),\n    head_vertex integer REFERENCES vertices (vertex_id),\n    label       text,\n    properties  json\n);\n\nCREATE INDEX edges_tails ON edges (tail_vertex);\nCREATE INDEX edges_heads ON edges (head_vertex);\n```",
								"Some important aspects of this model are:",
								"1. Any vertex can have an edge connecting it with any other vertex. There is no schema that restricts which kinds of things can or cannot be associated.",
								"2. Given any vertex, you can efficiently find both its incoming and its outgoing edges, and thus *traverse* the graph—i.e., follow a path through a chain of vertices—both forward and backward. (That’s why [Example 2-2](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_graph_sql_schema) has indexes on both the `tail_vertex` and `head_vertex` columns.)",
								"3. By using different labels for different kinds of relationships, you can store several different kinds of information in a single graph, while still maintaining a clean data model.",
								"Those features give graphs a great deal of flexibility for data modeling, as illustrated in [Figure 2-5](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_datamodels_graph). The figure shows a few things that would be difficult to express in a traditional relational schema, such as different kinds of regional structures in different countries (France has *départements* and *régions*, whereas the US has *counties* and *states*), quirks of history such as a country within a country (ignoring for now the intricacies of sovereign states and nations), and varying granularity of data (Lucy’s current residence is specified as a city, whereas her place of birth is specified only at the level of a state).",
								"You could imagine extending the graph to also include many other facts about Lucy and Alain, or other people. For instance, you could use it to indicate any food allergies they have (by introducing a vertex for each allergen, and an edge between a person and an allergen to indicate an allergy), and link the allergens with a set of vertices that show which foods contain which substances. Then you could write a query to find out what is safe for each person to eat. Graphs are good for evolvability: as you add features to your application, a graph can easily be extended to accommodate changes in your application’s data structures.",
							],
							summary: [
								"Discover how property graphs model complex, evolving structures with flexible, schema-free connections.",
							],
							longSummary: [
								"In the property graph model, each vertex and edge has a unique identifier, with vertices having properties and edges having labels and properties. This model is efficiently represented in relational tables, allowing any vertex to connect to another without schema restrictions and enabling efficient bidirectional traversal through indexed vertices. It supports diverse relationship types with different labels, making it ideal for modeling complex structures like regional organizations, historical quirks, and data with varying granularity. The model's flexibility and evolvability allow it to easily adapt to new features and changing data structures, making it highly effective for dynamic data representation.",
							],
							imageUrl:
								"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747124089/blog-cover-images/rpeisdhlnkx5pbagpvgt.webp",
						},
						{
							heading: ["## **The Cypher Query Language**"],
							children: [
								"*Cypher* is a declarative query language for property graphs, created for the Neo4j graph database \\[[37]()\\]. (It is named after a character in the movie *The Matrix* and is not related to ciphers in cryptography \\[[38]()\\].)",
								"[Example 2-3](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_cypher_create) shows the Cypher query to insert the lefthand portion of [Figure 2-5](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_datamodels_graph) into a graph database. The rest of the graph can be added similarly and is omitted for readability. Each vertex is given a symbolic name like `USA` or `Idaho`, and other parts of the query can use those names to create edges between the vertices, using an arrow notation: `(Idaho) -[:WITHIN]-> (USA)` creates an edge labeled `WITHIN`, with `Idaho` as the tail node and `USA` as the head node.",
								"##### *Example 2-3. A subset of the data in [Figure 2-5](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_datamodels_graph), represented as a Cypher query*",
								"```\nCREATE\n  (NAmerica:Location {name:'North America', type:'continent'}),\n  (USA:Location      {name:'United States', type:'country'  }),\n  (Idaho:Location    {name:'Idaho',         type:'state'    }),\n  (Lucy:Person       {name:'Lucy' }),\n  (Idaho) -[:WITHIN]->  (USA)  -[:WITHIN]-> (NAmerica),\n  (Lucy)  -[:BORN_IN]-> (Idaho)\n```",
								"When all the vertices and edges of [Figure 2-5](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_datamodels_graph) are added to the database, we can start asking interesting questions: for example, *find the names of all the people who emigrated from the United States to Europe*. To be more precise, here we want to find all the vertices that have a `BORN_IN` edge to a location within the US, and also a `LIVING_IN` edge to a location within Europe, and return the `name` property of each of those vertices.",
								"[Example 2-4](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_cypher_query) shows how to express that query in Cypher. The same arrow notation is used in a `MATCH` clause to find patterns in the graph: `(person) -[:BORN_IN]-> ()` matches any two vertices that are related by an edge labeled `BORN_IN`. The tail vertex of that edge is bound to the variable `person`, and the head vertex is left unnamed.",
								"##### *Example 2-4. Cypher query to find people who emigrated from the US to Europe*",
								"```\nMATCH\n  (person) -[:BORN_IN]->  () -[:WITHIN*0..]-> (us:Location {name:'United States'}),\n  (person) -[:LIVES_IN]-> () -[:WITHIN*0..]-> (eu:Location {name:'Europe'})\nRETURN person.name\n```",
								"The query can be read as follows:",
								"> *Find any vertex (call it `person`) that meets both of the following conditions:*",
								'> 1. *`person` has an outgoing `BORN_IN` edge to some vertex. From that vertex, you can follow a chain of outgoing `WITHIN` edges until eventually you reach a vertex of type `Location`, whose `name` property is equal to `"United States"`.*\n> 2. *That same `person` vertex also has an outgoing `LIVES_IN` edge. Following that edge, and then a chain of outgoing `WITHIN` edges, you eventually reach a vertex of type `Location`, whose `name` property is equal to `"Europe"`.*',
								"> *For each such `person` vertex, return the `name` property.*",
								"There are several possible ways of executing the query. The description given here suggests that you start by scanning all the people in the database, examine each person’s birthplace and residence, and return only those people who meet the criteria.",
								"But equivalently, you could start with the two `Location` vertices and work backward. If there is an index on the `name` property, you can probably efficiently find the two vertices representing the US and Europe. Then you can proceed to find all locations (states, regions, cities, etc.) in the US and Europe respectively by following all incoming `WITHIN` edges. Finally, you can look for people who can be found through an incoming `BORN_IN` or `LIVES_IN` edge at one of the location vertices.",
								"As is typical for a declarative query language, you don’t need to specify such execution details when writing the query: the query optimizer automatically chooses the strategy that is predicted to be the most efficient, so you can get on with writing the rest of your application.",
							],
							summary: [
								"Cypher: Effortlessly query Neo4j graphs with intuitive arrow syntax and powerful pattern matching.",
							],
							longSummary: [
								"Cypher is a declarative query language designed for Neo4j databases, enabling users to create and query property graphs using an intuitive arrow notation. For instance, vertices like 'USA' and 'Idaho' are connected with edges using syntax such as '(Idaho) -[:WITHIN]-> (USA)'. The MATCH clause allows for complex queries, such as identifying people who emigrated from the US to Europe by tracing relationship chains. As a declarative language, Cypher lets users specify desired data without detailing execution strategies, with the query optimizer selecting the most efficient method, whether scanning all people or using indexes.",
							],
							imageUrl:
								"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747124100/blog-cover-images/lxy7lechfcmcuitxcmxp.webp",
						},
						{
							heading: ["## **Graph Queries in SQL**"],
							children: [
								"[Example 2-2](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_graph_sql_schema) suggested that graph data can be represented in a relational database. But if we put graph data in a relational structure, can we also query it using SQL?",
								"The answer is yes, but with some difficulty. In a relational database, you usually know in advance which joins you need in your query. In a graph query, you may need to traverse a variable number of edges before you find the vertex you’re looking for—that is, the number of joins is not fixed in advance.",
								"In our example, that happens in the `() -[:WITHIN*0..]-> ()` rule in the Cypher query. A person’s `LIVES_IN` edge may point at any kind of location: a street, a city, a district, a region, a state, etc. A city may be `WITHIN` a region, a region `WITHIN` a state, a state `WITHIN` a country, etc. The `LIVES_IN` edge may point directly at the location vertex you’re looking for, or it may be several levels removed in the location hierarchy.",
								"In Cypher, `:WITHIN*0..` expresses that fact very concisely: it means “follow a `WITHIN` edge, zero or more times.” It is like the `*` operator in a regular expression.",
								"Since SQL:1999, this idea of variable-length traversal paths in a query can be expressed using something called *recursive common table expressions* (the `WITH RECURSIVE` syntax). [Example 2-5](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_graph_sql_query) shows the same query—finding the names of people who emigrated from the US to Europe—expressed in SQL using this technique (supported in PostgreSQL, IBM DB2, Oracle, and SQL Server). However, the syntax is very clumsy in comparison to Cypher.",
								"##### *Example 2-5. The same query as [Example 2-4](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_cypher_query), expressed in SQL using recursive common table expressions*",
								"```\nWITH RECURSIVE\n\n  -- in_usa is the set of vertex IDs of all locations within the United States\n  in_usa(vertex_id) AS (\n      SELECT vertex_id FROM vertices WHERE properties->>'name' = 'United States' \n```",
								"[![1](blob:https://johnfactotum.github.io/8c04f3a5-edc3-4bec-800d-97b8aea6bc21)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#callout_data_models_and_query_languages_CO4-1)",
								"**`UNION`** **`SELECT`**`edges.tail_vertex`**`FROM`**`edges`[![2](blob:https://johnfactotum.github.io/4fb37c6d-0cd4-4ef8-ad77-0a2954542bc4)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#callout_data_models_and_query_languages_CO4-2)**`JOIN`**`in_usa`**`ON`**`edges.head_vertex = in_usa.vertex_id`**`WHERE`**`edges.label = 'within' ),`*`-- in_europe is the set of vertex IDs of all locations within Europe`*`in_europe(vertex_id)`**`AS`**`(`**`SELECT`**`vertex_id`**`FROM`**`vertices`**`WHERE`**`properties->>'name' = 'Europe'`[![3](blob:https://johnfactotum.github.io/71ac6ac2-169c-4fad-b494-59f09ef3781a)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#callout_data_models_and_query_languages_CO4-3)**`UNION`** **`SELECT`**`edges.tail_vertex`**`FROM`**`edges`**`JOIN`**`in_europe`**`ON`**`edges.head_vertex = in_europe.vertex_id`**`WHERE`**`edges.label = 'within' ),`*`-- born_in_usa is the set of vertex IDs of all people born in the US`*`born_in_usa(vertex_id)`**`AS`**`(`[![4](blob:https://johnfactotum.github.io/959e9794-1908-4e32-9394-14cf23e3de62)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#callout_data_models_and_query_languages_CO4-4)**`SELECT`**`edges.tail_vertex`**`FROM`**`edges`**`JOIN`**`in_usa`**`ON`**`edges.head_vertex = in_usa.vertex_id`**`WHERE`**`edges.label = 'born_in' ),`*`-- lives_in_europe is the set of vertex IDs of all people living in Europe`*`lives_in_europe(vertex_id)`**`AS`**`(`[![5](blob:https://johnfactotum.github.io/31106dc7-5697-4559-b11f-2375ba48ee3e)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#callout_data_models_and_query_languages_CO4-5)**`SELECT`**`edges.tail_vertex`**`FROM`**`edges`**`JOIN`**`in_europe`**`ON`**`edges.head_vertex = in_europe.vertex_id`**`WHERE`**`edges.label = 'lives_in' )`**`SELECT`**`vertices.properties->>'name'`**`FROM`**`vertices`*`-- join to find those people who were both born in the US *and* live in Europe`* **`JOIN`**`born_in_usa`**`ON`**`vertices.vertex_id = born_in_usa.vertex_id`[![6](blob:https://johnfactotum.github.io/f7dd9cd2-14dd-4e78-979d-1b7e8d78497b)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#callout_data_models_and_query_languages_CO4-6)**`JOIN`**`lives_in_europe`**`ON`**`vertices.vertex_id = lives_in_europe.vertex_id;`",
								"[![1](blob:https://johnfactotum.github.io/8c04f3a5-edc3-4bec-800d-97b8aea6bc21)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#co_data_models_and_query_languages_CO4-1)",
								'First find the vertex whose `name` property has the value `"United States"`, and make it the first element of the set of vertices `in_usa`.',
								"[![2](blob:https://johnfactotum.github.io/4fb37c6d-0cd4-4ef8-ad77-0a2954542bc4)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#co_data_models_and_query_languages_CO4-2)",
								"Follow all incoming `within` edges from vertices in the set `in_usa`, and add them to the same set, until all incoming `within` edges have been visited.",
								"[![3](blob:https://johnfactotum.github.io/71ac6ac2-169c-4fad-b494-59f09ef3781a)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#co_data_models_and_query_languages_CO4-3)",
								'Do the same starting with the vertex whose `name` property has the value `"Europe"`, and build up the set of vertices `in_europe`.',
								"[![4](blob:https://johnfactotum.github.io/959e9794-1908-4e32-9394-14cf23e3de62)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#co_data_models_and_query_languages_CO4-4)",
								"For each of the vertices in the set `in_usa`, follow incoming `born_in` edges to find people who were born in some place within the United States.",
								"[![5](blob:https://johnfactotum.github.io/31106dc7-5697-4559-b11f-2375ba48ee3e)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#co_data_models_and_query_languages_CO4-5)",
								"Similarly, for each of the vertices in the set `in_europe`, follow incoming `lives_in` edges to find people who live in Europe.",
								"[![6](blob:https://johnfactotum.github.io/f7dd9cd2-14dd-4e78-979d-1b7e8d78497b)](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#co_data_models_and_query_languages_CO4-6)",
								"Finally, intersect the set of people born in the USA with the set of people living in Europe, by joining them.",
								"If the same query can be written in 4 lines in one query language but requires 29 lines in another, that just shows that different data models are designed to satisfy different use cases. It’s important to pick a data model that is suitable for your application.",
							],
							summary: [
								"Graph queries are simpler in Cypher than SQL, highlighting the importance of data model choice.",
							],
							longSummary: [
								"Graph data can be represented in relational databases and queried with SQL, but it's more challenging than using a graph query language like Cypher. In SQL, you typically need to know the necessary joins in advance, whereas graph queries often require traversing a variable number of edges. Cypher's `:WITHIN*0..` efficiently expresses following a `WITHIN` edge zero or more times, akin to a regular expression's `*` operator. Although SQL:1999 introduced recursive common table expressions for variable-length paths, its syntax is cumbersome compared to Cypher. For instance, a query finding emigrants from the US to Europe takes 4 lines in Cypher but 29 in SQL, underscoring the importance of selecting an appropriate data model for your application.",
							],
							imageUrl:
								"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747124108/blog-cover-images/mqniyywfyiydihmlsodj.webp",
						},
						{
							heading: ["## **Triple-Stores and SPARQL**"],
							children: [
								"The triple-store model is mostly equivalent to the property graph model, using different words to describe the same ideas. It is nevertheless worth discussing, because there are various tools and languages for triple-stores that can be valuable additions to your toolbox for building applications.",
								"In a triple-store, all information is stored in the form of very simple three-part statements: (*subject*, *predicate*, *object*). For example, in the triple (*Jim*, *likes*, *bananas*), *Jim* is the subject, *likes* is the predicate (verb), and *bananas* is the object.",
								"The subject of a triple is equivalent to a vertex in a graph. The object is one of two things:",
								'1. A value in a primitive datatype, such as a string or a number. In that case, the predicate and object of the triple are equivalent to the key and value of a property on the subject vertex. For example, (*lucy*, *age*, *33*) is like a vertex `lucy` with properties `{"age":33}`.',
								"2. Another vertex in the graph. In that case, the predicate is an edge in the graph, the subject is the tail vertex, and the object is the head vertex. For example, in (*lucy*, *marriedTo*, *alain*) the subject and object *lucy* and *alain* are both vertices, and the predicate *marriedTo* is the label of the edge that connects them.",
								"[Example 2-6](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_graph_n3_triples) shows the same data as in [Example 2-3](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_cypher_create), written as triples in a format called *Turtle*, a subset of *Notation3* (*N3*) \\[[39]()\\].",
								"##### *Example 2-6. A subset of the data in [Figure 2-5](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_datamodels_graph), represented as Turtle triples*",
								'```\n@prefix : <urn:example:>.\n_:lucy     a       :Person.\n_:lucy     :name   "Lucy".\n_:lucy     :bornIn _:idaho.\n_:idaho    a       :Location.\n_:idaho    :name   "Idaho".\n_:idaho    :type   "state".\n_:idaho    :within _:usa.\n_:usa      a       :Location.\n_:usa      :name   "United States".\n_:usa      :type   "country".\n_:usa      :within _:namerica.\n_:namerica a       :Location.\n_:namerica :name   "North America".\n_:namerica :type   "continent".\n```',
								'In this example, vertices of the graph are written as `_:`*`someName`*. The name doesn’t mean anything outside of this file; it exists only because we otherwise wouldn’t know which triples refer to the same vertex. When the predicate represents an edge, the object is a vertex, as in `_:idaho :within _:usa`. When the predicate is a property, the object is a string literal, as in `_:usa :name "United States"`.',
								"It’s quite repetitive to repeat the same subject over and over again, but fortunately you can use semicolons to say multiple things about the same subject. This makes the Turtle format quite nice and readable: see [Example 2-7](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_graph_n3_shorthand).",
								"##### *Example 2-7. A more concise way of writing the data in [Example 2-6](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_graph_n3_triples)*",
								'```\n@prefix : <urn:example:>.\n_:lucy     a :Person;   :name "Lucy";          :bornIn _:idaho.\n_:idaho    a :Location; :name "Idaho";         :type "state";   :within _:usa.\n_:usa      a :Location; :name "United States"; :type "country"; :within _:namerica.\n_:namerica a :Location; :name "North America"; :type "continent".\n```',
								"### **The semantic web**",
								"If you read more about triple-stores, you may get sucked into a maelstrom of articles written about the *semantic web*. The triple-store data model is completely independent of the semantic web—for example, Datomic \\[[40]()\\] is a triple-store that does not claim to have anything to do with it.[vii]() But since the two are so closely linked in many people’s minds, we should discuss them briefly.",
								"The semantic web is fundamentally a simple and reasonable idea: websites already publish information as text and pictures for humans to read, so why don’t they also publish information as machine-readable data for computers to read? The *Resource Description Framework* (RDF) \\[[41]()\\] was intended as a mechanism for different websites to publish data in a consistent format, allowing data from different websites to be automatically combined into a *web of data*—a kind of internet-wide “database of everything.”",
								"Unfortunately, the semantic web was overhyped in the early 2000s but so far hasn’t shown any sign of being realized in practice, which has made many people cynical about it. It has also suffered from a dizzying plethora of acronyms, overly complex standards proposals, and hubris.",
								"However, if you look past those failings, there is also a lot of good work that has come out of the semantic web project. Triples can be a good internal data model for applications, even if you have no interest in publishing RDF data on the semantic web.",
								"### **The RDF data model**",
								"The Turtle language we used in [Example 2-7](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_graph_n3_shorthand) is a human-readable format for RDF data. Sometimes RDF is also written in an XML format, which does the same thing much more verbosely—see [Example 2-8](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_graph_rdf_xml). Turtle/N3 is preferable as it is much easier on the eyes, and tools like Apache Jena \\[[42]()\\] can automatically convert between different RDF formats if necessary.",
								"##### *Example 2-8. The data of [Example 2-7](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_graph_n3_shorthand), expressed using RDF/XML syntax*",
								'```\n<rdf:RDF xmlns="urn:example:"\n    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n\n  <Location rdf:nodeID="idaho">\n    <name>Idaho</name>\n    <type>state</type>\n    <within>\n      <Location rdf:nodeID="usa">\n        <name>United States</name>\n        <type>country</type>\n        <within>\n          <Location rdf:nodeID="namerica">\n            <name>North America</name>\n            <type>continent</type>\n          </Location>\n        </within>\n      </Location>\n    </within>\n  </Location>\n\n  <Person rdf:nodeID="lucy">\n    <name>Lucy</name>\n    <bornIn rdf:nodeID="idaho"/>\n  </Person>\n</rdf:RDF>\n```',
								"RDF has a few quirks due to the fact that it is designed for internet-wide data exchange. The subject, predicate, and object of a triple are often URIs. For example, a predicate might be an URI such as `<http://my-company.com/namespace#within>` or `<http://my-company.com/namespace#lives_in>`, rather than just `WITHIN` or `LIVES_IN`. The reasoning behind this design is that you should be able to combine your data with someone else’s data, and if they attach a different meaning to the word `within` or `lives_in`, you won’t get a conflict because their predicates are actually `<http://other.org/foo#within>` and `<http://other.org/foo#lives_in>`.",
								"The URL `<http://my-company.com/namespace>` doesn’t necessarily need to resolve to anything—from RDF’s point of view, it is simply a namespace. To avoid potential confusion with `http://` URLs, the examples in this section use non-resolvable URIs such as `urn:example:within`. Fortunately, you can just specify this prefix once at the top of the file, and then forget about it.",
								"### **The SPARQL query language**",
								"*SPARQL* is a query language for triple-stores using the RDF data model \\[[43]()\\]. (It is an acronym for *SPARQL Protocol and RDF Query Language*, pronounced “sparkle.”) It predates Cypher, and since Cypher’s pattern matching is borrowed from SPARQL, they look quite similar \\[[37]()\\].",
								"The same query as before—finding people who have moved from the US to Europe—is even more concise in SPARQL than it is in Cypher (see [Example 2-9](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_sparql_query)).",
								"##### *Example 2-9. The same query as [Example 2-4](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_cypher_query), expressed in SPARQL*",
								'```\nPREFIX : <urn:example:>\n\nSELECT ?personName WHERE {\n  ?person :name ?personName.\n  ?person :bornIn  / :within* / :name "United States".\n  ?person :livesIn / :within* / :name "Europe".\n}\n```',
								"The structure is very similar. The following two expressions are equivalent (variables start with a question mark in SPARQL):",
								"```\n(person) -[:BORN_IN]-> () -[:WITHIN*0..]-> (location)   # Cypher\n\n?person :bornIn / :within* ?location.                   # SPARQL\n```",
								'Because RDF doesn’t distinguish between properties and edges but just uses predicates for both, you can use the same syntax for matching properties. In the following expression, the variable `usa` is bound to any vertex that has a `name` property whose value is the string `"United States"`:',
								"```\n(usa {name:'United States'})   # Cypher\n\n?usa :name \"United States\".    # SPARQL\n```",
								"SPARQL is a nice query language—even if the semantic web never happens, it can be a powerful tool for applications to use internally.",
								[
									{
										heading: [
											"##### **Graph Databases Compared to the Network Model**",
										],
										children: [
											"In [“Are Document Databases Repeating History?”](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#sec_datamodels_codasyl) we discussed how CODASYL and the relational model competed to solve the problem of many-to-many relationships in IMS. At first glance, CODASYL’s network model looks similar to the graph model. Are graph databases the second coming of CODASYL in disguise?",
											"No. They differ in several important ways:",
											"* In CODASYL, a database had a schema that specified which record type could be nested within which other record type. In a graph database, there is no such restriction: any vertex can have an edge to any other vertex. This gives much greater flexibility for applications to adapt to changing requirements.",
											"* In CODASYL, the only way to reach a particular record was to traverse one of the access paths to it. In a graph database, you can refer directly to any vertex by its unique ID, or you can use an index to find vertices with a particular value.",
											"* In CODASYL, the children of a record were an ordered set, so the database had to maintain that ordering (which had consequences for the storage layout) and applications that inserted new records into the database had to worry about the positions of the new records in these sets. In a graph database, vertices and edges are not ordered (you can only sort the results when making a query).",
											"* In CODASYL, all queries were imperative, difficult to write and easily broken by changes in the schema. In a graph database, you can write your traversal in imperative code if you want to, but most graph databases also support high-level, declarative query languages such as Cypher or SPARQL.",
										],
										summary: [
											"Are graph databases repeating history, or revolutionizing data relationships with flexible schemas?",
										],
										longSummary: [
											'In "Are Document Databases Repeating History?" the competition between CODASYL and the relational model for handling many-to-many relationships in IMS is explored. While CODASYL\'s network model resembles the graph model, graph databases offer distinct advantages: they lack schema restrictions on vertex connections, allow direct access to vertices by ID or indexes, and do not require ordered sets for vertices and edges. Additionally, graph databases support high-level, declarative query languages like Cypher or SPARQL, unlike the imperative queries of the past, which were complex and prone to breaking with schema changes.',
										],
										imageUrl:
											"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747124132/blog-cover-images/ezlnwdsmvvwxgycwiyi7.webp",
									},
								],
							],
							summary: [
								"Explore how triple-stores and property graphs redefine data relationships with RDF and SPARQL.",
							],
							longSummary: [
								"The triple-store model, akin to the property graph model, stores data as three-part statements: (subject, predicate, object). Here, the subject is like a graph vertex, and the object can be a datatype value or another vertex, with the predicate acting as an edge. Triple-stores, often used in semantic web contexts, are valuable for internal data models and can be represented in formats like Turtle/N3. RDF facilitates internet-wide data exchange using URIs, while SPARQL, a query language for triple-stores, offers pattern matching similar to Cypher. Unlike CODASYL's network model, graph databases allow flexible vertex connections, direct access, and support high-level query languages.",
							],
							imageUrl:
								"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747124121/blog-cover-images/mv819bdyepospsdhj2xw.webp",
						},
						{
							heading: ["## **The Foundation: Datalog**"],
							children: [
								"*Datalog* is a much older language than SPARQL or Cypher, having been studied extensively by academics in the 1980s \\[[44](), [45](), [46]()\\]. It is less well known among software engineers, but it is nevertheless important, because it provides the foundation that later query languages build upon.",
								"In practice, Datalog is used in a few data systems: for example, it is the query language of Datomic \\[[40]()\\], and Cascalog \\[[47]()\\] is a Datalog implementation for querying large datasets in Hadoop.[viii]()",
								"Datalog’s data model is similar to the triple-store model, generalized a bit. Instead of writing a triple as (*subject*, *predicate*, *object*), we write it as *predicate*(*subject*, *object*). [Example 2-10](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_datalog_triples) shows how to write the data from our example in Datalog.",
								"##### *Example 2-10. A subset of the data in [Figure 2-5](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_datamodels_graph), represented as Datalog facts*",
								"```\nname(namerica, 'North America').\ntype(namerica, continent).\n\nname(usa, 'United States').\ntype(usa, country).\nwithin(usa, namerica).\n\nname(idaho, 'Idaho').\ntype(idaho, state).\nwithin(idaho, usa).\n\nname(lucy, 'Lucy').\nborn_in(lucy, idaho).\n```",
								"Now that we have defined the data, we can write the same query as before, as shown in [Example 2-11](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_datalog_query). It looks a bit different from the equivalent in Cypher or SPARQL, but don’t let that put you off. Datalog is a subset of Prolog, which you might have seen before if you’ve studied computer science.",
								"##### *Example 2-11. The same query as [Example 2-4](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_cypher_query), expressed in Datalog*",
								"```\nwithin_recursive(Location, Name) :- name(Location, Name).     /* Rule 1 */\n\nwithin_recursive(Location, Name) :- within(Location, Via),    /* Rule 2 */\n                                    within_recursive(Via, Name).\n\nmigrated(Name, BornIn, LivingIn) :- name(Person, Name),       /* Rule 3 */\n                                    born_in(Person, BornLoc),\n                                    within_recursive(BornLoc, BornIn),\n                                    lives_in(Person, LivingLoc),\n                                    within_recursive(LivingLoc, LivingIn).\n\n?- migrated(Who, 'United States', 'Europe').\n/* Who = 'Lucy'. */\n```",
								"Cypher and SPARQL jump in right away with `SELECT`, but Datalog takes a small step at a time. We define *rules* that tell the database about new predicates: here, we define two new predicates, `within_recursive` and `migrated`. These predicates aren’t triples stored in the database, but instead they are derived from data or from other rules. Rules can refer to other rules, just like functions can call other functions or recursively call themselves. Like this, complex queries can be built up a small piece at a time.",
								"In rules, words that start with an uppercase letter are variables, and predicates are matched like in Cypher and SPARQL. For example, `name(Location, Name)` matches the triple `name(namerica, 'North America')` with variable bindings `Location = namerica` and `Name = 'North America'`.",
								"A rule applies if the system can find a match for *all* predicates on the righthand side of the `:-` operator. When the rule applies, it’s as though the lefthand side of the `:-` was added to the database (with variables replaced by the values they matched).",
								"One possible way of applying the rules is thus:",
								"1. `name(namerica, 'North America')` exists in the database, so rule 1 applies. It generates `within_recursive(namerica, 'North America')`.",
								"2. `within(usa, namerica)` exists in the database and the previous step generated `within_recursive(namerica, 'North America')`, so rule 2 applies. It generates `within_recursive(usa, 'North America')`.",
								"3. `within(idaho, usa)` exists in the database and the previous step generated `within_recursive(usa, 'North America')`, so rule 2 applies. It generates `within_recursive(idaho, 'North America')`.",
								"By repeated application of rules 1 and 2, the `within_recursive` predicate can tell us all the locations in North America (or any other location name) contained in our database. This process is illustrated in [Figure 2-6](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_datalog_naive).",
								"![ddia 0206](blob:https://johnfactotum.github.io/5714cb8b-8908-4fbf-93a8-92bf97593780)",
								"###### *Figure 2-6. Determining that Idaho is in North America, using the Datalog rules from [Example 2-11](blob:https://johnfactotum.github.io/b980ba5f-a8f7-415e-ab16-dc85fa593497#fig_datalog_query).*",
								"Now rule 3 can find people who were born in some location `BornIn` and live in some location `LivingIn`. By querying with `BornIn = 'United States'` and `LivingIn = 'Europe'`, and leaving the person as a variable `Who`, we ask the Datalog system to find out which values can appear for the variable `Who`. So, finally we get the same answer as in the earlier Cypher and SPARQL queries.",
								"The Datalog approach requires a different kind of thinking to the other query languages discussed in this chapter, but it’s a very powerful approach, because rules can be combined and reused in different queries. It’s less convenient for simple one-off queries, but it can cope better if your data is complex.",
							],
							summary: [
								"Datalog: A powerful, rule-based query language for complex data, foundational to modern systems.",
							],
							longSummary: [
								"Datalog, an older language than SPARQL or Cypher, laid the groundwork for later query languages and is used in systems like Datomic and Cascalog. Its data model resembles a triple-store, with predicates written as predicate(subject, object). Unlike Cypher and SPARQL, which start with SELECT, Datalog builds queries incrementally by defining rules that create new predicates from data or other rules. Variables start with uppercase letters, and a rule applies if all predicates on the right of the :- operator match. Though less convenient for simple queries, Datalog excels in handling complex data, as shown in queries like finding people who migrated from the United States to Europe.",
							],
							imageUrl:
								"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747124143/blog-cover-images/ow46iztwiwvwkz7paasv.webp",
						},
					
				],
				summary: [
					"Graph databases excel in modeling complex relationships, offering flexibility and efficient querying.",
				],
				longSummary: [
					"Many-to-many relationships are crucial in selecting data models. Document models suit one-to-many or tree-structured data, but graph models are ideal for complex connections. Graphs, comprising vertices and edges, can represent diverse data like social networks and transportation networks. They support algorithms like shortest path finding and PageRank. Graph models include the property graph model (used by Neo4j) and the triple-store model (used by Datomic), with query languages like Cypher and SPARQL. Cypher, a declarative language, simplifies querying by allowing users to specify desired data without detailing execution strategies. Graph databases excel in flexibility, evolvability, and handling complex structures, unlike relational databases, which struggle with variable-length traversals. Triple-stores, using subject-predicate-object statements, are valuable for internal data models and internet-wide data exchange. Datalog, an older language, provides a foundation for query languages, handling complex data through rule-based queries. Graph databases differ from CODASYL's network model by having no schema restrictions and supporting high-level query languages.",
				],
				imageUrl:
					"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747124080/blog-cover-images/lyfdful5a2uq1pjzvdwl.webp",
			},
			{
				heading: ["# **Summary**"],
				children: [
				],
				summary: [
					"Explore the evolution of data models: hierarchical, relational, and NoSQL, each excelling uniquely.",
				],
				longSummary: [
					'Data models encompass a wide range of systems, each suited to different needs. Historically, data was organized in a hierarchical model, but the relational model emerged to manage many-to-many relationships. Recently, nonrelational "NoSQL" databases have evolved into document databases for self-contained documents and graph databases for complex relationships. Each model excels in its domain, and while they can emulate each other, it often results in inefficiencies. Document and graph databases typically lack enforced schemas, allowing flexibility, though some structure is assumed. Various query languages exist, such as SQL, MapReduce, and Cypher. Specialized models cater to specific fields like genome data and full-text search.',
				],
				imageUrl:
					"https://res.cloudinary.com/dx1e14ftg/image/upload/v1747124154/blog-cover-images/izuey2oze4fu5rkle4lj.webp",
			},
		],
		summary: [
			"Data models shape software development, influencing problem-solving and technology choices across diverse applications.",
		],
		longSummary: [
			"Data models are essential in software development, influencing both the construction of software and the conceptualization of problems. Developers layer data models, using structures like JSON or relational databases to represent real-world scenarios. Database engineers manage data representation in memory or on disk, while hardware engineers handle byte-level physical representation. These abstractions facilitate collaboration across different groups. The relational model, introduced by Edgar Codd in 1970, became dominant by the mid-1980s, powering diverse applications beyond its initial business use. Despite challenges from NoSQL and document databases, relational databases remain prevalent due to their robust support for many-to-many relationships and joins. NoSQL databases emerged to address scalability and flexibility issues, offering schema-on-read capabilities and better alignment with application data structures. However, they struggle with complex relationships, often requiring denormalization or emulating joins in application code. Graph databases, with models like property graphs and triple-stores, excel in highly interconnected data scenarios, offering flexible schema-less structures and powerful query languages like Cypher and SPARQL. Each data model has its strengths, with document models suited for tree-structured data, relational models for interconnected data, and graph models for complex networks. The choice of data model depends on the application's specific requirements, with hybrid approaches becoming increasingly common.",
		],
	};

	return designing_data_intesive_2;
}
