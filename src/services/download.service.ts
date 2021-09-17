import * as fs from "fs";
import * as http from "http";
import { httpsPromised, execPromised } from "@/utils/promisedFunc.utils";

export interface IDownload extends IChaptersInfos {
  name: string;
  url: string;
}

export interface IChaptersInfos {
  firstChapter: string;
  lastChapter: string;
}

async function getImg(url: string): Promise<http.IncomingMessage | undefined> {
  let response;
  try {
    response = await httpsPromised(url + `.jpg`);
  } catch (e) {
    try {
      response = await httpsPromised(url + ".png");
    } catch (e2) {
      try {
        response = await httpsPromised(url + ".jpeg");
      } catch (e3) {
        try {
          response = await httpsPromised(url + ".JPG");
        } catch (e4) {
          return;
        }
      }
    }
  }
  return response;
}

async function dlChapter(name: string, urlTemplate: string, chapter: number, targetFolderPath: string): Promise<void> {
  let page = 1;

  console.log(`Start chapter ${chapter}`);
  await execPromised(`mkdir ${name}-${chapter}`, targetFolderPath);
  let response;
  do {
    console.log(`Chapitre ${chapter}, page ${page}`);
    const pageString: string = page < 10 ? "0" + page.toString() : page.toString();
    const url = urlTemplate.replace("${page}", pageString);
    response = await getImg(url);

    const folder = fs.createWriteStream(`${targetFolderPath}/${name}-${chapter}/${pageString}.jpg`);

    if (response) {
      response.pipe(folder);
    }
    page++;
  } while (response);
  console.log(`End chapter ${chapter}\n`);
}

export async function dlChapters(infos: IDownload, targetFolderPath: string): Promise<void> {
  for (let i = parseInt(infos.firstChapter); i <= parseInt(infos.lastChapter); i++) {
    await dlChapter(infos.name, infos.url.replace("${chapter}", i.toString()), i, targetFolderPath);
  }
}
