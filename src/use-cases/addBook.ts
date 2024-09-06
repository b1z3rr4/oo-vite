import { Book } from '../entities/Book';
import { Library } from '../entities/Library';

export function addBook(library: Library, book: Book): void {
  library.addBook(book);
}
