(async () => {
    const gameCanvas = document.querySelector('#game-canvas');

    //#region Initializing Classes
    const particleHandler = new ParticleHandler();
    const gameHandler = new GameHandler();
    const debugHandler = new DebugHandler();
    const physicsHandler = new PhysicsHandler();

    physicsHandler.gameHandler = gameHandler;
    physicsHandler.particlesHandler = particleHandler;

    particleHandler.gameCanvas = gameCanvas;
    particleHandler.ctx = gameCanvas.getContext('2d');
    particleHandler.gameHandler = gameHandler;

    const debugConfig = await debugHandler.loadDebugConfig();

    //#endregion
    //#region Mouse Vars
    let isButtonHeld = false;
    let mousePos = { x: 0, y: 0 };
    let size = 600;
    //#endregion
    //#region Configurating Canvas
    gameCanvas.width = size;
    gameCanvas.height = size;
    gameCanvas.style.width = `${size}px`;
    gameCanvas.style.height = `${size}px`;
    //#endregion
    //#region Particle on_spawn Functions
    function getMousePos(ev) {
        const rect = gameCanvas.getBoundingClientRect();

        return {
            x: Math.floor((ev.clientX - rect.left) * (gameCanvas.width / rect.width)),
            y: Math.floor((ev.clientY - rect.top) * (gameCanvas.height / rect.height))
        };
    }
    //#endregion
    //#region GameCanvas events
        gameCanvas.onmousedown = () => {
            isButtonHeld = true;
        };

        gameCanvas.onmouseup = () => {
            isButtonHeld = false;
        };

        gameCanvas.onmousemove = (ev) => {
            mousePos = getMousePos(ev);
        };
    //#endregion
    //#region HTMLInput Events

    document.addEventListener('keypress', ({ key }) => {
        console.log(gameHandler.baseGravity);
        
        switch (key) {
            case "w":
                gameHandler.baseGravity+=0.01;
                break;
            case "s":
                gameHandler.baseGravity-=0.01;
                break;
            case "g":
                debugConfig.enableGravity = !debugConfig.enableGravity;
                break;
        }
    })


    //#endregion

    setInterval(async () => {
        if (isButtonHeld) {
            const vel0 = 0;
            const stateI = 1;

            particleHandler.spawnPoint(mousePos.x, mousePos.y, vel0, stateI);
        }

        particleHandler.drawPoints();

        physicsHandler.solidBehaviour();
        physicsHandler.liquidBehaviour();
    }, 1);
})();