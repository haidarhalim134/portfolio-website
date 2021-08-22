function mazeGenerationAnimations(board,update,finished,maze=true) {
    let nodes = board.wallsToAnimate.slice(0);
    let speed = board.speed === "Fast" ?
      5 : board.speed === "Average" ?
        25 : 75;
    function iterate(index){
      if (index === nodes.length){
        finished()
        return;
      }update(...nodes[index])
      // t2 = performance.now()
      // console.log(t2-t1)
      // t1 = t2 
      timeout(index + 1);
    }
    function timeout(index) {
      if(maze&&index%10<9){
        iterate(index)
        return}
      setTimeout(function () {
          iterate(index)
      }, speed);
    }
  
    timeout(0);
  };
  
  export default mazeGenerationAnimations;