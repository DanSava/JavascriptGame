class Renderer {
    constructor(context, width, height) {
        this.height = height
        this.width = width
        this.context = context
    }

    draw_target(target) {
        this.context.beginPath();
        this.context.arc(target.particle.x, target.particle.y, target.particle.radius , 0, Math.PI * 2, false);
        this.context.fill();
        this.context.beginPath();
        this.context.arc(target.particle.x, target.particle.y, target.particle.radius - 15 , 0, Math.PI * 2, false);
        this.context.fillStyle = target.getColorTarget();
        this.context.fill();
        this.context.fillStyle = "black";

        this.context.shadowColor = '#999';
        this.context.shadowBlur = 20;
        this.context.shadowOffsetX = 15;
        this.context.shadowOffsetY = 15;

        // Draw the number of hits of the target.
        //context.fillText(target.nrHits, target.particle.x-15, target.particle.y+10);
    }
}