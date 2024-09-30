// HeroSection.js
import React, { useEffect, useState } from 'react';
import hero1 from "../assets/Fruits.jpg";
import hero2 from "../assets/Bread.jpg"; 
import hero3 from "../assets/Vegetable.jpg"; 

const images = [hero1, hero2, hero3];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        setCurrentImage(images[newIndex]); // Update currentImage based on new index
        return newIndex; // Return the new index for the next iteration
      });
    }, 10000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="mx-auto flex flex-col lg:flex-row py-24 items-center justify-center overflow-x-hidden bg-[#C9A998] h-screen">
      <img 
        className="lg:w-2/6 md:w-3/6 w-5/6 h-auto mb-10 object-cover object-center rounded-xl mt-40 md:mt-0"
        alt="hero" 
        src={currentImage} 
      />
      <div className="text-center lg:w-5/12 w-full lg:ml-8">
        <h1 className="my-4 text-3xl md:text-5xl font-bold leading-tight">
          Fresh Fruits & Vegetables Delivered to Your Doorstep
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Enjoy the best quality produce, meats, and breads at unbeatable prices!
        </p>
        <div className="flex flex-col md:flex-row justify-center mx-auto">
          <a href='/inventory' className="hover:underline bg-white text-gray-800 font-bold rounded-full py-4 px-8 mb-4 md:mb-0 md:mr-4">
            Shop Now
          </a>
          <button className="hover:underline bg-white text-gray-800 font-bold rounded-full py-4 px-8">
            Special Offers
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
