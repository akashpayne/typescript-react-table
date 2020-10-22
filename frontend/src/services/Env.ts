declare global {
    interface Window {
        _env: Env;
    }
}

export interface Env {
    api: {
        URL: string;
    };
}

export const env: Env = window._env;
