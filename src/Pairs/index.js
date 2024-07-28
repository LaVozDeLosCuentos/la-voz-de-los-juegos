import Phaser from 'phaser';
import CardGameScene from './scenes/CardGameScene';
import MenuScene from './scenes/MenuScene';

import EndScene from './scenes/EndScene';
import { colors } from '../theme/index';
import SceneEventHandler from '../services/services.sceneEvents';
import EventHandler from '../services/services.events';
import StoryScene from './scenes/StoryScene';
import PairsSave from './saves/pairs.save';

const { AUTO, Scale } = Phaser;

class Game extends Phaser.Game {
  constructor() {
    var config = {
      type: AUTO,
      parent: 'game-container',
      scale: {
        mode: Scale.RESIZE,
        width: window.innerWidth * window.devicePixelRatio,
        autoCenter: Scale.CENTER_BOTH,
        height: window.innerHeight * window.devicePixelRatio,
      },
      backgroundColor: colors.background,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 },
        },
      },
      scene: [MenuScene, CardGameScene, EndScene, StoryScene],
    };
    super(config);
    SceneEventHandler.on('scene::create', this._onSceneCreate, this);
    SceneEventHandler.on('scene::shutdown', this._onSceneShutdown, this);
    this._addListeners();
    this.init();
  }

  _onCompleteLevel(data) {
    if (data.number) {
      PairsSave.saveLevel(data.number + 1);
    }
  }
  _onRestart(data) {
    EventHandler.emit('game::restart');
    this.scene.stop('EndScene');
    if (data.success && data.isStory) {
      this._onStory();
      return;
    }
    this.scene.start('CardGameScene', {
      difficulty: data?.difficulty || 4,
      isStory: data?.isStory,
    });
  }

  _onClassic() {
    this.scene.stop('MenuScene');
    this.scene.start('CardGameScene', { difficulty: 4 });
  }

  _onStory() {
    this.scene.stop('MenuScene');
    this.scene.start('StoryScene');
  }

  _onStoryLevel(data) {
    this.scene.stop('StoryScene');
    this.scene.start('CardGameScene', { ...data, isStory: true });
  }

  _onEnd(params) {
    this._onCompleteLevel(params);

    this.scene.stop('CardGameScene');
    this.scene.start('EndScene', params);
  }

  _onGoToMenu() {
    this.scene.stop('EndScene');
    this.scene.start('MenuScene');
  }

  _addListeners() {
    EventHandler.on('menu::classic', this._onClassic, this);
    EventHandler.on('menu::story', this._onStory, this);
    EventHandler.on('end::restart', this._onRestart, this);
    EventHandler.on('board::finish', this._onEnd, this);
    EventHandler.on('level::next', this._onStoryLevel, this);
    EventHandler.on('end::back', this._onGoToMenu, this);
  }

  init() {
    //setTimeout(() => this._onStory(), 100);
  }
  _onSceneCreate() {
    this._addListeners();
  }

  _onSceneShutdown() {
    this._addListeners();
  }
}

export default Game;
