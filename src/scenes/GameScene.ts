namespace ExampleTutorial {
    export class GameScene extends Phaser.Scene {
        //create variables
        private coin: Coin
        
        private style: any
        
        constructor(){
            super({key: "GameScene"})
        }

        preload(): void {
            //load methods
        }

        create(): void {
            //create methods
            this.style = { font: "20px Arial", fill: "#fff" }

            
        }
        
        update(dt): void {
            //update methods
        }

        private hit(){
            
        }
    }
}