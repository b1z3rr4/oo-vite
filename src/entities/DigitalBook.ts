import { Book } from './Book';

export class DigitalBook extends Book {
  private _format: string;

  constructor(title: string, author: string, ISBN: string, format: string) {
    super(title + ' (Digital)', author, ISBN);
    this._format = format;
  }

  toLoan() {
    if (this._available && this._format) {
      this._available = false;
    }
  }
}
