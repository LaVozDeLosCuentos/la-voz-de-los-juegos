import EventHandler from '../../services/services.events';
import { centeredButton } from '../../utils/button.utils';
import { pathMedia } from '../../utils/media.utils';
import { centeredX, centeredY } from '../../utils/position.utils';
import { pathSprite } from '../../utils/sprite.utils';
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
    this.load.image('logo', `${pathSprite}/games/emparejados.png`);
    this.load.audio(
      'happy-dreamy-adventure',
      `${pathMedia}/bso/happy-dreamy-adventure.mp3`,
    );
  }
  _onClickStart() {
    EventHandler.emit('menu::start');
  }

  _addMusic() {
    this.music = this.sound.add('happy-dreamy-adventure');
    this.music.play({ loop: true, volume: 0.04 });
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
    this._addMusic();
    this.events.on('shutdown', this._onShutdown, this);
  }

  _onShutdown() {
    if (this.music) {
      this.music.destroy();
      this.music = null;
    }
  }
}
