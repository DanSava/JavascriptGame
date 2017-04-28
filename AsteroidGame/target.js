var target = {
  particle : null,
  nrHits: 0,

  create : function (x, y, speed, direction, grav, radius) {
    var obj = Object.create(this);
    obj.particle = new particle(x, y, speed, direction, grav, radius);
    obj.particle.friction = 0.99;
    return obj;
  },

  isDestroyed : function () {
    if (this.nrHits > 10 ) {
      return true;
    }
    return false;
  },

  update : function () {
    if (this.particle) {
      this.particle.update();
    }
  },

  hit : function () {
    this.nrHits += 1;
    this.particle.friction += (1 - this.particle.friction);
  }

};
