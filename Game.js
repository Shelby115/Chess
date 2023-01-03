class Game {
    constructor(canvas) {
        this.canvas = canvas.getContext("2d");
        this.map = new Map(10, 10);
        for (let x = 0; x < 10; x++) {
            let p1 = new Pawn("Player1", this.map, x, 1);
            let p2 = new Pawn("Player2", this.map, x, 8);
        }
    }

    draw() {
        let game = this;
        game.map.draw(game.canvas);
    }
}