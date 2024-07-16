import EventHandler from "../../services/services.events";
import { centeredButton } from "../../utils/button.utils";

export default class EndScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'EndScene'
        });
        this.success
    }
    init ({success}) {
        this.success = success
    }

    _onClickRestart() {
        EventHandler.emit('end::restart');
    }

    create() {
        centeredButton({
            scene: this,
            text: `${this.success} Restart?`,
            callback: this._onClickRestart
        })
    }
}