
import EventHandler from "../../services/services.events";

export default class Card {
    constructor({ key, gameScene, x, y, cardWidth, cardHeight, index }) {
        this.key = `card-${key}`;
        this.gameScene = gameScene;
        this.tweens = gameScene.tweens
        this.cardWidth = cardWidth
        this.cardHeight = cardHeight
        this._draw(x, y);
        this.state = 1
    }

    _draw(x, y) {
        this.image = this.gameScene.add.sprite(x, y, this.key).setInteractive();
        this.image.on('pointerdown', this._onClickHandler.bind(this));
        this.image.setDisplaySize(this.cardWidth, this.cardHeight)
        
        setTimeout(() => {
            this.faceDown()
        }, Math.floor(Math.random() * (1000 - 500 + 1)) + 500)
    }

    faceDown() {
        if(!this.state) return 
        this.state = 0
        this.tweens.add({
            targets: this.image,
            props: {
                scaleX: { value: 0, duration: 100, yoyo: true },
                texture: { value: 'back-card', duration: 100 }
            },
            ease: 'Linear',
        });
    }

    faceUp() {
        if (this.state) return
        this.state = 1
        this.tweens.add({
            targets: this.image,
            props: {
                scaleX: { value: 0, duration: 100, yoyo: true },
                texture: { value: this.key, duration: 100 }
            },
            ease: 'Linear',
            
        });
    }

    _onClickHandler() {
        if (!this.state) EventHandler.emit('card::click', this)
    }
    reset() {
        this.state = 0
    }
}