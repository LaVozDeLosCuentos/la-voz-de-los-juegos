import Button from '../../commons/components/Button.js';
import { centeredX, centeredY } from '../../utils/position.utils.js';

class NavigationMenu extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;

    this.scene.add.existing(this);

    let currentY = centeredY(scene) + 85;
    let currentX = centeredX(scene);
    const gap = 8;
    const buttons = [
      {
        event: 'menu::story',
        cta: 'Historia',
      },
      {
        event: 'menu::classic',
        cta: 'Clásico',
      },
    ];

    const buttonHeight = 50;
    const buttonWidth = 200;
    buttons.forEach(({ cta, event }) => {
      let button = new Button({
        scene: this.scene,
        x: currentX,
        y: currentY,
        height: buttonHeight,
        width: buttonWidth,
        cta,
        event,
      });
      currentY += buttonHeight + gap;
      this.add(button);
    });
  }
}

export default NavigationMenu;
