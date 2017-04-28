/**
 * particle
 */
var particle = (function () {
    function particle(x, y, speed, direction, grav, radius) {
        this.gravity = grav || 0;
        this.mass = 1;
        this.radius = radius || 0;
        this.friction = 1;
        this.x = x;
        this.y = y;
        this.vx = Math.cos(direction) * speed;
        this.vy = Math.sin(direction) * speed;
    }
    particle.prototype.update = function () {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
    };
    particle.prototype.accelerate = function (ax, ay) {
        this.vx += ax;
        this.vy += ay;
    };
    particle.prototype.angleTo = function (p2) {
        return Math.atan2(p2.y - this.y, p2.x - this.x);
    };
    particle.prototype.distanceTo = function (p2) {
        var dx = p2.x - this.x, dy = p2.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    particle.prototype.gravitateTo = function (p2) {
        var dx = p2.x - this.x, dy = p2.y - this.y, distSQ = dx * dx + dy * dy, dist = Math.sqrt(distSQ), force = p2.mass / distSQ, angle = this.angleTo(p2);
        this.vx += dx / dist * force;
        this.vy += dy / dist * force;
    };
    particle.prototype.isOutOfWinRect = function (width, height) {
        if (this.x - this.radius > width ||
            this.y - this.radius > height ||
            this.x + this.radius < 0 ||
            this.y + this.radius < 0) {
            return true;
        }
    };
    return particle;
}());
