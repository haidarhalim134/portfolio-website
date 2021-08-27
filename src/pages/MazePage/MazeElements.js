import styled from 'styled-components'

export const MazeContainer = styled.div`
    /* overflow: scroll; */
    width: 100%;
    height: auto;
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    background: #fff;
    /* border: red solid 1px */
`

export const ControlPanel = styled.div`
    width: 100%;
    height: 75px;
    background: #000;
    display: flex;
    align-items: start;
    /* border: red solid 5px */

    @media screen and (max-width:760px){
        flex-wrap: wrap;
        height: 150px;
    }
`

export const BlocksMenuContainer = styled.div`
    height: auto;
    padding: 10px;
    background: #fff;
    display: flex;
    align-items: start;
`

export const BlocksOption = styled.div`
    padding-left: 5px;
    padding-right: 10px;
    min-width: 100px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 25px;
    cursor: pointer;
    transition: 0.1s all ease;

    &:hover{
        background: #01bf71;
    }
`

export const BlockIcon = styled.div`
    width: 30px;
    height: 30px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${({available})=>available?'#f0f0f0':'#fff'};
`

export const ButtonContainer = styled.div`
    min-width: 150px;
    height: ${({open,list})=>open?`${75+list.length*75}px`:'75px'};
    background: #000;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    z-index: 2;
    transition: 0.1s all ease;
`

export const Button = styled.div`
    min-width: 150px;
    min-height: 75px;
    padding-right: 5px;
    padding-left: 5px;
    color: #fff;
    display: flex;
    overflow: visible;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1;
    border-bottom: ${({open})=>open && '#01bf71 solid 5px'};

    &:hover{
        border-bottom: #01bf71 solid 5px;
        transition: 0.1s all ease;
    }
`

export const Board = styled.div`
    width: 100%;
    height: ${({ column })=>400/15*column}px;
    display: flex;
    flex-direction: column;
    background: #fff;
    overflow: hidden;
    cursor: ${({ carry })=>carry?'crosshair':'initial'};
    /* border: red 1px solid; */
`

export const Row = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`

export const Box = styled.div`
    width: 100%;
    height: 26.6px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: ${({border})=>border?'#01bf71 solid 0.5px':'#01bf71 solid 0.5px'}; */
`

export const StatisticsContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: start;
`

export const Statistic = styled.div`
    min-width: 250px;
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border: red 1px solid; */
`

export const Stat = styled.div`
    margin-right: 5px;
    margin-left: 10px;
`

export const StatisticConstant = styled.div`
    min-width: 25px;
    min-height: 25px;
    display: flex;
    align-items: center;
    justify-content: start;
`

export const StatisticIcon = styled.div`
    width: 25px;
    height: 25px;
    margin-right: 5px;
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
`
