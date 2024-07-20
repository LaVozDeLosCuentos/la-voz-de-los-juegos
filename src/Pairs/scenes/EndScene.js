import StatusBar from '../../commons/components/StatusBar';
import EventHandler from '../../services/services.events';
import { centeredButton } from '../../utils/button.utils';
import { centeredX, centeredY } from '../../utils/position.utils';
import { pathSprite } from '../../utils/sprite.utils';
import Currency from '../../commons/components/Currency'; // Importar Currency
import EventScene from '../../commons/Class/EventScene';

export default class EndScene extends EventScene {
  constructor() {
    super({ key: 'EndScene' });
    this.success = false;
  }

  init({ success }) {
    this.success = success;
  }

  preload() {
    // Preload assets necesarios para EndScene
    this._loadAssets();
    // Asegurarse de que Currency también precargue sus assets
    Currency.preload(this);
  }

  _loadAssets() {
    this.load.image('complete', `${pathSprite}/ux/complete.png`);
    this.load.image('try-again', `${pathSprite}/ux/try-again.png`);
  }

  _createUX() {
    this.statusBar = new StatusBar({ scene: this, x: 0, y: 0, hasLife: false });
  }

  _onClickRestart() {
    EventHandler.emit('end::restart');
  }

  _onSuccess() {
    this._drawButton('Repetir');
    this._drawFinishImage('complete');
    // Emisión de evento después de un pequeño retraso
    setTimeout(() => EventHandler.emit('currency::gain', { amount: 3 }), 1000);
  }

  _onFail() {
    this._drawButton('Reintentar');
    this._drawFinishImage('try-again');
  }

  _drawButton(text) {
    centeredButton({
      scene: this,
      text,
      y: centeredY(this) + 100,
      callback: this._onClickRestart.bind(this),
    });
  }

  _drawFinishImage(sprite) {
    this.image = this.add.sprite(
      centeredX(this),
      centeredY(this) - 100,
      sprite,
    );
    this.image.setDisplaySize(300, 300);
  }

  create() {
    super.create();

    this.events.on('shutdown', this._onShutdown, this);
    this._createUX();
    if (this.success) {
      this._onSuccess();
    } else {
      this._onFail();
    }
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
    this.backSpaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.L,
    );
  }

  update() {
    if (this.spaceKey.isDown) {
      EventHandler.emit('currency::gain', { amount: 4 });
    }
    if (this.backSpaceKey.isDown) {
      EventHandler.emit('currency::loss', { amount: 4 });
    }
  }
  _onShutdown() {
    if (this.music) {
      this.music.destroy();
      this.music = null;
    }
  }
}
