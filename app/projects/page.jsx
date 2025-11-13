"use client";

// Imports
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  BsArrowUpRight,
  BsGithub,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";

// importing assets
import placement from "../../public/assets/projects/placement.png";
import sis from "../../public/assets/projects/sis.png";
import discuss from "../../public/assets/projects/discuss.png";

// import WorkSliderButtons from "@/components/WorkSliderButtons";

// Object Array
const projectList = [
  {
    num: "01",
    title: "Gemini based AI Chatbot",
    Description:
      "An advanced chatbot to streamline student placement queries, providing personalized assistance.",
    stack: [
      { name: "NextJS/ReactJS" },
      { name: "NodeJS" },
      { name: "Tailwind/CSS" },
      { name: "Gemini" },
    ],
    image: placement,
    live: " ",
    github: " ",
  },
  {
    num: "02",
    title: "Automated Irrigation System",
    Description:
      "A real-time monitored irrigation system using web technologies and machine learning",
    // HTML,  CSS,  JavaScript,  Flask,  Firebase,  Python  (Scikit-Learn,  Pandas),  NodeMCU, DHT  sensor,  Soil  Moisture  sensor
    stack: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "Flask" },
      { name: "Firebase" },
      { name: "Python" },
      { name: "NodeMCU" },
      { name: "DHT sensor" },
      { name: "Soil Moisture sensor" },
    ],
    image: sis,
    live: "",
    github: "",
  },
  {
    num: "03",
    title: "Discussion Forum",
    Description:
      "A discussion forum where users can post questions, answer questions and upvote answers",
    stack: [
      { name: "NextJS/ReactJS" },
      { name: "TypeScript" },
      { name: "SQLite" },
      { name: "Prisma" },
      { name: "Tailwind/CSS" },
      { name: "NodeJS" },
    ],
    image: discuss,
    live: "https://discussionforum-three.vercel.app/",
    github: "https://github.com/Strikezor/discussionForum",
  },
];

const Projects = () => {
  const [project, setProject] = useState(projectList[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex;
    setCurrentIndex(newIndex);
    setProject(projectList[newIndex]);
  };

  const handlePrevious = () => {
    if (swiper) swiper.slidePrev();
  };

  const handleNext = () => {
    if (swiper) swiper.slideNext();
  };

  const buttonStyles =
    "absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-full w-14 h-14 md:w-16 md:h-16 cursor-pointer";

  // const handleSlideChange = (swiper) => {
  //   const currentIndex = swiper.activeIndex;
  //   setProject(projectList[currentIndex]);
  // };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 2.4,
          duration: 0.4,
          ease: "easeIn",
        },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* outline num */}
              <div className="text-8xl leading-none font-extrabold text-outline ">
                {project.num}
              </div>
              {/* project title */}
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.title} project
              </h2>
              {/* project description */}
              <p className="text-white/60">{project.Description}</p>
              {/* stack */}

              <ul className="flex gap-4 flex-wrap">
                {project.stack.map((item, index) => (
                  <li key={index} className="text-accent text-xl ">
                    {item.name}
                    {index !== project.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>
              {/* border */}
              <div className="border border-white/20"></div>
              {/* buttons */}
              <div className="flex items-center gap-4">
                {/* live link button */}
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>

                {/* github link button */}
                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github Repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            {/* --- 4. MODIFIED SWIPER --- */}
            {/* Added onSwiper prop to get the instance */}
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px]"
              onSlideChange={handleSlideChange}
              onSwiper={setSwiper} // Get the Swiper instance
            >
              {projectList.map((project, index) => (
                <SwiperSlide key={index} className="w-full">
                  <div className="h-[470px] relative group flex justify-center items-center bg-pink-50/20">
                    <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10 "></div>
                    <div className="relative w-full h-full">
                      <Image
                        src={project.image}
                        fill
                        className="object-cover"
                        alt=""
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* --- 5. ADDED BUTTONS --- */}
              {/* Previous Button (Left) */}
              {currentIndex > 0 && (
                <motion.div
                  onClick={handlePrevious}
                  initial={{ x: 0, opacity: 0.7 }}
                  animate={{ x: 12 }} // Nudge to the right
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className={`${buttonStyles} left-4`}
                >
                  <BsChevronLeft className="text-white text-3xl md:text-4xl" />
                </motion.div>
              )}

              {/* Next Button (Right) */}
              {currentIndex < projectList.length - 1 && (
                <motion.div
                  onClick={handleNext}
                  initial={{ x: 0, opacity: 0.7 }}
                  animate={{ x: -12 }} // Nudge to the left
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  className={`${buttonStyles} right-4`}
                >
                  <BsChevronRight className="text-white text-3xl md:text-4xl" />
                </motion.div>
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
