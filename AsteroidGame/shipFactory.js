var shipFactory = {
    friction : 0.99,
    thrust: vector.create(0, 0),
    angle: 0,
    thrusting: false,
    shotsFired: 0,
    hits: 0,
    shots: [],
    part: {},

    create : function (screenWidth, screenHeight) {
        var obj = Object.create(this);
        obj.part = particle.create(screenWidth / 2, screenHeight / 2, 0, 0, 0);
        obj.part.friction = this.friction;
        obj.angle = this.angle;
        obj.thrust = this.thrust;
        obj.shotsFired = this.shotsFired;
        obj.hits = this.hits;
        obj.shots = this.shots;
        return obj;
    },
    shoot: function() {
        if (this.shots.length < 30) {
            this.shots.push(shot.create(this.part.x, this.part.y, 7, this.angle, 5));
            this.shotsFired += 1;
        }
    },
    getShots : function () {
        return shots;
    },

    update: function() {
        this.part.accelerate(this.thrust.getX(), this.thrust.getY());
        this.part.update();
        this.thrust.setAngle(this.angle);
        if (this.thrusting) {
            this.thrust.setLength(0.1);
        }
        else {
            this.thrust.setLength(0);
        }
    }
};
