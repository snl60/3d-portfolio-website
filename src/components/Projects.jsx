import Tilt from 'react-parallax-tilt'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

import { styles } from '../styles'
import { github } from '../assets'
import { SectionWrapper } from '../hoc'
import { projects } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'

const ProjectCard = ({ index, name, description, tags, image, source_code_link, id }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0,75)}>
      <Tilt
        tiltEnable={window.innerWidth > 768} // Only tilt on desktop
        options={{
          max: 45,
          scale: 1,
          speed: 450
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        
        {/* Clickable project image */}
        <Link 
          to={`/projects/${id}`} 
          className="relative w-full h-[230px] cursor-pointer"
          onClick={() => window.scrollTo(0, 0)}
        >
          <img 
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />
        </Link>
        
        { /* Clickable Github icon */}
        {source_code_link !== "None" && (
          <div className="absolute top-3 right-3">
            <div
              onClick={(e) => {
                e.stopPropagation();
                window.open(source_code_link, "_blank");
              }}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img 
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        )}

        {/* Clickable project name and description */}
        <Link to={`/projects/${id}`} className="mt-5 cursor-pointer">
          <h3 className="text-white font-bold text-[24px]">
            {name}
          </h3>
          <p 
            className="mt-2 text-secondary text-[14px]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </Link>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  )
}

const Projects = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          These projects highlight my skills and experience through hands-on examples of my work. Each project includes a brief overview, with links to code repositories and live demos, showcasing my ability to tackle complex challenges, adapt to diverse technologies, and manage projects efficiently. Explore my portfolio to see my approach to problem-solving and development in action.
        </motion.p>
      </div>
      
      <div className="mt-10 flex flex-wrap gap-7 justify-center sm:justify-start">
        {projects.map((projects, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...projects}
          />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Projects, "projects")