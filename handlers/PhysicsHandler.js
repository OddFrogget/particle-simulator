class PhysicsHandler {
    gameHandler;
    particlesHandler;

    constructor(gameHandler, particlesHandler) {
        this.gameHandler = gameHandler;
        this.particlesHandler = particlesHandler;
    }

    async particleGravity() {
        const debugConfig = await debugHandler.loadDebugConfig();

        const rect = this.particlesHandler.gameCanvas.getBoundingClientRect();
        const canvasHeight = Math.floor(
            (debugConfig.canvasSize - rect.top) *
            (this.particlesHandler.gameCanvas.height / rect.height)
        );

        const gravity = this.gameHandler.baseGravity;
        const gravityDirection = Math.sign(gravity);

        this.particlesHandler.activeParticles.forEach(part => {
            if (part.velocityY === undefined) {
                part.velocityY = 0;
            }

            // Aplica a aceleração gravitacional
            part.velocityY += gravity;

            // Calcula a nova posição potencial
            const nextY = part.y + part.velocityY;

            // Define limite inicial baseado na direção da gravidade
            let stackedY = (gravityDirection > 0) ? canvasHeight + 9 : -1;

            // Verifica colisão com outras partículas na mesma coluna
            this.particlesHandler.activeParticles.forEach(other => {
                if (other === part) return;

                if (other.x === part.x) {
                    if (gravityDirection > 0 && other.y > part.y) {
                        stackedY = Math.min(stackedY, other.y);
                    }
                    if (gravityDirection < 0 && other.y < part.y) {
                        stackedY = Math.max(stackedY, other.y);
                    }
                }
            });

            // Aplicar movimento com colisão contra chão ou teto
            if (gravityDirection > 0) {
                // Gravidade para baixo
                if (nextY < stackedY - 1) {
                    part.y = nextY;
                } else {
                    part.y = stackedY - 1;
                    part.velocityY = 0;
                }
            } else if (gravityDirection < 0) {
                // Gravidade invertida (pra cima)
                if (nextY > stackedY + 1 && nextY > 0) {
                    part.y = nextY;
                } else {
                    part.y = Math.max(0, stackedY + 1);
                    part.velocityY = 0;
                }
            }
        });
    }
}
