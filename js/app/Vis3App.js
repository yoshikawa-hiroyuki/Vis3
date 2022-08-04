/*
* Vis3App.js
*/
'use strict';


function resizeRendererToDisplaySize() {
    /* call this function as resizeRendererToDisplaySize.bind(this)
     * 'this' may be App
     */ 
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    const needResize = this.canvas.width !== width ||
	  this.canvas.height !== height;
    if (needResize) {
        this.renderer.setSize(width, height, false);
    }
    return needResize;
}

function requestRenderIfNotRequested() {
    /* call this function as requestRenderIfNotRequested.bind(this)
     * 'this' may be App
     */ 
    if (!this.renderRequested) {
        this.renderRequested = true;
        window.requestAnimationFrame(redraw.bind(this));
    }
}

function redraw() {
    /* call this function as redraw.bind(this), 'this' may be App
     */ 
    this.renderRequested = undefined;

    if (resizeRendererToDisplaySize.bind(this)()) {
        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();
    }

    this.renderer.render(this.scene, this.camera);
}


class App {
    constructor(canvas) {
	this.canvas = canvas;
	this.renderer = new THREE.WebGLRenderer({canvas});
	
	const fov = 75;
	const aspect = 2;  // the canvas default
	const near = 0.1;
	const far = 50;
	this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	this.camera.position.z = 2;

	this.controls = new THREE.OrbitControls(this.camera, this.canvas);
	this.controls.target.set(0, 0, 0);
	this.controls.screenSpacePanning = true;
	this.controls.update();
	
	this.scene = new THREE.Scene();
	this.scene.background = new THREE.Color('gray')

	this.root = new THREE.Group();
	this.scene.add(this.root);

	this.renderRequested = false;
    }

    addLight(...pos) {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(...pos);
        this.scene.add(light);
    }

    addObject(obj) {
	if ( obj.isObject3D )
	    this.root.add(obj);
    }

    render() {
	redraw.bind(this)();
    }

    main() {
	this.addLight(-1,  2,  4);
	this.addLight( 1, -1, -2);

	const axesHelper = new THREE.AxesHelper(1);
	this.scene.add(axesHelper);

	this.render();

	this.controls.addEventListener('change',
				       requestRenderIfNotRequested.bind(this));
	window.addEventListener('resize',
				requestRenderIfNotRequested.bind(this));
    }
}
