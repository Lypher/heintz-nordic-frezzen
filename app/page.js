import Image from "next/image";

export default function Home() {
  // Array con las 10 imágenes del catálogo
  const catalogImages = [
    { id: 1, src: "/1.jpeg", alt: "Producto 1" },
    { id: 2, src: "/2.jpeg", alt: "Producto 2" },
    { id: 3, src: "/3.jpeg", alt: "Producto 3" },
    { id: 4, src: "/4.jpeg", alt: "Producto 4" },
    { id: 5, src: "/5.jpeg", alt: "Producto 5" },
    { id: 6, src: "/6.jpeg", alt: "Producto 6" },
    { id: 7, src: "/7.jpeg", alt: "Producto 7" },
    { id: 8, src: "/8.jpeg", alt: "Producto 8" },
    { id: 9, src: "/9.jpeg", alt: "Producto 9" },
    { id: 10, src: "/10.jpeg", alt: "Producto 10" },
  ];

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-start">
      {/* Header fijo */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur border-b border-blue-100 shadow-sm flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <Image src="/logo.jpg" alt="Heintz Nordic Frezzen logo" width={80} height={80} />
          <span className="font-bold text-blue-700 text-lg">Heintz Nordic Frezzen</span>
        </div>
        <nav className="flex gap-6">
          <a href="#about" className="text-blue-700 font-medium hover:underline transition-colors">Om os</a>
          <a href="#contact" className="text-blue-700 font-medium hover:underline transition-colors">Kontakt</a>
        </nav>
      </header>
      {/* Espaciador para el header fijo */}
      <div className="h-16" />
      {/* Imagen de fondo */}
      <div className="absolute top-0 left-0 w-full h-64 md:h-80 lg:h-96 -z-10">
        <Image
          src="/globe.svg"
          alt="Baggrundsbillede"
          layout="fill"
          objectFit="cover"
          quality={80}
          className="opacity-60"
        />
      </div>
      {/* Encabezado principal */}
      <section className="w-full flex flex-col items-center justify-center pt-12 pb-8">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center text-blue-800 drop-shadow-lg px-4">
          Importør og distributør af frossent kaninkød i Danmark
        </h1>
      </section>
      
      {/* Sección del Catálogo */}
      <section className="w-full max-w-7xl px-4 mt-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Vores Produktkatalog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {catalogImages.map((image) => (
            <div key={image.id} className="main-card bg-white rounded-xl overflow-hidden shadow-lg border border-blue-100">
              <div className="relative h-64 w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">{image.alt}</h3>
                <p className="text-gray-600 text-sm">Kvalitets kaninkød</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-2xl font-bold text-blue-800 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Kataloget udvides snart!
          </p>
          <p className="text-gray-600 mt-2 text-lg">
            Nye produkter kommer til
          </p>
        </div>
      </section>

      {/* Sección Om os */}
      <section id="about" className="w-full max-w-4xl mt-20 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-blue-800 mb-4">Om os</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Heintz Nordic Frezzen er importør og distributør af frossent kaninkød i Danmark, dedikeret til kvalitet og service.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Kvalitetsprodukter</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Pålidelig levering</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Ekspert service</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-blue-800 mb-4">Vores Mission</h4>
              <p className="text-gray-700">
                At levere det bedste frossne kaninkød til vores kunder i Danmark med fokus på kvalitet, service og pålidelighed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Kontakt */}
      <section id="contact" className="w-full max-w-4xl mt-16 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-blue-800 mb-4">Kontakt</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-blue-800">Email</p>
                  <a href="mailto:thb@heintz-nordic-frezzen.dk" className="text-blue-700 hover:underline">thb@heintz-nordic-frezzen.dk</a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-blue-800">Telefon</p>
                  <a href="tel:+4591718794" className="text-blue-700 hover:underline">+45 91718794</a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-blue-800">Adresse</p>
                  <p className="text-gray-700">Ernst Carlsens Vej 2 - Fredericia (7000)</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-blue-800 mb-4">Åbningstider</h4>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Mandag - Torsdag:</span>
                  <span className="font-semibold">07.00 - 18.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Fredag:</span>
                  <span className="font-semibold">07.00 - 17.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Weekend:</span>
                  <span className="font-semibold">Lukket</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer virksomhed */}
      <footer className="w-full bg-blue-50 border-t border-blue-100 mt-16 py-10 px-4 flex flex-col md:flex-row justify-center items-start gap-8 md:gap-16 text-blue-900">
        {/* Logo */}
        <div className="flex-1 flex flex-col items-center md:items-start mb-6 md:mb-0">
          <Image src="/logo.jpg" alt="Heintz Nordic Frezzen logo" width={90} height={90} className="mb-2" />
        </div>
        {/* Virksomhedsoplysninger */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="font-bold text-lg mb-2">Heintz Nordic Frezzen</h3>
          <div className="mb-2">Ernst Carlsens Vej 2 - Fredericia (7000)</div>
          <div className="mb-2">CVR: 45611132</div>
          <div className="mt-4">
            <span className="font-semibold">Åbningstider</span><br />
            <span>Man-tor: 07.00-18.00</span><br />
            <span>Fre: 07.00 - 17.00</span>
          </div>
        </div>
        {/* Kontakt og links */}
        <div className="flex-1 min-w-[200px]">
          <div className="mb-2"><span className="font-semibold">Email:</span> <a href="mailto:thb@heintz-nordic-frezzen.dk" className="text-blue-700 hover:underline">thb@heintz-nordic-frezzen.dk</a></div>
          <div className="mb-2"><span className="font-semibold">Tlf.:</span> <a href="tel:+4591718794" className="text-blue-700 hover:underline">+45 91718794</a></div>
          <div className="mt-4">
            <h4 className="font-semibold mb-1">Links</h4>
            <ul className="list-disc list-inside text-sm text-blue-800">
              <li><a href="#" className="hover:underline">Cookiepolitik</a></li>
              <li><a href="#" className="hover:underline">Privatlivspolitik</a></li>
              <li><a href="#" className="hover:underline">Whistleblowerordning</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
