class Game {
    constructor(canvas) {
        this.canvas = canvas.getContext("2d");
        this.map = new Map(50, 8, 8);
        for (let x = 0; x < 8; x++) {
            let p1 = new Pawn("Player1", this.map, x, 1, "South");
            let p2 = new Pawn("Player2", this.map, x, 6, "North");
        }
		
		const game = this;
		const left = canvas.offsetLeft + canvas.clientLeft;
		const top = canvas.offsetTop + canvas.clientTop;
		canvas.addEventListener("click", function (e) {
			
			const x = e.pageX - left;
			const y = e.pageY - top;
			const tileCoordinates = game.map.getTileCoordinatesFromPixelCoordinates(x, y);
			let selectedUnit = null;
			
			// Select the unit on the clicked tile, if there is one. Set all others to unselected.
			game.map.foreachTile(function (x, y, tile) {
				const isSelected = x === tileCoordinates.x && y === tileCoordinates.y;
				if (tile.unit) {
					tile.unit.isSelected = isSelected;
					if (isSelected) { selectedUnit = tile.unit; }
				}
			});
			
			if (selectedUnit !== null) {
				// Select the tiles the selected unit can move to, if there is one. Set all others to unselected.
				game.map.foreachTile(function (x, y, destinationTile) {
					const isTileSelected = selectedUnit.canMoveToPosition(x, y);
					destinationTile.isSelected = isTileSelected;
				});
			}
			
			game.draw();
			
		}, false);
    }

    draw() {
        let game = this;
        game.map.draw(game.canvas);
    }
}