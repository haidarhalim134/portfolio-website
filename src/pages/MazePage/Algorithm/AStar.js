import { traverse_moves } from "./traverse_moves"

export function solve(grid,start_node,end_node,update=null){
    const traverse = {1:[1,0],2:[0,1],3:[-1,0],4:[0,-1]}
    let moves = []
    let to_from = {}

    if(!update){update = (y,x,z) => moves.push([y,x,z])}

    let priority_queue = [[0,0,0,...start_node,[]]]
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
        let [total,distance,heuristic, y, x, via] = priority_queue.pop()
        update(y,x,'Visited')
        if(y === end_node[0]&&x === end_node[1]){
            return {moves:moves,finished:true,trail:traverse_moves(to_from,end_node,start_node)}
        }if(!table[y][x]){
            table[y][x] = true
            to_from[`${y} ${x}`] = []
            for(let i = 1;i<5;i++){
                let [newy,newx] = [y - traverse[i][0],  x - traverse[i][1]]
                if(isValid(newy,newx)&&grid[newy][newx]!=='Wall'&&!table[newy][newx]){
                    to_from[`${y} ${x}`].push(`${newy} ${newx}`)
                    let new_heuristic = Math.sqrt(Math.max(0.3,Math.abs(end_node[0]-newy))*Math.max(0.3,Math.abs(end_node[1]-newx)))*5
                    let new_distance = distance + 1
                    let new_total = new_heuristic + new_distance
                    let condition = priority_queue.some((item,index)=>{
                        if(item[0]<new_total){
                            priority_queue.splice(index,0,[new_total,new_distance,new_heuristic,newy,newx,[y, x]])
                            return true
                        }
                    })
                    if(!condition){
                        priority_queue.push([new_total,new_distance,new_heuristic,newy,newx,[y, x]])
                    }
                }
            }
        }
    }
    return {moves:moves,finished:false}
}

export default solve

