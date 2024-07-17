import { pathSprite } from '../../utils/sprite.utils';

export default class Currency extends Phaser.GameObjects.Sprite {
  constructor({ scene }) {
    super(scene);
  }

  static preload(scene) {
    scene.load.image('currency', `${pathSprite}/ux/curreny.png`);
  }
}
