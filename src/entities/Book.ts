export class Book {
    protected _title: string;
    protected _author: string;
    protected _ISBN: string;
    protected _available: boolean;

    constructor(title: string, author: string, ISBN: string) {
        this._title = title;
        this._author = author;
        this._ISBN = ISBN;
        this._available = true;
    }

    get title() {
        return this._title;
    }

    get author() {
        return this._author;
    }

    get ISBN() {
        return this._ISBN;
    }

    get available() {
        return this._available;
    }


    toLoan() {
        if (this._available) {
            this._available = false;
            console.log(`${this._title} foi emprestado.`);
        } else {
            console.log(`${this._title} não está disponível.`);
        }
    }

    return() {
        this._available = true;
        console.log(`${this._title} foi devolvido.`);
    }
}
