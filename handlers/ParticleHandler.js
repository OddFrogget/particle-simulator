const debugHandler = new DebugHandler();

class ParticleHandler {
    particles;
    ctx;
    gameCanvas;
    gameHandler;

    constructor(ctx, gameCanvas, gameHandler) {
        this.activeParticles = [];
        this.gameCanvas = gameCanvas;
        this.ctx = ctx;
        this.gameHandler = gameHandler;
    }

    drawPoints() {
        this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height); // limpa a tela

        this.activeParticles.forEach((part) => {
            this.ctx.fillRect(part.x, part.y, 2, 2);
        });
    }
    
    spawnPoint(x, y, vi) {
        const type = 'sand';
        const v = vi;

        const particle = { x, y, vi, v, type };

        this.activeParticles.push(particle);
    }
}