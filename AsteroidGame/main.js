window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		ship = shipFactory.create(width, height);
		targets = [];

		// number of tagets
		no_targets = 5;

		for (i = 0; i < no_targets; i++) {
			targets.push(target.create(width * Math.random(), height * Math.random(),  50 , Math.random() * Math.PI, 0, 50));
	  }
		update();

		// document.body.addEventListener("click", function(event) {
		// });

		document.body.addEventListener("mousedown", function(event) {
			console.log("button",event.button);
			console.log("buttons",event.buttons);
		});

		document.body.addEventListener("mousemove", function(event) {
			dx = event.clientX - ship.part.x;
			dy = event.clientY - ship.part.y;
			ship.angle = Math.atan2(dy , dx);
		});

		document.body.addEventListener("keydown", function(event) {
			//
			// console.log(event.keyCode);
			switch (event.keyCode) {
				case 87://"w"
					ship.thrusting = true;
					break;
				case 32://"space"
					ship.shoot();
					break;
				default:
			}
		});

		document.body.addEventListener("keyup", function(event) {
			//
			//console.log(event.keyCode);
			switch (event.keyCode) {
				case 87://up
					ship.thrusting = false;
					break;
			}
		});

		function drawShip(ship) {
			context.save();
			context.translate(ship.part.x, ship.part.y);
			context.rotate(ship.angle);
			context.beginPath();
			context.moveTo(10,0);
			context.lineTo(-10, -7);
			context.lineTo(-10, 7);
			context.lineTo(10, 0);
			context.moveTo(-10, -7);
			context.lineTo(10, -7);
			context.moveTo(-10, 7);
			context.lineTo(10, 7);
			if (ship.thrusting) {
				context.moveTo(-10,0);
				context.lineTo(-18, 0);
			}
			context.moveTo(10, 0);
			context.lineTo(400, 0);
			context.strokeStyle = '#ff0000';
 			context.stroke();
			context.restore();
			ship.update();
			utils.boundParticleToRect(ship, width, height);
		}

		function checkColisions(shot) {
			targets.forEach(function(el, index, array){
				if (shot.checkColision(el.particle)) {
					el.hit();
					if (el.isDestroyed()) {
						for (i = 0; i < 10; i++) {
							ship.shots.push(shot.create(el.particle.x, el.particle.y,  50 , Math.random() * Math.PI, 0, 10));
						}
						targets.splice(index, 1);
						no_targets -= 1;
					}
					ship.hits += 1;
				}
			});
		}

		function get_color_target(nr_of_hits){
			color_set = ["#ffffff", "#ffe5e5", "#ffcccc", "#ffb3b3", "#ff9999",
						 "#ff8080","#ff6666", "#ff4d4d", "#ff3333", "#ff1a1a",
						 " #ff0000"];
			return color_set[nr_of_hits];
		}

		function drawTargets() {
			targets.forEach(function(el, index, array){
				el.particle.update();
		    	context.beginPath();
		    	context.arc(el.particle.x,el.particle.y, el.particle.radius , 0, Math.PI * 2, false);
				context.fill();
				context.beginPath();
				context.arc(el.particle.x,el.particle.y, el.particle.radius - 15 , 0, Math.PI * 2, false);
				context.fillStyle = get_color_target(el.nrHits);
				context.fill();
				context.fillStyle = "black";

				// Draw the shadow of the target circle
				context.shadowColor = '#999';
			    context.shadowBlur = 20;
			    context.shadowOffsetX = 15;
			    context.shadowOffsetY = 15;

				// Draw the number of hits of the target.
				context.fillText(el.nrHits, el.particle.x-15, el.particle.y+10);
				utils.bounceParticleInRect(el.particle, width, height);
			});
		}

		function update() {
			context.clearRect(0, 0, width, height);
	 		drawShip(ship);
			if (ship.shots.length > 0 ){
				ship.shots.forEach(function(el, index, array){
					el.update(width, height);
					if (el.initPart){
						utils.drawParticle(el.initPart, context);
						utils.bounceParticleInRect(el.initPart, width, height);
						checkColisions(el);
					}
					else if (el.explosionParticles.length > 0 ) {
						el.explosionParticles.forEach(function(el) {
							utils.drawParticle(el, context, 'blue');
						});
					}
					else {
						 //context.fillStyle = 'black';
						 ship.shots.splice(index, 1);
					}
				});

			}
			drawTargets();
			context.font = 'bold 20pt Calibri';
			var acc = 0;
			if (ship.shotsFired > 0) {
					acc = Math.floor(ship.hits/ship.shotsFired * 100);
			}
			if (no_targets > 0 ){
				context.fillText('Shots: ' + ship.shotsFired + ' Hits: ' + ship.hits + ' Acuracy: ' + acc + '%' + 'Targets: ' + no_targets, 0, 20);
			}
			else{
				context.fillText('Game Over!' , 0, 20);
			}
			requestAnimationFrame(update);
		}
};
