import React from 'react'
import { HeroContainer,HeroBg,VideoBg,HeroContent,HeroH1,HeroP,HeroBtnWrapper } from './HeroElements.js'
import { Button } from '../ButtonElements.js'
import Video from '../../videos/video.mp4'
function HeroSection() {
    return (
        <HeroContainer id='welcome'>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HeroBg>
            <HeroContent>
                <HeroH1>Hey, i'm human</HeroH1>
                <HeroP>I'm an Indonesian student that loves coding, music, and writing!</HeroP>
                <HeroBtnWrapper>
                    <Button to='/contact-me' primary='false'>Contact Me</Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection
