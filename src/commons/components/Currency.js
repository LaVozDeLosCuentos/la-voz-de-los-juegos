import { colors } from '../../theme';
import { title } from '../../theme/mixins';
import { pathSprite } from '../../utils/sprite.utils';

export default class Currency extends Phaser.GameObjects.Container {
  constructor({ scene, x, y }) {
    super(scene, x, y);
    this.amount = 0;
    scene.add.existing(this);

    this.padding = 5;
    this.borderRadius = 10;

    this.background = scene.add.graphics();
    this.add(this.background);

    this.number = scene.add.text(0, 10, this.amount, title);
    this.number.setOrigin(0);
    this.add(this.number);

    this.image = scene.add.sprite(
      this.number.width + this.padding,
      7,
      'currency',
    );
    this.image.setDisplaySize(30, 30);
    this.image.setOrigin(0);
    this.add(this.image);

    scene.time.delayedCall(0, () => {
      this.updateSize();
    });
  }

  static preload(scene) {
    scene.load.image('currency', `${pathSprite}/ux/feathers.png`);
  }

  updateCurrency(newAmount) {
    this.number.setText(newAmount);
    this.updatePosition();
    this.updateSize();
  }

  updatePosition() {
    this.image.setX(this.number.width + this.padding);
  }

  updateSize() {
    const width = this.number.width + 25 + this.padding;
    const height = Math.max(30);

    this.setSize(width, height);

    const hexColor = Phaser.Display.Color.HexStringToColor(colors.white).color;
    this.background.clear();
    this.background.fillStyle(hexColor, 0.8); // Color de fondo, cambia según sea necesario
    this.background.fillRoundedRect(
      -this.padding * 2,
      10,
      width + this.padding * 4,
      height,
      this.borderRadius,
    );
  }
}
