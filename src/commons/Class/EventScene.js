import EventHandler from '../../services/services.events';
import SceneEventHandler from '../../services/services.sceneEvents';

export default class EventScene extends Phaser.Scene {
  constructor({ key }) {
    super({ key });
    this.key = key;
  }

  create() {
    this.events.on('shutdown', () => {
      EventHandler.removeAllListeners();
      SceneEventHandler.emit('scene::shutdown', { scene: this.key });
    });
    SceneEventHandler.emit('scene::created', { scene: this.key });
  }
}
