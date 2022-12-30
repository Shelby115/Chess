class Unit {

    /**
     * Constructs a unit with the specified name and position on the map.
     * @param {string} name The name of the unit (e.g., Pawn, Rook, Knight, King, etc).
     * @param {string} image The filepath to the image that will visually represent the unit.
     * @param {Map} map The map the unit will be added to.
     * @param {int} x The x coordinate (should not be greater than or equal to the map's width).
     * @param {int} y The y coordinate (should not be greater than or equal to the map's height).
     */
    constructor(name, image, map, x, y) {
        this.name = name;
        this.image = image;
        this.map = map;
        this.x = x;
        this.originalX = x;
        this.y = y;
        this.originalY = y;
        map.setUnit(x, y, this);
    }

    /**
     * Checks if this unit has moved since the start of the game.
     * @returns {boolean} True if it has moved and False if it has not moved.
     */
    hasMovedBefore() {
        let unit = this;
        return unit.originalX !== unit.x
            || unit.originalY !== unit.y;
    }

    /**
     * Checks if the unit can move from its current position to the specified position.
     * @param {int} x The x coordinate (should not be greater than or equal to the map's width).
     * @param {int} y The y coordinate (should not be greater than or equal to the map's height).
     * @returns {boolean} Whether the unit can move to the specified position.
     */
    canMoveToPosition(x, y) {
        let unit = this;
        // Check if the coordindates are inside map bounds.
        // This is the only check because it is expected that each unit override this function.
        return unit.map.areValidCoordinates(x, y);
    }

    draw(canvas, tileSize) {
        const unit = this;
        const offsetForCenter = tileSize * 0.5;
        canvas.beginPath();
        canvas.arc(unit.x * tileSize + offsetForCenter, unit.y * tileSize + offsetForCenter, 15, 0, 2 * Math.PI);
        canvas.stroke();
    }
}