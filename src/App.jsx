import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  // Feedbacks,
  Hero,
  Navbar,
  PagesNavbar,
  Tech,
  Projects,
  StarsCanvas,
  ProjectPage,
  ServiceCard,
} from "./components";

function ScrollToSection() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash && pathname === "/") {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash, pathname]);

  return null;
}

const App = () => {
  const location = useLocation();

  return (
    <div className="relative z-0 bg-primary">
      {/* Navbar to be displayed on all pages */}
      {location.pathname === "/" ? <Navbar /> : <PagesNavbar />}

      {/* Define routes for the main content and individual project pages */}
      <Routes>
        {/* Main content route */}
        <Route
          path="/"
          element={
            <>
              <ScrollToSection />
              <div className="bg-center bg-no-repeat bg-cover bg-hero-pattern">
                <Hero />
              </div>
              <About />
              <Tech />
              <Projects />
              <ServiceCard />
              <Experience />
              {/* <Feedbacks /> */}
              <div className="relative z-0">
                <Contact />
                <StarsCanvas />
              </div>
            </>
          }
        />

        {/* Dynamic route for individual project pages */}
        <Route path="/projects/:projectId" element={<ProjectPage />} />
      </Routes>
    </div>
  );
};

export default App;
