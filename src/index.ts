import 'dotenv/config';
import {opendir} from "node:fs/promises";
import {Dir} from "node:fs";
import pdf from 'pdf-parse';
import {getCIPM, getEE, getEGD, getESI, getNumberClient, getReferenceDate} from "./utils";
import {post_prepare, post_send} from "./post";
import {promises} from "node:dns";

(async () => {
    try {
        const files_directory:string = "./src/files";
        const directories:Dir = await opendir(files_directory, {recursive: true});
        for await (const directory of directories) {
            if ( directory.isFile() && directory.name !== '.DS_Store') {
                const full_path:string = `${directory.parentPath}/${directory.name}`;

                const content = await pdf(full_path);
                const content_rows:string[] = content.text.split('\n');

                const number_client:number = getNumberClient(content_rows);
                const reference_date:string = getReferenceDate(content_rows);
                const ee:number[] = getEE(content_rows);
                const esi:number[] = getESI(content_rows);
                const egd:number[] = getEGD(content_rows);
                const cipm:number = getCIPM(content_rows);

                post_prepare(number_client, reference_date, ee, esi, egd, cipm);
                await post_send();

            }
        }
    } catch(err) {
        console.log("Erro ao carregar arquivos.", err);
    }
})();
