class Game extends Phaser.Game {
    constructor() {
        var config = {
            type: Phaser.AUTO,
            parent: "game-container",
            width: 800,
            height: 600,
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 200 },
                },
            },
        };
        super(config);
        this.scene.add("Game", Board, true);
    }
}
