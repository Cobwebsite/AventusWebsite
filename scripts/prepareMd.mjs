import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

function getResultUri(uri, origin, output) {
    let name = uri.replace(origin + "/docs/", "");
    if (name.indexOf("/") == -1) {
        name = "install/" + name
    }
    const fullname = resolve(output, name + ".md");
    const dir = dirname(fullname);
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true })
    }
    return fullname;
}
async function loadUri(page, uri, origin, output) {
    await page.goto(uri);
    await page.waitForNetworkIdle();
    page.on('console', async (msg) => {
        const msgArgs = msg.args();
        for (let i = 0; i < msgArgs.length; ++i) {
            console.log(await msgArgs[i].jsonValue());
        }
    });

    const markdown = await page.evaluate(() => {
        let txt = [];

        function loadRoot() {
            const avApp = document.querySelector("av-app");

            if (!avApp) return null;

            const avDocPage = avApp.shadowRoot.querySelector("av-doc-page");
            if (!avDocPage) return null;

            const avDocApp = avDocPage.shadowRoot.querySelector("av-doc-app");
            if (!avDocApp) return null;

            const content = avDocApp.shadowRoot.querySelector(".content");
            if (!content || !content.children[0]) return null;

            const pageContent = content.children[0].shadowRoot.querySelector(".page-content");
            return pageContent;
        }

        const pageContent = loadRoot();
        if (!pageContent) return null;

        function getContentTxt(el) {
            const normalize = (result) => {
                result = result.replace(/</g, "&lt;").replace(/>/g, "&gt;")
                result = result.replace(/^( +)$/gm, "$1&nbsp;");
                result = result.replace(/`/gm, "&#96;");
                return result
            }
            let result = "";
            const children = Array.from(el.childNodes);
            for (let child of children) {
                if (child.nodeType == 3) {
                    // text
                    result += normalize(child.textContent);
                }
                else if (child.nodeType == 1) {
                    // element
                    if (child.tagName.toLowerCase() == "strong" || child.tagName.toLowerCase() == "b") {
                        result += " **"
                        result += getContentTxt(child);
                        result += "** "
                    }
                    else if (child.tagName.toLowerCase() == "i") {
                        result += " *"
                        result += getContentTxt(child);
                        result += "* "
                    }
                    else if (child.tagName.toLowerCase() == "a") {
                        result += "[" + getContentTxt(child) + "]";
                        result += "(" + child.href + ")";
                    }
                    else if (child.classList.contains("cn")) {
                        result += "<mark>";
                        result += getContentTxt(child);
                        result += "</mark>";
                    }
                    else {
                        result += getContentTxt(child);
                    }
                }
                else {
                    console.log(child.nodeType + " detected");
                    console.log(child.textContent);
                }
            }

            return result;
        }
        function loadContent(el, meta) {
            if (!el) return false;
            if (el instanceof AventusWebsite.BaseEditor) {
                return loadContent(el.shadowRoot.querySelector('av-code-editor'));
            }
            else if (el instanceof AventusWebsite.CodeEditor) {
                let result = false;
                for (let name in el.files) {
                    const file = el.files[name];
                    if (loadContent(file.code, { filename: name })) {
                        result = true;
                    }
                }
                return result;
            }
            else if (el instanceof AventusWebsite.AvCode) {
                if (meta?.filename) {
                    txt.push("```" + el.language + " filename=" + meta.filename);
                }
                else if (el.filename) {
                    txt.push("```" + el.language + " filename=" + el.filename);
                }
                else {
                    txt.push("```" + el.language);
                }
                txt.push(el.shadowRoot.children[1].innerText);
                txt.push("```");
                txt.push('');
                return true;
            }
            else if (/H[1-6]/.test(el.tagName)) {
                let nb = Number(el.tagName.replace("H", ""));
                let temp = '';
                for (let i = 0; i < nb; i++) {
                    temp += "#";
                }
                txt.push(temp + ` ` + getContentTxt(el));
                txt.push('');
                return true;
            }
            else if (el.tagName == "P") {
                txt.push(getContentTxt(el));
                txt.push('');
                return true;
            }
            else if (el.tagName == "UL") {
                let result = false;
                for (let child of el.children) {
                    if (loadContent(child)) {
                        result = true;
                    }
                }
                txt.push("");
                return result;
            }
            else if (el.tagName == "LI") {
                txt.push("- " + getContentTxt(el));
                return true;
            }
            else if (
                el instanceof AventusWebsite.DocuImg ||
                el.tagName == "IMG" ||
                el.tagName == "AV-IMG"
            ) {
                txt.push(`![](https://aventusjs.com${el.src})`)
                txt.push(``)
                return true;
            }
            else if (el.classList.contains("table")) {
                const ligne = (els, depth) => {
                    let temp = "|";
                    for (let i = 0; i < els.length; i++) {
                        if (i == 0) {
                            for (let i = 0; i < depth; i++) {
                                temp += "&nbsp;&nbsp;&nbsp;&nbsp;";
                            }
                        }
                        temp += getContentTxt(els[i]).replace(/\n/g, " ") + "|";
                    }
                    return temp;
                }
                const sep = (els) => {
                    let temp = "|";
                    for (let el of els) {
                        temp += "---|";
                    }
                    return temp;
                }
                const headers = Array.from(el.querySelector(".header").querySelectorAll("av-col"))
                txt.push(ligne(headers, 0));
                txt.push(sep(headers));

                const rows = Array.from(el.querySelectorAll("av-row:not(.header)"));
                for (let row of rows) {
                    const children = Array.from(row.children);
                    let depth = 0;
                    if (row.classList.contains("lvl-1")) {
                        depth = 1
                    }
                    else if (row.classList.contains("lvl-2")) {
                        depth = 2
                    }
                    txt.push(ligne(children, depth));
                }
                txt.push(``)
                return true;
            }
            else if (el.tagName == "DIV") {
                let result = false;
                for (let child of el.children) {
                    if (loadContent(child)) {
                        result = true;
                    }
                }
                if (!result && el.innerText != '') {
                    txt.push(getContentTxt(el));
                    txt.push('');
                    result = true;
                }
                return result;
            }

            return false;
        }


        for (let child of pageContent.children) {
            loadContent(child);
        }
        return txt.join("\r\n");
    });

    if (markdown) {
        const fullname = getResultUri(uri, origin, output);
        writeFileSync(fullname, markdown);
        return fullname;
    }
    return null;
}

export async function prepareMd(origin, output) {

    let browser;
    try {
        browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(origin + '/docs/introduction');
        await page.waitForNetworkIdle();

        const links = await page.evaluate(() => {
            const avApp = document.querySelector("av-app");

            if (!avApp) return null;

            const avDocPage = avApp.shadowRoot.querySelector("av-doc-page");
            if (!avDocPage) return null;

            const avDocSidenav = avDocPage.shadowRoot.querySelector("av-doc-sidenav");
            if (!avDocSidenav) return null;

            const links = avDocSidenav.shadowRoot.querySelectorAll("av-link");
            const result = [];
            for (let link of links) {
                result.push(origin + link.to);
            }
            return result;
        });

        const resultFiles = [];

        for (let link of links) {
            console.log("loading " + link);
            const fileUri = await loadUri(page, link, origin, output);
            if (fileUri) {
                resultFiles.push(fileUri);
            }
        }

        // for (let link of links) {
        //     const fileUri = getResultUri(link, origin, output);
        //     if (fileUri && existsSync(fileUri)) {
        //         resultFiles.push(fileUri);
        //     }
        // }




        const finalFile = resolve(output, "aventus.md");
        let finalText = "";
        for (let i = 0; i < resultFiles.length; i++) {
            const file = resultFiles[i];
            finalText += readFileSync(file);
            if (i != resultFiles.length - 1)
                finalText += "\r\n---\r\n";
        }
        writeFileSync(finalFile, finalText)
    } finally {
        await browser?.close();
    }
}