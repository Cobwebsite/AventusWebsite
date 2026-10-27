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
        const record = await page.evaluate(() => {
            const app = document.querySelector('av-app');
            const docPage = app?.shadowRoot?.querySelector('av-doc-page');
            const docApp = docPage?.shadowRoot?.querySelector('av-doc-app');
            const content = docApp?.shadowRoot?.querySelector('.content')?.firstElementChild;
            const pageContent = content?.shadowRoot?.querySelector('.page-content');
            if (!pageContent) return null;

            const parts = [];
            const headings = [];
            const walk = node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const value = node.textContent.replace(/\s+/g, ' ').trim();
                    if (value) parts.push(value);
                    return;
                }
                if (node.nodeType !== Node.ELEMENT_NODE) return;
                const tag = node.tagName.toLowerCase();
                if (['script', 'style', 'button', 'svg'].includes(tag) || node.hidden) return;
                if (/^h[1-6]$/.test(tag)) headings.push(node.textContent.trim());
                // Code editors keep their actual code in a nested av-code shadow root.
                if (node.shadowRoot) {
                    for (const child of node.shadowRoot.childNodes) walk(child);
                } else {
                    for (const child of node.childNodes) walk(child);
                }
            };
            walk(pageContent);
            return {
                title: headings.find(Boolean) ?? document.title,
                content: parts.join(' '),
            };
        });
        if (!record?.content) {
            console.warn(`Skipping empty page: ${url}`);
            continue;
        }
        const { errors } = await index.addCustomRecord({
            url: new URL(url).pathname,
            content: record.content,
            language: 'en',
            meta: { title: record.title },
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
