import Board from '../components/Board';
import characters from '../../data/characters.json';
import EventHandler from "../../services/services.events";

export default class CardGameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'CardGameScene'
        });
        this.cards = [];
        this.selectedCards = [];
        this.attempts = 0;
        this.waitForNewRound = false;
        this.score;
        this.newScore;
        this.currentScore = 0;
        this.board
        this.characters = characters
    }

    init() { }
    preload() {
        this._loadAssets();
        this._createUX()
    }

    _createUX() {
        this._createScore()
    }
    _loadAssets() {
        console.log('loadAssets')
        characters.map((entry) => {
            this.load.image(`card-${entry.name}`, entry.img);
        });
        this.load.image('back-card', `assets/cards/back-card.png`);
        this.load.image('back-front-card', `assets/cards/back-front-card.png`);
        this.load.image('card-bg', `assets/cards/default.png`);
    }

    _addNewAttempt() {
        this.newScore = this.currentScore + 200
        this.tweens.addCounter({
            from: this.currentScore,
            to: this.newScore,
            duration: 2000,
            ease: 'linear',
            onUpdate: tween => {
                const value = Math.round(tween.getValue());
                this.score.setText(`Score: ${value}`);
                this.currentScore = this.newScore
            }
        });
    }

    _createScore() {
        var style = { font: 'bold 32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' };

        if (!this.score) {
            this.score = this.add.text(0, 0, 'Score: ', style);
        }
    }

    _addListeners() {
        EventHandler.on('board::attempt', this._addNewAttempt, this)
        EventHandler.on('board::success', this._addNewAttempt, this)
        EventHandler.on('board::fail', this._addNewAttempt, this)
        EventHandler.on('board::match', this._addNewAttempt, this)

    }

    create() {
        this._addListeners()
        this.board = new Board({
            scene: this,
            characters: this.characters
        })
        this.board.create()
    }
}