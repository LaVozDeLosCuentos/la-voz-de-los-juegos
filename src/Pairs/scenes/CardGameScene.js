import Board from '../components/Board';
import characters from '../../data/characters.json';
import EventHandler from '../../services/services.events';
import { centeredButton } from '../../utils/button.utils';
import { pathSprite } from '../../utils/sprite.utils';
import { pathMedia } from '../../utils/media.utils';
import StatusBar from '../../commons/components/StatusBar';
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

  init(data) {
    this.difficulty = data.difficulty;
    this.level = data;
  }

  preload() {
    this._loadAssets();
    this.board = new Board({
      scene: this,
      cards: this.characters,
      difficulty: this.difficulty,
    });
    StatusBar.preload(this);
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
      ...this.level,
    });
  }

  _onGameOver() {
    EventHandler.emit('board::finish', {
      success: false,
      ...this.level,
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
  }

  _onShutdown() {
    if (this.music) {
      this.music.destroy();
      this.music = null;
    }
  }
}
