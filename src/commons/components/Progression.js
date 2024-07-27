import { title } from '../../theme/mixins';

export default class Progression extends Phaser.GameObjects.Container {
  constructor({ scene, x, y, padding, total, current }) {
    super(scene, x, y);
    this.scene = scene;
    this.current = current;
    this.total = total;
    this.render();
    scene.add.existing(this);
    scene.time.delayedCall(0, () => {
      this.updateSize();
    });
  }

  render() {
    this.number = this.scene.add.text(
      0,
      0,
      `${this.current} / ${this.total}`,
      title,
    );

    const textBounds = this.number.getBounds();

    const centerX = (this.width - textBounds.width) / 2;
    const centerY = (this.height - textBounds.height) / 2;

    this.number.setPosition(centerX, centerY);

    this.add(this.number);
  }

  updateSize() {
    //    this.number.setPosition(-this.padding * 2, 10);
  }

  destroy() {
    super.destroy();
  }
}
