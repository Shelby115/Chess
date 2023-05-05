class Game {
    constructor(canvas) {
        
		// Game Setup
		const game = this;
		game.canvas = canvas.getContext("2d");
		game.width = canvas.width;
		game.height = canvas.height;
		game.left = canvas.offsetLeft + canvas.clientLeft;
		game.top = canvas.offsetTop + canvas.clientTop;
        game.map = new Map(50, 8, 8);
        
		// Unit Setup
		for (let x = 0; x < 8; x++) {
            let p1 = new Pawn("Player1", game.map, x, 1, "South");
            let p2 = new Pawn("Player2", game.map, x, 6, "North");
        }
		
		canvas.addEventListener("click", function (e) {
			
			const tileCoordinates = game.map.getTileCoordinatesFromPixelCoordinates(e.pageX - game.left, e.pageY - game.top);
			game.map.getTile(tileCoordinates.x, tileCoordinates.y, (x, y, clickedTile) => {

				let clickedUnit = clickedTile.unit || null;

				// Move the unit if the tile clicked can be moved to by the selectedUnit.
				if (clickedTile.isMoveable) {
					game.map.foreachTile((x, y, tile) => {
						const unit = tile.unit;
						if (unit && unit.isSelected) {
							game.map.setUnit(clickedTile.x, clickedTile.y, unit);
							game.map.setUnit(unit.x, unit.y, null);
							unit.x = clickedTile.x;
							unit.y = clickedTile.y;
							clickedTile.isMoveable = false;
							game.draw();
						}
					});
				}
				
				// For each tile, set the isSelected status of the unit on it, if there is one.
				game.map.foreachTile((x, y, tile) => {
					const isSelected = tile === clickedTile;
					if (tile.unit) {
						tile.unit.isSelected = isSelected;
					}
				});

				// For each tile, set the isSelected status of it.
				game.map.foreachTile((x, y, tile) => {
					tile.isMoveable = clickedUnit !== null ? clickedUnit.canMoveToPosition(x, y) : false;
				});

			});
			
			game.draw();
			
		}, false);
    }

    draw() {
        let game = this;
        game.canvas.clearRect(0, 0, game.width, game.height);
        game.map.draw(game.canvas);
    }
}