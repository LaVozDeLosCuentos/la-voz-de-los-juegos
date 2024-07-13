import Phaser, { AUTO, Scale } from 'phaser';
import CardGameScene from './scenes/CardGameScene';
import MenuScene from './scenes/MenuScene';
import EventHandler from '../services/services.events';
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
            scene: [MenuScene, CardGameScene]
        };
        super(config);
        this._addListeners()
        this.init()
        

    }

    _onStart() {
        this.scene.stop('MenuScene')
        this.scene.start('CardGameScene')
    }

    _addListeners() {
        EventHandler.on('start', this._onStart, this);
    }
    init() {
        setTimeout(() => this._onStart(), 100)
    }
    
}

window.game = new Game();
