import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

import { styles } from '../styles';
import { ComputersCanvas } from './canvas';
import { rotate } from '../assets';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width:500px)');

    // Set the initial value of the 'isMobile' state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => setIsMobile(event.matches);

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, []);
  
  return (
    <section className="relative w-full h-screen mx-auto overflow-y-auto">
      <div className={`${styles.paddingX} absolute inset-0 top-[75px] max-w-7xl mx-auto flex flex-row items-start gap-5`}> {/*Changed to top-[75px] from top-[120px]*/}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915eff]">Scott</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I'm a video game engineer <br className="sm:block hidden" />and software developer.
          </p>
        </div>
      </div>

      <ComputersCanvas />

      {/* Scroll Button */}
      <div className={"absolute xs:bottom-10 bottom-24 w-full flex flex-col justify-center items-center"}>
        {/* <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a> */}

        {/* 360-degree Icon */}
          <img
            src={rotate}
            alt="Rotate"
            attributionsrc="https://www.flaticon.com/free-icons/360-degrees"
            width="60"
            height="60"
          />

        {/* Down Arrow Icon */}
        <a href="#about">
          <motion.div
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop'
            }}
            className={"flex flex-col items-center text-secondary text-3xl cursor-pointer"}
          >
            <FaArrowDown />
            <p className={`${styles.sectionSubText}`}>Click to scroll</p>
         </motion.div>
        </a>
      </div>
    </section>
  )
}

export default Hero