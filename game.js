const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const healthPanel = document.getElementById("healthPanel");
const statsPanel = document.getElementById("statsPanel");
const weaponPanel = document.getElementById("weaponPanel");
const messageEl = document.getElementById("message");
const startOverlay = document.getElementById("startOverlay");
const startBtn = document.getElementById("startBtn");
const ammoGrid = document.getElementById("ammoGrid");
const ammoText = document.getElementById("ammoText");
const minimapCanvas = document.getElementById("minimap");
const minimapCtx = minimapCanvas.getContext("2d");
const ENEMY_IMAGE_DATA_URL = "data:image/jpeg;base64,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";

let scene;
let camera;
let playerCollider;
let uiState;
let world;
let gameEnded = false;
let inputBound = false;
let weaponView = null;

const keys = {};
const gravity = -30;
const walkSpeed = 8.5;
const jumpSpeed = 12.5;
const pickupRadius = 1.7;
const targetScore = 100;
const ammoUiCapacity = 20;
const maxAmmoPerWeapon = 100;

const WEAPON_DATA = {
  pistol: {
    name: "Пистолет",
    damage: 26,
    cooldown: 220,
    spread: 0.0055,
    pellets: 1,
    magSize: 12,
    color: new BABYLON.Color3(0.3, 0.9, 1.0)
  },
  shotgun: {
    name: "Дробовик",
    damage: 14,
    cooldown: 700,
    spread: 0.042,
    pellets: 7,
    magSize: 8,
    color: new BABYLON.Color3(1.0, 0.55, 0.2)
  }
};

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function randInt(min, maxInclusive) {
  return Math.floor(rand(min, maxInclusive + 1));
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createRun() {
  if (scene) scene.dispose();

  scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0.06, 0.08, 0.12, 1);

  const hLight = new BABYLON.HemisphericLight("h", new BABYLON.Vector3(0.2, 1, 0.1), scene);
  hLight.intensity = 0.93;
  const dLight = new BABYLON.DirectionalLight("d", new BABYLON.Vector3(-0.25, -1, -0.12), scene);
  dLight.position = new BABYLON.Vector3(30, 50, 10);
  dLight.intensity = 0.48;

  camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 2.1, -8), scene);
  camera.speed = 0;
  camera.inertia = 0;
  camera.angularSensibility = 3300;
  camera.minZ = 0.05;
  camera.attachControl(canvas, true);

  const sky = BABYLON.MeshBuilder.CreateBox("sky", { size: 350 }, scene);
  const skyMat = new BABYLON.StandardMaterial("skyMat", scene);
  skyMat.backFaceCulling = false;
  skyMat.disableLighting = true;
  skyMat.emissiveColor = new BABYLON.Color3(0.06, 0.1, 0.16);
  sky.material = skyMat;

  world = {
    ground: null,
    walls: [],
    obstacles: [],
    enemies: [],
    enemyProjectiles: [],
    pickups: [],
    exitPortal: null,
    safeSpawn: [],
    sizeX: 60,
    sizeZ: 60,
    runStartedAt: performance.now(),
    nextWaveAt: performance.now() + 20000,
    waveIndex: 1,
    occupiedPickupPoints: [],
    enemySpriteMaterial: null,
    enemyTextureLoaded: false
  };

  buildHudWidgets();

  uiState = {
    hp: 100,
    score: 0,
    weaponsOwned: { pistol: true, shotgun: false },
    currentWeapon: "pistol",
    ammo: {
      pistol: { mag: WEAPON_DATA.pistol.magSize, reserve: 24 },
      shotgun: { mag: 0, reserve: 0 }
    },
    canShootAt: 0,
    verticalVelocity: 0,
    onGround: false,
    levelSeedText: "",
    waveText: "Волна 1"
  };

  buildProceduralLevel();
  createPlayerCollider();
  prepareEnemySpriteMaterial();
  spawnPickupsAndEnemies(randInt(7, 10));
  createExitPortal();
  createWeaponViewModels();

  scene.onPointerDown = () => {
    if (!document.pointerLockElement && !gameEnded) {
      canvas.requestPointerLock();
      return;
    }
    if (document.pointerLockElement && !gameEnded) {
      tryShoot();
    }
  };

  setupInputs();
  setupLoop();
  updateHUD("Забег начался. Наберите 100 очков и доберитесь до портала.");
}

function prepareEnemySpriteMaterial() {
  const enemyMat = new BABYLON.StandardMaterial("enemySpriteMat", scene);
  enemyMat.backFaceCulling = false;
  enemyMat.diffuseColor = new BABYLON.Color3(1, 1, 1);
  enemyMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
  enemyMat.disableLighting = true;
  world.enemySpriteMaterial = enemyMat;

  const img = new Image();
  img.onload = () => {
    const texSize = 256;
    const dyn = new BABYLON.DynamicTexture("enemyDynTex", { width: texSize, height: texSize }, scene, true);
    const ctx = dyn.getContext();
    ctx.clearRect(0, 0, texSize, texSize);
    // Flip once while drawing to avoid UV artifacts.
    ctx.save();
    ctx.translate(0, texSize);
    ctx.scale(1, -1);
    ctx.drawImage(img, 0, 0, texSize, texSize);
    ctx.restore();
    dyn.hasAlpha = false;
    dyn.update(false);
    enemyMat.diffuseTexture = dyn;
    enemyMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
    world.enemyTextureLoaded = true;
    updateHUD("Текстура врагов enemy.jpg загружена.");
  };
  img.onerror = () => {
    world.enemyTextureLoaded = false;
    updateHUD("Не удалось загрузить enemy.jpg. Проверьте имя файла и перезапустите страницу.");
  };
  img.src = ENEMY_IMAGE_DATA_URL;
}

function buildHudWidgets() {
  healthPanel.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "♥";
    healthPanel.appendChild(heart);
  }

  ammoGrid.innerHTML = "";
  for (let i = 0; i < ammoUiCapacity; i++) {
    const cell = document.createElement("span");
    cell.className = "ammoCell";
    ammoGrid.appendChild(cell);
  }
}

function setupInputs() {
  if (inputBound) return;
  inputBound = true;

  window.addEventListener("keydown", (e) => {
    keys[e.code] = true;
    if (e.code === "Digit1") switchWeapon("pistol");
    if (e.code === "Digit2") switchWeapon("shotgun");
    if (e.code === "KeyR") reloadWeapon();
  });

  window.addEventListener("keyup", (e) => {
    keys[e.code] = false;
  });
}

function createPlayerCollider() {
  playerCollider = BABYLON.MeshBuilder.CreateCapsule("player", {
    height: 2.0,
    radius: 0.45
  }, scene);
  playerCollider.isVisible = false;
  playerCollider.position = getSafeSpawnPosition().clone();
  camera.position = playerCollider.position.add(new BABYLON.Vector3(0, 0.62, 0));
}

function buildProceduralLevel() {
  const sizeX = randInt(55, 78);
  const sizeZ = randInt(55, 78);
  world.sizeX = sizeX;
  world.sizeZ = sizeZ;
  uiState.levelSeedText = `Карта: ${sizeX}x${sizeZ}`;

  const wallHeight = 6;
  const wallThickness = 2;

  const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: sizeX, height: sizeZ }, scene);
  const gMat = new BABYLON.StandardMaterial("gMat", scene);
  gMat.diffuseColor = new BABYLON.Color3(0.18, 0.2, 0.22);
  gMat.specularColor = BABYLON.Color3.Black();
  ground.material = gMat;
  world.ground = ground;

  const wallMat = new BABYLON.StandardMaterial("wallMat", scene);
  wallMat.diffuseColor = new BABYLON.Color3(0.33, 0.34, 0.42);

  const perimeter = [
    { w: sizeX, d: wallThickness, x: 0, z: sizeZ / 2 },
    { w: sizeX, d: wallThickness, x: 0, z: -sizeZ / 2 },
    { w: wallThickness, d: sizeZ, x: sizeX / 2, z: 0 },
    { w: wallThickness, d: sizeZ, x: -sizeX / 2, z: 0 }
  ];

  perimeter.forEach((cfg, i) => {
    const wall = BABYLON.MeshBuilder.CreateBox(`wall_${i}`, { width: cfg.w, depth: cfg.d, height: wallHeight }, scene);
    wall.material = wallMat;
    wall.position = new BABYLON.Vector3(cfg.x, wallHeight / 2, cfg.z);
    world.walls.push(wall);
  });

  const blocksCount = randInt(12, 22);
  for (let i = 0; i < blocksCount; i++) {
    const w = rand(3.5, 8.5);
    const d = rand(3.5, 8.5);
    const h = rand(2.2, 4.8);
    const x = rand(-sizeX / 2 + 4, sizeX / 2 - 4);
    const z = rand(-sizeZ / 2 + 4, sizeZ / 2 - 4);
    if (Math.hypot(x, z) < 8) continue;
    const block = BABYLON.MeshBuilder.CreateBox(`block_${i}`, { width: w, depth: d, height: h }, scene);
    block.position = new BABYLON.Vector3(x, h / 2, z);
    block.material = wallMat;
    world.obstacles.push(block);
  }

  for (let x = -sizeX / 2 + 6; x <= sizeX / 2 - 6; x += 6) {
    for (let z = -sizeZ / 2 + 6; z <= sizeZ / 2 - 6; z += 6) {
      if (!isInsideObstacle(x, z, 2.2) && Math.hypot(x, z) > 6) {
        world.safeSpawn.push(new BABYLON.Vector3(x, 1.1, z));
      }
    }
  }
}

function isInsideObstacle(x, z, extra = 0) {
  for (const ob of world.obstacles) {
    const ext = ob.getBoundingInfo().boundingBox.extendSize;
    const minX = ob.position.x - ext.x - extra;
    const maxX = ob.position.x + ext.x + extra;
    const minZ = ob.position.z - ext.z - extra;
    const maxZ = ob.position.z + ext.z + extra;
    if (x >= minX && x <= maxX && z >= minZ && z <= maxZ) return true;
  }
  return false;
}

function getSafeSpawnPosition(minDistance = 0) {
  if (!world.safeSpawn.length) return new BABYLON.Vector3(0, 1.1, -6);
  const candidates = world.safeSpawn.filter((p) => p.length() > minDistance);
  const source = candidates.length ? candidates : world.safeSpawn;
  return pick(source).clone();
}

function getSeparatedSpawnPosition(minDistanceFromCenter, minDistanceFromOthers) {
  const candidates = world.safeSpawn.filter((p) => {
    if (p.length() <= minDistanceFromCenter) return false;
    for (const used of world.occupiedPickupPoints) {
      if (BABYLON.Vector3.Distance(p, used) < minDistanceFromOthers) return false;
    }
    return true;
  });
  const chosen = (candidates.length ? pick(candidates) : getSafeSpawnPosition(minDistanceFromCenter)).clone();
  world.occupiedPickupPoints.push(chosen.clone());
  return chosen;
}

function addAmmoWithCap(weaponId, amount) {
  const ammo = uiState.ammo[weaponId];
  const total = ammo.mag + ammo.reserve;
  const accepted = Math.max(0, Math.min(amount, maxAmmoPerWeapon - total));
  ammo.reserve += accepted;
  return accepted;
}

function spawnPickupsAndEnemies(enemyCount) {
  const pickupMatAmmo = new BABYLON.StandardMaterial("pickupAmmo", scene);
  pickupMatAmmo.emissiveColor = new BABYLON.Color3(0.6, 1.0, 0.1);
  pickupMatAmmo.diffuseColor = new BABYLON.Color3(0.2, 0.5, 0.1);

  const pickupMatShotgun = new BABYLON.StandardMaterial("pickupShotgun", scene);
  pickupMatShotgun.emissiveColor = new BABYLON.Color3(1.0, 0.5, 0.1);
  pickupMatShotgun.diffuseColor = new BABYLON.Color3(0.7, 0.3, 0.1);

  const pickupMatMedkit = new BABYLON.StandardMaterial("pickupMedkit", scene);
  pickupMatMedkit.emissiveColor = new BABYLON.Color3(1.0, 0.15, 0.35);
  pickupMatMedkit.diffuseColor = new BABYLON.Color3(0.7, 0.05, 0.2);

  const ammoPickups = randInt(8, 11);
  for (let i = 0; i < ammoPickups; i++) {
    const pos = getSeparatedSpawnPosition(10, 4.8);
    const m = BABYLON.MeshBuilder.CreateBox(`ammo_${i}_${Date.now()}`, { size: 0.8 }, scene);
    m.position = new BABYLON.Vector3(pos.x, 0.5, pos.z);
    m.material = pickupMatAmmo;
    world.pickups.push({
      mesh: m,
      kind: "ammo",
      amountPistol: randInt(6, 12),
      amountShotgun: randInt(2, 6)
    });
  }

  const medkits = randInt(3, 4);
  for (let i = 0; i < medkits; i++) {
    const pos = getSeparatedSpawnPosition(10, 4.8);
    const m = BABYLON.MeshBuilder.CreateBox(`medkit_${i}_${Date.now()}`, { width: 0.8, height: 0.8, depth: 0.8 }, scene);
    m.position = new BABYLON.Vector3(pos.x, 0.55, pos.z);
    m.material = pickupMatMedkit;
    world.pickups.push({
      mesh: m,
      kind: "medkit",
      heal: randInt(18, 35)
    });
  }

  const shotgunPickups = randInt(2, 3);
  for (let i = 0; i < shotgunPickups; i++) {
    const pos = getSeparatedSpawnPosition(12, 5.5);
    const m = BABYLON.MeshBuilder.CreateBox(`shotgun_${i}_${Date.now()}`, { width: 1.2, depth: 0.45, height: 0.45 }, scene);
    m.position = new BABYLON.Vector3(pos.x, 0.6, pos.z);
    m.material = pickupMatShotgun;
    world.pickups.push({ mesh: m, kind: "shotgun" });
  }

  spawnEnemies(enemyCount);
}

function spawnEnemies(enemyCount) {
  const elapsed = (performance.now() - world.runStartedAt) / 1000;
  const difficulty = Math.min(3.6, 1 + elapsed / 65);

  for (let i = 0; i < enemyCount; i++) {
    const spawn = getSafeSpawnPosition(10);
    const enemy = BABYLON.MeshBuilder.CreatePlane(`enemy_${Date.now()}_${i}`, {
      width: 1.8,
      height: 2.4
    }, scene);
    enemy.position = new BABYLON.Vector3(spawn.x, 1.3, spawn.z);
    enemy.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
    enemy.material = world.enemySpriteMaterial;

    world.enemies.push({
      mesh: enemy,
      hp: Math.round(44 + 14 * difficulty),
      speed: rand(1.8, 3.1) * Math.min(1.7, 0.9 + difficulty * 0.25),
      shootCooldown: randInt(950, 1700) / Math.min(1.4, 0.8 + difficulty * 0.2),
      projectileSpeedMul: Math.min(1.65, 0.9 + difficulty * 0.22),
      nextShootAt: performance.now() + randInt(600, 1800),
      moveDirTimer: 0,
      dir: BABYLON.Vector3.Zero()
    });
  }
}

function createExitPortal() {
  const ring = BABYLON.MeshBuilder.CreateTorus("exit", { diameter: 2.6, thickness: 0.26, tessellation: 36 }, scene);
  ring.position = getSafeSpawnPosition(14).add(new BABYLON.Vector3(0, 1.6, 0));
  ring.rotation.x = Math.PI / 2;
  ring.isVisible = false;
  const mat = new BABYLON.StandardMaterial("exitMat", scene);
  mat.emissiveColor = new BABYLON.Color3(0.2, 0.9, 1.0);
  mat.diffuseColor = new BABYLON.Color3(0.1, 0.35, 0.45);
  ring.material = mat;
  world.exitPortal = ring;
}

function createWeaponViewModels() {
  const pistolRoot = new BABYLON.TransformNode("pistolRoot", scene);
  pistolRoot.parent = camera;
  pistolRoot.position = new BABYLON.Vector3(0.35, -0.38, 0.65);
  pistolRoot.rotation = new BABYLON.Vector3(0.02, -0.1, 0);

  const pistolBody = BABYLON.MeshBuilder.CreateBox("pistolBody", { width: 0.16, height: 0.11, depth: 0.36 }, scene);
  pistolBody.parent = pistolRoot;
  pistolBody.position.z = 0.07;
  const pistolMat = new BABYLON.StandardMaterial("pistolMat", scene);
  pistolMat.diffuseColor = new BABYLON.Color3(0.18, 0.2, 0.22);
  pistolBody.material = pistolMat;

  const pistolBarrel = BABYLON.MeshBuilder.CreateBox("pistolBarrel", { width: 0.12, height: 0.07, depth: 0.2 }, scene);
  pistolBarrel.parent = pistolRoot;
  pistolBarrel.position = new BABYLON.Vector3(0, 0.02, 0.32);
  pistolBarrel.material = pistolMat;

  const shotgunRoot = new BABYLON.TransformNode("shotgunRoot", scene);
  shotgunRoot.parent = camera;
  shotgunRoot.position = new BABYLON.Vector3(0.37, -0.43, 0.68);
  shotgunRoot.rotation = new BABYLON.Vector3(0.01, -0.13, 0);

  const shotgunStock = BABYLON.MeshBuilder.CreateBox("shotgunStock", { width: 0.17, height: 0.12, depth: 0.34 }, scene);
  shotgunStock.parent = shotgunRoot;
  shotgunStock.position.z = -0.02;
  const shotgunMat = new BABYLON.StandardMaterial("shotgunMat", scene);
  shotgunMat.diffuseColor = new BABYLON.Color3(0.35, 0.22, 0.12);
  shotgunStock.material = shotgunMat;

  const shotgunBarrel = BABYLON.MeshBuilder.CreateCylinder("shotgunBarrel", { diameter: 0.065, height: 0.66 }, scene);
  shotgunBarrel.parent = shotgunRoot;
  shotgunBarrel.rotation.x = Math.PI / 2;
  shotgunBarrel.position = new BABYLON.Vector3(0, 0.01, 0.36);
  const barrelMat = new BABYLON.StandardMaterial("barrelMat", scene);
  barrelMat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.24);
  shotgunBarrel.material = barrelMat;

  weaponView = {
    pistolRoot,
    shotgunRoot,
    pistolMuzzle: new BABYLON.TransformNode("pistolMuzzle", scene),
    shotgunMuzzle: new BABYLON.TransformNode("shotgunMuzzle", scene)
  };
  weaponView.pistolMuzzle.parent = pistolRoot;
  weaponView.pistolMuzzle.position = new BABYLON.Vector3(0, 0.01, 0.43);
  weaponView.shotgunMuzzle.parent = shotgunRoot;
  weaponView.shotgunMuzzle.position = new BABYLON.Vector3(0, 0.01, 0.72);
  setWeaponView(uiState.currentWeapon);
}

function setWeaponView(weaponId) {
  if (!weaponView) return;
  weaponView.pistolRoot.setEnabled(weaponId === "pistol");
  weaponView.shotgunRoot.setEnabled(weaponId === "shotgun" && uiState.weaponsOwned.shotgun);
}

function switchWeapon(id) {
  if (!uiState.weaponsOwned[id]) {
    updateHUD(`Оружие "${WEAPON_DATA[id].name}" еще не найдено.`);
    return;
  }
  uiState.currentWeapon = id;
  setWeaponView(id);
  refreshPanels();
}

function reloadWeapon() {
  const weapon = uiState.currentWeapon;
  const info = WEAPON_DATA[weapon];
  const ammo = uiState.ammo[weapon];
  if (ammo.mag >= info.magSize) return updateHUD(`${info.name} уже заряжен.`);
  if (ammo.reserve <= 0) return updateHUD(`Нет запасных патронов для "${info.name}".`);
  const load = Math.min(info.magSize - ammo.mag, ammo.reserve);
  ammo.mag += load;
  ammo.reserve -= load;
  refreshPanels();
  updateHUD(`Перезарядка: ${info.name}.`);
}

function tryShoot() {
  const now = performance.now();
  if (now < uiState.canShootAt) return;

  const weapon = uiState.currentWeapon;
  const info = WEAPON_DATA[weapon];
  const ammo = uiState.ammo[weapon];
  if (ammo.mag <= 0) {
    updateHUD("Магазин пуст. Нажмите R.");
    uiState.canShootAt = now + 180;
    return;
  }

  ammo.mag -= 1;
  uiState.canShootAt = now + info.cooldown;
  const centerRay = camera.getForwardRay(200);
  const centerPick = scene.pickWithRay(centerRay, (mesh) => mesh !== playerCollider);
  const targetPoint = centerPick.hit ? centerPick.pickedPoint : camera.position.add(centerRay.direction.scale(120));
  const muzzle = uiState.currentWeapon === "shotgun" ? weaponView.shotgunMuzzle : weaponView.pistolMuzzle;
  const origin = muzzle ? muzzle.getAbsolutePosition() : camera.position.clone();
  flashMuzzle(info.color, origin, targetPoint);
  if (weaponView) {
    const activeRoot = uiState.currentWeapon === "pistol" ? weaponView.pistolRoot : weaponView.shotgunRoot;
    activeRoot.position.z += 0.04;
    setTimeout(() => {
      if (activeRoot) activeRoot.position.z -= 0.04;
    }, 55);
  }

  for (let i = 0; i < info.pellets; i++) {
    const forward = targetPoint.subtract(origin).normalize();
    const right = BABYLON.Vector3.Cross(forward, BABYLON.Axis.Y).normalize();
    const up = BABYLON.Vector3.Cross(right, forward).normalize();
    forward.addInPlace(right.scale(rand(-info.spread, info.spread)));
    forward.addInPlace(up.scale(rand(-info.spread, info.spread)));
    forward.normalize();

    const ray = new BABYLON.Ray(origin, forward, 120);
    const hit = scene.pickWithRay(ray, (mesh) => world.enemies.some((e) => e.mesh === mesh));
    if (hit.hit && hit.pickedMesh) {
      const enemy = world.enemies.find((e) => e.mesh === hit.pickedMesh);
      if (enemy) {
        enemy.hp -= info.damage;
        if (enemy.hp <= 0) killEnemy(enemy);
      }
    }
  }
  refreshPanels();
}

function flashMuzzle(color, origin, targetPoint) {
  const spark = BABYLON.MeshBuilder.CreateSphere("spark", { diameter: 0.1 }, scene);
  spark.position = origin.clone();
  const mat = new BABYLON.StandardMaterial("sparkMat", scene);
  mat.emissiveColor = color;
  spark.material = mat;
  setTimeout(() => spark.dispose(), 80);

  // Short tracer so it is visually clear bullets leave the barrel.
  const tracerLen = Math.min(2.8, BABYLON.Vector3.Distance(origin, targetPoint));
  const tracerDir = targetPoint.subtract(origin).normalize();
  const tracerCenter = origin.add(tracerDir.scale(tracerLen * 0.5));
  const tracer = BABYLON.MeshBuilder.CreateCylinder("tracer", {
    height: tracerLen,
    diameter: 0.03
  }, scene);
  tracer.position = tracerCenter;
  tracer.lookAt(targetPoint);
  tracer.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.LOCAL);
  const tracerMat = new BABYLON.StandardMaterial("tracerMat", scene);
  tracerMat.emissiveColor = color;
  tracerMat.disableLighting = true;
  tracer.material = tracerMat;
  setTimeout(() => tracer.dispose(), 45);
}

function killEnemy(enemyData) {
  enemyData.mesh.dispose();
  world.enemies = world.enemies.filter((e) => e !== enemyData);
  uiState.score += 10;
  updateHUD("Враг уничтожен: +10 очков.");

  if (uiState.score >= targetScore && world.exitPortal && !world.exitPortal.isVisible) {
    world.exitPortal.isVisible = true;
    updateHUD("Портал выхода активирован!");
  }
  refreshPanels();
}

function enemyShoot(enemyData) {
  const origin = enemyData.mesh.position.add(new BABYLON.Vector3(0, 0.7, 0));
  const dir = camera.position.subtract(origin).normalize();
  const proj = BABYLON.MeshBuilder.CreateSphere("enemyProj", { diameter: 0.35 }, scene);
  proj.position = origin;
  const pMat = new BABYLON.StandardMaterial("pMat", scene);
  pMat.emissiveColor = new BABYLON.Color3(1.0, 0.25, 0.15);
  pMat.diffuseColor = new BABYLON.Color3(0.8, 0.1, 0.1);
  proj.material = pMat;
  world.enemyProjectiles.push({
    mesh: proj,
    vel: dir.scale(rand(9.5, 14) * enemyData.projectileSpeedMul),
    bornAt: performance.now(),
    lifeMs: 4200
  });
}

function updateEnemies(delta) {
  const now = performance.now();
  const playerPos = playerCollider.position;

  for (const enemy of world.enemies) {
    const toPlayer = playerPos.subtract(enemy.mesh.position);
    const dist = toPlayer.length();

    if (dist < 25) {
      const dir = toPlayer.normalize();
      const nextPos = enemy.mesh.position.add(dir.scale(enemy.speed * delta));
      if (!isInsideObstacle(nextPos.x, nextPos.z, 0.6)) enemy.mesh.position = nextPos;
      enemy.mesh.lookAt(playerPos);
      if (dist > 7 && now >= enemy.nextShootAt) {
        enemyShoot(enemy);
        enemy.nextShootAt = now + enemy.shootCooldown + randInt(150, 420);
      }
    } else {
      enemy.moveDirTimer -= delta;
      if (enemy.moveDirTimer <= 0) {
        enemy.dir = new BABYLON.Vector3(rand(-1, 1), 0, rand(-1, 1)).normalize();
        enemy.moveDirTimer = rand(0.9, 2.2);
      }
      const wander = enemy.mesh.position.add(enemy.dir.scale(enemy.speed * 0.6 * delta));
      if (!isInsideObstacle(wander.x, wander.z, 0.7)) enemy.mesh.position = wander;
    }
  }

  if (now >= world.nextWaveAt) {
    world.waveIndex += 1;
    uiState.waveText = `Волна ${world.waveIndex}`;
    const waveEnemies = Math.min(8, 2 + world.waveIndex);
    spawnEnemies(waveEnemies);
    world.nextWaveAt = now + Math.max(10000, 22000 - world.waveIndex * 1100);
    updateHUD(`Новая волна: +${waveEnemies} врагов.`);
  }
}

function updateProjectiles(delta) {
  const now = performance.now();
  const playerPos = playerCollider.position.add(new BABYLON.Vector3(0, 0.8, 0));
  const toRemove = [];
  for (const p of world.enemyProjectiles) {
    p.mesh.position.addInPlace(p.vel.scale(delta));
    p.mesh.position.y += Math.sin(now * 0.015) * 0.01;
    if (BABYLON.Vector3.Distance(p.mesh.position, playerPos) < 0.85) {
      toRemove.push(p);
      damagePlayer(randInt(7, 12));
      continue;
    }
    if (now - p.bornAt > p.lifeMs) toRemove.push(p);
  }
  for (const p of toRemove) {
    p.mesh.dispose();
    world.enemyProjectiles = world.enemyProjectiles.filter((x) => x !== p);
  }
}

function damagePlayer(amount) {
  if (gameEnded) return;
  uiState.hp = Math.max(0, uiState.hp - amount);
  if (uiState.hp <= 0) {
    refreshPanels();
    endGame(false, "Вы погибли.");
  } else {
    updateHUD(`Вы получили ${amount} урона.`);
  }
}

function updatePickups() {
  const pos = playerCollider.position;
  const collected = [];
  const now = performance.now();

  for (const p of world.pickups) {
    p.mesh.rotation.y += 0.03;
    p.mesh.position.y = 0.55 + Math.sin(now * 0.003 + p.mesh.uniqueId) * 0.15;
    if (BABYLON.Vector3.Distance(pos, p.mesh.position) <= pickupRadius) {
      if (p.kind === "ammo") {
        const gainedPistol = addAmmoWithCap("pistol", p.amountPistol);
        const gainedShotgun = addAmmoWithCap("shotgun", p.amountShotgun);
        if (gainedPistol === 0 && gainedShotgun === 0) {
          updateHUD("Патроны на максимуме (100).");
        } else {
          updateHUD(`Патроны: +${gainedPistol} пистолет, +${gainedShotgun} дробовик.`);
        }
      } else if (p.kind === "shotgun") {
        uiState.weaponsOwned.shotgun = true;
        if (uiState.ammo.shotgun.mag === 0 && uiState.ammo.shotgun.reserve === 0) {
          addAmmoWithCap("shotgun", 16);
        }
        setWeaponView(uiState.currentWeapon);
        updateHUD("Подобран дробовик.");
      } else if (p.kind === "medkit") {
        const oldHp = uiState.hp;
        uiState.hp = Math.min(100, uiState.hp + p.heal);
        updateHUD(`Аптечка: +${uiState.hp - oldHp} HP.`);
      }
      collected.push(p);
    }
  }

  for (const p of collected) {
    p.mesh.dispose();
    world.pickups = world.pickups.filter((x) => x !== p);
  }
  refreshPanels();
}

function updatePlayer(delta) {
  if (gameEnded) return;
  const forward = camera.getForwardRay(1).direction;
  forward.y = 0;
  forward.normalize();
  const right = BABYLON.Vector3.Cross(BABYLON.Axis.Y, forward).normalize();
  const move = BABYLON.Vector3.Zero();

  if (keys.KeyW) move.addInPlace(forward);
  if (keys.KeyS) move.subtractInPlace(forward);
  if (keys.KeyA) move.subtractInPlace(right);
  if (keys.KeyD) move.addInPlace(right);
  if (move.lengthSquared() > 0) move.normalize().scaleInPlace(walkSpeed * delta);

  if (keys.Space && uiState.onGround) {
    uiState.verticalVelocity = jumpSpeed;
    uiState.onGround = false;
  }
  uiState.verticalVelocity += gravity * delta;
  move.y = uiState.verticalVelocity * delta;

  const next = playerCollider.position.add(move);
  if (next.y <= 1.0) {
    next.y = 1.0;
    uiState.verticalVelocity = 0;
    uiState.onGround = true;
  }

  const halfW = world.ground.getBoundingInfo().boundingBox.extendSize.x;
  const halfD = world.ground.getBoundingInfo().boundingBox.extendSize.z;
  const limit = 1.2;
  next.x = Math.max(-halfW + limit, Math.min(halfW - limit, next.x));
  next.z = Math.max(-halfD + limit, Math.min(halfD - limit, next.z));
  if (!isInsideObstacle(next.x, next.z, 0.7)) {
    playerCollider.position.copyFrom(next);
  }

  camera.position = playerCollider.position.add(new BABYLON.Vector3(0, 0.62, 0));
}

function checkExit() {
  if (!world.exitPortal || !world.exitPortal.isVisible || gameEnded) return;
  if (BABYLON.Vector3.Distance(playerCollider.position, world.exitPortal.position) < 2.2) {
    endGame(true, `Вы вышли с ${uiState.score} очками!`);
  }
}

function endGame(won, msg) {
  gameEnded = true;
  updateHUD(`${msg} ${won ? "Победа!" : "Поражение."}`);
  if (document.pointerLockElement) document.exitPointerLock();
  startOverlay.style.display = "flex";
  startBtn.textContent = won ? "Играть снова" : "Повторить";
}

function refreshPanels() {
  const filledHearts = Math.ceil(uiState.hp / 10);
  const hearts = healthPanel.querySelectorAll(".heart");
  hearts.forEach((heart, index) => {
    heart.classList.toggle("filled", index < filledHearts);
  });

  statsPanel.textContent = `Очки: ${uiState.score} / ${targetScore} | ${uiState.levelSeedText} | ${uiState.waveText}`;
  const w = uiState.currentWeapon;
  const info = WEAPON_DATA[w];
  const ammo = uiState.ammo[w];
  const unlocked = uiState.weaponsOwned.shotgun ? "дробовик открыт" : "найдите дробовик";
  weaponPanel.textContent = `Оружие: ${info.name} | ${unlocked}`;

  const totalAmmo = ammo.mag + ammo.reserve;
  ammoText.textContent = `магазин ${ammo.mag}/${info.magSize} | запас ${ammo.reserve} | всего ${totalAmmo}`;
  const cells = ammoGrid.querySelectorAll(".ammoCell");
  const filledCells = Math.max(0, Math.min(ammoUiCapacity, ammo.mag));
  const activeCells = Math.max(0, Math.min(ammoUiCapacity, info.magSize));
  cells.forEach((cell, index) => {
    cell.classList.toggle("filled", index < filledCells);
    cell.classList.toggle("low", ammo.mag <= 3 && index < filledCells);
    cell.style.opacity = index < activeCells ? "1" : "0.2";
  });
}

function updateHUD(msg) {
  messageEl.textContent = msg;
  refreshPanels();
}

function drawMinimap() {
  if (!world || !playerCollider) return;
  const w = minimapCanvas.width;
  const h = minimapCanvas.height;
  minimapCtx.clearRect(0, 0, w, h);
  minimapCtx.fillStyle = "#071019";
  minimapCtx.fillRect(0, 0, w, h);

  const sx = w / world.sizeX;
  const sz = h / world.sizeZ;
  const toMap = (x, z) => ({
    x: (x + world.sizeX / 2) * sx,
    y: (z + world.sizeZ / 2) * sz
  });

  minimapCtx.fillStyle = "#2a3746";
  for (const ob of world.obstacles) {
    const ext = ob.getBoundingInfo().boundingBox.extendSize;
    const p = toMap(ob.position.x - ext.x, ob.position.z - ext.z);
    minimapCtx.fillRect(p.x, p.y, ext.x * 2 * sx, ext.z * 2 * sz);
  }

  minimapCtx.fillStyle = "#63d9ff";
  const playerDot = toMap(playerCollider.position.x, playerCollider.position.z);
  minimapCtx.beginPath();
  minimapCtx.arc(playerDot.x, playerDot.y, 4, 0, Math.PI * 2);
  minimapCtx.fill();

  minimapCtx.fillStyle = "#ff5a5a";
  for (const enemy of world.enemies) {
    const p = toMap(enemy.mesh.position.x, enemy.mesh.position.z);
    minimapCtx.beginPath();
    minimapCtx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
    minimapCtx.fill();
  }

  minimapCtx.fillStyle = "#a6ff4d";
  for (const pickup of world.pickups) {
    const p = toMap(pickup.mesh.position.x, pickup.mesh.position.z);
    minimapCtx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
  }

  if (world.exitPortal && world.exitPortal.isVisible) {
    minimapCtx.fillStyle = "#00e5ff";
    const p = toMap(world.exitPortal.position.x, world.exitPortal.position.z);
    minimapCtx.beginPath();
    minimapCtx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    minimapCtx.fill();
  }
}

function setupLoop() {
  scene.onBeforeRenderObservable.clear();
  scene.onBeforeRenderObservable.add(() => {
    const delta = engine.getDeltaTime() / 1000;
    updatePlayer(delta);
    updateEnemies(delta);
    updateProjectiles(delta);
    updatePickups();
    checkExit();
    drawMinimap();
  });
}

startBtn.addEventListener("click", () => {
  gameEnded = false;
  createRun();
  startOverlay.style.display = "none";
  canvas.focus();
  canvas.requestPointerLock();
});

engine.runRenderLoop(() => {
  if (scene) scene.render();
});

window.addEventListener("resize", () => engine.resize());
