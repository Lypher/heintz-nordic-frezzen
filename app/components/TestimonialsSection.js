export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Chef Michael Andersen",
      position: "Head Chef, Restaurant Nordisk",
      content: "Heintz Nordic Frezzen leverer konsekvent høj kvalitet. Deres kaninkød er vores førstevalg til vores gourmet retter.",
      rating: 5,
      image: "/chef-1.jpg"
    },
    {
      id: 2,
      name: "Sarah Jensen",
      position: "Purchasing Manager, Supermarket Chain",
      content: "Pålidelig levering og fremragende service. Vores kunder elsker kvaliteten af deres produkter.",
      rating: 5,
      image: "/manager-1.jpg"
    },
    {
      id: 3,
      name: "Lars Pedersen",
      position: "Owner, Butcher Shop",
      content: "De bedste leverandører vi har arbejdet med. Kvalitet og service er altid i top.",
      rating: 5,
      image: "/butcher-1.jpg"
    }
  ];

  const certifications = [
    { name: "ISO 9001", description: "Kvalitetsstyring" },
    { name: "HACCP", description: "Sikkerhedssystem" },
    { name: "EU Standard", description: "Europæisk kvalitet" },
    { name: "Danish Food", description: "Dansk kvalitet" }
  ];

  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Testimonios */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-4">
            Hvad vores kunder siger
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Vi er stolte af vores lange historie med tilfredse kunder i hele Danmark
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1 mr-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.position}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificaciones */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-8">
            Vores Certificeringer
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="font-semibold text-blue-800 text-sm">{cert.name}</div>
                <div className="text-xs text-gray-600">{cert.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 