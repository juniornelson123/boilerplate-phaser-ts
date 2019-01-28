namespace ExampleTutorial {
    export class Global {
        static game: Phaser.Game

        static GAME_WIDTH: number = 1024
        static GAME_HEIGHT: number = 640
    }
}

window.onload = function(){
    const config: GameConfig = {
        title: "Coin Runner",
        url: "https://github.com/digitsensitive/phaser3-typescript",
        version: "1.1.1",
        width: 768,
        height: 576,
        type: Phaser.AUTO,
        parent: "game",
        scene: [ExampleTutorial.BootScene, ExampleTutorial.GameScene],
        input: {
            keyboard: true
        },
        backgroundColor: "#3A99D9",
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        render: { pixelArt: false, antialias: false, autoResize: false }
    }

    ExampleTutorial.Global.game = new ExampleTutorial.Game(config)
}