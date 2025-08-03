class DebugHandler {
    async loadDebugConfig() {
        try {
            const response = await fetch('jsons/debugConfig.json');
            
            particleData = await response.json();
        } catch (error) {
            console.error('Erro ao carregar JSON:', error);
        }

        return particleData;
    }
}