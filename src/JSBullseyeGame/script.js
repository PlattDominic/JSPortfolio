window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    ctx.fillStyle = 'white';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';

    class Player {
        constructor(game) {
            this.game = game;
            this.collisionX = this.game.width * 0.5;
            this.collisionY = this.game.height * 0.5;
            this.collisionRadius = 30;
        }

        draw(context) {
            context.beginPath();
            context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
            // the save function saves a snapchat of current canvas
            context.save();
            context.globalAlpha = 0.5;
            context.fill();
            // The restore function then restores the snapchat the was taken
            context.restore();
            context.stroke();
        }
    }

    class Game {
        constructor(canvas) {
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;

            this.player = new Player(this);
            this.mouse = {
                x: this.width * 0.5,
                y: this.height * 0.5,
                pressed: false
            }

            this.canvas.addEventListener('mousedown', e => {
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                console.log(this.mouse.x);
                console.log(e.offsetX, e.offsetY);
            })
        }

        render(context) {
            this.player.draw(context);
        }
    }

    const game = new Game(canvas);
    game.render(ctx);

    function animate() {

    }
});