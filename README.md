# JS Startup kit

## List of functions

### Important
- `sleep(ms)`
- `generate_canvas(layer)`

---

### Games
- `game_internal_isColliding(x1, y1, x2, y2, ts)`
- `game_internal_check_for_tile_collisions(px, py, tl, ts)`
- `game_jump(x, y, jump_height, canvas, gravity, tps, tile_list)`
- `game_draw_player(x, y, ts, canvas)`
- `game_move_player(x, y, ts, canvas)`
- `game_draw_tile(x, y, ts, canvas, color)`
- `game_tile_block(x, y, w, h, ts, canvas, color)`

---

### Physics
- `physics_internal_to_radians()`
- `physics_generate_angle_motions()`
- `physics_get_motion_from_angle(angle)`
