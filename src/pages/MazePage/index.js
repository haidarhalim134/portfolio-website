import React,{useState} from 'react'
import './index.css'
import { MazeContainer,ControlPanel,Button,Board,Row,Box, ButtonContainer, BlocksMenuContainer, BlocksOption, BlockIcon } from './MazeElements'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { fill,sculpt } from './Algorithm/PrimsR'
import Algo from './Algorithm_hub'
import mazeGenerationAnimations from './animator'

function MazePage() {
    const [test,testt] = useState(true)
    let buttonState = true

    let ListofType = []
    let start_node = [8,14]
    let end_node = [8,41]
    let Algorithm = ''
    let speed = 'Fast'
    const speed_list = ['Fast','Average','Slow']
    //initialize maze with path box
    for(let y=0;y<15;y++){
        let temp = []
        for(let x=0;x<55;x++){
            temp.push('Path')
            if(y===8){
                if(x===14){
                    temp[temp.length-1]+= ' fa fa-asterisk'
                }else if(x===41){
                    temp[temp.length-1]+= ' fas fa-bullseye'
                }
            }
        }ListofType.push(temp)
    }


    const clearGrid = (Grid) => {
        for(let y=0;y<Grid.length;y++){
            for(let x=0;x<Grid[0].length;x++){
                change(y, x, 'Path')
            }
        }return Grid
    }

    const clearVisited = (Grid) => {
        for(let y=0;y<Grid.length;y++){
            for(let x=0;x<Grid[0].length;x++){
                if(/Visited/.test(Grid[y][x]) || /Trail/.test(Grid[y][x])){
                    change(y, x, 'Path')}
            }
        }return Grid
    }

    const solve = (maze) => {
        testt(!test)
        if(typeof Algo[Algorithm] != 'function'){return}
        let result = Algo[Algorithm](maze,start_node,end_node)
        let moves = [...result.moves]
        if(result.finished){moves = [...moves,...result.trail]}
        animate({ wallsToAnimate: moves, speed: speed },false)
    }

    const generate_maze = () =>{
        ListofType = clearGrid(ListofType)
        let  moves = sculpt(fill(ListofType[0].length,ListofType.length),start_node,end_node)
        animate({wallsToAnimate:moves,speed:speed},true)
    }

    const animate = (board,jump) => {
        buttonState = false
        mazeGenerationAnimations(board,change,()=>buttonState = true,jump)
    }

    const change = async(y,x,to=null) => {
        if (to){
            let target = document.getElementById(`${y} ${x}`)
            if(/fa/.test(target.className)){
                if(to!='Wall'){
                let classes = target.className.split(' ')
                classes[0] = to
                to = classes.join(' ')}
                else{return}
            }
            ListofType[y][x] = to
            target.className = to
            return
        }
        if(ListofType[y][x] != 'Wall' && !/fa/.test(ListofType[y][x])){
            ListofType[y][x] = 'Wall'
            document.getElementById(`${y} ${x}`).className = 'Wall'
        }else if(ListofType[y][x] == 'Wall'){
            ListofType[y][x] = 'Path'
            document.getElementById(`${y} ${x}`).className = 'Path'
        }
    }

    const isActive = ()=> buttonState

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }


    return (
        <MazeContainer>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <Navbar toggle={toggle}/>
            <ControlPanel>
                <Slider name='Algorithm' list={Object.keys(Algo)} pick={(item)=>{Algorithm=item}}/>
                <ButtonWrapper name='Generate Maze' on_click={()=>generate_maze()} isActive={isActive} />
                <ButtonWrapper name='Find Path' on_click={()=>{clearVisited(ListofType);solve(ListofType)}} isActive={isActive} />
                <ButtonWrapper name='Clear Board' on_click={()=>clearGrid(ListofType)} isActive={isActive} />
                <ButtonWrapper name='Clear Path' on_click={()=>clearVisited(ListofType)} isActive={isActive} />
                <Slider name='Speed' list={speed_list} pick={(item)=>{speed=item}} initial={speed}/>
            </ControlPanel>
            <BlocksMenuContainer>
                <BlocksOption>
                    {test && 'ok'}
                    <BlockIcon className='fa fa-asterisk'/>
                </BlocksOption>
            </BlocksMenuContainer>
            <Board column={ListofType.length}>
            {ListofType.map((row,y)=><Row>{row.map((column,x)=>
                <Box onClick={()=>change(y,x)}>
                <div id={`${y} ${x}`} className={column}/>
                </Box>)}</Row>)}
            </Board>
        </MazeContainer>
    )
}

function ButtonWrapper({ name,on_click,isActive }) {
    return (
        <> 
            <Button onClick={()=>{if(isActive()){on_click()}}}>
                {name}
            </Button>
        </>
    )
}

function Slider({ name,list,pick,initial }) {
    if(!initial){initial=''}
    const [open, setOpen] = useState(false)
    const [show,setShow] = useState(initial)


    return (
        <>
            <ButtonContainer open={open} list={list} onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
                    {open && list.map((item)=><Button onClick={()=>{pick(item);setShow(item)}}>{item}</Button>)}
                    <Button open={open} onClick={()=>setOpen(!open)}>
                        {name} {show}
                    </Button>
            </ButtonContainer>
        </>
    )
}


export default MazePage
