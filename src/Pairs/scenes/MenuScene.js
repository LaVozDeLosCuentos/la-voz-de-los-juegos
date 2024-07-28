import EventScene from '../../commons/Class/EventScene';
import EventHandler from '../../services/services.events';
import { pathMedia } from '../../utils/media.utils';
import { centeredX, centeredY } from '../../utils/position.utils';
import { pathSprite } from '../../utils/sprite.utils';
import NavigationMenu from '../components/NavigationMenu';

export default class MenuScene extends EventScene {
  constructor() {
    super({ key: 'MenuScene' });
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
    this.load.audio('media.effect.button', `${pathMedia}/effects/button.mp3`);
  }

  _onClickStart() {
    this.sound.add('media.effect.button').play();
    EventHandler.emit('menu::start');
  }

  _addMusic() {
    this.music = this.sound.add('happy-dreamy-adventure');
    this.music.play({ loop: true, volume: 0.04 });
  }

  _addLogo() {
    this.image = this.add.sprite(
      centeredX(this),
      centeredY(this) - 100,
      'logo',
    );
    this.image.setDisplaySize(300, 300);
  }

  _addButton() {
    this.navigationMenu = new NavigationMenu(this, 0, 500);
  }
  create() {
    super.create();

    this._addLogo();
    this._addButton();
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
