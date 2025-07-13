import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Image
          src="/logo.jpg"
          alt="Heintz Nordic Frezzen logo"
          width={120}
          height={120}
          className="mx-auto mb-8 rounded-lg"
        />
        
        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          404 - Side ikke fundet
        </h1>
        
        <p className="text-gray-600 mb-8">
          Beklager, den side du leder efter eksisterer ikke.
        </p>
        
        <Link 
          href="/"
          className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
        >
          Gå tilbage til forsiden
        </Link>
      </div>
    </div>
  );
} 