import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { NavLink } from "react-router-dom";

export const Home = () => {
  const lottieLinks = [
    "https://lottie.host/d8e05052-ae1b-44d0-9edb-40677e8d04cb/bEpbVFAdnq.lottie",
    "https://lottie.host/1934ab04-c203-4a59-8487-3cc1b1c58512/vDuPzw6HVg.lottie",
    "https://lottie.host/a6396d8a-d5f3-4486-92f4-e1c91c58ba05/pgx6ankgW5.lottie",
    "https://lottie.host/0f5fa06b-b8a7-4117-8452-accbfad07bfc/ZuWUy5b6CP.lottie",
  ];

  return (
    <main className="relative w-full h-auto bg-black flex items-center justify-center overflow-hidden text-white px-6 py-12">

      {/* Lottie Background */}
      <div className="absolute inset-0 z-20">
        <DotLottieReact
          src="https://lottie.host/ddc4dbe5-5f24-42d7-b20d-cffe09e58334/DalP3tjYN1.lottie"
          loop
          autoplay
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-black/95"></div>
      </div>

      {/* Decorative SVG Doodles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-80"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9333ea" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="20%" cy="30%" r="250" fill="url(#grad)" />
          <circle cx="80%" cy="70%" r="300" fill="url(#grad)" />
        </svg>
      </div>

      {/* Foreground Content */}
      <div className="relative z-30 flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-7xl gap-6 md:gap-12">

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
            Personalized Learning Revolution
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl md:text-2xl max-w-lg leading-relaxed">
            A next-gen platform bringing adaptive learning, real-time progress
            tracking, and teacher-student collaboration together in one place.
          </p>

         
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full">
            <NavLink to="/studnetsignup" className="flex-1">
              <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300">
                👨‍🎓 Student Login
              </button>
            </NavLink>

            <NavLink to="/tecaherlogin" className="flex-1">
              <button className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300">
                🎓 Teacher Login
              </button>
            </NavLink>
          </div>
        </div>

       
        <div className="w-full md:w-1/2">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop
            autoplay={{ delay: 2800, disableOnInteraction: false }}
            effect="coverflow"
            modules={[Autoplay, EffectCoverflow]}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 200,
              modifier: 2,
              slideShadows: false,
            }}
            className="w-full h-[350px] sm:h-[450px] md:h-[520px] rounded-2xl shadow-2xl border border-white/10"
          >
            {lottieLinks.map((src, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full flex items-center justify-center bg-black/30 rounded-2xl">
                  <div className="w-full h-full p-4 flex items-center justify-center">
                    <DotLottieReact
                      src={src}
                      loop
                      autoplay
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </main>
  );
};
