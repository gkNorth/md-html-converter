import { Injectable } from '@nestjs/common';
import { NodeHtmlMarkdown } from 'node-html-markdown'
// import * as fs from 'fs';
import { marked } from "marked";
import puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  getMarkdownConvertedFromHtml({reqValues}): string {
    // const html = fs.readFileSync('src/data/index.html', 'utf8');
    const md = NodeHtmlMarkdown.translate(reqValues.htmlValue);
    return md;
  }
  getHtmlConvertedFromMarkdown({reqValues}): string {
    const html = marked.parse(reqValues.htmlValue);
    return html;
  }
  async getMarkDownConvertedFromWebPage({reqValues}): Promise<any> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(reqValues.url);
    const html = await page.evaluate(() => document.documentElement.outerHTML)
    await browser.close();

    const md = NodeHtmlMarkdown.translate(html);
    return md;
  }
}
