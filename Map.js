class Map {

    /**
     * Constructs a map with the specified dimensions.
	 * @param {int} tileSize The size of each tile in pixels.
     * @param {int} width The width (x coordinate) of the map.
     * @param {int} height The height (y coordinate) of the map.
     */
    constructor(tileSize, width, height) {
        let map = this;
		map.tileSize = tileSize;
        map.width = width;
        map.height = height;
        map.tiles = {};
		for (let x = 0; x < map.width; x++) {
            for (let y = 0; y < map.height; y++) {
                map.tiles[x] = map.tiles[x] || {};
				map.tiles[x][y] = {
					x: x,
					y: y,
					isSelected: false,
					unit: null
				};
            }
        }
    }
	
	/**
	 * Retrieves the tile that is at the specified canvas coordinates.
	 * @param {Number} The pixel X coordinate.
	 * @param {Number} The pixel Y coordinate.
	 */
	getTileCoordinatesFromPixelCoordinates(pixelX, pixelY) {
		const map = this;
		const mapX = Math.trunc(pixelX / map.tileSize);
		const mapY = Math.trunc(pixelY / map.tileSize);
		return { x: mapX, y: mapY };
	}

    /**
     * Executes the action function for each tile in the map.
     * @param {function(x,y,unit):boolean} action This function will be passed the x coordinate, y coordinate, and unit at that position. If this action returns true, the whole function will stop.
     */
    foreachTile(action) {
        let map = this;
        for (let x = 0; x < map.width; x++) {
            for (let y = 0; y < map.height; y++) {
                let shouldStop = action(x, y, map.tiles[x][y]);
                if (shouldStop === true) { return; }
            }
        }
    }

    /**
     * Removes the unit from its current position on the map.
     * @param {Unit} unit The unit to be removed from the map.
     */
    removeUnit(unit) {
        let map = this;
        map.foreachTile((x, y, u) => {
            if (u === unit) {
                map.setUnit(null, x, y);
                return true;
            }
            return false;
        });
    }

    /**
     * Gets the unit at the specified position.
     * @param {int} x The x coordinate (should not be greater than or equal to the map's width).
     * @param {int} y The y coordinate (should not be greater than or equal to the map's height).
     * @returns {Unit} The unit at the specified position (or null);
     */
    getUnit(x, y) {
        let map = this;
        if (!map.tiles[x]) { return null; }
        return map.tiles[x][y].unit;
    }

    /**
     * Sets the unit's position to the specified coordinates.
     * @param {int} x The x coordinate (should not be greater than or equal to the map's width).
     * @param {int} y The y coordinate (should not be greater than or equal to the map's height).
     * @param {Unit} unit The unit to be positioned at the specified coordinates.
     */
    setUnit(x, y, unit) {
        let map = this;
        map.tiles[x] = map.tiles[x] || {};
        map.tiles[x][y].unit = unit;
    }

    /**
     * Checks if the coordinates are inside the maps bounds.
     * @param {int} x 
     * @param {int} y 
     */
    areValidCoordinates(x, y) {
        let map = this;
        return x < map.width && y < map.height;
    }

    setHighlightedTiles(tileArray) {
        this.highlightedTiles = tileArray;
    }

    getTileColor(x, y) {
        let highlightedTile = (this.highlightedTiles || []).find(t => t.x === x && t.y === y);
        return highlightedTile && highlightedTile.unit ? "red"
             : highlightedTile ? "blue"
             : "black";
    }

    /**
     * Draws the map inside the canvas.
     * @param {HTMLCanvasElement} canvas The canvas element to draw the map inside.
     */
    draw(canvas) {
        const map = this;
        const tileSize = map.tileSize;
        map.foreachTile((x, y, tile) => {
            canvas.strokeStyle = tile.isSelected === true ? "skyblue" : "black";
            canvas.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
            if (tile.unit !== null) {
                tile.unit.draw(canvas, tileSize);
            }
        });
    }
}