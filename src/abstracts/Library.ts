import { Book } from '../entities/Book';
import { User } from '../entities/User';
import { BorrowedBook } from '../types/borrowedBooks';

export abstract class Library {
  protected _booksList: Array<Book>;
  protected _usersList: Array<User>;
  protected _borrowedBooks: Array<BorrowedBook>;

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

  abstract addBook(book: Book): void;
  abstract registerUser(user: User): void;
  abstract lendBook(book: Book, user: User): void;
  abstract receiveBook(book: Book, user: User): void;
  abstract removeBorrowedBooks(book: Book, user: User): void;
  abstract addBorrowedBooks(book: Book, user: User): void;
}
