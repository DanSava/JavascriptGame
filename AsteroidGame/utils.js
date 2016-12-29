var utils = {
  norm: function (value, min, max) {
    return (value - min) / (max - min);
  },

  lerp: function(norm, min, max){
    return (max - min) * norm + min;
  },

  map: function(value, sourceMin, sourceMax, destMin, destMax) {
    return utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax);
  },

  clamp: function (value, min, max) {
    return Math.min(Math.max(value, min), max);
  },

  distance: function(p0, p1) {
    var dx = p1.x - p0.x,
      dy = p1.y - p0.y;
      return Math.sqrt(dx * dx + dy * dy);
  },

  paritcleDistance: function(p0, p1) {
    var dx = p1.x - p0.x,
      dy = p1.y - p0.y;
      return Math.sqrt(dx * dx + dy * dy);
  },

  distanceXY: function(x0, y0, x1, y1) {
    var dx = x0 - x1,
      dy = y0 - y1;
      return Math.sqrt(dx * dx + dy * dy);
  },
  circleCollision: function (c0, c1) {
    return utils.distance(c0, c1) <= c0.radius + c1.radius;
  },
  particleCollisionTest: function (p0, p1) {
    return utils.paritcleDistance(p0, p1) <= p0.radius + p1.radius;
  },
  pointCircelCollision: function (p, c) {
    return utils.distance(p, c) <= c.radius;
  },
  ///
  /// Particle Utils
  ///
  boundParticleToRect: function(particle, width, height) {
    if (particle.x - particle.radius > width) {
      particle.x = (- particle.radius);
    }
    if (particle.x + particle.radius < 0) {
      particle.x = (width + particle.radius );
    }
    if (particle.y - particle.radius  > height) {
      particle.y = ( - particle.radius);
    }

    if (particle.y + particle.radius  < 0) {
      particle.y = (height + particle.radius );
    }
  },
   drawParticle: function(part, context, color) {
    part.update();
    context.beginPath();
    context.arc(part.x, part.y, part.radius , 0, Math.PI * 2, false);
    if (color) {
      context.fillStyle = color;
      context.fill();
      context.fillStyle = 'black';
    }
    else{
      context.fill();
    }
  },
  drawParticles: function (particles, context) {
    particles.forEach(function(el, index, array) {
      utils.drawParticle(el, context);
    });
  },
  bounceParticleInRect: function (p, width, height, bounce) {
    bounce = bounce || -1;
    if (p.x + p.radius > width) {
      p.x = width - p.radius;
      p.vx = p.vx * bounce;
    }
    if (p.x - p.radius < 0) {
      p.x = p.radius;
      p.vx = (p.vx * bounce);
    }
    if (p.y + p.radius > height) {
      p.y = (height - p.radius);
      p.vy = (p.vy * bounce);
    }
    if (p.y - p.radius < 0) {
      p.y = (p.radius);
      p.vy = (p.vy * bounce);
    }
  }
};
