import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { fadeIn } from "../utils/motion";
import { services } from "../constants";

const ServiceCard = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 mt-20">
      {services.map((service, index) => (
        <Tilt
          key={service.title}
          className="xs:w-[250px] w-full"
          tiltMaxAngleX={45}
          tiltMaxAngleY={45}
          scale={1}
          transitionSpeed={450}
        >
          <motion.div
            variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
            className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
          >
            <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
              <img
                src={service.icon}
                alt={service.title}
                className="object-contain w-16 h-16"
              />
              <h3 className="text-white text-[20px] font-bold text-center">
                {service.title}
              </h3>
            </div>
          </motion.div>
        </Tilt>
      ))}
    </div>
  );
};

export default ServiceCard;
