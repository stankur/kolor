import { createClient } from '@supabase/supabase-js';

// These environment variables would typically be set in your project
// For production, use proper environment variable configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// Create a single supabase client for the entire application
export const supabase = createClient(supabaseUrl, supabaseKey);

// Interface definitions based on your specifications
export interface Section {
  heading: string[];
  children: SectionContainer | string[];
  summary: string[];
  longSummary: string[];
  imageUrl?: string;
  directContent: string[];
}

export type SectionContainer = Section[];

export interface Document {
  title: string[];
  summary: string[];
  longSummary: string[];
  children: SectionContainer;
}

// Example: Fetch document by title
export async function fetchDocumentByTitle(title: string): Promise<Document | null> {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('document')
      .eq('title', title)
      .single();

    if (error) throw error;
    return data?.document as Document;
  } catch (error) {
    console.error('Error fetching document:', error);
    return null;
  }
}

// Mock data implementation for development
export function getMockDocument(): Document {
  // This is an example mock document that follows your structure
  const mockDocument: Document = {
    title: ["The Story of Everything"],
    summary: ["A journey from the Big Bang to consciousness"],
    longSummary: ["This comprehensive book takes you through the entire history of the universe, from the first moments after the Big Bang, through the formation of stars and planets, to the emergence of life and consciousness on Earth."],
    children: [
      {
        heading: ["The Beginning of Time"],
        summary: ["How the universe came to be in its earliest moments."],
        longSummary: ["This chapter explores the fascinating theories about the birth of our universe, from the Big Bang to inflation theory. We examine the evidence from cosmic background radiation and what it tells us about the universe's origins. The chapter also discusses how the fundamental forces of nature emerged in the first fractions of a second after creation."],
        directContent: [],
        children: [
          {
            heading: ["The Big Bang Theory"],
            summary: ["Evidence and development of the Big Bang model."],
            longSummary: ["The Big Bang theory is the prevailing cosmological model explaining the existence of the observable universe from the earliest known periods through its subsequent large-scale evolution. The model describes how the universe expanded from an initial state of high density and temperature, and offers a comprehensive explanation for a broad range of observed phenomena."],
            directContent: ["The theory was initially proposed by Georges Lemaître in 1927."],
            children: [
              {
                heading: ["Historical Development"],
                summary: ["How the Big Bang theory evolved over time."],
                longSummary: ["The concept of the Big Bang has evolved significantly since it was first proposed, incorporating new observations and theoretical developments in physics."],
                directContent: ["The term 'Big Bang' was coined by Fred Hoyle during a radio broadcast in 1949."],
                children: [] as string[]
              },
              {
                heading: ["Observable Evidence"],
                summary: ["Key observations supporting the Big Bang theory."],
                longSummary: ["Multiple lines of observational evidence support the Big Bang theory, including cosmic microwave background radiation, the abundance of light elements, and the redshift of distant galaxies."],
                directContent: ["The cosmic microwave background radiation, discovered in 1965, is considered the strongest evidence for the Big Bang."],
                children: [] as string[]
              }
            ]
          },
          {
            heading: ["The First Three Minutes"],
            summary: ["What happened immediately after the Big Bang."],
            longSummary: ["The first three minutes after the Big Bang were crucial for the development of the universe as we know it. During this brief period, the fundamental forces separated, quarks formed hadrons, and light elements began to form."],
            directContent: [],
            children: [
              {
                heading: ["Planck Epoch"],
                summary: ["The earliest known period of the universe."],
                longSummary: ["During the Planck epoch, from zero to approximately 10^-43 seconds after the Big Bang, all four fundamental forces were unified as a single force."],
                directContent: ["This epoch is named after Max Planck, the founder of quantum theory."],
                children: [] as string[]
              },
              {
                heading: ["Inflationary Period"],
                summary: ["The rapid expansion of the early universe."],
                longSummary: ["The inflationary period was an extremely rapid expansion of the universe that occurred between 10^-36 to 10^-32 seconds after the Big Bang."],
                directContent: ["Cosmic inflation explains why the universe appears flat and uniform at large scales."],
                children: [] as string[]
              }
            ]
          },
          {
            heading: ["Formation of Fundamental Forces"],
            summary: ["How the four fundamental forces separated."],
            longSummary: ["The four fundamental forces—gravity, electromagnetism, the strong nuclear force, and the weak nuclear force—were unified in the extreme heat of the early universe and separated as the universe cooled."],
            directContent: [],
            children: [
              {
                heading: ["Symmetry Breaking"],
                summary: ["The process of force separation."],
                longSummary: ["Symmetry breaking is a phenomenon in which the universe transitions from a symmetric state to one with reduced symmetry, allowing the fundamental forces to separate."],
                directContent: ["The concept of symmetry breaking in physics was developed by Yoichiro Nambu in the 1960s."],
                children: [] as string[]
              },
              {
                heading: ["Electroweak Separation"],
                summary: ["The separation of electromagnetic and weak forces."],
                longSummary: ["The electroweak interaction is the unified description of two of the four fundamental forces: electromagnetism and the weak interaction."],
                directContent: ["The electroweak theory was developed by Sheldon Glashow, Abdus Salam, and Steven Weinberg, who shared the 1979 Nobel Prize in Physics for this work."],
                children: [] as string[]
              }
            ]
          }
        ]
      },
      {
        heading: ["The Rise of Complexity"],
        summary: ["From simple atoms to the first complex molecules."],
        longSummary: ["Following the initial expansion and cooling of the universe, this chapter tracks how simple hydrogen and helium atoms formed, then clustered into stars where nuclear fusion created heavier elements. We explore stellar lifecycles and how supernovae scattered these elements across space, enabling the formation of planets and eventually complex organic molecules."],
        directContent: [],
        children: [
          {
            heading: ["Element Formation in Stars"],
            summary: ["How fusion creates heavier elements."],
            longSummary: ["Stars act as cosmic factories, fusing lighter elements into heavier ones through nuclear fusion. This process, known as stellar nucleosynthesis, is responsible for creating most of the elements in the universe."],
            directContent: [],
            children: [
              {
                heading: ["Hydrogen Fusion"],
                summary: ["The primary energy source in main sequence stars."],
                longSummary: ["Hydrogen fusion is the process by which four hydrogen nuclei combine to form a helium nucleus, releasing energy that powers stars like our sun."],
                directContent: ["The primary fusion path in our sun is called the proton-proton chain."],
                children: [] as string[]
              },
              {
                heading: ["Helium Burning"],
                summary: ["The next stage of stellar fusion."],
                longSummary: ["When stars exhaust their hydrogen fuel, they begin to fuse helium into carbon and oxygen in a process called helium burning or the triple-alpha process."],
                directContent: ["Helium burning typically occurs at temperatures around 100 million Kelvin."],
                children: [] as string[]
              }
            ]
          },
          {
            heading: ["Supernovae and Element Dispersal"],
            summary: ["How elements spread throughout galaxies."],
            longSummary: ["Supernovae are powerful explosions that mark the end of a star's life. These cosmic events distribute heavy elements throughout space, enriching the interstellar medium with the building blocks for new stars, planets, and eventually life."],
            directContent: [],
            children: [
              {
                heading: ["Types of Supernovae"],
                summary: ["Different mechanisms for stellar explosions."],
                longSummary: ["There are two main types of supernovae: Type Ia, which occur in binary star systems when a white dwarf accretes material from its companion; and Type II, which result from the collapse of massive stars."],
                directContent: ["Type Ia supernovae are used as 'standard candles' to measure cosmic distances."],
                children: [] as string[]
              },
              {
                heading: ["Heavy Element Creation"],
                summary: ["Formation of elements heavier than iron."],
                longSummary: ["Elements heavier than iron cannot be produced through fusion in stellar cores because these reactions would consume rather than release energy. Instead, these elements form during supernovae through rapid neutron capture processes."],
                directContent: ["Gold, platinum, and uranium are primarily created in neutron star mergers and supernovae."],
                children: [] as string[]
              }
            ]
          }
        ]
      },
      {
        heading: ["The Emergence of Life"],
        summary: ["How chemistry transformed into biology on early Earth."],
        longSummary: ["This chapter examines the conditions of early Earth and how they facilitated the transition from complex organic chemistry to self-replicating systems. We explore leading theories about the origin of life, from deep-sea hydrothermal vents to RNA world hypotheses, and how the first primitive cells may have developed their basic metabolic processes and protective membranes."],
        directContent: [],
        children: [
          {
            heading: ["Prebiotic Chemistry"],
            summary: ["Chemical precursors to biological systems."],
            longSummary: ["Prebiotic chemistry refers to the chemical reactions that occurred on early Earth before the emergence of life, producing the organic compounds necessary for biological processes."],
            directContent: [],
            children: [
              {
                heading: ["Miller-Urey Experiment"],
                summary: ["Simulating early Earth conditions."],
                longSummary: ["The Miller-Urey experiment, conducted in 1952, demonstrated that organic compounds including amino acids could be synthesized from simple inorganic precursors under conditions simulating early Earth's atmosphere."],
                directContent: ["The experiment produced at least 11 of the 20 amino acids used in proteins by living organisms."],
                children: [] as string[]
              },
              {
                heading: ["Formation of Amino Acids"],
                summary: ["Building blocks of proteins."],
                longSummary: ["Amino acids, the building blocks of proteins, could have formed on early Earth through various mechanisms, including atmospheric reactions, hydrothermal vents, and extraterrestrial delivery via meteorites."],
                directContent: ["Amino acids have been found in meteorites, suggesting they may be common throughout the universe."],
                children: [] as string[]
              }
            ]
          },
          {
            heading: ["RNA World Hypothesis"],
            summary: ["RNA as the original self-replicating molecule."],
            longSummary: ["The RNA world hypothesis suggests that before DNA and proteins, life was based on RNA molecules that could both store genetic information and catalyze chemical reactions."],
            directContent: [],
            children: [
              {
                heading: ["RNA Catalysis"],
                summary: ["RNA molecules acting as enzymes."],
                longSummary: ["Ribozymes are RNA molecules that can catalyze chemical reactions, similar to protein enzymes. Their discovery supported the RNA world hypothesis by showing that RNA could have both carried genetic information and facilitated metabolism."],
                directContent: ["The discovery of ribozymes by Thomas Cech and Sidney Altman earned them the Nobel Prize in Chemistry in 1989."],
                children: [] as string[]
              },
              {
                heading: ["From RNA to DNA"],
                summary: ["The transition to modern genetics."],
                longSummary: ["The transition from an RNA-based world to the DNA-protein world we see today likely occurred gradually, with DNA evolving as a more stable storage medium for genetic information and proteins taking over most catalytic functions."],
                directContent: ["DNA is more stable than RNA because its sugar component lacks an oxygen atom, making it less prone to degradation."],
                children: [] as string[]
              }
            ]
          },
          {
            heading: ["First Cell Membranes"],
            summary: ["Development of contained biological systems."],
            longSummary: ["Cell membranes were crucial for the origin of life, providing enclosed environments where biochemical reactions could occur concentrated and protected from the external environment."],
            directContent: [],
            children: [
              {
                heading: ["Lipid Formation"],
                summary: ["Self-assembling molecules."],
                longSummary: ["Lipids can spontaneously form bilayers in water due to their amphipathic nature, with hydrophilic heads facing the water and hydrophobic tails clustering together. This self-assembly property may have facilitated the formation of the first cell membranes."],
                directContent: ["Simple lipids can form spontaneously under prebiotic conditions."],
                children: [] as string[]
              },
              {
                heading: ["Protocells"],
                summary: ["Primitive cell-like structures."],
                longSummary: ["Protocells were simple membrane-bound compartments that preceded true cells, potentially providing environments where early metabolic reactions and replication could occur with some isolation from the external environment."],
                directContent: ["Laboratory experiments have created protocells capable of growth and division."],
                children: [] as string[]
              }
            ]
          }
        ]
      }
    ]
  };

  return mockDocument;
}