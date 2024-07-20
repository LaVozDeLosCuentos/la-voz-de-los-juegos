import EventHandler from '../../services/services.events';
import SaveService from '../../services/services.save';
import { colors } from '../../theme';
import { title } from '../../theme/mixins';
import { pathSprite } from '../../utils/sprite.utils';

export default class Currency extends Phaser.GameObjects.Container {
  constructor({ scene, x, y }) {
    super(scene, x, y);

    this.scene = scene;
    this.amount = SaveService.loadCurrency(); // Carga la cantidad de moneda desde el servicio
    scene.add.existing(this);

    this.padding = 5;
    this.borderRadius = 10;

    this.background = scene.add.graphics();
    this.add(this.background);

    this.number = this.scene.add.text(0, 10, this.amount, title);
    this.number.setOrigin(0);
    this.add(this.number);

    this.image = scene.add.sprite(
      this.number.width + this.padding,
      7,
      'currency',
    );
    this.image.setDisplaySize(30, 30);
    this.image.setOrigin(0);
    this.add(this.image);

    scene.time.delayedCall(0, () => {
      this.updateSize();
    });
    this._addListeners();
  }

  static preload(scene) {
    scene.load.image('currency', `${pathSprite}/ux/feathers.png`);
  }

  _addListeners() {
    EventHandler.on('currency::gain', this._onGain.bind(this));
    EventHandler.on('currency::loss', this._onLoss.bind(this));
  }

  _onGain({ amount }) {
    this._animateAmountChange(amount);
  }

  _onLoss({ amount }) {
    this._animateAmountChange(-amount);
  }

  _animateAmountChange(amountChange) {
    const startAmount = this.amount;
    const endAmount = this.amount + amountChange;
    const duration = 500;

    this.scene.tweens.addCounter({
      from: startAmount,
      to: endAmount,
      duration: duration,
      onUpdate: (tween) => {
        this.amount = Math.floor(tween.getValue());
        this._drawAmount();
      },
      onComplete: () => {
        this.amount = endAmount;
        this._drawAmount();
        SaveService.saveCurrency(this.amount); // Guarda la nueva cantidad de moneda
      },
    });
  }

  _drawAmount() {
    this.number.setText(this.amount);
    this.updatePosition();
    this.updateSize();
  }

  updateCurrency(newAmount) {
    this.amount = newAmount;
    SaveService.saveCurrency(this.amount); // Guarda la nueva cantidad de moneda
    this._drawAmount();
  }

  updatePosition() {
    this.image.setX(this.number.width + this.padding);
  }

  updateSize() {
    const width = this.number.width + 25 + this.padding;
    const height = Math.max(30);

    this.setSize(width, height);

    const hexColor = Phaser.Display.Color.HexStringToColor(colors.white).color;
    this.background.clear();
    this.background.fillStyle(hexColor, 0.8);
    this.background.fillRoundedRect(
      -this.padding * 2,
      10,
      width + this.padding * 4,
      height,
      this.borderRadius,
    );
  }
}
