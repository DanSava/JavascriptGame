window.onload = function () {
  var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;
    moving = "";
    var BoneOneLengeth = 50;
        BoneTwoLengeth = 30;

    var leg0 = FKSystem.create(0, height/2);
    var leg1 = FKSystem.create(0, height/2);

    var arm0 = FKSystem.create(0, height/2 - BoneOneLengeth);
    var arm1 = FKSystem.create(0, height/2 - BoneOneLengeth);


    document.body.addEventListener("keydown", function(event) {
		//
		console.log(event.keyCode);
		switch (event.keyCode) {
			case 39://"forward"
                moving = "right";
				break;
			case 37://"backward"
                moving = "left";
				break;
			default:
		}
	});

    document.body.addEventListener("keyup", function(event) {
		//
		console.log(event.keyCode);
		switch (event.keyCode) {
			case 39://"forward"
                moving = "";
				break;
			case 37://"backward"
                moving = "";
				break;
			default:
		}
	});


    leg1.phase = Math.PI;
    leg0.addArm(BoneOneLengeth, Math.PI/2, Math.PI/4, 0);
    leg0.addArm(BoneTwoLengeth, 0.87, 0.87, -1.4);
    leg1.addArm(BoneOneLengeth, Math.PI/2, Math.PI/4, 0);
    leg1.addArm(BoneTwoLengeth, 0.87, 0.87, -1.5);

    //
    arm1.phase = Math.PI;
    arm0.addArm(BoneOneLengeth - 10, Math.PI/2, Math.PI/4, 0);
    arm0.addArm(BoneTwoLengeth - 10, - Math.PI/2, 0.1, -1.4);
    arm1.addArm(BoneOneLengeth - 10, Math.PI/2, Math.PI/4, 0);
    arm1.addArm(BoneTwoLengeth - 10, - Math.PI/2, 0.1, -1.4);

    update();

    function update() {
        context.clearRect(0, 0, width, height);
        if (moving !== ""){
            leg0.update();
            arm0.update();
            leg1.update();
            arm1.update();
            if (moving === "right"){
                leg0.x += leg0.speed * 20;
                leg1.x += leg1.speed * 20;
                arm0.x += arm0.speed * 20;
                arm1.x += arm1.speed * 20;
            }
            else {
                // leg0.arms[1].centerAngle *= -1;
                // leg1.arms[1].rotationRange *= -1;
                // arm0.arms[1].rotationRange *= -1;
                // arm1.arms[1].rotationRange *= -1;
                leg0.x -= leg0.speed * 20;
                leg1.x -= leg1.speed * 20;
                arm0.x -= arm0.speed * 20;
                arm1.x -= arm1.speed * 20;
            }
        }
        leg0.render(context);
        leg1.render(context);
        arm1.render(context);
        arm0.render(context);
        //
        context.strokeStyle = "#000000";
        context.lineWidth = 9;
        context.beginPath();
        context.moveTo(arm0.x, arm0.y - 10);
        context.lineTo(leg0.x, leg0.y);
        context.stroke();
        //
        requestAnimationFrame(update);
    }
};
