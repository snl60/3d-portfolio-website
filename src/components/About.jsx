import { motion } from "framer-motion";

import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="empty-4 text-secondary text-{17px] max-w-3xl leading-[30px]"
      >
        I&apos;m a versatile software developer with expertise in languages like
        C, C++, C#, Python, and JavaScript, along with hands-on experience in
        frameworks such as React, Node.js, and Three.js. My background also
        includes work with leading game engines like Unreal Engine, Unity, and
        Godot. I&apos;m a fast learner who excels in collaborative environments
        and would be a valuable asset to any team!
      </motion.p>
    </>
  );
};

const WrappedAbout = SectionWrapper(About, "about");
export default WrappedAbout;
