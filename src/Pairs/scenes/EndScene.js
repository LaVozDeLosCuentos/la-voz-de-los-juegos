import EventHandler from '../../services/services.events';
import { centeredButton } from '../../utils/button.utils';
import { centeredX, centeredY } from '../../utils/position.utils';

export default class EndScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'EndScene',
    });
    this.success;
  }
  init({ success }) {
    this.success = success;
  }
  preload() {
    this._loadAssets();
  }

  _loadAssets() {
    this.load.image('complete', `../assets/ux/complete.png`);
    this.load.image('try-again', `../assets/ux/try-again.png`);
  }

  _onClickRestart() {
    EventHandler.emit('end::restart');
  }

  create() {
    centeredButton({
      scene: this,
      text: this.success ? 'Repetir' : 'Reintentar',
      y: centeredY(this) + 100,
      callback: this._onClickRestart,
    });
    this.image = this.add.sprite(
      centeredX(this),
      centeredY(this) - 100,
      this.success ? 'complete' : 'try-again',
    );
    this.image.setDisplaySize(300, 300);
  }
}
