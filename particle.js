var particle = {
  gravity: 0,
  mass: 1,
  radius: 0,
  friction: 1,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,

  create : function (x, y, speed, direction, grav, radius) {
    var obj = Object.create(this);
    obj.x = x;
    obj.y = y;
    obj.vx = Math.cos(direction) * speed;
    obj.vy = Math.sin(direction) * speed;
    obj.gravity =  grav || 0;
    obj.radius = radius || 0;
    return obj;
  },

  update: function () {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
  },

  accelerate: function(ax, ay) {
    this.vx += ax;
    this.vy += ay;
  },

  angleTo: function (p2) {
      return Math.atan2(p2.y - this.y,
            p2.x - this.x);
  },
  distanceTo: function (p2){
    var dx = p2.x - this.x,
        dy = p2.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
  },

  gravitateTo: function(p2) {
    var dx = p2.x - this.x,
        dy = p2.y - this.y,
        distSQ = dx * dx + dy * dy,
        dist = Math.sqrt(distSQ),
        force = p2.mass / distSQ,
        angle = this.angleTo(p2);
        this.vx += dx / dist * force;
        this.vy += dy / dist * force;
  },

  isOutOfWinRect: function (width, height) {
    if (this.x - this.radius > width ||
        this.y - this.radius > height ||
        this.x + this.radius < 0 ||
        this.y + this.radius < 0 ){

        return true;
      }
  }
 };
