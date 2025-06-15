let scene, camera, renderer, truck, golds = [], enemies = [];
let clock = new THREE.Clock();
let goldCount = 0, timeElapsed = 0, isGameOver = false;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, -10);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas") });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, 0.8);
  directional.position.set(0, 10, -10);
  scene.add(directional);

  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 1000),
    new THREE.MeshStandardMaterial({ color: 0x333333 })
  );
  road.rotation.x = -Math.PI / 2;
  scene.add(road);

  truck = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 2),
    new THREE.MeshStandardMaterial({ color: 0x007bff })
  );
  truck.position.y = 0.5;
  scene.add(truck);

  for (let i = 0; i < 10; i++) {
    const gold = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xffd700 })
    );
    gold.position.set((Math.random() - 0.5) * 10, 0.3, Math.random() * 500);
    golds.push(gold);
    scene.add(gold);
  }

  animate();
}

function animate() {
  if (isGameOver) return;

  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  timeElapsed += delta;

  document.getElementById("timer").textContent = `⏱ Süre: ${Math.floor(timeElapsed)}sn`;
  camera.position.z += 0.1;
  truck.position.z = camera.position.z + 5;

  golds.forEach(g => {
    if (truck.position.distanceTo(g.position) < 1) {
      goldCount++;
      document.getElementById("gold").textContent = `💰 Altın: ${goldCount}`;
      scene.remove(g);
    }
  });

  renderer.render(scene, camera);
}

function startGame() {
  document.getElementById("startScreen").style.display = "none";
  init();
}

function restartGame() {
  location.reload();
}
