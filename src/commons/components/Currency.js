export default class Currency extends Phaser.GameObjects.Sprite {
  constructor({ scene }) {
    super(scene);
  }

  static preload(scene) {
    scene.load.image(
      'currency',
      `/la-voz-de-los-cuentos-games/assets/ux/curreny.png`,
    );
  }
}
