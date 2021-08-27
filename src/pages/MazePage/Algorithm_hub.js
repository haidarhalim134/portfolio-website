import { solve as Dj }  from './Algorithm/Dijkstra'
import { solve as AStar }  from './Algorithm/AStar'
import { solve as DFS }  from './Algorithm/DFS'
import { solve as GBFS } from './Algorithm/GreedyBestFirstSearch'
import { sculpt as PrimsR } from './Algorithm/PrimsR'
import { sculpt as Wave } from './Algorithm/Wave'
import { sculpt as Perlin } from './Algorithm/PerlinNoise'

export const algoGroup = { 
    solve:{'Dijkstra':Dj, 'A*':AStar,'Greedy Best-First Search':GBFS,'DFS':DFS},
    generate:{ 'Prim\'s Randomized':PrimsR,'Wave Terrain':Wave }
 }

export default algoGroup