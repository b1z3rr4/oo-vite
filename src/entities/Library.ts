import { BorrowedBook } from '../types/borrowedBooks';
import { Book } from './Book';
import { User } from './User';

export class Library {
  private _booksList: Array<Book>;
  private _usersList: Array<User>;
  private _borrowedBooks: Array<BorrowedBook>;

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
  }

  registerUser(user: User) {
    this._usersList.push(user);
  }

  lendBook(book: Book, user: User) {
    if (this._usersList.includes(user)) {
      user.getBook(book);
      this.addBorrowedBooks(book, user);
    }
  }

  receiveBook(book: Book, user: User) {
    if (this._usersList.includes(user)) {
      user.returnBook(book);
      this.removeBorrowedBooks(book, user);
    }
  }

  removeBorrowedBooks(book: Book, user: User) {
    this._borrowedBooks = this._borrowedBooks.filter((borrowed) => {
      return (
        borrowed.book.ISBN !== book.ISBN || borrowed.user.code !== user.code
      );
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
