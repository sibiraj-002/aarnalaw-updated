import { useEffect, useState } from 'react';

export default function Banner({ backgroundImage, mobileBackgroundImage, titleText }) {
  const [bgImage, setBgImage] = useState(null); // For setting the correct image based on screen size
  const [isLoading, setIsLoading] = useState(true); // For loader
  const [timer, setTimer] = useState(3); // Countdown timer (in seconds)

  useEffect(() => {
    // Set initial background image based on screen size
    const handleResize = () => {
      setBgImage(window.innerWidth <= 768 ? mobileBackgroundImage : backgroundImage);
    };

    handleResize(); // Initial image load
    window.addEventListener('resize', handleResize); // Adjust on resize

    // Start a countdown for timer
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev > 1) return prev - 1;
        clearInterval(countdown);
        setIsLoading(false); // Hide loader after countdown finishes
        return 0;
      });
    }, 1000);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(countdown);
    };
  }, [backgroundImage, mobileBackgroundImage]);

  return (
    <div className="relative lg:h-screen">
      {isLoading ? (
        <div className="relative h-screen animate-pulse bg-gray-300">
        <div className="absolute bottom-0 flex h-screen w-full items-center justify-center">
          <div className="flex h-12 w-48 animate-pulse items-center justify-center bg-gray-500 text-white">
            Loading
          </div>
        </div>
      </div>
      ) : (
        <div
          className="h-[500px] lg:h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
          >
          <div className="absolute bottom-0 flex h-[500px] lg:h-screen w-full items-center justify-center">
            <h1
              className="lg:text-5xl font-bold text-white text-center lg:text-start text-4xl"
              dangerouslySetInnerHTML={{ __html: titleText }}
              />
              
          </div>
        </div>
      )}
    </div>
  );
}
