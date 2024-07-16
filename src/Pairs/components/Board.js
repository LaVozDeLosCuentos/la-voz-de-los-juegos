import Card from '../components/Card';
import EventHandler from "../../services/services.events";

import { getRandomInt } from '../../utils/random.util';
const MAX_CARD_PER_LINE = 2;
const H_OFFSET = 150;
const V_OFFSET = 170;
const INITIAL_X = 135;
const INITIAL_Y = 170;
export default class Board extends Phaser.GameObjects.Container{
    constructor({ scene, cards }) {
        super(scene)
        this.cards = [];
        this.selectedCards = [];
        this.waitForNewRound = false;
        this.tweens = scene.tweens
        this.scene = scene
        this.baseCards = cards
    }

    init() {}

    _onClickCard(card) {
        if (this.waitForNewRound || card.state) { return; }
        card.faceUp();
        this.selectedCards.push(card);
        if (this.selectedCards.length === 2) {
            this._newRound();
        }
    }

    _onSuccessPair() {
        if (!this.cards.some((card) => card.state === 0)) {
            EventHandler.emit('board::success')
        }
    }

    _onErrorPair() {
        this._faceCardsDown();
        EventHandler.emit('board::fail')
    }

    _onNewAttempt() {
        EventHandler.emit('board::attempt')
    }

    _newRound() {
        this.waitForNewRound = true;
        setTimeout(() => {
            if (this._matchCards()) {
                EventHandler.emit('board::match')
                this._onSuccessPair()
            } else {
                this._onErrorPair()
            }
            this.selectedCards.length = 0;
            this.waitForNewRound = false;
            this._onNewAttempt()
        }, 600);
    }

    _faceCardsDown() {
        this.selectedCards.forEach((card) => card.faceDown());
    }

    _matchCards() {
        
        return this.selectedCards[0].key === this.selectedCards[1].key;
    }

    _generateCard(position, key) {
        return new Card({ 
            key, 
            gameScene: this.scene, 
            ...position, 
            tweens: this.tweens 
        })
    }

    _drawPairs(posA, posB, key) {
        this.cards = [...this.cards, this._generateCard(posA, key), this._generateCard(posB, key)]
    }

    _assignCardsPosition() {
        const positions = this._calculatePositions()
        const imageNames = this.baseCards.map(entry => entry.name)
        while (positions.length) {
            const posA = positions.splice(getRandomInt(positions.length), 1)[0];
            const posB = positions.splice(getRandomInt(positions.length), 1)[0];
            const key = imageNames.splice(getRandomInt(imageNames.length), 1)[0];
            this._drawPairs(posA, posB, key)
        }
    }

    _getPairs() {
        return this.baseCards.length
    }
    _getTotalCards() {
        return this._getPairs() * 2
    }

    _calculateLines() {
        const TOTAL_CARDS = this._getTotalCards()
        return TOTAL_CARDS / MAX_CARD_PER_LINE + ((TOTAL_CARDS / MAX_CARD_PER_LINE % MAX_CARD_PER_LINE ? 1 : 0));
    }

    _calculatePositions() {
        let cardsNumber = this._getTotalCards()
        const lines = this._calculateLines()
        const positions = [];
        for (let line = 0; line < lines; line++) {
            for (let pos = 0; pos < MAX_CARD_PER_LINE; pos++) {
                if (cardsNumber > 0) {
                    positions.push({
                        x: INITIAL_X + (H_OFFSET * pos),
                        y: INITIAL_Y + (V_OFFSET * line)
                    });
                }
                cardsNumber--;
            }
        }
        return positions
    }

    _drawBoard () {
        this._assignCardsPosition()
    }

    _restart() {
        EventHandler.removeListener('card::click')
        EventHandler.removeListener('game::restart')
        this.cards.forEach(card => card.reset())
    }
    _addListeners() {
        EventHandler.on('card::click', this._onClickCard, this)
        EventHandler.on('game::restart', this._restart, this);
    }
    _onClickStart(){
        EventHandler.emit('board::fail')
    }

    create() {
        this._drawBoard()
        this._addListeners()
        const start = this.scene.add.text(200, 500, 'restart', { fill: '#0f0' });
        start.setInteractive();
        start.on('pointerover', this._onClickStart);
    }
}