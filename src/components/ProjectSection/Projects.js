import Maze from '../../images/Maze.png'
import Maze1 from '../../images/Maze1.png'
import Maze2 from "../../images/Maze2.png";
import Slider from '../Slider'
import { BtnLink } from './ProjectElements'

export var Projects = [
  {
    name: "Maze generator and pathfinding algorithm",
    desc: "In this project, i utilize prim's randomized algorithm to generate a random maze. I also integrated a variety of algorithm to find the exit",
    pictSlider: true,
    pict: (
      <Slider
        contents={[{ pict: Maze }, { pict: Maze1 }, { pict: Maze2 }]}
        imgOnly={true}
        size={40}
      />
    ),
    button: <BtnLink to="maze">Try it!</BtnLink>,
  },
];

export default Projects