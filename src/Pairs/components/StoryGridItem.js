export default class StoryGridItem extends Phaser.GameObjects.Container {
  constructor({ scene, x, y, width, height }) {
    super(scene, x, y);

    this.scene = scene;

    this.width = width;
    this.height = height;

    this.image = this.scene.add.image(0, 0, 'map.marker');
    this.image.setOrigin(0.5);

    this._scale();

    this.add(this.image);
    this.scene.add.existing(this);
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
