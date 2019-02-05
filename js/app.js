var ExampleTutorial;
(function (ExampleTutorial) {
    var Global = /** @class */ (function () {
        function Global() {
        }
        Global.GAME_WIDTH = 1024;
        Global.GAME_HEIGHT = 640;
        return Global;
    }());
    ExampleTutorial.Global = Global;
})(ExampleTutorial || (ExampleTutorial = {}));
window.onload = function () {
    var config = {
        title: "Coin Runner",
        url: "https://github.com/digitsensitive/phaser3-typescript",
        version: "1.1.1",
        width: window.innerWidth,
        height: window.innerHeight,
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
                gravity: { y: 300 },
                debug: false
            }
        },
        render: { pixelArt: false, antialias: false, autoResize: false }
    };
    ExampleTutorial.Global.game = new ExampleTutorial.Game(config);
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ExampleTutorial;
(function (ExampleTutorial) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game(config) {
            return _super.call(this, config) || this;
        }
        return Game;
    }(Phaser.Game));
    ExampleTutorial.Game = Game;
})(ExampleTutorial || (ExampleTutorial = {}));
var ExampleTutorial;
(function (ExampleTutorial) {
    var Bird = /** @class */ (function (_super) {
        __extends(Bird, _super);
        function Bird(params) {
            var _this = _super.call(this, params.scene, params.x, params.y, params.key) || this;
            _this.isJump = false;
            _this.currentScene = params.scene;
            _this.currentScene.add.existing(_this);
            _this.currentScene.physics.world.enable(_this);
            _this.createAnims();
            _this.initInput();
            _this.setScale(0.6, 0.6);
            return _this;
        }
        Bird.prototype.createAnims = function () {
            this.currentScene.anims.create({
                key: "fly",
                frames: [
                    { key: 'felpudo1', frame: null },
                    { key: 'felpudo2', frame: null },
                    { key: 'felpudo3', frame: null },
                    { key: 'felpudo4', frame: null },
                ],
                frameRate: 8,
                repeat: -1
            });
        };
        Bird.prototype.initInput = function () {
            this.jump = this.currentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        };
        Bird.prototype.handleInput = function () {
            if (this.jump.isDown && !this.isJump) {
                this.body.setVelocityY(-150);
                this.isJump = true;
            }
            else if (this.jump.isUp) {
                this.isJump = false;
            }
        };
        Bird.prototype.update = function () {
            this.handleInput();
        };
        Bird.prototype.playAnimation = function (anim) {
            this.anims.play(anim);
        };
        return Bird;
    }(Phaser.GameObjects.Sprite));
    ExampleTutorial.Bird = Bird;
})(ExampleTutorial || (ExampleTutorial = {}));
var ExampleTutorial;
(function (ExampleTutorial) {
    var Coin = /** @class */ (function (_super) {
        __extends(Coin, _super);
        function Coin(params) {
            var _this = _super.call(this, params.scene, params.x, params.y, params.key) || this;
            _this.currentScene = params.scene;
            _this.currentScene.physics.world.enable(_this);
            _this.currentScene.add.existing(_this);
            return _this;
        }
        Coin.prototype.update = function () {
            this.body.setVelocityY(-300);
        };
        Coin.prototype.createNewCoin = function () {
            this.x = Phaser.Math.Between(100, 500);
            this.y = Phaser.Math.Between(100, 500);
            this.currentScene.tweens.add({
                targets: this,
                duration: 200,
                scaleX: 2,
                scaleY: 2,
                yoyo: true
            });
        };
        return Coin;
    }(Phaser.GameObjects.Image));
    ExampleTutorial.Coin = Coin;
})(ExampleTutorial || (ExampleTutorial = {}));
var ExampleTutorial;
(function (ExampleTutorial) {
    var BootScene = /** @class */ (function (_super) {
        __extends(BootScene, _super);
        function BootScene() {
            return _super.call(this, { key: "BootScene" }) || this;
        }
        BootScene.prototype.preload = function () {
            this.cameras.main.setBackgroundColor(0x98d687);
            this.createLoadingbar();
            //load bar
            this.load.on("progress", function (value) {
                this.progressBar.clear();
                this.progressBar.fillStyle(0xfff6d3, 1);
                this.progressBar.fillRect(this.cameras.main.width / 4, this.cameras.main.height / 2 - 16, (this.cameras.main.width / 2) * value, 16);
            }, this);
            // delete bar graphics, when loading complete
            this.load.on("complete", function () {
                this.progressBar.destroy();
                this.loadingBar.destroy();
            }, this);
            this.load.pack("preload", "../../assets/pack.json", "preload");
        };
        BootScene.prototype.create = function () {
        };
        BootScene.prototype.update = function () {
            this.scene.start("GameScene");
        };
        BootScene.prototype.createLoadingbar = function () {
            this.loadingBar = this.add.graphics();
            this.loadingBar.fillStyle(0x5dae47, 1);
            this.loadingBar.fillRect(this.cameras.main.width / 4 - 2, this.cameras.main.height / 2 - 18, this.cameras.main.width / 2 + 4, 20);
            this.progressBar = this.add.graphics();
        };
        return BootScene;
    }(Phaser.Scene));
    ExampleTutorial.BootScene = BootScene;
})(ExampleTutorial || (ExampleTutorial = {}));
var ExampleTutorial;
(function (ExampleTutorial) {
    var GameScene = /** @class */ (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            return _super.call(this, { key: "GameScene" }) || this;
        }
        GameScene.prototype.preload = function () {
            //load methods
        };
        GameScene.prototype.create = function () {
            this.bg = this.add.tileSprite(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, window.innerHeight, "background");
            this.style = { font: "20px Arial", fill: "#fff" };
            // this.coin = new Coin({scene: this, x: 100, y: 200, key: "coin"})
            this.bird = new ExampleTutorial.Bird({ scene: this, x: 100, y: 100, key: "felpudo1" });
            this.bird.playAnimation("fly");
        };
        GameScene.prototype.update = function (dt) {
            //update methods
            this.bird.update();
            // this.coin.update()
            this.bg._tilePosition.x += 1;
            //verify collision: coin -> bird
            // this.physics.overlap(this.bird, this.coin, this.hit, null, this)
        };
        GameScene.prototype.hit = function () {
            console.log("collisão dectada");
        };
        return GameScene;
    }(Phaser.Scene));
    ExampleTutorial.GameScene = GameScene;
})(ExampleTutorial || (ExampleTutorial = {}));
//# sourceMappingURL=app.js.map