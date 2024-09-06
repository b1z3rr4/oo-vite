import { Book } from "./Book";

export class User {
    private _name: string;
    private _code: number;
    private _borrowedBooks: Array<Book>;

    constructor(name: string, code: number) {
        this._name = name;
        this._code = code;
        this._borrowedBooks = [];
    }

    get name() {
        return this._name;
    }

    get code() {
        return this._code;
    }

    get borrowedBooks() {
        return this._borrowedBooks;
    }

    getBook(livro: Book) {
        if (livro.available) {
            livro.toLoan();
            this._borrowedBooks.push(livro);
        } else {
            console.log(`${livro.title} não está disponível.`);
        }
    }

    returnBook(livro: Book) {
        const index = this._borrowedBooks.indexOf(livro);
        if (index !== -1) {
            livro.return();
            this._borrowedBooks.splice(index, 1);
        } else {
            console.log(`Este livro não foi emprestado por ${this._name}.`);
        }
    }
}