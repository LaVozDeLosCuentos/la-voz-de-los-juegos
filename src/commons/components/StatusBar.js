import Phaser from 'phaser';
import Currency from '../../commons/components/Currency';
import Life from './Life';
import { colors } from '../../theme';

class StatusBar extends Phaser.GameObjects.Container {
  constructor({ scene, x, y, hasLife = true }) {
    super(scene, x, y);

    this.scene = scene;
    this.scene.add.existing(this);
    const _color = colors.text.primary;

    const padding = 25;
    const graphics = scene.add.graphics();
    const hexColor = Phaser.Display.Color.HexStringToColor(_color).color;
    graphics.fillStyle(hexColor, 0.3);
    graphics.fillRect(0, 0, scene.cameras.main.displayWidth, 50);
    this.add(graphics);

    const currency = new Currency({
      scene: this.scene,
      x: 0,
      y: 0,
    });

    this.scene.time.delayedCall(1, () => {
      const currencyWidth = currency.displayWidth;
      const xPosition =
        this.scene.cameras.main.displayWidth - currencyWidth - padding * 2;

      currency.setPosition(xPosition, 0);
      this.add(currency);
    });

    if (hasLife) {
      const life = new Life({
        scene: this.scene,
        x: padding,
        y: 0,
        attempts: 2,
      });
      this.add(life);
    }
  }

  static preload(scene) {
    Life.preload(scene);
    Currency.preload(scene);
  }

  toggleVisibility() {
    this.setVisible(!this.visible);
  }
}

export default StatusBar;
