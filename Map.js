class Map {

    /**
     * Constructs a map with the specified dimensions.
     * @param {int} width 
     * @param {int} height 
     */
    constructor(width, height) {
        let map = this;
        map.width = width;
        map.height = height;
        map.tiles = {};
        map.foreachTile(function (x, y, unit) {
            map.setUnit(x, y, null);
        });
    }

    /**
     * Executes the action function for each tile in the map.
     * @param {function(x,y,unit):boolean} action This function will be passed the x coordinate, y coordinate, and unit at that position. If this action returns true, the whole function will stop.
     */
    foreachTile(action) {
        let map = this;
        for (let x = 0; x < map.width; x++) {
            for (let y = 0; y < map.height; y++) {
                let shouldStop = action(x, y, map.getUnit(x, y));
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
        return map.tiles[x][y];
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
        map.tiles[x][y] = unit;
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

    /**
     * Draws the map inside the canvas.
     * @param {HTMLCanvasElement} canvas The canvas element to draw the map inside.
     */
    draw(canvas) {
        const map = this;
        const tileSize = 50;
        map.foreachTile((x, y, unit) => {
            canvas.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
            if (unit !== null) {
                unit.draw(canvas, tileSize);
            }
        });
    }
}