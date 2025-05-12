import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Book Explorer - Progressive Disclosure Reading',
  description: 'Interactive book summaries with progressive disclosure',
};

// Sample book titles for the home page
const availableBooks = [
  {
    title: 'The Story of Everything',
    description: 'A journey from the Big Bang to consciousness',
    image: '/globe.svg'
  },
  {
    title: 'Deep Learning',
    description: 'Explore the fundamentals of neural networks and AI',
    image: '/window.svg'
  },
  {
    title: 'The Art of Programming',
    description: 'Master the craft of software development',
    image: '/file.svg'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Book Explorer</h1>
          <p className="text-xl text-gray-600">
            Interactive summaries with progressive disclosure for complex books
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableBooks.map((book, index) => (
            <Link
              key={index}
              href={`/${encodeURIComponent(book.title)}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 
                         hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-center bg-gray-100 h-32 w-32 mx-auto rounded-full mb-4">
                  <Image 
                    src={book.image}
                    alt={book.title}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-xl font-bold mb-2 text-center text-gray-800">{book.title}</h2>
                <p className="text-gray-600 text-center">{book.description}</p>
              </div>
              <div className="bg-blue-500 text-white py-2 text-center font-medium">
                Explore
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}
