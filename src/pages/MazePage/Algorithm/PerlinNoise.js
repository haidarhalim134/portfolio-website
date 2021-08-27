let perlin = {
    rand_vect: function(){
        let theta = Math.random() / 2 * Math.PI;
        return {x: Math.cos(theta), y: Math.sin(theta)};
    },
    dot_prod_grid: function(x, y, vx, vy){
        let g_vect;
        let d_vect = {x: x - vx, y: y - vy};
        if (this.gradients[[vx,vy]]){
            g_vect = this.gradients[[vx,vy]];
        } else {
            g_vect = this.rand_vect();
            this.gradients[[vx, vy]] = g_vect;
        }
        return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
    },
    smootherstep: function(x){
        return 6*x**5 - 15*x**4 + 10*x**3;
    },
    interp: function(x, a, b){
        return a + this.smootherstep(x) * (b-a);
    },
    seed: function(){
        this.gradients = {};
        this.memory = {};
    },
    get: function(x, y) {
        if (this.memory.hasOwnProperty([x,y]))
            return this.memory[[x,y]];
        let xf = Math.floor(x);
        let yf = Math.floor(y);
        //interpolate
        let tl = this.dot_prod_grid(x, y, xf,   yf);
        let tr = this.dot_prod_grid(x, y, xf+1, yf);
        let bl = this.dot_prod_grid(x, y, xf,   yf+1);
        let br = this.dot_prod_grid(x, y, xf+1, yf+1);
        let xt = this.interp(x-xf, tl, tr);
        let xb = this.interp(x-xf, bl, br);
        let v = this.interp(y-yf, xt, xb);
        this.memory[[x,y]] = v;
        return v;
    }
}

export function sculpt(grid, start_node=null, end_node=null, update=null){

    let moves = []
    if(!update){update = (y,x,type)=>{moves.push([y,x,type])}}
    perlin.seed()

    let reso = 128

    for(let y = 0;y<grid.length;y++){
        for(let x = 0;x<grid[0].length;x++){
            x/= reso
            y/= reso
            let value1 = perlin.get(x/0.9,y/0.9)
            let value2 = 0.5 * perlin.get(2*x/0.9,2*y/0.9)
            let value3 = 0.25 * perlin.get(4*x/0.9,4*y/0.9)
            let sum = [value1,value2,value3].map((item)=>Math.abs(item)).reduce((a,b)=>a+b)
            let value = (parseInt(sum*255) + 1)*3
            update(y*reso, x*reso, value)
        }
    }
    console.log(moves)
    return moves
}