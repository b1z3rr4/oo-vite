import { Book } from "../entities/Book";
import { Library } from "../entities/Library";
import { User } from "../entities/User";

export function lendBook(library: Library, user: User, book: Book): void {
    library.lendBook(book, user);
}
