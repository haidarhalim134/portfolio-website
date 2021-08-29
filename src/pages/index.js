import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import HeroSection from '../components/HeroSection';
import ProjectSection from '../components/ProjectSection';
import MazePage from './MazePage';

function Home() {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
      <>
        <Sidebar isOpen={isOpen} toggle={toggle} homePage={true} />
        <Navbar toggle={toggle} homePage={true} />
        <HeroSection id="welcome" />
        <ProjectSection id="projects" />
      </>
    );
}

export default Home
