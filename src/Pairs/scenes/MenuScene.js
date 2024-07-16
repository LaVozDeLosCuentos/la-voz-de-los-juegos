import EventHandler from "../../services/services.events";
import { centeredButton } from "../../utils/button.utils";
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
        centeredButton({
            scene: this,
            text: 'Iniciar',
            callback: this._onClickStart
        })
    }
}