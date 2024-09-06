import { Book } from './Book';

export class DigitalBook extends Book {
  private _format: string;

  constructor(title: string, author: string, ISBN: string, format: string) {
    super(title + ' (Digital)', author, ISBN);
    this._format = format;
  }

  toLoan() {
    if (this._available) {
      this._available = false;
      console.log(
        `${this._title} (format: ${this._format}) foi emprestado por 7 dias.`
      );
    } else {
      console.log(`${this._title} não está disponível.`);
    }
  }
}
