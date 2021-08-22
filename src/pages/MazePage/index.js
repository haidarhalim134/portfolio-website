import React,{useState} from 'react'
import './index.css'
import { MazeContainer,ControlPanel,Button,Board,Row,Box, ButtonContainer, BlocksMenuContainer, BlocksOption, BlockIcon } from './MazeElements'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { fill,sculpt } from './Algorithm/PrimsR'
import Algo from './Algorithm_hub'
import mazeGenerationAnimations from './animator'

function MazePage() {
    let buttonState = true

    let ListofType = []
    let start_node = [8,14]
    let end_node = [8,41]
    let Algorithm = ''
    let speed = 'Fast'
    let carry = false
    let mouse_down = false
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

    const change = async(y,x,to=null,override=false) => {
        if (to){
            let target = document.getElementById(`${y} ${x}`)
            if(/fa/.test(target.className) && !override){
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

    const handleBoxClick = (y,x) => {
        if(/fa/.test(ListofType[y][x]) && !carry && buttonState){
            carry = ListofType[y][x]
            change(y, x, 'Path', true)
            buttonState = false
            document.getElementById('board').style.cursor = 'crosshair'
        }else if(carry && !/fa/.test(ListofType[y][x])){
            change(y, x, carry)
            buttonState = true
            document.getElementById('board').style.cursor = 'default'
            carry = null
            if(/bul/.test(ListofType[y][x])){
                end_node = [y, x]
            }else{
                start_node = [y, x]
            }
        }else if(!carry){
        change(y, x)
        }
    }

    const isActive = ()=> buttonState
    const set_speed = (item)=>speed=item
    const set_algorithm = (item)=>Algorithm=item
    const set_carry = (item) => {
        carry=item
    }



    return (
        <MazeContainer>
            <WholePanel set_speed={set_speed} speed_list={speed_list} set_algorithm={set_algorithm} 
                isActive={isActive} generate_maze={()=>generate_maze(ListofType)} clearVisited={()=>clearVisited(ListofType)} 
                solve={()=>solve(ListofType)} clearGrid={()=>clearGrid(ListofType)} />
            <Board id='board' column={ListofType.length} onMouseDown={()=>mouse_down=true} 
                onMouseUp={()=>mouse_down=false} onMouseLeave={()=>mouse_down=false}>
            {ListofType.map((row,y)=><Row>{row.map((column,x)=>
                <Box onMouseEnter={()=>{if(mouse_down){change(y,x)}}} onClick={()=>handleBoxClick(y,x)} >
                <div id={`${y} ${x}`} className={column}/>
                </Box>)}</Row>)}
            </Board>
        </MazeContainer>
    )
}

function WholePanel({ set_speed,speed_list,set_algorithm,isActive,generate_maze,clearVisited,solve,clearGrid }) {

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            <Navbar toggle={toggle}/>
            <ControlPanel>
                <Slider name='Algorithm' list={Object.keys(Algo)} pick={(item)=>{set_algorithm(item)}}/>
                <ButtonWrapper name='Generate Maze' on_click={generate_maze} isActive={isActive} />
                <ButtonWrapper name='Find Path' on_click={()=>{clearVisited();solve()}} isActive={isActive} />
                <ButtonWrapper name='Clear Board' on_click={clearGrid} isActive={isActive} />
                <ButtonWrapper name='Clear Path' on_click={clearVisited} isActive={isActive} />
                <Slider name='Speed' list={speed_list} pick={(item)=>{set_speed(item)}} initial={'Fast'}/>
            </ControlPanel>
            <BlocksMenuContainer>
                <BlocksWrapper name='Start Node' icon='fa fa-asterisk' />
            </BlocksMenuContainer>
        </>
    )
}

function BlocksWrapper({ name,icon,isActive,available }) {
    return (
        <>
            <BlocksOption>
                <BlockIcon className={icon} onClick={()=>{if(isActive()){}}} available={()=>available()} /> {name}
            </BlocksOption>
        </>
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
