import { Injectable } from '@nestjs/common';
import { NodeHtmlMarkdown } from 'node-html-markdown'
// import * as fs from 'fs';
import { marked } from "marked";

@Injectable()
export class AppService {
  getMarkdownConvertedFromHtml({reqValues}): string {
    // const html = fs.readFileSync('src/data/index.html', 'utf8');
    const md = NodeHtmlMarkdown.translate(reqValues.htmlValue);
    return md;
  }
  geHtmlConvertedFromMarkdown({reqValues}): string {
    // const html = fs.readFileSync('src/data/index.html', 'utf8');
    const html = marked.parse(reqValues.htmlValue);
    return html;
  }
}
