const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

const fireworks = [];

function createFirework() {
  const firework = {
    x: random(100, canvas.width - 100),
    y: canvas.height,
    targetY: random(100, canvas.height / 2),
    size: 3,
    speed: random(4, 6),
    exploded: false,
    particles: []
  };
  fireworks.push(firework);
}

function updateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((fw, index) => {
    if (!fw.exploded) {
      fw.y -= fw.speed;
      ctx.beginPath();
      ctx.arc(fw.x, fw.y, fw.size, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      if (fw.y <= fw.targetY) {
        fw.exploded = true;
        for (let i = 0; i < 50; i++) {
          fw.particles.push({
            x: fw.x,
            y: fw.y,
            angle: random(0, Math.PI * 2),
            speed: random(1, 6),
            life: 100
          });
        }
      }
    } else {
      fw.particles.forEach((p) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life--;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 192, 203, ${p.life / 100})`;
        ctx.fill();
      });
      fw.particles = fw.particles.filter((p) => p.life > 0);
    }
    if (fw.exploded && fw.particles.length === 0) {
      fireworks.splice(index, 1);
    }
  });
}

setInterval(() => {
  if (fireworks.length < 5) createFirework();
}, 500);

function animate() {
  updateFireworks();
  requestAnimationFrame(animate);
}
animate();
