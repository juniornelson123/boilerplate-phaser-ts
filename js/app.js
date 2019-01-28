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
    var Coin = /** @class */ (function (_super) {
        __extends(Coin, _super);
        function Coin(params) {
            var _this = _super.call(this, params.scene, params.x, params.y, params.key) || this;
            _this.currentScene = params.scene;
            _this.currentScene.physics.world.enable(_this);
            _this.currentScene.add.existing(_this);
            return _this;
        }
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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player(params) {
            var _this = _super.call(this, params.scene, params.x, params.y, params.key) || this;
            _this.speed = 5;
            console.log(_this);
            _this.currentScene = params.scene;
            //carregar inputs loadInputs
            _this.loadInputs();
            params.scene.physics.world.enable(_this);
            return _this;
            // this.body.setGravityY(1000);
            // this.currentScene.add.existing(this)
            //adicionar fisica ao corpo
            // this.currentScene.physics.world.enable(this)
        }
        Player.prototype.update = function () {
            this.handleInputs();
        };
        Player.prototype.loadInputs = function () {
            this.rightKey = this.currentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            this.leftKey = this.currentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            this.upKey = this.currentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
            this.downKey = this.currentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        };
        Player.prototype.handleInputs = function () {
            if (this.rightKey.isDown) {
                this.x += this.speed;
            }
            if (this.leftKey.isDown) {
                this.x -= this.speed;
            }
            if (this.upKey.isDown) {
                this.y -= this.speed;
            }
            if (this.downKey.isDown) {
                this.y += this.speed;
            }
        };
        return Player;
    }(Phaser.Physics.Arcade.Image));
    ExampleTutorial.Player = Player;
})(ExampleTutorial || (ExampleTutorial = {}));
var ExampleTutorial;
(function (ExampleTutorial) {
    var SpritePlayer = /** @class */ (function (_super) {
        __extends(SpritePlayer, _super);
        function SpritePlayer(params) {
            var _this = _super.call(this, params.scene, params.x, params.y, params.key, params.frame) || this;
            _this.currentScene = params.scene;
            _this.currentScene.physics.world.enable(_this);
            _this.currentScene.add.existing(_this);
            _this.currentScene.anims.create({
                key: "turn",
                frames: [{ key: "sprite", frame: 0 }],
                frameRate: 10
            });
            _this.currentScene.anims.create({
                key: "run",
                frames: _this.currentScene.anims.generateFrameNumbers("sprite", { start: 10, end: 14 }),
                frameRate: 10
            });
            _this.loadInputs();
            return _this;
        }
        SpritePlayer.prototype.loadInputs = function () {
            this.rightKey = this.currentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            this.leftKey = this.currentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            this.upKey = this.currentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
            this.downKey = this.currentScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        };
        SpritePlayer.prototype.update = function () {
            this.handleInputs();
        };
        SpritePlayer.prototype.handleInputs = function () {
            if (this.rightKey.isDown || this.leftKey.isDown || this.upKey.isDown || this.downKey.isDown) {
                if (this.rightKey.isDown) {
                    this.anims.play("run", true);
                    this.x += 5;
                    this.setScale(1, 1);
                }
                if (this.leftKey.isDown) {
                    this.anims.play("run", true);
                    this.x -= 5;
                    this.setScale(-1, 1);
                    console.log(this);
                }
                if (this.upKey.isDown) {
                    this.y -= 5;
                }
                if (this.downKey.isDown) {
                    this.y += 5;
                }
            }
            else {
                this.anims.play('turn');
            }
        };
        return SpritePlayer;
    }(Phaser.GameObjects.Sprite));
    ExampleTutorial.SpritePlayer = SpritePlayer;
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
        };
        GameScene.prototype.create = function () {
            this.player = new ExampleTutorial.Player({ scene: this, x: 100, y: 100, key: "player" });
            this.coin = new ExampleTutorial.Coin({ scene: this, x: 500, y: 200, key: "coin" });
            this.spritePlayer = new ExampleTutorial.SpritePlayer({ scene: this, x: 200, y: 200, key: "sprite", frame: 1 });
            this.score = 0;
            this.style = { font: "20px Arial", fill: "#fff" };
            this.scoreText = this.add.text(20, 20, "score: " + this.score, this.style);
            this.physics.add.collider(this.player, this.coin);
        };
        GameScene.prototype.update = function (dt) {
            this.player.update();
            this.spritePlayer.update();
            this.physics.overlap(this.player, this.coin, this.hit, null, this);
        };
        GameScene.prototype.hit = function () {
            this.coin.createNewCoin();
            this.score += 1;
            this.scoreText.setText("score: " + this.score);
            this.tweens.add({
                targets: this.player,
                duration: 200,
                scaleX: 2,
                scaleY: 2,
                yoyo: true
            });
        };
        return GameScene;
    }(Phaser.Scene));
    ExampleTutorial.GameScene = GameScene;
})(ExampleTutorial || (ExampleTutorial = {}));
//# sourceMappingURL=app.js.map