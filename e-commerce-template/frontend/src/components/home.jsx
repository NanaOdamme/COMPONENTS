import React, { useState, useEffect } from 'react';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 2; // Number of slide sets


    // Handle slide change manually
    const handlePrevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
    };

    const handleNextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % totalSlides);
    };

    return (
        <div>
            <div className='hero bg-green-400 h-80 grid grid-cols-1 lg:grid-cols-2 gap-2 mx-auto'>
                <div className='flex flex-col text-white justify-center align-center mx-auto'>
                    <h4 className='text-xl mb-5'>Ends: Sept 26, 07:59 (GMT0) </h4>
                    <h1 className='mt-2 font-bold text-3xl'>
                        BACK TO SCHOOL <i className="icon-animate bi bi-arrow-right-circle-fill"></i>
                    </h1>
                    <h1 className='mt-12 text-5xl font-black'>
                        Get $200+ <br /> <span className='text-3xl font-medium '> in coupon codes </span>
                    </h1>
                </div>

                <div className='hidden cards lg:block slide-container relative overflow-hidden'>
                    <div className="slider-cards flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        <div className="mx-auto flex m-4">
                            <div className="card ml-20 z-50 w-48 h-72  rounded-lg bg-pink-400"></div>
                            <div className="card -ml-20 z-40  w-48 h-72  rounded-lg bg-yellow-400"></div>
                            <div className="card -ml-20 z-30  w-48 h-72  rounded-lg bg-blue-400"></div>
                            <div className="card -ml-20 z-20  w-48 h-72  rounded-lg bg-lime-400"></div>
                            <div className="card -ml-20 z-10  w-48 h-72  rounded-lg bg-cyan-400"></div>
                            
                            
                        </div>
                        <div className="mx-auto flex m-4">
                            <div className="card ml-20 z-50 w-48 h-72  rounded-lg bg-red-400"></div>
                            <div className="card -ml-20 z-40  w-48 h-72  rounded-lg bg-zinc-900"></div>
                            <div className="card -ml-20 z-30  w-48 h-72  rounded-lg bg-gray-400"></div>
                            <div className="card -ml-20 z-20  w-48 h-72  rounded-lg bg-rose-400"></div>
                            <div className="card -ml-20 z-10  w-48 h-72  rounded-lg bg-fuchsia-400"></div>
                           
                            
                        </div>
                       
                        
                    </div>
                    <button
                        onClick={handlePrevSlide}
                        className=" absolute top-1/2  left-0 transform -translate-y-1/2 text-5xl text-white p-2 rounded-full"
                    >
                        <i className="bi bi-arrow-left-circle-fill"></i>
                    </button>
                    <button
                        onClick={handleNextSlide}
                        className="absolute top-1/2 right-0  transform -translate-y-1/2 text-5xl text-white p-2 rounded-full"
                    >
                        <i className="bi bi-arrow-right-circle-fill"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
