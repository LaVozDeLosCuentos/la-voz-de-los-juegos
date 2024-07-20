import EventScene from '../../commons/Class/EventScene';
import { pathSprite } from '../../utils/sprite.utils';
import StoryGridItem from '../components/StoryGridItem';

export default class StoryScene extends EventScene {
  constructor() {
    super({ key: 'StoryScene' });
    this.markers;
    this.levels = [
      {
        difficulty: 1,
      },
      {
        difficulty: 2,
      },
    ];
  }

  preload() {
    this.load.image('map.marker', `${pathSprite}/ux/maps/marker.png`);
    this.load.image(
      'map.marker.complete',
      `${pathSprite}/ux/maps/marker-complete.png`,
    );
  }

  create() {
    super.create();
    this.createGrid();
  }

  createGrid() {
    const columns = 3;

    const itemWidth = this.sys.canvas.width / columns;
    const itemHeight = 50;

    this.markers = new Array(this.levels.length).fill(1).map((_, i) => {
      const columnIndex = i % columns;
      const rowIndex = Math.floor(i / columns);

      const x = (columnIndex + 0.5) * itemWidth;
      const y = (rowIndex + 0.5) * itemHeight + 50;

      return new StoryGridItem(this, x, y);
    });
  }
}
