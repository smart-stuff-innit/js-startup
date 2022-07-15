function generate_canvas(layer) {
	var c = document.createElement("canvas");
	c.style.width='100%';
	c.style.height='100%';
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	c.style.position='absolute';
	c.style.left=0;
	c.style.top=0;
	c.style.zIndex = layer;
	document.body.appendChild(c);
	return c
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// GAME FUNCTIONS

px = 0;
py = 0;

function game_internal_isColliding(x1, y1, x2, y2, ts) {
	var rect1 = {x: x1, y: y1, width: ts, height: ts};
	var rect2 = {x: x2, y: y2, width: ts, height: ts};
	return (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y);
}

function game_internal_check_for_tile_collisions(px, py, tl, ts) {
	for ([x, y] of tl) {
		if (game_internal_isColliding(x, y, px, py, ts)) {
			return true;
		}
	}
	return false;
}

function game_draw_player(x, y, ts, canvas) {
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.fillRect(x, y, ts, ts);
	ctx.closePath();
}

function game_move_player(x, y, ts, canvas) {
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	ctx.fillRect(x, y, ts, ts);
	ctx.closePath();
}

function game_jump(ts, jump_height, canvas, gravity, tps, tile_list) {
	var y_offset = jump_height;
	for (var i = 0; i < 100; i++) {
		await sleep(tps);
		py -= y_offset;
		y_offset -= gravity;
		game_move_player(px, py, ts, canvas);
		if (game_internal_check_for_tile_collisions(px, py, tile_list, ts)) {
			py += y_offset;
			game_move_player(px, py, ts, canvas);
			// Set on ground "Gently" (Smash into ground as fast as possible)
			while (!game_internal_check_for_tile_collisions(px, py, tile_list, ts)) {
				py += 1;
			}
			py -= 1;
			game_move_player(px, py, ts, canvas);
			return;
		}
	}
}

// PHYSICS FUNCTIONS

angle_list = [];
function physics_generate_angle_motions() { // This is very slow, but thankfully it's only ran once on bootup, so it isn't noticeable
	for (var degree = 0; degree < 360; degree++) {
        angle_list[degree] = {
            x: Math.round(Math.sin(to_radians(degree)) * 1000) / 1000,
            y: Math.round(-Math.cos(to_radians(degree)) * 1000) / 1000
        }
    }
    return true;
}

function physics_get_motion_from_angle(angle) {
	return angle_list[(360 + (angle % 360)) % 360] // All of the mods and adding is to fix negative angles
}
