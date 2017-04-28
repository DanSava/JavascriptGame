window.onload = function () {
  var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;
    moving = "";
    prevDirection = 'r';
    var BoneOneLengeth = 50;
        BoneTwoLengeth = 30;
        movementSpeed = 20;

    var leg0 = FKSystem.create(220, height/2);
    var leg1 = FKSystem.create(220, height/2);

    var arm0 = FKSystem.create(220, height/2 - BoneOneLengeth);
    var arm1 = FKSystem.create(220, height/2 - BoneOneLengeth);

    var changeDirection = function () {
      function swapAngle() {
        leg0.arms[1].centerAngle *= -1;
        leg1.arms[1].centerAngle *= -1;
      }
      if (moving === "right" && prevDirection !== 'r') {
        swapAngle();
        prevDirection = 'r';
      }
      else if (moving === "left" && prevDirection !== 'l') {
        swapAngle();
        prevDirection = 'l';
      }
    }
    document.body.addEventListener("keydown", function(event) {
		switch (event.keyCode) {
			case 39://"forward"
        moving = "right";
        changeDirection();
				break;
			case 37://"backward"
        moving = "left";
        changeDirection();
				break;
			default:
		}
	});

    document.body.addEventListener("keyup", function(event) {
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
    leg0.addArm(20, -Math.PI/2, 0.2, -1.4);
    leg1.addArm(BoneOneLengeth, Math.PI/2, Math.PI/4, 0);
    leg1.addArm(20, -Math.PI/2, 0.2, -1.4);

    //
    arm1.phase = Math.PI;
    arm0.addArm(BoneOneLengeth - 10, Math.PI/2, Math.PI/4, 0);
    arm1.addArm(BoneOneLengeth - 10, Math.PI/2, Math.PI/4, 0);

    update();

    function update() {
        context.clearRect(0, 0, width, height);
        if (moving !== ""){
            leg0.update();
            arm0.update();
            leg1.update();
            arm1.update();
            if (moving === "right"){
                leg0.x += leg0.speed * movementSpeed;
                leg1.x += leg1.speed * movementSpeed;
                arm0.x += arm0.speed * movementSpeed;
                arm1.x += arm1.speed * movementSpeed;
            }
            else {
                leg0.x -= leg0.speed * movementSpeed;
                leg1.x -= leg1.speed * movementSpeed;
                arm0.x -= arm0.speed * movementSpeed;
                arm1.x -= arm1.speed * movementSpeed;
            }
        }
        leg0.render(context,20);
        leg1.render(context);
        arm1.render(context);
        arm0.render(context);
        //
        context.beginPath();
        context.arc(arm0.x, arm0.y - 15, 5 , 0, Math.PI * 2, false);
        context.fillStyle = 'black';
        context.fill();

        context.strokeStyle = "#000000";
        context.lineWidth = 6;
        context.beginPath();
        context.moveTo(arm0.x-2, arm0.y - 10);
        context.lineTo(leg0.x, leg0.y);
        context.stroke();
        //
        requestAnimationFrame(update);
    }
};
