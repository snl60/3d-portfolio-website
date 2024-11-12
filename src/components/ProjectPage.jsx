import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { projects } from '../constants';
import { FaGithub } from 'react-icons/fa';
import { SectionWrapper } from '../hoc';
import PagesNavbar from './PagesNavbar';
import Modal from 'react-modal';

const ProjectPage = () => {
  const { projectId } = useParams();
  const project = projects.find((proj) => proj.id === projectId);

  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="text-white p-5">
        Project not found!
      </div>
    );
  }

  const images = [
    project.image,
    project.image1,
    project.image2,
    project.image3,
    project.image4,
    project.image5,
    project.image6,
    project.image7,
    project.image8,
    project.image9,
    project.image10,
    project.image11,
    project.image12,
    project.image13,
    project.image14,
    project.image15,
    project.image16,
    project.image17,
  ].filter(Boolean);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentImageIndex(0);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex +1
    );
  };

  return (
    <div className="p-5">
      {/*<PagesNavbar />*/}
      <h1 className="text-white font-bold text-[30px] mb-3">{project.name}</h1>
      <p 
        className="text-secondary text-[17px]"
        dangerouslySetInnerHTML={{ __html: project.description }}
      />
      {project.source_code_link !== "None" && (
        <div className="mt-5">
            <a 
              href={project.source_code_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-blue-700"
            >
              <FaGithub size={20} />
              <span>View Code on GitHub</span>
            </a>
        </div>
      )}

      {/* Container for video and images */}
      <div className="mt-5 flex flex-col items-center w-full max-w-screen-lg mx-auto">
        {/* YouTube embedded video section */}
        {project.video && (
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              width="1056"
              height="594"
              src={project.video}
              title={project.video_title || project.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-2xl"
            />
          </div>
        )}

        {/* Image gallery section */}
        <div className="mt-5 flex flex-col gap-4 items-center w-full">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${project.name} screenshot ${index + 1}`}
              className="w-full max-w-screen-lg h-auto rounded-2xl cursor-pointer mx-auto"
              onClick={() => openModal(index)}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="modal-overlay"
        style={{
          overlay: { backgroundColor: 'rgb(5 8 22 / var(--tw-bg-opacity))' },
          content: { inset: 'auto', padding: 0, border: 'none', background: 'none' },
        }}
      >
        <div className="modal-content">
          {/* Close Modal Button */}
          <button
            onClick={closeModal}
            className="close-button"
          >
            &times;
          </button>

          {/* Left Arrow (previous image) Button */}
          <button
            onClick={goToPreviousImage}
            className="left-arrow"
          >
            &#9664;
          </button>

          {/* Display Current Image */}
          <img 
            src={images[currentImageIndex]} 
            alt="Full Screen View" 
            className="modal-image"
          />

          {/* Right Arrow (next image) Button */}
          <button
            onClick={goToNextImage}
            className="right-arrow"
          >
            &#9654;
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SectionWrapper(ProjectPage, "");