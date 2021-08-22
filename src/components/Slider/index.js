import React,{ useState } from 'react'
import { SlideCont,Slide,ProjectBg,ProjectImg,ProjectDesc,ProjectH1,ProjectP,ArrowContainer,Arrow,DotsContainer,Dots } from './SliderElements'

function Slider({ contents,imgOnly,size,darken }) {
    const [slide,setSlide] = useState(true)
    const [index1, setIndex1] = useState(0)
    const [index2, setIndex2] = useState(0)

    const left = () => (arrow(-1))
    const right = () => (arrow(1))

    const arrow = (dir) => {
        if (slide){
            let newI = index1 + dir
            if (newI < 0){newI = (contents.length-1)}
            else if (newI == contents.length){newI = (0)}
            setIndex2(newI)
        }else{
            let newI = index2 + dir
            if (newI < 0){newI = (contents.length-1)}
            else if (newI == contents.length){newI = (0)}
            setIndex1(newI)
        }
        setSlide(!slide)
    }
    return (
        <>
            <SlideCont size={size} >
                <ArrowContainer size={size}>
                    <Arrow className='fas fa-angle-left' onClick={left} size={size} />
                    <Arrow className='fas fa-angle-right' onClick={right} size={size} />
                </ArrowContainer>
                <Slide show={slide} darken={darken}>
                    {!imgOnly &&
                    <ProjectDesc>
                        <ProjectH1>
                        {contents[index1]['name']}
                        </ProjectH1>
                        <ProjectP>
                        {contents[index1]['desc']}
                        </ProjectP>
                        {contents[index1]['button'] && contents[index1]['button']}
                    </ProjectDesc>}
                    {!contents[index1]['pictSlider']?
                    <ProjectBg>
                        <ProjectImg src={contents[index1]['pict']}/>
                    </ProjectBg>:
                    contents[index1]['pict']
                    }
                </Slide>
                <Slide show={!slide} darken={darken}>
                    {!imgOnly && 
                    <ProjectDesc>
                        <ProjectH1>
                        {contents[index2]['name']}
                        </ProjectH1>
                        <ProjectP>
                        {contents[index2]['desc']}
                        </ProjectP>
                        {contents[index2]['button'] && contents[index2]['button']}
                    </ProjectDesc>}
                    {!contents[index2]['pictSlider']?
                    <ProjectBg>
                        <ProjectImg src={contents[index2]['pict']}/>
                    </ProjectBg>:
                    contents[index2]['pict']
                    }
                </Slide>
                <DotsContainer size={size}>
                    {contents.map((element,index) => {
                        return <Dots active={slide?index===index1:index===index2} />
                    })}
                </DotsContainer>
                </SlideCont>
        </>
    )
}

export default Slider
