import { DocumentViewer } from '../components/DocumentViewer';
import { Metadata } from 'next';

interface DocPageProps {
  params: Promise<{
    title: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `${decodeURIComponent(resolvedParams.title)} - Book Explorer`,
    description: `Explore ${decodeURIComponent(resolvedParams.title)} with an interactive interface`,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const resolvedParams = await params;
  const decodedTitle = decodeURIComponent(resolvedParams.title);
  
  return (
    <DocumentViewer documentTitle={decodedTitle} />
  );
}