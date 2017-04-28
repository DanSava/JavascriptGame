var shot = {
  initPart : null,
  explosionParticles: null,
  frameCount: 0,
  explosionLag: 50,
  boom: false,

  create : function (x, y, speed, direction, radius) {
    var obj = Object.create(this);
    obj.initPart = new particle(x, y, speed, direction, 0, radius);
    return obj;
  },

  update: function (width, height) {
    if (this.initPart) {
      this.initPart.update();
      this.frameCount +=  1;
    }
    if (this.initPart && (this.frameCount > this.explosionLag || this.boom)) {
        this.explosionParticles = this.initParticles(this.initPart.x, this.initPart.y);
        this.initPart = null;
    }
    if (this.explosionParticles) {
        this.explosionParticles.forEach(function (el, index, array){
          el.update();
          if (el.isOutOfWinRect(width, height)) {
            array.splice(index, 1);
          }
      });
    }

  },

  initParticles: function (x, y) {
    var particles = [];
    for (var i = 0; i < 10; i++) {
      particles.push(new particle(x, y, Math.random() * 2, Math.PI / Math.random(), 0.05, Math.random() * 5));
    }
    return particles;
  },

  checkColision : function (p) {
    if (utils.particleCollisionTest(this.initPart, p)) {
      this.boom = true;
      p.accelerate(this.initPart.vx, this.initPart.vy);
      return true;
    }
    return false;
  }

 };
