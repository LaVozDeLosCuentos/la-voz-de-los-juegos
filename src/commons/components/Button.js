import EventHandler from '../../services/services.events';
import { colors } from '../../theme';
import { button } from '../../theme/mixins';

class Button extends Phaser.GameObjects.Container {
  constructor({ scene, x, y, cta, color, width, style, event }) {
    super(scene, x, y);

    this.event = event;
    const height = 50;
    const _color = color || colors.text.secondary;
    const _style = style || button;

    const graphics = scene.add.graphics();
    const hexColor = Phaser.Display.Color.HexStringToColor(_color).color;
    graphics.fillStyle(hexColor);
    graphics.fillRoundedRect(x - width / 2, y - height / 2, width, height, 20);

    const buttonComponent = scene.add
      .zone(x, y, width, height)
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', this._onClick.bind(this));

    const buttonText = scene.add.text(x, y, cta, _style).setOrigin(0.5);

    scene.add.container(0, 0, [graphics, buttonComponent, buttonText]);
    scene.add.existing(this);
  }

  _onClick() {
    EventHandler.emit(this.event);
  }
}

export default Button;
