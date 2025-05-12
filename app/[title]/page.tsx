import { DocumentViewer } from '../components/DocumentViewer';
import { Metadata } from 'next';

interface DocPageProps {
  params: {
    title: string;
  };
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  return {
    title: `${decodeURIComponent(params.title)} - Book Explorer`,
    description: `Explore ${decodeURIComponent(params.title)} with an interactive interface`,
  };
}

export default function DocPage({ params }: DocPageProps) {
  const decodedTitle = decodeURIComponent(params.title);
  
  return (
    <DocumentViewer documentTitle={decodedTitle} />
  );
}