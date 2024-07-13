import Phaser, { AUTO, Scale } from 'phaser';
import CardGameScene from './scenes/CardGameScene';
import MenuScene from './scenes/MenuScene';
import EventHandler from '../services/services.events';
import EndScene from './scenes/EndGame';
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
            scene: [MenuScene, CardGameScene, EndScene]
        };
        super(config);
        this._addListeners()
        this.init()
        

    }

    _onRestart() {
        EventHandler.emit('game::restart')
        this.scene.stop('EndScene')
        this.scene.start('CardGameScene')
    }
    _onStart() {
        this.scene.stop('MenuScene')
        this.scene.start('CardGameScene')
    }
    _onEnd() {
        this.scene.stop('CardGameScene')
        this.scene.start('EndScene')
    }

    _addListeners() {
        EventHandler.on('menu::start', this._onStart, this);
        EventHandler.on('end::restart', this._onRestart, this);
        EventHandler.on('board::success', this._onEnd, this);
    }
    init() {
        setTimeout(() => this._onStart(), 100)
    }
    
}

window.game = new Game();
