class Pawn extends Unit {
    /**
     * Constructs a pawn and adds it to the map with the specified position.
     * @param {string} owner The owner of the unit (Who controls it).
     * @param {Map} map The map the unit will be added to.
     * @param {int} x The x coordinate (should not be greater than or equal to the map's width).
     * @param {int} y The y coordinate (should not be greater than or equal to the map's height).
	 * @param {string} A direction the piece is facing (i.e., Pawns). Valid values are North and South.
     */
    constructor(owner, map, x, y, direction) {
        super(owner, "Pawn", null, map, x, y);
		this.direction = direction || null;
    }

    /**
     * A pawn may move forward 2 spaces on its first turn and 1 space on any other turn.
     * A pawn cannot move horizontally and can only move diagonally if a unit is on that tile.
     * @param {int} x 
     * @param {int} y 
     * @returns {boolean} Whether the pawn may move to the specified position.
     */
    canMoveToPosition(x, y) {
		
        let unit = this;

        // Position must be valid and inside the map.
        let canMove = super.canMoveToPosition(x, y);
        if (canMove === false) { return false; }

        // A unit cannot move to the position they're already at.
        if (unit.x === x && unit.y === y) { return false; }

        // Pawns cannot move backwards.
		if (unit.direction === "South" && y < unit.y) { return false; }
        else if (unit.direction === "North" && y > unit.y) { return false; }

        // Pawns can move 2 spaces only on their first turn; otherwise, 1 space.
        const maxY = unit.hasMovedBefore() ? 1 : 2;
        const yDiff = Math.abs(unit.y - y);
        if (yDiff > maxY) { return false; }

        // Pawns can only move diagonally when taking a unit.
        const maxX = unit.map.getUnit(x, y) !== null ? 1 : 0;
        const xDiff = Math.abs(unit.x - x);
        if (xDiff > maxX || yDiff <= 0) { return false; }

        return true;
		
    }
}