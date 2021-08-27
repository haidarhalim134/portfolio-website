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
  this.camera.position.set(0, 20, 100);
  this.gridHelper = new Three.GridHelper(100, 50);
  this.scene.add(this.gridHelper);

  this.ListofBoxes = [];

  let geometry = new Three.BoxGeometry();
  const material = new Three.MeshBasicMaterial({
    color: 0xff6347,
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

  this.animate = () => {
    if(this.status){
    requestAnimationFrame(this.animate);
    this.controls.update();
    console.log(this.controls.enabled);
    this.renderer.render(this.scene, this.camera);
    }
  };

  this.init = () => {
    this.renderer = new Three.WebGL1Renderer({
      canvas: document.querySelector(`#ThreeD`),
    });
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = false;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, this.height);
  };
}
