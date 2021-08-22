

export function fill(col,row){
    let result = []
    for(let y = 0;y<row;y++){
        let temp = []
        for(let x = 0;x<col;x++){
            temp.push('\'')
        }result.push(temp)
    }return result
}


export function sculpt(maze, start_node=null, end_node=null, update=null){

    let moves = []
    if(!update){update = (y,x,type)=>{moves.push([y,x,type])}}

  function isValid(y, x){
    return y<maze.length && x<maze[0].length && y>=0 && x>=0
  }

  function surrounding_cells(y, x){
    let path_cell = 0
    for(let i = 1;i < 5;i++){
        let [newy, newx] = [y+traverse[i][0], x+traverse[i][1]]
        if(isValid(newy, newx) && maze[newy][newx] == 'Path'){
            path_cell+= 1
        }
    }return path_cell
  }

  function turn(y, x){
    for(let i = 1;i < 5;i++){
        let [newy, newx] = [y+traverse[i][0], x+traverse[i][1]]
        if(isValid(newy, newx) && maze[newy][newx] == '\''){
            maze[newy][newx] = 'Wall'
            update(newy, newx, 'Wall')
            walls.push([newy, newx])
        }
    }
  }

  function turn_unidentified_cell(maze){
      let result = []
      for(let y = 0;y<maze.length;y++){
          let temp = []
          for(let x = 0;x<maze[0].length;x++){
            if(maze[y][x]=='\''){
            temp.push('Wall')
            update(y,x,'Wall')
          }else{
            temp.push(maze[y][x])
            }
          }result.push(temp)
      }
  }

  let traverse = {1: [1, 0], 2: [0, 1], 3: [-1, 0], 4: [0, -1]}
  let walls = []
  if(!start_node||!end_node){
    let randomy  = Math.floor(Math.random() * (maze.length - 4)) + 2
    let randomx = Math.floor(Math.random() * (maze[0].length - 4)) + 2
    
    maze[randomy][randomx] = 'Path'
    update(randomy,randomx, 'Path')

    turn(randomy, randomx)}
  else{
    for(let node of [start_node]){
    maze[node[0]][node[1]] = 'Path'
    update(...node, 'Path')

    turn(...node)}
  }
  while(walls.length>0){
      let random_index = Math.floor(Math.random() * walls.length)
      let random_wall = walls[random_index]
      
      for(let i = 0;i < 2;i++){
          for(let j = -1;j < 2;j+= 2){
              let holder = [random_wall[i == 0?1:i-1] + j, random_wall[i == 0?1:i-1] - j, random_wall[i], random_wall[i]]
              if(i == 0){holder.reverse()}
              let [static1, static2, one_side, other_side] = holder

              if(!isValid(static1,one_side) || !isValid(static2,other_side)){
                  continue
              }
              
              if(maze[static1][one_side] == '\'' && maze[static2][other_side] == 'Path' && surrounding_cells(...random_wall) < 2){
                  maze[random_wall[0]][random_wall[1]] = 'Path'
                  update(...random_wall, 'Path')
                  turn(...random_wall)
                  
              }
          }
      }walls.splice(random_index,1)
  }
  maze = turn_unidentified_cell(maze)
  return moves
}

export default fill