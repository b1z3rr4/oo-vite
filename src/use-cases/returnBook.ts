import { Book } from '../entities/Book';
import { Library } from '../entities/Library';
import { User } from '../entities/User';

export function returnBook(library: Library, user: User, book: Book): void {
  library.receiveBook(book, user);
}
