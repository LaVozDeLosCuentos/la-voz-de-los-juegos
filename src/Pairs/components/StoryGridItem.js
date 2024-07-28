import EventHandler from '../../services/services.events';

export default class StoryGridItem extends Phaser.GameObjects.Container {
  constructor({ scene, x, y, width, height, level }) {
    super(scene, x, y);

    this.scene = scene;
    this.state = level.state;
    this.level = level;
    this.width = width;
    this.height = height;

    this.image = this.scene.add.image(0, 0, level.state);
    this.image.setOrigin(0.5);

    this._scale();

    this.add(this.image)
      .setInteractive()
      .on('pointerdown', this._onClick.bind(this));
    this.scene.add.existing(this);
  }

  _onClick() {
    if (!this.state.includes('block')) {
      EventHandler.emit('level::next', this.level);
    }
  }

  _scaleWithHeight() {
    this.image.displayHeight = this.height;
    this.gap = this.width - this.height;
    this.image.displayWidth = this.height;
  }

  _scaleWithWidth() {
    this.image.displayWidth = this.width;
    this.gap = this.height - this.width;
    this.image.displayHeight = this.width;
  }

  _scale() {
    if (this.width > this.height) {
      this._scaleWithHeight();
    } else {
      this._scaleWithWidth();
    }
  }
}
