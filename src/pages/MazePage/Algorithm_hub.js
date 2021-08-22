import { solve as Dj }  from './Algorithm/Dijkstra'
import { solve as AStar }  from './Algorithm/AStar'
import { solve as DFS }  from './Algorithm/DFS'
import { solve as GBFS } from './Algorithm/GreedyBestFirstSearch'

export const Algo = { 'Dijkstra':Dj, 'A*':AStar,'Greedy Best-First Search':GBFS,'DFS':DFS}

export default Algo