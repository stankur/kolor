import { DocumentViewer } from './components/DocumentViewer';
import { Metadata } from 'next';


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Paul Graham Essay Summaries`,
    description: `Paul Graham, but concise`,
  };
}

export default async function DocPage() {
  const decodedTitle = "essays";
  
  return (
    <DocumentViewer documentTitle={decodedTitle} />
  );
}