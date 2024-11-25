import React, { useState, useEffect } from 'react';

const slides = [
  {
    title: "ADVOCATING JUSTICE, DEFENDING RIGHTS",
    subtitle: "GUIDING LEGAL SOLUTIONS",
    description: "Administrative law focuses on the regulations and decisions made by government agencies.",
    image: "https://themes.pixelwars.org/lawly/demo-01/wp-content/uploads/sites/2/2023/08/men-standing-before-illuminated-statue-praying-peace-generated-by-ai.jpg"
  },
  {
    title: "IN PURSUIT OF FAIRNESS AND EQUALITY",
    subtitle: "EMPOWERING JUSTICE",
    description: "Administrative law focuses on the regulations and decisions made by government agencies.",
    image: "https://themes.pixelwars.org/lawly/demo-01/wp-content/uploads/sites/2/2023/08/men-standing-before-illuminated-statue-praying-peace-generated-by-ai.jpg"
  },
  {
    title: "NAVIGATING LEGAL WATERS WITH EXPERTISE",
    subtitle: "NAVIGATING LEGAL WATERS",
    description: "Administrative law focuses on the regulations and decisions made by government agencies.",
    image: "https://themes.pixelwars.org/lawly/demo-01/wp-content/uploads/sites/2/2023/08/ahmetoz._portrait_of_a_lawyer_rays_of_light_bc920001-5a07-4ae7-b4a3-ae1ccbcb7141.jpg"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleSlideChange = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNextSlide = () => {
    handleSlideChange((currentSlide + 1) % slides.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[4000ms] ease-linear"
            style={{
              backgroundImage: `url(${slide.image})`,
              filter: 'brightness(0.7)',
              transform: currentSlide === index ? 'scale(1.2)' : 'scale(1.0)'
            }}
          />
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 sm:px-8">
              <div className="max-w-3xl">
                <h3 className="text-white text-base sm:text-lg font-medium mb-2 sm:mb-4 tracking-wide">
                  {slide.subtitle}
                </h3>
                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-6 leading-tight tracking-wide font-slab">
                  {slide.title}
                </h2>
                <p className="text-white text-sm sm:text-base lg:text-lg opacity-80 max-w-xl">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-8 sm:w-12 h-0.5 transition-all duration-300 ${
              currentSlide === index ? 'bg-white sm:w-16' : 'bg-white/50'
            }`}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 flex gap-2 sm:gap-4">
        <a href="#" className="text-white hover:text-gray-300 transition-colors text-xs sm:text-base">
          FACEBOOK
        </a>
        <a href="#" className="text-white hover:text-gray-300 transition-colors text-xs sm:text-base">
          TWITTER
        </a>
        <a href="#" className="text-white hover:text-gray-300 transition-colors text-xs sm:text-base">
          INSTAGRAM
        </a>
      </div>
    </div>
  );
};

export default HeroSlider;