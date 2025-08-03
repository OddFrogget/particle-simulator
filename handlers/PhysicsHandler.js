class PhysicsHandler {
    gameHandler;
    particlesHandler;

    constructor(gameHandler, particlesHandler) {
        this.gameHandler = gameHandler;
        this.particlesHandler = particlesHandler;
    }

    async liquidBehaviour() {
        const debugConfig = await debugHandler.loadDebugConfig();

        const rect = this.particlesHandler.gameCanvas.getBoundingClientRect();
        const canvasHeight = Math.floor(
            (debugConfig.canvasSize - rect.top) *
            (this.particlesHandler.gameCanvas.height / rect.height)
        );

        this.particlesHandler.activeParticles.forEach(part => {
            if (part.state !== "liquid") return;

            this.applyGravity(part); // Aplica a gravidade

            const stackedY = this.getStackedY(part, canvasHeight); // Checa empilhamento

            const gravity = this.gameHandler.baseGravity;
            const gravityDirection = Math.sign(gravity);
            const nextY = part.y + part.velocityY;

            if (gravityDirection > 0) {
                // Caindo
                if (nextY < stackedY - 1) {
                    part.y = nextY;
                } else {
                    part.y = stackedY - 1;
                    part.velocityY = 0;
                }
            } else if (gravityDirection < 0) {
                // Subindo
                if (nextY > stackedY + 1 && nextY > 0) {
                    part.y = nextY;
                } else {
                    part.y = Math.max(0, stackedY + 1);
                    part.velocityY = 0;
                }
            }
        });
    }

    async solidBehaviour() {
        const debugConfig = await debugHandler.loadDebugConfig();

        const rect = this.particlesHandler.gameCanvas.getBoundingClientRect();
        const canvasHeight = Math.floor(
            (debugConfig.canvasSize - rect.top) *
            (this.particlesHandler.gameCanvas.height / rect.height)
        );

        this.particlesHandler.activeParticles.forEach(part => {
            if (part.state !== "solid") return;

            this.applyGravity(part); // Aplica a gravidade

            const stackedY = this.getStackedY(part, canvasHeight); // Checa empilhamento

            const gravity = this.gameHandler.baseGravity;
            const gravityDirection = Math.sign(gravity);
            const nextY = part.y + part.velocityY;

            if (gravityDirection > 0) {
                // Caindo
                if (nextY < stackedY - 1) {
                    part.y = nextY;
                } else {
                    part.y = stackedY - 1;
                    part.velocityY = 0;
                }
            } else if (gravityDirection < 0) {
                // Subindo
                if (nextY > stackedY + 1 && nextY > 0) {
                    part.y = nextY;
                } else {
                    part.y = Math.max(0, stackedY + 1);
                    part.velocityY = 0;
                }
            }
        });
    }

    async applyGravity(part) {
        const debugConfig = await debugHandler.loadDebugConfig();

        if (!debugConfig.enableGravity) return;
        
        const gravity = this.gameHandler.baseGravity;

        if (part.velocityY === undefined) {
            part.velocityY = 0;
        }

        part.velocityY += gravity;
    }

    getStackedY(part, canvasHeight) {
        const gravityDirection = Math.sign(this.gameHandler.baseGravity);
        let stackedY = (gravityDirection > 0) ? canvasHeight + 9 : -1;

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

        return stackedY;
    }
}