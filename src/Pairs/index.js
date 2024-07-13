import Phaser, { AUTO, Scale } from 'phaser';
import CardGameScene from './scenes/CardGameScene';

export default class Game extends Phaser.Game {

    constructor() {
        var config = {
            type: AUTO,
            scale: {
                mode: Scale.RESIZE,
                width: window.innerWidth * window.devicePixelRatio,
                autoCenter: Scale.CENTER_BOTH,
                height: window.innerHeight * window.devicePixelRatio,
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 }
                }
            },
        };
        super(config);
        this.scene.add('Game', CardGameScene, true);
    }
}

window.game = new Game();
