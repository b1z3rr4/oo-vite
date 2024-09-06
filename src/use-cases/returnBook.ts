import { Library } from '../abstracts/Library';
import { Book } from '../entities/Book';
import { User } from '../entities/User';

export function returnBook(library: Library, user: User, book: Book): void {
  library.receiveBook(book, user);
}
