import { pathSprite } from '../../utils/sprite.utils';
import EventScene from '../../commons/Class/EventScene';

export default class MapScene extends EventScene {
  constructor() {
    super({ key: 'MapScene' });
  }

  preload() {
    this.load.image('map', `${pathSprite}/maps/map.png`); // Fondo del mapa
    this.load.spritesheet('player', `${pathSprite}/sprites/player.png`, {
      frameWidth: 32, // Ancho del sprite
      frameHeight: 32, // Alto del sprite
    });
    this.load.image('map.marker', `${pathSprite}/ux/maps/marker.png`);
    this.load.image(
      'map.marker.complete',
      `${pathSprite}/ux/maps/marker-complete.png`,
    );
  }

  create() {
    super.create();

    this.add.image(0, 0, 'map').setOrigin(0, 0);

    this.player = this.add
      .sprite(100, 100, 'player')
      .setOrigin(0, 0)
      .setScale(1);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.level1 = this.add.sprite(200, 150, 'level1').setInteractive();
    this.level2 = this.add.sprite(400, 300, 'level2').setInteractive();

    this.level1.on('pointerdown', () => this.startLevel('Level1Scene'));
    this.level2.on('pointerdown', () => this.startLevel('Level2Scene'));
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.x -= 4;
    }
    if (this.cursors.right.isDown) {
      this.player.x += 4;
    }
    if (this.cursors.up.isDown) {
      this.player.y -= 4;
    }
    if (this.cursors.down.isDown) {
      this.player.y += 4;
    }
  }

  startLevel(levelKey) {
    this.scene.start(levelKey);
  }
}
