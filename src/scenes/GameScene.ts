namespace ExampleTutorial {
    export class GameScene extends Phaser.Scene {
        //create variables
        private bird: Bird
        private coin: Coin
        private bg: any
        
        private style: any
        
        constructor(){
            super({key: "GameScene"})
        }

        preload(): void {
            //load methods
        }

        create(): void {

            this.bg = this.add.tileSprite(
                window.innerWidth/2,
                window.innerHeight/2, 
                window.innerWidth,
                window.innerHeight,
                "background"
                )
            
            this.style = { font: "20px Arial", fill: "#fff" }

            // this.coin = new Coin({scene: this, x: 100, y: 200, key: "coin"})
            this.bird = new Bird({scene: this, x: 100, y: 100, key: "felpudo1"})
            this.bird.playAnimation("fly")
            
        }
        
        update(dt): void {
            //update methods
            this.bird.update()  
            // this.coin.update()
            
            this.bg._tilePosition.x += 1
            
            
            //verify collision: coin -> bird
            // this.physics.overlap(this.bird, this.coin, this.hit, null, this)
        }

        private hit(){
            console.log("collisão dectada")
        }
    }
}