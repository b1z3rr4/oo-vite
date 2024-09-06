import { Book } from "./Book";
import { User } from "./User";

export class Library {
    private _booksList: Array<Book>;
    private _usersList: Array<User>;
    private _borrowedBooks: { book: Book; user: User; date: number }[];

    constructor() {
        this._booksList = [];
        this._usersList = [];
        this._borrowedBooks = [];
    }

    get booksList() {
        return this._booksList;
    }

    get usersList() {
        return this._usersList;
    }

    get borrowedBooks() {
        return this._borrowedBooks;
    }

    addBook(book: Book) {
        this._booksList.push(book);
        console.log(`${book.title} foi adicionado à biblioteca.`);
    }

    registerUser(user: User) {
        this._usersList.push(user);
        console.log(`${user.name} foi registrado como usuário.`);
    }

    lendBook(book: Book, user: User) {
        if (this._usersList.includes(user)) {
            user.getBook(book);
            this.addBorrowedBooks(book, user);
        } else {
            console.log(`Usuário não registrado.`);
        }
    }

    receiveBook(book: Book, user: User) {
        if (this._usersList.includes(user)) {
            user.returnBook(book);
            this.removeBorrowedBooks(book, user);
        } else {
            console.log(`Usuário não registrado.`);
        }
    }

    removeBorrowedBooks(book: Book, user: User) {
        this._borrowedBooks = this._borrowedBooks.filter((borrowed) => {
            return borrowed.book.ISBN !== book.ISBN || borrowed.user.code !== user.code;
        });
    }

    addBorrowedBooks(book: Book, user: User) {
        this._borrowedBooks.push({
            book,
            user,
            date: Date.now(),
        });
    }
}
