const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const PARTICLESARRAY = [];
let hue = 0;

 
class Particle {
    constructor() {
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue}, 100%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) 
            this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}


function handleParticles() {
    for (let i = 0; i< PARTICLESARRAY.length; i++) {
        PARTICLESARRAY[i].update();
        PARTICLESARRAY[i].draw();

        for (let j = i; j < PARTICLESARRAY.length; j++) {
            const distX = PARTICLESARRAY[i].x - PARTICLESARRAY[j].x;
            const distY = PARTICLESARRAY[i].y - PARTICLESARRAY[j].y;
            const distance = Math.sqrt(distX * distX + distY * distY);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = PARTICLESARRAY[i].color;
                // ctx.lineWidth = PARTICLESARRAY[i].size / 10;
                ctx.lineWidth = 0.3;
                ctx.moveTo(PARTICLESARRAY[i].x, PARTICLESARRAY[i].y);
                ctx.lineTo(PARTICLESARRAY[j].x, PARTICLESARRAY[j].y);
                ctx.stroke();
            }
        }

        if (PARTICLESARRAY[i].size <= 0.3) {
            PARTICLESARRAY.splice(i, 1);
            i--;
        }
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined
};

canvas.addEventListener('click', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 12; i++)
        PARTICLESARRAY.push(new Particle());
});


canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 3; i++)
        PARTICLESARRAY.push(new Particle());
});


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue += Math.random() * 3;
    requestAnimationFrame(animate);
}


animate();