import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ThreeContainer } from "./ThreeElements";

export function ThreeObject(
  rows = 15,
  cols = 55,
  minHeight = 0,
  maxHeight = 100
) {
  this.status = false;
  this.height = (400 * rows) / 15;
  this.scene = new Three.Scene();
  this.camera = new Three.PerspectiveCamera(
    75,
    window.innerWidth / this.height,
    0.1,
    1000
  );

  this.typeProperties = {
    Path: { height: 0, color: "0xffffff" },
    Wall: { height: 1, color: "0x222021" },
    Visited: { height: 0.5, color: "0x01bf71" },
    Trail: { height: 1, color: "0xffff03" },
  };

  this.camera.position.set(0, 20, 10);
  this.gridHelper = new Three.GridHelper(100, 50);

  this.ListofBoxes = [];
  this.ListofType = [];
  this.ListofHeight = []

  this.maxHeight = 10;
  this.minHeight = -10;
  this.genMaxHeight = 0
  this.genMinHeight = 0
  this.terrain = false;
  this.start = [8, 14];
  this.end = [8, 41];

  let geometry = new Three.BoxGeometry();

  let half_row = Math.floor(rows / 2);
  let half_col = Math.floor(cols / 2);

  for (let z = half_row * -1; z < half_row+1; z++) {
    let temp = [];
    let height= [];
    for (let x = half_col * -1; x < half_col+1; x++) {
      let material = new Three.MeshStandardMaterial({
        wireframe: false,
      });
      if(z%7==0&&x%7==0){
        let light = new Three.PointLight(0xffffff, 1, 30);
        light.position.set(x, 20, z);
        this.scene.add(light);
      }
      let nBox = new Three.Mesh(geometry, material);
      nBox.position.set(x, 0, z);
      if ([z, x][0]+half_row === this.start[0] && [z, x][1]+half_col === this.start[1]) {
        let geometry = new Three.ConeGeometry(1, 2);
        let material = new Three.MeshStandardMaterial({
          wireframe: false,
          color: "#000",
        });
        this.start = new Three.Mesh(geometry, material);
        this.scene.add(this.start);
        this.start.position.set(x, 1, z);
      } else if (
        [z, x][0] + half_row === this.end[0] &&
        [z, x][1] + half_col === this.end[1]
      ) {
        let geometry = new Three.SphereGeometry(0.5);
        let material = new Three.MeshStandardMaterial({
          wireframe: false,
          color: "#000",
        });
        this.end = new Three.Mesh(geometry, material);
        this.scene.add(this.end);
        this.end.position.set(x, 1, z);
      }
      this.scene.add(nBox);
      temp.push(nBox);
      height.push(1);
    }
    this.ListofBoxes.push(temp);
    this.ListofHeight.push(height)
  }

  this.calcHeight = ( height ) => {
    let minDiff = this.genMinHeight - this.minHeight
    console.log(this.maxHeight,this.minHeight,this.genMaxHeight,this.genMinHeight)
    return (height-this.genMinHeight)*(this.maxHeight-this.minHeight)/(this.genMaxHeight-this.genMinHeight)-minDiff+this.genMinHeight
  }

  this.change = (y, x, to) => {
    console.log(to)
    if (to !== null) {
      if (typeof to === "number") {
        this.ListofBoxes[y][x].position.setY(this.calcHeight(to))
        this.ListofHeight[y][x] = to
        if (
          this.start.position.x == x - half_col &&
          this.start.position.z == y - half_row
        ) {
          this.start.position.setY(this.ListofBoxes[y][x].position.y + 1);
        } else if (
          this.end.position.x == x - half_col &&
          this.end.position.z == y - half_row
        ) {
          this.end.position.setY(this.ListofBoxes[y][x].position.y + 1);
        }
      }else{
        if(/fa/.test(to)){
          if(/ast/.test(to)){
            this.start.position.set(
              this.ListofBoxes[y][x].position.x,
              this.ListofBoxes[y][x].position.y + 1,
              this.ListofBoxes[y][x].position.z
            );
          }else{
            this.end.position.set(
              this.ListofBoxes[y][x].position.x,
              this.ListofBoxes[y][x].position.y + 1,
              this.ListofBoxes[y][x].position.z
            );
          }
          to = 'Path'
        }
        if(!this.terrain){
        this.ListofBoxes[y][x].position.setY(this.typeProperties[to].height);
        }
        this.ListofBoxes[y][x].material.color.setHex(this.typeProperties[to].color)
        this.ListofType[y][x] = to
      }
    }
  }

  this.animate = () => {
    if(this.status){
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    }
  };

  this.init = (ListofType, genMinHeight, genMaxHeight) => {
    this.genMinHeight = genMinHeight
    this.genMaxHeight = genMaxHeight
    this.ListofType = ListofType;
    this.renderer = new Three.WebGL1Renderer({
      canvas: document.querySelector(`#ThreeD`),
    });

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = false;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, this.height);
  };
}
