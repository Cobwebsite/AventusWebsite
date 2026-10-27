import puppeteer from 'puppeteer';
import * as pagefind from 'pagefind';
import { resolve } from 'node:path';

const origin = process.env.AVENTUS_URL ?? 'http://127.0.0.1:8080';
const outputPath = resolve(process.env.PAGEFIND_OUTPUT ?? './src/static/pagefind');
const browser = await puppeteer.launch();

try {
    const page = await browser.newPage();
    const introduction = new URL('/docs/introduction', origin).href;
    await page.goto(introduction, { waitUntil: 'networkidle2' });
    await page.waitForSelector('av-app');

    const links = await page.evaluate(() => {
        const app = document.querySelector('av-app');
        const sidenav = app?.shadowRoot?.querySelector('av-doc-page')?.shadowRoot?.querySelector('av-doc-sidenav');
        if (!sidenav?.shadowRoot) throw new Error('Documentation navigation not found');
        return [...sidenav.shadowRoot.querySelectorAll('av-link')]
            .map(link => link.to)
            .filter(Boolean);
    });

    const urls = [...new Set([introduction, ...links.map(link => new URL(link, origin).href)])];
    const { index, errors: creationErrors } = await pagefind.createIndex();
    if (creationErrors?.length || !index) throw new Error(`Pagefind initialization failed: ${creationErrors?.join(', ')}`);

    let count = 0;
    for (const url of urls) {
        if (new URL(url).origin !== new URL(origin).origin) continue;
        console.log(`Indexing ${url}`);
        await page.goto(url, { waitUntil: 'networkidle2' });
        const html = await page.evaluate(() => {
            const app = document.querySelector('av-app');
            const docPage = app?.shadowRoot?.querySelector('av-doc-page');
            const docApp = docPage?.shadowRoot?.querySelector('av-doc-app');
            const content = docApp?.shadowRoot?.querySelector('.content')?.firstElementChild;
            const pageContent = content?.shadowRoot?.querySelector('.page-content');
            if (!pageContent) return null;

            // Pagefind needs real heading elements and IDs to produce section links.
            // Flatten the documentation's shadow roots into an index-only HTML tree.
            const main = document.createElement('main');
            main.setAttribute('data-pagefind-body', '');
            const walk = node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    return node.cloneNode();
                }
                if (node.nodeType !== Node.ELEMENT_NODE) return null;
                const tag = node.tagName.toLowerCase();
                if (['script', 'style', 'button', 'svg'].includes(tag) || node.hidden) return null;
                const copy = node.cloneNode(false);
                // Code editors keep their actual code in a nested av-code shadow root.
                for (const child of (node.shadowRoot ?? node).childNodes) {
                    const cloned = walk(child);
                    if (cloned) copy.appendChild(cloned);
                }
                return copy;
            };
            for (const child of pageContent.childNodes) {
                const cloned = walk(child);
                if (cloned) main.appendChild(cloned);
            }
            if (!main.textContent.trim()) return null;
            return `<html lang="en"><body>${main.outerHTML}</body></html>`;
        });
        if (!html) {
            console.warn(`Skipping empty page: ${url}`);
            continue;
        }
        const { errors } = await index.addHTMLFile({
            url: new URL(url).pathname,
            content: html,
        });
        if (errors?.length) throw new Error(`Failed to index ${url}: ${errors.join(', ')}`);
        count++;
    }

    if (!count) throw new Error('No documentation pages were indexed');
    const { errors } = await index.writeFiles({ outputPath });
    if (errors?.length) throw new Error(`Failed to write Pagefind files: ${errors.join(', ')}`);
    console.log(`Indexed ${count} documentation pages into ${outputPath}`);
    await index.deleteIndex();
} finally {
    await browser.close();
    await pagefind.close();
}
