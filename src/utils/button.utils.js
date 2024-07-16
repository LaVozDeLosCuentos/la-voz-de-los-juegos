import { title } from "../theme/mixins";
import { centeredOrigin, centeredX, centeredY } from "./position.utils";

export const centeredButton = ({scene, text, callback = () => {}, x, y, style}) => {
    const _x = x || centeredX(scene)
    const _y = y || centeredY(scene)
    const _style = style || title

    const button = scene.add
        .text(_x, _y, text, _style)
        .setOrigin(centeredOrigin);
    button.setInteractive();
    button.on('pointerover', callback);
}