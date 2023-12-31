import { Injectable } from '@nestjs/common';
import { NodeHtmlMarkdown } from 'node-html-markdown'
// import * as fs from 'fs';
import { marked } from "marked";
import puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  getMarkdownConvertedFromHtml({ reqValues }: { reqValues: TextValue }): string {
    // const html = fs.readFileSync('src/data/index.html', 'utf8');
    const md = NodeHtmlMarkdown.translate(reqValues.htmlValue);
    return md;
  }
  getHtmlConvertedFromMarkdown({ reqValues }: { reqValues: TextValue }): string {
    const html = marked.parse(reqValues.htmlValue);
    return html;
  }
  async getMarkDownConvertedFromWebPage({
    reqValues
  }: { reqValues: UrlValue }): Promise<string> {
    
    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    await page.goto(reqValues.url, { waitUntil: 'load' });
    const html = await page.evaluate(() => document.documentElement.outerHTML)
    await browser.close();

    const md = NodeHtmlMarkdown.translate(html);
    return md;
  }
}
