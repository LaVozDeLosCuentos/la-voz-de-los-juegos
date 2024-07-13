import Board from '../components/Board';
import characters from '../../data/characters.json';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super();
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
        this._newRound(true);
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

    _cardClickHandler(card) {
        if (this.waitForNewRound || card.out) { return; }
        card.faceUp();
        this.selectedCards.push(card);
        if (this.selectedCards.length === 2) {
            this._newRound();
        }
    }

    _addNewAttempt() {
        ;
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

    _onSuccessPair() {
        this._setAsReadOnly();
    }

    _onErrorPair() {
        this._faceCardsDown();
    }

    _newRound(init) {
        this.waitForNewRound = true;
        setTimeout(() => {

            if (this._matchCards()) {
                this._onSuccessPair()
            } else {
                this._onErrorPair()
            }
            this.selectedCards.length = 0;
            this.waitForNewRound = false;
            if (init) return
            this._addNewAttempt()
        }, 1000);
    }

    _matchedCards() {
        return this.cards.filter((card) => card.outOfTheGame).length / 2;
    }

    _createScore() {
        var style = { font: 'bold 32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' };

        if (!this.score) {
            this.score = this.add.text(0, 0, 'Score: ', style);
        }


    }

    _setAsReadOnly() {
        this.selectedCards.forEach((card) => card.readOnly());
    }

    _faceCardsDown() {
        this.selectedCards.forEach((card) => card.faceDown());
    }

    _matchCards() {
        if (!this.selectedCards.length) { return; }
        const cardA = this.selectedCards[0];
        const cardB = this.selectedCards[1];

        return cardA.key === cardB.key;
    }

    create() {
        this.board = new Board({
            scene: this,
            characters: this.characters
        })
        this.board.create()
    }
}