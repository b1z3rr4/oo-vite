import { Book } from '../entities/Book';
import { User } from '../entities/User';

export type BorrowedBook = { book: Book; user: User; date: number };
