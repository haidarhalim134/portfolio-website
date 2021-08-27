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
    Path: { height: 0, color: "#222021" },
    Wall: { height: 1, color: "#fff" },
    Visited: { height: 0.5, color: "#01bf71" },
    Trail: { height: 1, color: "#ffff03" },
  };

  this.camera.position.set(0, 20, 100);
  this.gridHelper = new Three.GridHelper(100, 50);
  this.scene.add(this.gridHelper);

  this.ListofBoxes = [];
  this.ListofType = [];

  this.maxHeight = 10;
  this.minHeight = -10;
  this.genMaxHeight = 0
  this.genMinHeight = 0

  let geometry = new Three.BoxGeometry();
  const material = new Three.MeshBasicMaterial({
    wireframe: false,
  });

  let half_row = Math.floor(rows / 2);
  let half_col = Math.floor(cols / 2);

  for (let z = half_row * -1; z < half_row; z++) {
    let temp = [];
    for (let x = half_col * -1; x < half_col; x++) {
      let nBox = new Three.Mesh(geometry, material);
      nBox.position.set(x, 1, z);
      this.scene.add(nBox);
      temp.push(nBox);
    }
    this.ListofBoxes.push(temp);
  }

  this.calcHeight = ( height ) => {
    let minDiff = this.genMinHeight - this.minHeight
    return height*this.maxHeight/this.genMaxHeight+minDiff
  }

  this.change = (y, x, to) => {
    if (to !== null) {
      if (typeof to === "number") {
        this.ListofBoxes[y][x].position.setY(this.calcHeight(to))
      }else{
        this.ListofBoxes[y][x].position.setY(this.typeProperties[to].height);
        this.ListofBoxes[y][x].material.color.setHex(this.typeProperties[to].color)
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
