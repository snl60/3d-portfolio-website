import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import { styles } from '../styles';
import { BallCanvas } from './canvas';
import { technologies, technologiesMobile } from '../constants';
import { isWebGLSupported } from '../utils/webgl';

const Tech = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: technologies.length });

  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      const totalItems = technologies.length;

      if (scrollTop + windowHeight >= docHeight - 500) {
        setVisibleRange((prev) => ({
          start: prev.start,
          end: Math.min(prev.end + 5, totalItems),
        }));
      } else if (scrollTop < 200 && visibleRange.start > 0) {
        setVisibleRange((prev) => ({
          start: Math.max(prev.start - 5, 0),
          end: prev.end - 5,
        }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  })

  const techArray = isMobile ? technologiesMobile : technologies;
  const limitedTechArray = isMobile ? techArray.slice(visibleRange.start, visibleRange.end) : techArray;

  if (!webGLSupported) {
    return null;
  }

  return (
    <div className="w-full max-w-5xl mx-auto my-8 px-4 flex flex-col items-center justify-center">
      <div className="flex flex-row flex-wrap justify-center gap-7">
        {limitedTechArray.map((technology) => (
          <div className="w-28 h-28" key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>

      <div className="mt-1 flex flex-col justify-center items-center">
        {/* Down Arrow Icon */}
        {isMobile && (
          <a href="#projects" className="mt-2">
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
        )}
      </div>
    </div>
  );
};

export default Tech;