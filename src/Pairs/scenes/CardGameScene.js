import Board from '../components/Board';
import characters from '../../data/characters.json';
import EventHandler from "../../services/services.events";
import { centeredButton } from '../../utils/button.utils';
import Life from '../components/Life';

const MAX_ATTEMPTS = 2
export default class CardGameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'CardGameScene'
        });
        this.board
        this.characters = characters
        this.life
    }

    init() { }
    preload() {
        this._loadAssets();
        this.board = new Board({
            scene: this,
            cards: this.characters
        })
        Life.preload(this)
    }


    _loadAssets() {
        characters.map((entry) => {
            this.load.image(`card-${entry.name}`, entry.img);
        });
        this.load.image('back-card', `assets/cards/back-card.png`);
        this.load.image('back-front-card', `assets/cards/back-front-card.png`);
        this.load.image('card-bg', `assets/cards/default.png`);
    }

    _createRestartDebugButton() {
        centeredButton({
            scene: this,
            text: `Restart`,
            callback: this._forceRestart.bind(this)
        })
    }

    _createUX() {
        this.life = new Life({ scene: this, attempts: MAX_ATTEMPTS })
    }

    _onSuccessGame() {
        EventHandler.emit('board::finish', {
            success: true
        })
    }

  
    _onGameOver() {
        EventHandler.emit('board::finish', {
            success: false
        })
    }
    _onFailGame() {
        EventHandler.emit('life::lost')
    }

    _onMatch() {
    }

    _onAttempt() {}



    _addListeners() {
        EventHandler.on('board::attempt', this._onAttempt, this)
        EventHandler.on('board::success', this._onSuccessGame, this)
        EventHandler.on('board::fail', this._onFailGame, this)
        EventHandler.on('board::match', this._onMatch, this)
        EventHandler.on('life::dead', this._onGameOver, this);
    }

    _forceRestart () {
        this._onFailGame()
    }

    create() {
        this.board.create()
        this._createUX()
        this.life.create()
        this._addListeners()
        this.events.on('shutdown', this._onShutdown, this);
    }

    _onShutdown() {
        EventHandler.off('board::attempt')
        EventHandler.off('board::success')
        EventHandler.off('board::fail')
        EventHandler.off('board::match')
        EventHandler.off('life::dead')
        if (this.life) {
            this.life.destroy();
            this.life = null;
        }
    }
}