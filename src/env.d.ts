 declare interface Env {
  readonly NODE_ENV: string;
  
  readonly NG_APP_API_URL: string; 
  [key: string]: any;
}

declare interface ImportMeta {
  readonly env: Env;
}

declare const _NGX_ENV_: Env;

declare namespace NodeJS {
  export interface ProcessEnv extends Env {}
}