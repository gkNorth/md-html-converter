import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async getMarkdownConvertedFromHtml(
    @Body() reqValues,
    @Res() res: Response
  ): Promise<any> {
    let returnValue;
    const isUrl = reqValues?.url
    if (isUrl) {
      returnValue = await this.appService.getMarkDownConvertedFromWebPage({reqValues});
    } else {
      if (reqValues.isMdToHtml) {
        returnValue = this.appService.getHtmlConvertedFromMarkdown({reqValues});
      } else {
        returnValue = this.appService.getMarkdownConvertedFromHtml({reqValues});
      }
    }
    res.send(returnValue);
  }
}
