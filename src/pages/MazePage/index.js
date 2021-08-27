import React, { useState } from "react";
import "./index.css";
import {
  MazeContainer,
  ControlPanel,
  Button,
  Board,
  Row,
  Box,
  ButtonContainer,
  BlocksMenuContainer,
  BlocksOption,
  BlockIcon,
  StatisticsContainer,
  Statistic,
  Stat,
  StatisticIcon,
  StatisticConstant,
} from "./MazeElements";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { fill, sculpt } from "./Algorithm/PrimsR";
import algoGroup from "./Algorithm_hub";
import mazeGenerationAnimations from "./animator";
import ThreeD, { Panel } from "./ThreeJs";
import Grass from "../../images/grass.jpg";
import Stone from "../../images/stone.png";

const Algo = algoGroup.solve;
const genAlgo = algoGroup.generate;
const complex = ["Wave Terrain"];

function MazePage() {
  const [isThreeD, setThreeD] = useState(false);

  let buttonState = true;

  let ListofType = [];
  let start_node = [8, 14];
  let end_node = [8, 41];
  let Algorithm = "";
  let Generator = "";
  let speed = "Fast";
  let carry = false;
  let mouse_down = false;
  let terrain = false;
  let min_height = 10;
  let max_height = 100;
  let textured = false;
  const speed_list = ["Fast", "Average", "Slow"];
  //initialize maze with path box
  for (let y = 0; y < 15; y++) {
    let temp = [];
    for (let x = 0; x < 55; x++) {
      temp.push("Path");
      if (y === 8) {
        if (x === 14) {
          temp[temp.length - 1] += " fa fa-asterisk";
        } else if (x === 41) {
          temp[temp.length - 1] += " fas fa-bullseye";
        }
      }
    }
    ListofType.push(temp);
  }

  const clearGrid = (Grid) => {
    for (let y = 0; y < Grid.length; y++) {
      for (let x = 0; x < Grid[0].length; x++) {
        change(y, x, "Path");
      }
    }
    return Grid;
  };

  const clearVisited = (Grid) => {
    for (let y = 0; y < Grid.length; y++) {
      for (let x = 0; x < Grid[0].length; x++) {
        if (/Visited/.test(Grid[y][x]) || /Trail/.test(Grid[y][x])) {
          change(y, x, "Path");
        }
      }
    }
    return Grid;
  };

  const clearHeight = (Grid) => {
    for (let y = 0; y < Grid.length; y++) {
      for (let x = 0; x < Grid[0].length; x++) {
        let target = document.getElementById(`${y} ${x}`);
        target.style = null;
      }
    }
    return Grid;
  };

  const solve = (maze) => {
    if (typeof Algo[Algorithm] != "function") {
      return;
    }
    let args = [null, terrain];
    let result = Algo[Algorithm](maze, start_node, end_node, ...args);
    let moves = [...result.moves];
    if (result.finished) {
      moves = [...moves, ...result.trail];
    }
    update_stat({ Visited: 0, pLength: 0, Effort: 0 });
    animate({ wallsToAnimate: moves, speed: speed }, false, {
      func: update_stat,
      arg: [result],
    });
  };

  const update_stat = (result) => {
    for (let key of Object.keys(result)) {
      let target = document.getElementById(key);
      if (target) {
        target.innerHTML = result[key];
      }
    }
  };

  const generate_coordinates = (grid) => {
    let moves = [];
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        moves.push([y, x, grid[y][x]]);
      }
    }
    return moves;
  };

  const generate_maze = () => {
    if (typeof genAlgo[Generator] != "function") {
      return;
    }
    ListofType = clearGrid(ListofType);
    if (complex.indexOf(Generator) >= 0) {
      terrain = true;
      let moves = genAlgo[Generator](
        ListofType.slice(),
        min_height,
        max_height
      );
      let combine = [];
      console.log("layer", moves.length);
      for (let i = 0; i < moves.length; i++) {
        combine = [...combine, ...generate_coordinates(moves[i])];
      }
      // for(let state of moves){
      //     combine = [...combine,...generate_coordinates(state)]
      //     console.log('layered')
      // }
      // console.log('if',combine.some((item,index)=>{if(typeof item[2] != 'number'){console.log('got',item)}}))
      animate({ wallsToAnimate: combine, speed: speed }, true);
      ListofType = clearGrid(ListofType);
      return;
    }
    clearHeight(ListofType);
    terrain = false;
    let moves = genAlgo[Generator](
      fill(ListofType[0].length, ListofType.length),
      start_node,
      end_node
    );
    animate({ wallsToAnimate: moves, speed: speed }, true);
  };

  const animate = (board, jump, func = { func: () => true, arg: [] }) => {
    buttonState = false;
    mazeGenerationAnimations(
      board,
      change,
      () => {
        func.func(...func.arg);
        buttonState = true;
      },
      jump
    );
  };

  const change = async (y, x, to = null, override = false) => {
    if (to !== null) {
      let target = document.getElementById(`${y} ${x}`);
      if (!target) {
        console.log(`oopsie`);
      } else if (typeof to === "number") {
        target.height = to;
        target.style.filter = `brightness(${to}%)`;
        if (textured) {
          if (to > (max_height - min_height) / 2) {
            target.style.backgroundImage =
              "url(https://i.pinimg.com/originals/51/64/23/516423d8a2d73309efba8f221ab7740c.png)";
          } else {
            target.style.backgroundImage =
              "url(https://i.redd.it/wly7g262kw461.jpg)";
          }
        }
        return;
      } else if (/fa/.test(target.className) && !override) {
        if (to != "Wall") {
          let classes = target.className.split(" ");
          classes[0] = to;
          to = classes.join(" ");
        } else {
          return;
        }
      }
      ListofType[y][x] = to;
      target.className = to;
      return;
    }
    if (ListofType[y][x] != "Wall" && !/fa/.test(ListofType[y][x])) {
      ListofType[y][x] = "Wall";
      document.getElementById(`${y} ${x}`).className = "Wall";
    } else if (ListofType[y][x] == "Wall") {
      ListofType[y][x] = "Path";
      document.getElementById(`${y} ${x}`).className = "Path";
    }
  };

  const handleBoxClick = (y, x) => {
    if (/fa/.test(ListofType[y][x]) && !carry && buttonState) {
      carry = ListofType[y][x];
      change(y, x, "Path", true);
      buttonState = false;
      document.getElementById("board").style.cursor = "crosshair";
    } else if (carry && !/fa/.test(ListofType[y][x])) {
      change(y, x, carry);
      buttonState = true;
      document.getElementById("board").style.cursor = "default";
      carry = null;
      if (/bul/.test(ListofType[y][x])) {
        end_node = [y, x];
      } else {
        start_node = [y, x];
      }
    } else if (!carry) {
      change(y, x);
    }
  };

  const isActive = () => buttonState;
  const set_speed = (item) => (speed = item);
  const set_algorithm = (item) => (Algorithm = item);
  const set_3D = (item) => {
    if (item) {
      Panel.status = true;
      Panel.init();
      Panel.animate();
    } else {
      Panel.status = false;
    }
    setThreeD(item);
  };
  const set_generator = (item) => {
    Generator = item;
    if (buttonState) {
      generate_maze();
    }
  };
  const set_carry = (item) => {
    carry = item;
  };

  return (
    <MazeContainer>
      <WholePanel
        set_speed={set_speed}
        speed_list={speed_list}
        set_algorithm={set_algorithm}
        set_generator={set_generator}
        isActive={isActive}
        generate_maze={() => generate_maze(ListofType)}
        clearVisited={() => clearVisited(ListofType)}
        solve={() => solve(ListofType)}
        clearGrid={() => clearGrid(ListofType)}
        set_3D={set_3D}
      />
      <Board
        id="board"
        column={ListofType.length}
        onMouseDown={() => (mouse_down = true)}
        onMouseUp={() => (mouse_down = false)}
        onMouseLeave={() => (mouse_down = false)}
      >
        <ThreeD isActive={isThreeD}></ThreeD>
        {!isThreeD &&
          ListofType.map((row, y) => (
            <Row>
              {row.map((column, x) => (
                <Box
                  onMouseEnter={() => {
                    if (mouse_down) {
                      change(y, x);
                    }
                  }}
                  onClick={() => handleBoxClick(y, x)}
                >
                  <div id={`${y} ${x}`} className={column} />
                </Box>
              ))}
            </Row>
          ))}
      </Board>
    </MazeContainer>
  );
}

function WholePanel({
  set_speed,
  speed_list,
  set_algorithm,
  set_generator,
  isActive,
  generate_maze,
  clearVisited,
  solve,
  clearGrid,
  set_3D,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [remove, setRemove] = useState(false);

  const toggle = () => {
    if (!isOpen) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <Sidebar isOpen={isOpen} remove={remove} toggle={toggle} />
      <Navbar toggle={toggle} />
      <ControlPanel>
        <Slider
          name="Algorithm"
          list={Object.keys(Algo)}
          pick={(item) => {
            set_algorithm(item);
          }}
        />
        <Slider
          name="Generator"
          list={Object.keys(genAlgo)}
          pick={(item) => {
            set_generator(item);
          }}
        />
        <ButtonWrapper
          name="Generate Maze"
          on_click={generate_maze}
          isActive={isActive}
        />
        <ButtonWrapper
          name="Find Path"
          on_click={() => {
            clearVisited();
            solve();
          }}
          isActive={isActive}
        />
        <ButtonWrapper
          name="Clear Board"
          on_click={clearGrid}
          isActive={isActive}
        />
        <ButtonWrapper
          name="Clear Path"
          on_click={clearVisited}
          isActive={isActive}
        />
        <Slider
          name="Speed"
          list={speed_list}
          pick={(item) => {
            set_speed(item);
          }}
          initial={"Fast"}
        />
        <Slider
          name="3D"
          list={["Yes", "No"]}
          pick={(item) => {
            let yn = { Yes: true, No: false };
            set_3D(yn[item]);
          }}
          initial="No"
        />
      </ControlPanel>
      <StatisticsContainer>
        <StatisticWrapper name="Visited" icon="Visited" unit="Nodes" />
        <StatisticWrapper
          name="Path length"
          icon="Trail"
          unit="Nodes"
          id="pLength"
        />
        <StatisticWrapper name="Effort" icon="fas fa-hiking" unit="Ugh" />
      </StatisticsContainer>
    </>
  );
}

function StatisticWrapper({ name, icon, unit, id }) {
  return (
    <>
      <Statistic>
        <StatisticConstant>
          <StatisticIcon className={icon} /> {name}:
        </StatisticConstant>
        <Stat id={id ? id : name}>0</Stat>
        {unit}
      </Statistic>
    </>
  );
}

function BlocksWrapper({ name, icon, isActive, available }) {
  return (
    <>
      <BlocksOption>
        <BlockIcon
          className={icon}
          onClick={() => {
            if (isActive()) {
            }
          }}
          available={() => available()}
        />{" "}
        {name}
      </BlocksOption>
    </>
  );
}

function ButtonWrapper({ name, on_click, isActive }) {
  return (
    <>
      <Button
        onClick={() => {
          if (isActive()) {
            on_click();
          }
        }}
      >
        {name}
      </Button>
    </>
  );
}

function Slider({ name, list, pick, initial }) {
  if (!initial) {
    initial = "";
  }
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(initial);

  return (
    <>
      <ButtonContainer
        open={open}
        list={list}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {open &&
          list.map((item) => (
            <Button
              onClick={() => {
                pick(item);
                setShow(item);
              }}
            >
              {item}
            </Button>
          ))}
        <Button open={open} onClick={() => setOpen(!open)}>
          {name}: {show}
        </Button>
      </ButtonContainer>
    </>
  );
}

export default MazePage;
