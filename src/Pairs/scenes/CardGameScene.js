import Board from '../components/Board';
import characters from '../../data/characters.json';
import EventHandler from '../../services/services.events';
import { centeredButton } from '../../utils/button.utils';
import Life from '../../commons/components/Life';
import { pathSprite } from '../../utils/sprite.utils';
import { pathMedia } from '../../utils/media.utils';

const MAX_ATTEMPTS = 6;
export default class CardGameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'CardGameScene',
    });
    this.board;
    this.characters = characters;
    this.life;
    this.music;
    this.effects = {};
  }

  init() {}
  preload() {
    this._loadAssets();
    this.board = new Board({
      scene: this,
      cards: this.characters,
    });
    Life.preload(this);
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
    this.life = new Life({ scene: this, attempts: MAX_ATTEMPTS });
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
    this.board.create();
    this._createUX();
    this.life.create();
    this._addListeners();
    this.events.on('shutdown', this._onShutdown, this);
    this._addMusic();
  }

  _onShutdown() {
    EventHandler.off('board::attempt');
    EventHandler.off('board::success');
    EventHandler.off('board::fail');
    EventHandler.off('board::match');
    EventHandler.off('life::dead');
    if (this.life) {
      this.life.destroy();
      this.life = null;
    }
    if (this.music) {
      this.music.destroy();
      this.music = null;
    }
  }
}
