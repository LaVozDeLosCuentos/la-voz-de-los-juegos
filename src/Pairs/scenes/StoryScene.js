import EventScene from '../../commons/Class/EventScene';
import StatusBar from '../../commons/components/StatusBar';
import { pathSprite } from '../../utils/sprite.utils';
import StoryGridItem from '../components/StoryGridItem';
import PairsSave from '../saves/pairs.save';

const GAP = 20;
const MARGIN = 100;
const UX_HEADER = 70;
export default class StoryScene extends EventScene {
  constructor() {
    super({ key: 'StoryScene' });
    this.markers;
  }

  _getState(index) {
    if (index < this.current) return 'map.marker.complete';
    if (index === this.current) return 'map.marker.next';
    return 'map.marker.block';
  }

  preload() {
    StatusBar.preload(this);
    this.load.image(
      'map.marker.block',
      `${pathSprite}/ux/maps/marker-block.png`,
    );
    this.load.image('map.marker.next', `${pathSprite}/ux/maps/marker-next.png`);

    this.load.image(
      'map.marker.complete',
      `${pathSprite}/ux/maps/marker-complete.png`,
    );
  }

  create() {
    super.create();
    this.current = PairsSave.loadLevel(); //LOAD FROM STORE DATA

    this.levels = new Array(6).fill(1).map((entry, index) => ({
      number: index + 1,
      difficulty: index + 1,
      state: this._getState(index + 1),
    }));
    this._createGrid();
    this._createUX();
    this.events.on('shutdown', this._onShutdown, this);
  }

  _createUX() {
    this.statusBar = new StatusBar({
      scene: this,
      x: 0,
      y: 0,
      progression: {
        total: this.levels.length,
        current: this.current - 1,
      },
    });
  }

  _onShutdown() {
    this.markers.forEach((marker) => {
      marker.destroy();
    });
    this.markers = [];
  }

  _createGrid() {
    const columns = 3;
    const rows = Math.ceil(this.levels.length / columns);
    const itemWidth = (this.sys.canvas.width - MARGIN) / columns;
    const itemHeight = (this.sys.canvas.height - MARGIN - UX_HEADER) / rows;
    this.markers = this.levels.map((level, i) => {
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
        level,
        x,
        y,
        width: itemWidth,
        height: itemHeight,
      });
    });
  }
}
