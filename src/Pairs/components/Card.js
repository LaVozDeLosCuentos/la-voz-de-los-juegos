import EventHandler from '../../services/services.events';

export default class Card {
  constructor({ key, gameScene, x, y, cardWidth, cardHeight }) {
    this.key = key;
    this.gameScene = gameScene;
    this.tweens = gameScene.tweens;
    this.cardWidth = cardWidth;
    this.cardHeight = cardHeight;
    this.state = 1;
    this.faceScaleMax;
    this.backScaleMax;
    this._draw(x, y);
  }

  _draw(x, y) {
    this.face = this.gameScene.add.sprite(x, y, `card-${this.key}`);
    this.face.setDisplaySize(this.cardWidth, this.cardHeight);
    this.face.on('pointerdown', this._onClickHandler, this);
    this.faceScaleMax = this.face.scaleX;
    this.back = this.gameScene.add.sprite(x, y, 'back-card');
    this.back.setDisplaySize(this.cardWidth, this.cardHeight);
    this.back.on('pointerdown', this._onClickHandler, this);
    this.back.setInteractive();
    this.backScaleMax = this.back.scaleX;
    this.back.setVisible(false);
    setTimeout(
      () => {
        this.faceDown();
      },
      Math.floor(Math.random() * (2000 - 500 + 1)) + 500,
    );
  }

  _onClickHandler() {
    if (!this.state) EventHandler.emit('card::click', this);
  }

  faceDown() {
    if (this.state === 0) return;

    this.state = 0;

    this.tweens.add({
      targets: this.face,
      scaleX: { value: 0, duration: 200, yoyo: true },
      ease: 'Linear',
      onUpdate: (tween) => {
        this._onUpdateTween(
          tween,
          { image: this.face, scaleMax: this.faceScaleMax },
          { image: this.back, scaleMax: this.backScaleMax },
        );
      },
      onComplete: () => {
        this._onCompleteTween({
          image: this.back,
          scaleMax: this.backScaleMax,
        });
      },
    });
  }

  _onCompleteTween(rear) {
    rear.image.scaleX = rear.scaleMax;
  }

  _onUpdateTween(tween, front, rear) {
    if (tween.progress >= 0.5) {
      rear.image.scaleX = rear.scaleMax * tween.progress;
      front.image.setVisible(false);
    } else {
      rear.image.setVisible(true);
      rear.image.scaleX = 0;
    }
  }
  faceUp() {
    if (this.state === 1) return;
    this.state = 1;
    this.tweens.add({
      targets: this.back,
      scaleX: { value: 0, duration: 200, yoyo: true },
      ease: 'Linear',
      onUpdate: (tween) => {
        this._onUpdateTween(
          tween,
          { image: this.back, scaleMax: this.backScaleMax },
          { image: this.face, scaleMax: this.faceScaleMax },
        );
      },
      onComplete: () => {
        this._onCompleteTween({
          image: this.face,
          scaleMax: this.faceScaleMax,
        });
      },
    });
  }

  reset() {
    this.state = 0;
    this.face.setVisible(false);
    this.back.setVisible(true);
  }
}
