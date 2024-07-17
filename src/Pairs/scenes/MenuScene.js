import EventHandler from '../../services/services.events';
import { centeredButton } from '../../utils/button.utils';
import { centeredX, centeredY } from '../../utils/position.utils';
export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'MenuScene',
    });
  }
  preload() {
    this._loadAssets();
  }

  _loadAssets() {
    this.load.image('logo', `../assets/games/emparejados.png`);
  }
  _onClickStart() {
    EventHandler.emit('menu::start');
  }

  create() {
    centeredButton({
      scene: this,
      text: 'Iniciar',
      y: centeredY(this) + 100,
      callback: this._onClickStart,
    });
    this.image = this.add.sprite(
      centeredX(this),
      centeredY(this) - 100,
      'logo',
    );
    this.image.setDisplaySize(300, 300);
  }
}
