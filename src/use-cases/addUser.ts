import { Library } from '../abstracts/Library';
import { User } from '../entities/User';

export function addUser(library: Library, user: User): void {
  library.registerUser(user);
}
