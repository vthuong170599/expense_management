import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';

@Controller('google-sheets')
export class GoogleSheetsController {
  constructor(private readonly sheetsService: GoogleSheetsService) {}

  @Get('read')
  async readSheet(
    @Query('spreadsheetId') spreadsheetId: string,
    @Query('range') range: string,
  ) {
    return this.sheetsService.readSheet(spreadsheetId, range);
  }

  @Post('append')
  async appendSheet(
    @Body('spreadsheetId') spreadsheetId: string,
    @Body('range') range: string,
    @Body('values') values: any[][],
  ) {
    return this.sheetsService.appendSheet(spreadsheetId, range, values);
  }
  @Get('create-file')
  createSheetFile(@Body('title') title?: string) {
    title = title || 'New Spreadsheet';
    console.log(title);
    const spreadsheetId = this.sheetsService.createSheetFile();
    return { spreadsheetId };
  }
}
