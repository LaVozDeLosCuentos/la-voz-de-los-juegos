import EventHandler from "../../services/services.events";

export default class EndScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'EndScene'
        });
    }

    _onClickRestart() {
        EventHandler.emit('end::restart');

    }

    create() {
        const start = this.add.text(100, 100, 'restart', { fill: '#0f0' });
        start.setInteractive();
        start.on('pointerover', this._onClickRestart);
    }
}