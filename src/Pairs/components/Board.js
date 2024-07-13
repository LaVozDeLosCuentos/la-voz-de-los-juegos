import Card from '../components/Card';

import { getRandomInt } from '../../utils/random.util';

export default class Board {
    constructor({ scene, characters }) {
        this.cards = [];
        this.selectedCards = [];
        this.attempts = 0;
        this.waitForNewRound = false;
        this.tweens = scene.tweens
        this.scene = scene
        this.cards = characters
    }

    init() {
        console.log('init')
    }

    _cardClickHandler(card) {
        if (this.waitForNewRound || card.out) { return; }
        card.faceUp();
        this.selectedCards.push(card);
        if (this.selectedCards.length === 2) {
            this._newRound();
        }
    }

    _onSuccessPair() {
        this._setAsReadOnly();
    }

    _onErrorPair() {
        this._faceCardsDown();
    }

    _onNewAttempt() {
        console.log('new attempt')
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
            this._onNewAttempt()
        }, 1000);
    }

    _matchedCards() {
        return this.cards.filter((card) => card.outOfTheGame).length / 2;
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
        console.log('createdBoard')

        this._newRound(true)

        const MAX_CARD_PER_LINE = 2;
        const PAIRS = this.cards.length;
        const H_OFFSET = 150;
        const V_OFFSET = 170;
        const INITIAL_X = 100;
        const INITIAL_Y = 100;

        const lines = parseInt(PAIRS * 2 / MAX_CARD_PER_LINE) + ((PAIRS * 2 / MAX_CARD_PER_LINE % MAX_CARD_PER_LINE ? 1 : 0));
        const numberOfCards = PAIRS * 2;
        const positions = [];

        const imageNames = this.cards.map(entry => entry.name)

        let total = numberOfCards;
        for (let line = 0; line < lines; line++) {
            for (let pos = 0; pos < MAX_CARD_PER_LINE; pos++) {
                if (total > 0) {
                    positions.push({
                        x: INITIAL_X + (H_OFFSET * pos),
                        y: INITIAL_Y + (V_OFFSET * line)
                    });
                }
                total--;
            }
        }

        while (positions.length) {
            const posA = positions.splice(getRandomInt(positions.length), 1)[0];
            const posB = positions.splice(getRandomInt(positions.length), 1)[0];
            const key = imageNames.splice(getRandomInt(imageNames.length), 1)[0];
            this.cards.push(new Card({ key, gameScene: this.scene, ...posA, handler: this._cardClickHandler.bind(this), tweens: this.tweens }));
            this.cards.push(new Card({ key, gameScene: this.scene, ...posB, handler: this._cardClickHandler.bind(this), tweens: this.tweens }));
        }
    }
}