import { Library } from '../abstracts/Library';
import { Book } from '../entities/Book';

export function addBook(library: Library, book: Book): void {
  library.addBook(book);
}
