import Board from '../components/Board';
import characters from '../../data/characters.json';
import EventHandler from "../../services/services.events";

const INIT_SCORE = {
    label: "",
    current: 0,
    new: 0,
    actionPoints: 5,
    element: {}
}
export default class CardGameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'CardGameScene'
        });
        this.score = {...INIT_SCORE}
        this.attempts = 0;

        this.board
        this.characters = characters
    }

    init() { }
    preload() {
        this._loadAssets();
        this.board = new Board({
            scene: this,
            cards: this.characters
        })
    }

    _createUX() {
        this._createScore()
    }
    _loadAssets() {
        characters.map((entry) => {
            this.load.image(`card-${entry.name}`, entry.img);
        });
        this.load.image('back-card', `assets/cards/back-card.png`);
        this.load.image('back-front-card', `assets/cards/back-front-card.png`);
        this.load.image('card-bg', `assets/cards/default.png`);
    }

    _createScore() {
        var style = { font: 'bold 16px', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' };
        this.score.element = this.add.text(16, 16, `${this.score.label} ${this.score.current}`, style);
    }

    _onSuccessGame() {
        setTimeout(() => {
            EventHandler.emit('game::finish', {
                success: true
            })
        }, 1000)
        
    }

    _onFailGame() {
        
    }

    _onMatch() {
        this.score.new = this.score.current + this.score.actionPoints
        this.tweens.addCounter({
            from: this.score.current,
            to: this.score.new,
            duration: 100,
            ease: 'linear',
            onUpdate: tween => {
                const value = Math.round(tween.getValue());
                this.score.element.setText(`${this.score.label} ${value}`);
                this.score.current = value
            }
        });
    }

    _onAttempt() {
        console.log('attempt')
    }

    _restart() {
        
    }

    _addListeners() {
        EventHandler.on('board::attempt', this._onAttempt, this)
        EventHandler.on('board::success', this._onSuccessGame, this)
        EventHandler.on('board::fail', this._onFailGame, this)
        EventHandler.on('board::match', this._onMatch, this)
        EventHandler.on('game::restart', this._restart, this);
    }

    _once() {
        if(this.created) return
        this.created = true 
        this._addListeners()
    }

    create() {
        this._once()
        this.attempts = 0;
        this._createScore()
        this.board.create()
    }
}