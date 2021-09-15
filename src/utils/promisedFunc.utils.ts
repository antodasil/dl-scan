import { exec } from "child_process";
import * as http from "http";
import * as https from "https";
import * as fs from "fs";
import { Abortable } from "node:events";

// Execute une requete https
export function httpsPromised(url: string): Promise<http.IncomingMessage> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) reject(response);
      resolve(response);
    });
  });
}

// Execute une commande bash
export function execPromised(command: string, targetFolderPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const options = {
      cwd: targetFolderPath,
    };

    exec(command, options, (error, stdout) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
}

export function accessPromised(path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.access(path, (error) => {
      if (error) reject(error);
      resolve(undefined);
    });
  });
}

export function readFilePromised(
  path: string,
  options:
    | ({
        encoding?: null;
        flag?: string;
      } & Abortable)
    | undefined
    | null
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (error, buffer) => {
      if (error) reject(error);
      resolve(buffer);
    });
  });
}

export function writeFilePromised(path: string, data: string, options: fs.WriteFileOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, options, (error) => {
      if (error) reject(error);
      resolve(undefined);
    });
  });
}
