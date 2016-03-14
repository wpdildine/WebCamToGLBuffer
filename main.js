var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);
var sphere;
var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    sphere = BABYLON.Mesh.CreateBox("sphere1", 5, scene, true);

    // Move the sphere upward 1/2 its height

    var mat = new BABYLON.StandardMaterial("mat", scene);

    var videoTexture = new BABYLON.VideoTexture("video", document.getElementById('videoElement'), scene, false, true, 2);

    mat.diffuseTexture = videoTexture;
    sphere.material = mat;

    scene.onPointerUp = function () {
        videoTexture.video.play();
    }
    return scene;

};
/**
 * Created by Patrick on 3/14/2016.
 */
var scene = createScene();
engine.runRenderLoop(function () {
    sphere.rotation.x += .01;
    sphere.rotation.y += .01;

    scene.render();
});

window.addEventListener('resize', function () {
    engine.resize();
});