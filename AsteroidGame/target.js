class Target {
  constructor(x, y, speed, direction, grav, radius) {   
    this.particle = new Particle(x, y, speed, direction, grav, radius);
    this.particle.friction = 0.99;
    this.nrHits = 0
    this.colorSet = ["#ffffff", "#ffe5e5", "#ffcccc", "#ffb3b3", "#ff9999",
    "#ff8080","#ff6666", "#ff4d4d", "#ff3333", "#ff1a1a",
    " #ff0000"];
  } 

  getColorTarget() {
    return this.colorSet[this.nrHits];
  }

  isDestroyed() {
    return this.nrHits > 10
  }

  update() {
    this.particle.update();
  }

  hit() {
    this.nrHits += 1;
    this.particle.friction += (1 - this.particle.friction);
  }

}