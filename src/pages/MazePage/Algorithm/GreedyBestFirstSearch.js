import { traverse_moves } from "./Tools/traverse_moves"

export function solve(grid,start_node,end_node,update=null,terrain=false,traverse=null){
    if(traverse == null){
    traverse = {1:[1,0],2:[0,1],3:[-1,0],4:[0,-1]}}
    let moves = []
    let to_from = {}
    let visited = 0

    if(!update){update = (y,x,z) => moves.push([y,x,z])}

    let priority_queue = [[0,...start_node,[]]]
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
        let [heuristic, y, x, via] = priority_queue.pop()
        update(y,x,'Visited')
        visited+= 1
        if(y === end_node[0]&&x === end_node[1]){
            let trail = traverse_moves(to_from,end_node,start_node)
            return {moves:moves,finished:true,trail:trail,Visited:visited,pLength:trail.length,Effort:trail.length}
        }if(!table[y][x]){
            table[y][x] = true
            to_from[`${y} ${x}`] = []
            for(let i = 1;i<5;i++){
                let [newy,newx] = [y - traverse[i][0],  x - traverse[i][1]]
                if(isValid(newy,newx)&&grid[newy][newx]!=='Wall'&&!table[newy][newx]){
                    to_from[`${y} ${x}`].push(`${newy} ${newx}`)
                    let new_heuristic = Math.sqrt(((end_node[0]-newy))**2+((end_node[1]-newx))**2)
                    let condition = priority_queue.some((item,index)=>{
                        if(item[0]<new_heuristic){
                            priority_queue.splice(index,0,[new_heuristic,newy,newx,[y, x]])
                            return true
                        }
                    })
                    if(!condition){
                        priority_queue.push([new_heuristic,newy,newx,[y, x]])
                    }
                }
            }
        }
    }
    return {moves:moves,finished:false,Visited:visited}
}

export default solve

