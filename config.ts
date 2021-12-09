import {config as loadConfig} from 'dotenv';

export interface Config {
  TSS_SERVER: string;
  TSS_AUTHKEY: string;
}

export function config() : Config {
  loadConfig();
  const env = process.env;

  const TSS_SERVER = env['TSS_SERVER'] ?? "https://app.thespecsheet.com";
  const TSS_AUTHKEY = env['TSS_AUTHKEY'];

  if(TSS_SERVER !== undefined && TSS_AUTHKEY !== undefined) {
    return {
      TSS_AUTHKEY,
      TSS_SERVER
    };
  }

  throw new Error("Unable to find all environment variables");
}
