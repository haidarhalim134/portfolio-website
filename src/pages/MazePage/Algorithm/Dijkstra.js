import { traverse_moves } from "./Tools/traverse_moves"
import { get_height } from './Tools/get_height'

export function solve(grid,start_node,end_node,update=null,terrain=null){
    const traverse = {1:[1,0],2:[0,1],3:[-1,0],4:[0,-1]}
    let moves = []
    let to_from = {}
    let visited = 0

    if(!update){update = (y,x,z) => moves.push([y,x,z])}

    let priority_queue = [[0,...start_node]]
    let table = []
    for(let y=0;y<grid.length;y++){
        let temp = []
        for(let x=0;x<grid[0].length;x++){
            temp.push(false)
        }table.push(temp)
    }

    function isValid(y, x){
        return y<grid.length && x<grid[0].length && y>=0 && x>=0
    }
    
    while(priority_queue.length>0){
        let [distance, y, x] = priority_queue.pop()
        // document.getElementById(`${y} ${x}`).innerHTML = Math.floor(distance)
        update(y,x,'Visited')
        visited+= 1
        if(y === end_node[0]&&x === end_node[1]){
            let trail = traverse_moves(to_from,end_node,start_node)
            return {moves:moves,finished:true,trail:trail,Visited:visited,pLength:trail.length,Effort:Math.floor(distance)}
        }if(!table[y][x]){
            table[y][x] = true
            to_from[`${y} ${x}`] = []
            for(let i = 1;i<5;i++){
                let [newy,newx] = [y - traverse[i][0],  x - traverse[i][1]]
                if(isValid(newy,newx)&&grid[newy][newx]!=='Wall'&&!table[newy][newx]){
                    to_from[`${y} ${x}`].push(`${newy} ${newx}`)
                    let new_distance = distance + 1
                    if(terrain){
                        new_distance+= Math.abs(get_height(y,x)-get_height(newy,newx))
                    }
                    let condition = priority_queue.some((item,index)=>{
                        if(item[0]<new_distance){
                            priority_queue.splice(index,0,[new_distance,newy,newx])
                            return true
                        }
                    })
                    if(!condition){
                        priority_queue.push([new_distance,newy,newx])
                    } 
                }
            }
        }
    }
    return {moves:moves,finished:false,Visited:visited}
}

export default solve

