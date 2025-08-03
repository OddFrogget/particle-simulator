let particleData = [];

class GameHandler {
    baseGravity;

    constructor() {
        this.baseGravity = 1;
    }

    setGravity(g) {
        this.baseGravity = g;
    }
}