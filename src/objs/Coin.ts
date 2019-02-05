namespace ExampleTutorial{
    export class Coin extends Phaser.GameObjects.Image {
        private currentScene: Phaser.Scene

        constructor(params){
            super(params.scene, params.x, params.y, params.key)

            this.currentScene = params.scene

            this.currentScene.physics.world.enable(this)
            this.currentScene.add.existing(this)
            
        }

        update(): void {
            this.body.setVelocityY(-300)
        }

        createNewCoin(): void {
            this.x = Phaser.Math.Between(100, 500)
            this.y = Phaser.Math.Between(100, 500)

            this.currentScene.tweens.add({
                targets: this,
                duration: 200,
                scaleX: 2,
                scaleY: 2, 
                yoyo: true
            })
        }


    }
}