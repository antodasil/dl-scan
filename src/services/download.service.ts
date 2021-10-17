import * as fs from "fs";
import * as http from "http";
import { httpsPromised, execPromised } from "@/utils/promisedFunc.utils";
import { toCamelCase, toSnakeCase } from "@/utils/string.utils";

export interface IDownload extends IChaptersInfos {
  name: string;
  url?: string;
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

    if (response) {
      const folder = fs.createWriteStream(`${targetFolderPath}/${name}-${chapter}/${pageString}.jpg`);
      response.pipe(folder);
    }
    page++;
  } while (response);
  console.log(`End chapter ${chapter}\n`);
}

export async function dlChapters(infos: IDownload, targetFolderPath: string): Promise<void> {
  if (!infos?.url) throw new Error("L'URL est obligatoire");

  for (let i = parseInt(infos.firstChapter); i <= parseInt(infos.lastChapter); i++) {
    await dlChapter(infos.name, infos.url.replace("${chapter}", i.toString()), i, targetFolderPath);
  }
}

// TODO
// name: Kebab case, Snake case
// Extension jpg, png, jpeg, JPG
// Num page 00, 01, 000, 001
/** Download manga chapters only from manga name */
export async function downloadAlgorithm(infos: IDownload, targetFolderPath: string): Promise<void> {
  let url = "";
  try {
    url = await findValidUrl(infos.name);
  } catch (e: unknown) {
    console.log(e);
    return;
  }

  console.log("template trouvé : " + url);
  infos.url = url;
  infos.name = toCamelCase(infos.name);
  dlChapters(infos, targetFolderPath);
}

const templatesUrl = [
  "https://www.scan-vf.net/uploads/manga/${name}/chapters/chapitre-${chapter}/${page}",
  "https://www.scan-fr.cc/uploads/manga/${name}/chapters/Volume%20${chapter}/${page}",
  "https://www.scan-fr.cc/uploads/manga/${name}/chapters/${chapter}/${page}",
];

async function findValidUrl(name: string): Promise<string> {
  console.log("Origin name :" + name);
  const nameSC = toSnakeCase(name);
  console.log("snake_case name :" + nameSC);

  let urlFinal = "";
  for (const template of templatesUrl) {
    const url = template.replace("${name}", nameSC);
    let urlTest = url.replace("${chapter}", "1");
    urlTest = urlTest.replace("${page}", "01");
    urlTest += ".jpg";
    console.log(urlTest);

    let res: http.IncomingMessage;
    try {
      res = await httpsPromised(urlTest, { method: "HEAD" });
      if (res.statusCode === 200) {
        urlFinal = url;
        break;
      }
    } catch (e: unknown) {
      console.log("Template " + template + " invalide");
    }
  }

  if (!urlFinal) throw new Error("Aucun url trouvé pour ce nom");
  return urlFinal;
}
