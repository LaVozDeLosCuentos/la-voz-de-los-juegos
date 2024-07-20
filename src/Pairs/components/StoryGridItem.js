export default class StoryGridItem extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.scene = scene;

    this.image = this.scene.add.image(0, 0, 'itemImage');
    this.image.setOrigin(0.5);

    this.add(this.image);

    this.scene.add.existing(this);
  }
}
