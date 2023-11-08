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
    if (reqValues.isMdToHtml) {
      returnValue = this.appService.geHtmlConvertedFromMarkdown({reqValues});
    } else {
      returnValue = this.appService.getMarkdownConvertedFromHtml({reqValues});
    }
    res.send(returnValue);
  }
}
