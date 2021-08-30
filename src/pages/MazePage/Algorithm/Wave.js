  
const traverse = {1:[1,0],2:[0,1],3:[-1,0],4:[0,-1]}

function Surfer(y,x,height){
    this.x = x
    this.y = y
    this.visited = [[y,x]]
    this.lastMove = Math.floor(Math.random()*5)
    this.height = height
    this.moves = []
    
    this.isValid = (y,x,grid)=>{
        return y>=0 && x>=0 && y<grid.length && x<grid[0].length
    }

    this.move = function(grid,stuck = 0){
        if(stuck>3){
            return false
        }
        let dir = Math.floor(Math.random()*4)+1
        if(dir !== this.lastMove && grid[this.y - this.lastMove[0]] && grid[this.y - this.lastMove[0]][this.x - this.lastMove[1]]){
            for(let i = 0;i<4;i++){
                dir = Math.floor(Math.random()*4)+1
                if(dir === this.lastMove){
                    break
                }
            }
        }
        let [newy,newx] = [this.y - traverse[dir][0],  this.x - traverse[dir][1]]
        if(!this.isValid(newy,newx,grid) || this.visited.indexOf([newy,newx])>=0){
            return this.move(grid,stuck + 1)
        }
        this.lastMove = dir
        this.visited.push([newy,newx])
        this.y = newy
        this.x = newx
        return true
    }

    this.ripple = function(grid){
        let node = [[this.y,this.x]]
        let table = []
        for(let y=0;y<grid.length;y++){
            let temp = []
            for(let x=0;x<grid[0].length;x++){
                temp.push(false)
            }table.push(temp)
        }
        grid[this.y][this.x] = this.height
        while(node.length>0){
            let [y,x] = node.shift()
            if(!table[y][x]){
                table[y][x] = true
                for(let i = 1;i<5;i++){
                    let [newy,newx] = [y - traverse[i][0],  x - traverse[i][1]]
                    if(!grid[newy] || !grid[newy][newx] || !table[y][x] || (this.y === newy && this.x === newx)){
                        continue
                    }
                    let heightDiff = this.height-grid[newy][newx]
                    let alter = Math.round(this.calcHeight(this.calcDistance([this.y,this.x],[newy,newx]),heightDiff))
                    if(alter !== 0){
                        let newHeight = grid[newy][newx] + alter
                        grid[newy][newx] = newHeight
                        node.push([newy,newx])
                    }
                }
            }
        }return grid
    }
    this.calcHeight = function(distance,heightDiff){
        return heightDiff/distance**1.5
    }
    this.calcDistance = function(point1,point2){
        return Math.sqrt(((point1[0]-point2[0]))**2+((point1[1]-point2[1]))**2)
    }
}

export function sculpt(graph,minHeight=0,maxHeight=255){
    let grid = []
    let average = Math.floor((maxHeight + minHeight) / 2);
    let plusmin = [1,-1]
    for(let y = 0;y<graph.length;y++){
        let row = []
        for(let x=0;x<graph[0].length;x++){
            row.push((maxHeight+minHeight)/2)
            // grid[y][x] = Math.floor((maxHeight+minHeight)/2)
        }grid.push(row)
    }
    let groupofMoves = []
    let numofWave = Math.floor(Math.random()*7)+10
    let peaks = []
    for(let i = 0;i<numofWave;i++){
        let waveLength = Math.floor(Math.random()*2*Math.max(Math.sqrt(grid.length),Math.sqrt(grid[0].length)))+4
        let radHeight = average - Math.floor(Math.random()*(average-average*0.5))+average * 0.5 * plusmin[Math.floor(Math.random()*2)] //Math.floor(Math.random()*(maxHeight-minHeight))+minHeight
        let [randY, randX] = [Math.floor(Math.random()*grid.length),Math.floor(Math.random()*grid[0].length)]
        peaks.push([randY, randX])
        let surf = new Surfer(randY,randX,radHeight)
        for(let j = 0;j<waveLength;j++){
            grid = surf.ripple(grid)
            if(!surf.move(grid)){
                break
            }
        }
        groupofMoves.push(grid)
    }
    return [grid]
}