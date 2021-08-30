import styled from "styled-components";

export const SlideCont = styled.div`
    width: ${({size})=>size?size+'%':'100%'};
    height: 450px;
    display: flex;
    align-items: center;  
    justify-content:center;

    @media screen and (max-width:760px){
        height: 900px;
        flex-direction: column;
    }
`

export const Slide = styled.div`
    width: 100%;
    height: 450px;
    /* left: ${({show}) => (show?'0':'-100%')}; */
    /* display: ${({show}) => (show?'flex':'none')}; */
    opacity: ${({show}) => (show?'100':'0%')};
    /* border-radius: 50px; */
    display: flex;
    /* visibility: ${({show}) => (show?'initial':'hidden')}; */
    overflow: hidden;
    align-items: center;
    justify-content: center;
    position: absolute;
    transition: 0.2s all ease;
    
    @media screen and (max-width:760px){
        height: 900px;
        flex-direction: column;
    }

    
    :before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${({show,darken})=>darken&&show?'#0c0c0c':''};
        z-index: 2;
        opacity: 50%;}
`

export const ProjectBg = styled.div`
  width: 40%;
  max-height: 100%;
  overflow: hidden;
  /* border-top-left-radius: 50px;
    border-bottom-left-radius: 50px; */
  z-index: 2;
  border-bottom: solid;
  border-width: 5px;
  border-color: #01bf71;
  object-fit: cover;
  display: flex;

  @media screen and (max-width: 760px) {
    width: 80%;
    height: 40%;
  }
`;

export const ProjectImg = styled.img`
    min-width: 100%;
    min-height: 450px;
    object-fit: cover;
    
    @media screen and (max-width:760px){
        height: 100%;
    }
    
`

export const ProjectDesc = styled.div`
    width: 50%;
    max-height: 100%;
    min-height: 300px;
    display: flex;
    align-items: center;
    flex-direction: column;
    z-index: 3;

    @media screen and (max-width:760px){
        width: 80%;
    }
`

export const ProjectH1 = styled.h1`
    color: #fff;
    font-size: 48px;
    text-align: center;

    @media screen and (max-width: 768px){
    font-size: 40px;
    }

    @media screen and (max-width: 480px){
    font-size: 32px;
    }
`

export const ProjectP = styled.p`
    margin-top: 24px;
    color: #fff;
    font-size: 24px;
    text-align: center;


    
    @media screen and (max-width: 768px){
    font-size: 24px;
    }

    @media screen and (max-width: 480px){
    font-size: 18px;
    }
`

export const ArrowContainer = styled.div`
    position: absolute;
    width: ${({size})=>size?size+'%':'95%'};
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 5;

    @media screen and (max-width:760px){
        width: ${({size})=>size?'80%':'95%'};
        font-size: 50px;
    }
`

export const Arrow = styled.i`
    color: #01bf71;
    font-size: ${({size})=>size?size*1.5+'px':'100px'};
    transition: 0.1s all ease;
    filter: brightness(1.1);
    
    @media screen and (max-width:760px){
        font-size: 50px;
    }
    &:hover{
        transition: 0.1s all ease;
        color: #fff;
    }
`

export const DotsContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 10%;
    margin-top: ${({size})=>size?size*3/4:'35'}%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
`

export const Dots = styled.div`
    height: 15px;
    width: 15px;
    border-radius: 50%;
    position: relative;
    margin: 5px;
    background: ${({active})=>active?'#fff':''};
    border: #fff 1px solid;
`


