var vector = (function () {
    function vector(x, y) {
        this.x = x;
        this.y = y;
    }
    vector.prototype.setX = function (value) {
        this.x = value;
    };
    vector.prototype.setY = function (value) {
        this.y = value;
    };
    vector.prototype.getX = function () {
        return this.x;
    };
    vector.prototype.getY = function () {
        return this.y;
    };
    vector.prototype.getLength = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    vector.prototype.setAngle = function (angle) {
        var length = this.getLength();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    };
    vector.prototype.getAngle = function () {
        return Math.atan2(this.y, this.x);
    };
    vector.prototype.setLength = function (length) {
        var angle = this.getAngle();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    };
    vector.prototype.add = function (v2) {
        return new vector(this.x + v2.getX(), this.y + v2.getY());
    };
    vector.prototype.subtract = function (v2) {
        return new vector(this.x - v2.getX(), this.y - v2.getY());
    };
    vector.prototype.multiply = function (val) {
        return new vector(this.x * val, this.y * val);
    };
    vector.prototype.divide = function (val) {
        return new vector(this.x / val, this.y / val);
    };
    vector.prototype.addTo = function (v2) {
        this.x += v2.getX();
        this.y += v2.getY();
    };
    vector.prototype.subtractFrom = function (v2) {
        this.x -= v2.getX();
        this.y -= v2.getY();
    };
    vector.prototype.multiplyBy = function (val) {
        this.x *= val;
        this.y *= val;
    };
    vector.prototype.divideBy = function (val) {
        this.x /= val;
        this.y /= val;
    };
    return vector;
}());
