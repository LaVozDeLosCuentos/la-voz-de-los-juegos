import Phaser from 'phaser';
import Currency from '../../commons/components/Currency';
import Life from './Life';
import { colors } from '../../theme';

class StatusBar extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    scene.add.existing(this);
    const _color = colors.text.primary;

    const padding = 25;
    const graphics = scene.add.graphics();
    const hexColor = Phaser.Display.Color.HexStringToColor(_color).color;
    graphics.fillStyle(hexColor, 0.3);
    graphics.fillRect(0, 0, scene.cameras.main.displayWidth, 50);
    this.add(graphics);

    const currency = new Currency({
      scene,
      x: 0,
      y: 0,
    });

    scene.time.delayedCall(1, () => {
      const currencyWidth = currency.displayWidth;
      const xPosition =
        scene.cameras.main.displayWidth - currencyWidth - padding * 2;

      currency.setPosition(xPosition, 0);
      this.add(currency);
    });

    const life = new Life({ scene, x: padding, y: 0, attempts: 6 });
    this.add(life);
  }

  toggleVisibility() {
    this.setVisible(!this.visible);
  }
}

export default StatusBar;
