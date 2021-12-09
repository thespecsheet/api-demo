/// Download the specsheet api.json & Generate typescript interface

import fetch from 'node-fetch';
import fs from 'fs';
import * as openApiTs from "openapi-typescript";
import {config} from './config';

async function downloadFile(url: string, dest:string) {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(dest);
  await new Promise((resolve, reject) => {
    if(res.body === null) {
      reject()
      return;
    }
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
}

async function main() {
  const cfg = config();
  const apiJsonUrl = `${cfg.TSS_SERVER}/api.json`;
  await downloadFile(apiJsonUrl, './tss-api.json');

  const tsoutput = await openApiTs.default(
    JSON.parse(fs.readFileSync("./tss-api.json", "utf8"))
  );
  const prefix = "// tslint:disable\n\n";
  fs.writeFileSync("./tss-api.ts", prefix + tsoutput);
}

main().catch(err=>console.error(err));
