export interface AppConfig {
    port: number
    frontendOrigin: string
}

export function loadConfig(environment: NodeJS.ProcessEnv = process.env): AppConfig {
    return {
        port: Number(environment.PORT) ?? 3000,
        frontendOrigin: environment.FRONTEND_ORIGIN ?? 'http://localhost:5173',
    }
}
