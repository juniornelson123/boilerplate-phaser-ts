namespace ExampleTutorial{
    export class Bird extends Phaser.GameObjects.Sprite{
        private currentScene: Phaser.Scene;
        private jump: Phaser.Input.Keyboard.Key
        private isJump: boolean = false
        constructor(params){
            super(params.scene, params.x, params.y, params.key)
            
            this.currentScene = params.scene

            
            this.currentScene.add.existing(this)
            this.currentScene.physics.world.enable(this)
            this.createAnims()
            this.initInput()
            this.setScale(0.6, 0.6)
        }

        private createAnims(): void {
            this.currentScene.anims.create({
                key: "fly",
                frames: [
                    {key: 'felpudo1', frame: null},
                    {key: 'felpudo2', frame: null},
                    {key: 'felpudo3', frame: null},
                    {key: 'felpudo4', frame: null},
                ],
                frameRate: 8,
                repeat: -1
            })

        }

        private initInput(): void {
            this.jump = this.currentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        }

        private handleInput(): void{
            if(this.jump.isDown && !this.isJump){
                this.body.setVelocityY(-150)
                this.isJump = true
            }else if(this.jump.isUp){
                this.isJump = false
            }
        }

        update(): void {
            this.handleInput()
        }

        playAnimation(anim: string): void {
            this.anims.play(anim)
        }

    }
}