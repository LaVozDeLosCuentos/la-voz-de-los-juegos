import EventScene from '../../commons/Class/EventScene';
import StatusBar from '../../commons/components/StatusBar';
import { pathSprite } from '../../utils/sprite.utils';
import StoryGridItem from '../components/StoryGridItem';

const GAP = 20;
const MARGIN = 100;
const UX_HEADER = 70;
export default class StoryScene extends EventScene {
  constructor() {
    super({ key: 'StoryScene' });
    this.markers;
    this.levels = new Array(8)
      .fill(1)
      .map((entry, index) => ({ difficulty: index + 1 }));
  }

  preload() {
    StatusBar.preload(this);
    this.load.image('map.marker', `${pathSprite}/ux/maps/marker.png`);
    this.load.image(
      'map.marker.complete',
      `${pathSprite}/ux/maps/marker-complete.png`,
    );
  }

  create() {
    super.create();
    this._createGrid();
    this._createUX();
  }

  _createUX() {
    this.statusBar = new StatusBar({ scene: this, x: 0, y: 0 });
  }

  _createGrid() {
    const columns = 3;
    const rows = Math.ceil(this.levels.length / columns);
    const itemWidth = (this.sys.canvas.width - MARGIN) / columns;
    const itemHeight = (this.sys.canvas.height - MARGIN - UX_HEADER) / rows;
    this.markers = new Array(this.levels.length).fill(1).map((_, i) => {
      const columnIndex = i % columns;
      const rowIndex = Math.floor(i / columns);

      const x =
        (-GAP + MARGIN) / 2 + (columnIndex + 0.5) * (itemWidth + GAP / 2);
      const y =
        UX_HEADER +
        (-GAP + MARGIN) / 2 +
        (rowIndex + 0.5) * (itemHeight + GAP / 2);

      return new StoryGridItem({
        scene: this,
        x,
        y,
        width: itemWidth,
        height: itemHeight,
      });
    });
  }
}
