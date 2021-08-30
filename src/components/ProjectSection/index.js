import React from 'react'
import Projects from './Projects.js'
import { ProjectContainer,TitleWrap,Title } from './ProjectElements'
import Slider from '../Slider'

function ProjectsSection() {
    return (
      <ProjectContainer id='projects'>
        <TitleWrap>
          <Title>Projects</Title>
        </TitleWrap>
        <Slider contents={Projects} darken={true} />
      </ProjectContainer>
    );
}

export default ProjectsSection
