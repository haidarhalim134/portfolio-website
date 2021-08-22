import styled from 'styled-components'
import { Link as LinkR } from 'react-router-dom'

export const ProjectContainer = styled.div`
    background: #000;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 50px;
    padding-bottom: 50px;
    height: 100%;
    overflow: hidden;
`

export const TitleWrap = styled.div`
    height: 70px;
    justify-content: center;
`

export const Title = styled.h1`
    color: #01bf71;
    font-size: 48px;
    text-align: center;

    @media screen and (max-width: 768px){
    font-size: 40px;
    }

    @media screen and (max-width: 480px){
    font-size: 32px;
    }
`

export const BtnLink = styled(LinkR)`
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #01bf71;
    white-space: nowrap;
    width: auto;
    margin: 40px;
    padding: 10px 22px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
`


