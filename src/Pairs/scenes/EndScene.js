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

  init(data) {
    this.success = data.success;
    this.isStory = data.isStory;
    this.difficulty = data.difficulty;
    this.number = data.number;
    console.log(data);
  }

  preload() {
    this._loadAssets();
    Currency.preload(this);
  }

  _loadAssets() {
    this.load.image(
      'complete-sticker',
      `${pathSprite}/stickers/luna/smile2.png`,
    );
    this.load.image(
      'try-again-sticker',
      `${pathSprite}/stickers/luna/sobbing.png`,
    );
    this.load.image('complete', `${pathSprite}/ux/complete.png`);
  }

  _createUX() {
    this.statusBar = new StatusBar({ scene: this, x: 0, y: 0, hasLife: false });
  }

  _onClickRestart() {
    EventHandler.emit('end::restart', {
      difficulty: this.difficulty,
      isStory: this.isStory,
      success: this.success,
      number: this.number,
    });
  }

  _onSuccess() {
    this._drawButton(this.isStory ? 'Siguiente' : 'Repetir');
    EventHandler.emit('currency::gain', { amount: 5 });
    this.sticker = this.add.sprite(
      centeredX(this),
      centeredY(this) - 200,
      'complete-sticker',
    );
    this.sticker.setDisplaySize(300, 300);

    this.image = this.add.sprite(
      centeredX(this),
      centeredY(this) - 50,
      'complete',
    );
  }

  _onFail() {
    this._drawButton('Reintentar');
    this.sticker = this.add.sprite(
      centeredX(this),
      centeredY(this) - 100,
      'try-again-sticker',
    );
    this.sticker.setDisplaySize(300, 300);
  }

  _drawButton(text) {
    centeredButton({
      scene: this,
      text,
      y: centeredY(this) + 100,
      callback: this._onClickRestart.bind(this),
    });
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
  }

  _onShutdown() {
    if (this.music) {
      this.music.destroy();
      this.music = null;
    }
  }
}
