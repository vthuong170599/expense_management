import { Injectable, Logger } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';
import { JWT } from 'google-auth-library';

@Injectable()
export class GoogleSheetsService {
  createSheetFile() {
    throw new Error('Method not implemented.');
  }
  private sheets: sheets_v4.Sheets;
  private jwtClient: JWT;
  private readonly logger = new Logger(GoogleSheetsService.name);

  constructor() {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

    this.jwtClient = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes,
    });
    this.sheets = google.sheets({ version: 'v4', auth: this.jwtClient });
  }

  async readSheet(spreadsheetId: string, range: string) {
    await this.jwtClient.authorize();
    const res = await this.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return res.data.values;
  }

  async appendSheet(spreadsheetId: string, range: string, values: any[][]) {
    await this.jwtClient.authorize();
    const res = await this.sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });
    return res.data;
  }
}
