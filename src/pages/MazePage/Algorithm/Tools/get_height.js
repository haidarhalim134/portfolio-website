import { solve } from '../GreedyBestFirstSearch'
import { Panel } from '../../ThreeJs'

export function get_height(y,x){
    if(Panel.status){
        return Panel.ListofHeight[y][x]
    }
    let target = document.getElementById(`${y} ${x}`)
    if(!target.height){return 255}
    return target.height
}

export function terrain_heuristic(grid,start_node,end_node){
    const traverse = {1:[1,1],2:[-1,1],3:[1,-1],4:[-1,-1],5:[1,0],6:[0,1],7:[-1,0],8:[0,-1]}
    let result = solve(grid,start_node,end_node,null,traverse)
    if(!result.finished){
        return 0
    }
    let effort = 0
    let trail = result.trail
    for(let i = 1;i<trail-1;i++){
        effort+= Math.abs(get_height(...trail[i-1])-get_height(...trail[i]))
    }
    return effort
}