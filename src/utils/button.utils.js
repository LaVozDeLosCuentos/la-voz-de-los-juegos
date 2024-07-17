import { button } from '../theme/mixins';
import { centeredX, centeredY } from './position.utils';
import { colors } from '../theme';

export const centeredButton = ({
  scene,
  text,
  callback = () => {},
  x,
  y,
  style,
  color,
  height = 50,
  width = 200,
}) => {
  const _color = color || colors.text.secondary;
  const _x = x || centeredX(scene);
  const _y = y || centeredY(scene);
  const _style = style || button;

  const graphics = scene.add.graphics();
  const hexColor = Phaser.Display.Color.HexStringToColor(_color).color;
  graphics.fillStyle(hexColor);
  graphics.fillRoundedRect(_x - width / 2, _y - height / 2, width, height, 20);

  const buttonComponent = scene.add
    .zone(_x, _y, width, height)
    .setOrigin(0.5)
    .setInteractive()
    .on('pointerdown', callback);

  const buttonText = scene.add.text(_x, _y, text, _style).setOrigin(0.5);

  scene.add.container(0, 0, [graphics, buttonComponent, buttonText]);
};
