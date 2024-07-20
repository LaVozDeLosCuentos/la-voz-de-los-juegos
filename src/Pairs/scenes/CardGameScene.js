import Board from '../components/Board';
import characters from '../../data/characters.json';
import EventHandler from '../../services/services.events';
import { centeredButton } from '../../utils/button.utils';
import Currency from '../../commons/components/Currency';
import { pathSprite } from '../../utils/sprite.utils';
import { pathMedia } from '../../utils/media.utils';
import StatusBar from '../../commons/components/StatusBar';
import Life from '../../commons/components/Life';
import EventScene from '../../commons/Class/EventScene';

export default class CardGameScene extends EventScene {
  constructor() {
    super({
      key: 'CardGameScene',
    });
    this.board;
    this.characters = characters;
    this.music;
    this.effects = {};
    this.currency;
  }

  init() {}
  preload() {
    this._loadAssets();
    this.board = new Board({
      scene: this,
      cards: this.characters,
    });
    Life.preload(this);
    Currency.preload(this);
  }

  _loadAssets() {
    characters.map((entry) => {
      this.load.image(`card-${entry.name}`, entry.img);
    });
    this.load.image('back-card', `${pathSprite}/cards/back-card.png`);
    this.load.audio(
      'dreamy-adventure',
      `${pathMedia}/bso/dreamy-adventure.mp3`,
    );
    this.load.audio('media.effect.fail', `${pathMedia}/effects/fail.mp3`);
    this.load.audio('media.effect.flip', `${pathMedia}/effects/flip.mp3`);
    this.load.audio('media.effect.success', `${pathMedia}/effects/success.mp3`);
  }

  _createRestartDebugButton() {
    centeredButton({
      scene: this,
      text: `Restart`,
      callback: this._forceRestart.bind(this),
    });
  }

  _createUX() {
    this.statusBar = new StatusBar({ scene: this, x: 0, y: 0, hasLife: true });
  }

  _onSuccessGame() {
    EventHandler.emit('board::finish', {
      success: true,
    });
  }

  _onGameOver() {
    EventHandler.emit('board::finish', {
      success: false,
    });
  }
  _failSound() {
    if (!this.effects.fail) {
      this.effects.fail = this.sound.add('media.effect.fail');
    }
    this.effects.fail.play({});
  }
  _successSound() {
    this.effects.success = this.sound.add('media.effect.success');
    this.effects.success.play({});
  }
  _onFailGame() {
    this._failSound();
    EventHandler.emit('life::lost');
  }

  _onMatch() {
    this._successSound();
  }
  _onAttempt() {}

  _addListeners() {
    EventHandler.on('board::attempt', this._onAttempt, this);
    EventHandler.on('board::success', this._onSuccessGame, this);
    EventHandler.on('board::fail', this._onFailGame, this);
    EventHandler.on('board::match', this._onMatch, this);
    EventHandler.on('life::dead', this._onGameOver, this);
  }

  _forceRestart() {
    this._onFailGame();
  }

  _addMusic() {
    this.music = this.sound.add('dreamy-adventure');
    this.music.play({ loop: true, volume: 0.03 });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.music.setMute(true);
    } else {
      this.music.setMute(false);
    }
  }

  create() {
    super.create();
    this.board.create();
    this._createUX();

    this._addListeners();
    this.events.on('shutdown', this._onShutdown, this);
    this._addMusic();
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
      this._onFailGame();
    }
  }

  _onShutdown() {
    if (this.music) {
      this.music.destroy();
      this.music = null;
    }
  }
}
