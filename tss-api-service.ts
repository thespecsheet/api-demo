import fetch from "node-fetch";
import * as api from "./tss-api";

/** (Manually updated) wrapper around the Specsheet OpenAPI api */
export class ApiService {
  private readonly authToken: string;
  private readonly url: string;

  constructor(params: { authToken: string; url: string }) {
    this.authToken = params.authToken;
    this.url = params.url;
  }

  async batchUpdate(val: api.components["schemas"]["BatchUpdateReq"]) {
    const apiPath = "/api/v1/batchUpdate" as const;

    type Path = typeof apiPath;
    type Req =
      api.paths[Path]["post"]["requestBody"]["content"]["application/json"];
    type Resp =
      api.paths[Path]["post"]["responses"]["200"]["content"]["application/json"];
    return this.makeRequest<Req, Resp>(apiPath, val); 
  }

  async batchDelete(val: api.components["schemas"]["BatchDeleteReq"]) {
    const apiPath = "/api/v1/batchDelete" as const;

    type Path = typeof apiPath;
    type Req =
      api.paths[Path]["post"]["requestBody"]["content"]["application/json"];
    type Resp =
      api.paths[Path]["post"]["responses"]["200"]["content"]["application/json"];
    return this.makeRequest<Req, Resp>(apiPath, val);
  }

  private async makeRequest<Req, Resp>(
    apiPath: keyof api.paths,
    req: Req
  ): Promise<Resp> {
    const url = this.url + apiPath;
    const resp = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": this.authToken,
      },
      body: JSON.stringify(req),
    });
    const bodyText = await resp.text();

    if(bodyText === 'Invalid JWT' || bodyText === 'not authorized') {
      throw new Error(bodyText);
    }
    return JSON.parse(bodyText);
  }
}
