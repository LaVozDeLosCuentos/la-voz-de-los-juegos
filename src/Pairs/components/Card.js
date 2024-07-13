
import EventHandler from "../../services/services.events";

export default class Card {
    constructor({ key, gameScene, x, y }) {
        this.key = `card-${key}`;
        this.gameScene = gameScene;
        this.tweens = gameScene.tweens
        this._draw(x, y);
        this.state = 0
    }

    _draw(x, y) {
        this.image = this.gameScene.add.sprite(x, y, 'back-front-card').setInteractive();
        this.image.on('pointerdown', this._onClickHandler.bind(this));
        this.image.setScale(0.2)
        this.faceDown();
    }

    faceDown() {
        if(!this.state) return 
        this.state = 0
        this.tweens.add({
            targets: this.image,
            props: {
                scaleX: { value: 0, duration: 100, yoyo: true },
                texture: { value: 'back-front-card', duration: 100 }
            },
            ease: 'Linear'
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
            ease: 'Linear'
        });
    }

    _onClickHandler() {
        if (!this.state) EventHandler.emit('card::click', this)
    }
    reset() {
        this.state = 0
    }
}