
export default class Card {
  constructor({key, gameScene, x, y, handler, tweens}) {    
    this.key = `card-${key}`;
    this.gameScene = gameScene;
    this.handler = handler;
    this.outOfTheGame = false;
    this.tweens = tweens
    this._draw(x, y);
    this.state = 0
        console.log(key)


  }


  _draw(x, y) {

    this.image = this.gameScene.add.sprite(x, y, 'back-front-card').setInteractive();
    this.image.on('pointerdown', this._onClickHandler.bind(this));
    this.image.setScale(0.2)

    this.faceDown();
  }

  readOnly () {
    this.outOfTheGame = true;
  }

  isVisible () {
    return this.state === 1;
  }

  faceDown() {
    if (this.outOfTheGame) return
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
    
    if (this.outOfTheGame) return
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
    this.handler(this);
  }
}