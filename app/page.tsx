import { DocumentViewer } from './components/DocumentViewer';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Paul Graham Essay Summaries`,
    description: `Paul Graham, but concise`,
  };
}

export default async function DocPage() {
  const decodedTitle = "essays";

  return (
    <Suspense fallback={<div className="p-8 text-center">Loading document...</div>}>
      <DocumentViewer documentTitle={decodedTitle} />
    </Suspense>
  );
}