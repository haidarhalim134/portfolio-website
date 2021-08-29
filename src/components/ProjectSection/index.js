import React,{useState} from 'react'
import Projects from './Projects.js'
import { ProjectContainer,TitleWrap,Title } from './ProjectElements'
import Slider from '../Slider'

function ProjectsSection() {
    const [slide,setSlide] = useState(true)
    const [index1, setIndex1] = useState(0)
    const [index2, setIndex2] = useState(0)

    const left = () => (arrow(-1))
    const right = () => (arrow(1))

    const arrow = (dir) => {
        if (slide){
            let newI = index1 + dir
            if (newI < 0){newI = (Projects.length-1)}
            else if (newI == Projects.length){newI = (0)}
            setIndex2(newI)
            console.log(index2)
        }else{
            let newI = index2 + dir
            if (newI < 0){newI = (Projects.length-1)}
            else if (newI == Projects.length){newI = (0)}
            setIndex1(newI)
            console.log(index1)
        }
        setSlide(!slide)
    }

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
