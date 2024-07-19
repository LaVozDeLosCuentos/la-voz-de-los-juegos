import EventHandler from '../../services/services.events';
import { pathSprite } from '../../utils/sprite.utils';

export default class Life extends Phaser.GameObjects.Container {
  constructor({ scene, x, y, attempts = 6 }) {
    super(scene, x, y);
    this.scene = scene;
    this.attempts = attempts;
    this.lifes = this.getLifes();
    this.addListeners();
    scene.add.existing(this);
  }

  static preload(scene) {
    scene.load.image('heart-full', `${pathSprite}/ux/hearts/full.png`);
    scene.load.image('heart-empty', `${pathSprite}/ux/hearts/empty.png`);
    scene.load.image('heart-half', `${pathSprite}/ux/hearts/half.png`);
  }

  addListeners() {
    EventHandler.on('life::lost', this._lostLife, this);
  }

  getLifes() {
    return new Array(this.attempts / 2).fill(1).map((_, index) => {
      return this._addHeart(index);
    });
  }

  _addHeart(index) {
    const heart = this.scene.add.sprite(30 * (index + 1), 25, 'heart-full');
    heart.displayWidth = 25;
    heart.scaleY = heart.scaleX;
    this.add(heart);
    return { heart, hits: 2, index };
  }

  _checkLife() {
    if (!this.lifes.find((heart) => heart.hits > 0)) {
      EventHandler.emit('life::dead');
    }
  }

  _lostLife() {
    const heart = this.lifes.findLast((heart) => heart.hits > 0);
    if (heart) {
      heart.hits -= 1;
      this.scene.tweens.add({
        targets: heart.heart,
        scaleX: { value: 0, duration: 300, yoyo: true },
        onYoyo: () => {
          heart.heart.setTexture(heart.hits ? 'heart-half' : 'heart-empty');
        },
        ease: 'Linear',
      });
      this._checkLife();
    }
  }

  destroy() {
    EventHandler.off('life::lost', this._lostLife, this);
    super.destroy();
  }
}
