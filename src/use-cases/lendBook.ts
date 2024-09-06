import { Library } from '../abstracts/Library';
import { Book } from '../entities/Book';
import { User } from '../entities/User';

export function lendBook(library: Library, user: User, book: Book): void {
  library.lendBook(book, user);
}
