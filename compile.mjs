import { readdirSync, lstatSync, readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'node:url';
import { EOL } from 'os';
import { sep, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const outDir = [__dirname, "output"].join(sep);

const projectName = "Demo";
let extensions = {
    'aventus.conf.json': 'json',
    '.json': 'json',
    '.wcv.avt': 'html',
    '.wcl.avt': 'typescript',
    '.wcs.avt': 'css',
    '.gs.avt': 'css',
    '.html': 'html',
    '.avt': 'typescript'
}

const read = (path) => {
    if (path.startsWith(outDir)) return;

    if (path.endsWith('dist')) return;

    let files = readdirSync(path);
    for (let file of files) {
        let fullPath = [path, file].join(sep)
        if (lstatSync(fullPath).isDirectory()) {
            read(fullPath);
        }
        else {
            if (fullPath.endsWith('compile.mjs')) continue;

            let fileName = projectName + fullPath.replace(__dirname, '').replace(/\\/g, '/');
            let extension = "";
            for (let end in extensions) {
                if (file.endsWith(end)) {
                    extension = extensions[end];
                    break;
                }
            }

            if (extension == "") {
                console.log("Cant find extension for " + file);
            }

            let txt = readFileSync(fullPath, 'utf8');
            txt = txt.replace(/^.*\/\/#region avoid(\s|\S)*?\/\/#endregion avoid.*\s/gm, "")
            let splitted = txt.split("\n");
            for (let i = 0; i < splitted.length; i++) {
                splitted[i] = "            " + splitted[i];
            }
            txt = splitted.join("\n");

            txt = txt.replace(/</g, "&lt;").replace(/>/g, "&gt;")
            txt = txt.replace(/^( +)$/gm, "$1&nbsp;");
            txt = txt.replace(/`/gm, "&#96;");
            txt = txt.replace(/(^| )for/gm, "$1\\for");
            txt = txt.replace(/(^| )if/gm, "$1\\if");
            txt = txt.replace(/\{\{/gm, "\\{{");

            txtHtml += `    <av-code language="${extension}" filename="${fileName}">
        <pre>
${txt}
        </pre>
    </av-code>
`
        }
    }
    if (files.length == 0) {
        txtHtml += `    <div folder="${projectName + path.replace(__dirname, '').replace(/\\/g, '/')}"></div>` + EOL
    }
}

let txtHtml = `<av-code-editor name="${projectName}">` + EOL
read(__dirname);

txtHtml += `    <slot></slot>
</av-code-editor>`+ EOL







writeFileSync(outDir + "/output.wcv.avt", txtHtml);