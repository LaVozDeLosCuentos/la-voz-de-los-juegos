import EventHandler from "../../services/services.events";

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'MenuScene'
        });
    }

    _onClickStart() {
        EventHandler.emit('menu::start');

    }

    create() {
        const start = this.add.text(100, 100, 'start', { fill: '#0f0' });
        start.setInteractive();
        start.on('pointerover', this._onClickStart);

    }
}