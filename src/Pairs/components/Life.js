import EventHandler from "../../services/services.events";

export default class Life extends Phaser.GameObjects.Sprite {
    constructor({ scene, attempts }) {
        super(scene)
        this.scene = scene
        this.attempts = attempts
  
    }

    static preload(scene) {
        scene.load.image('heart-full', `assets/ux/hearts/full.png`);
        scene.load.image('heart-empty', `assets/ux/hearts/empty.png`);
        scene.load.image('heart-half', `assets/ux/hearts/half.png`);
    }


    addListeners() {
        console.log('addListener')
        EventHandler.on('life::lost', this._lostLife, this)
    }
    getLifes() {            
        return new Array(this.attempts / 2).fill(1).map((_, index) => { return this._addHeart(index)})
    }

    _addHeart(index) {
        const heart = this.scene.add.sprite(30 * (index + 1), 25, 'heart-full');
        heart.displayWidth = 25;
        heart.scaleY = heart.scaleX;
        return { heart, hits: 2, index }
    }

    _checkLife() {
        if(!this.lifes.find(heart => {
            return heart.hits > 0
        })) {
            EventHandler.emit('life::dead')
        }
    }
    

    _lostLife() {
        const heart = this.lifes.findLast(heart => {
            return heart.hits > 0
        })
        console.log({heart})
        const _life = this.lifes[heart.index]
        _life.hits -= 1
        this.scene.tweens.add({
            targets: _life.heart,
            props: {
                scaleX: { value: 0, duration: 300, yoyo: true },
                texture: { value: _life.hits ? 'heart-half' : 'heart-empty', duration: 300 }
            },
            ease: 'Linear'
        });
        this.lifes[heart.index] = _life
        this._checkLife()
    }

    create() {
        this.lifes = this.getLifes()
        this.addListeners()
    }

    destroy() {
        EventHandler.off('life::lost')
        const _lifes = this.lifes.map((heart) => {
            heart.hits = 2
            return heart
        })
        this.lifes = _lifes 
        super.destroy();
    }

}
