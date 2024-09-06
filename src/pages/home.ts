import { Library } from '../entities/Library';
import { lendBook } from '../use-cases/lendBook';
import { formatDate } from '../utils/formatDate';
import { html } from '../utils/html';
import { returnBook } from '../use-cases/returnBook';
import { Page } from '../abstracts/Page';

export class Home extends Page {
  private library: Library;
  private searchTerm: string = '';
  private searchTermUser: string = '';

  constructor(library: Library) {
    super();
    this.library = library;
  }

  public render(): string {
    return html`
      <div class="container mx-auto p-8">
        <h2 class="text-4xl font-extrabold mb-8 text-white">
          Gerenciar Biblioteca
        </h2>

        <button
          id="open-lend-book-modal"
          class="text-white bg-blue-700 p-2.5 border border-blue-800 h-auto hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Emprestar Livro
        </button>

        <div class="mt-4">
          <form id="home-form">
            <div class="grid gap-6 mb-6 md:grid-cols-3">
              <div>
                <label
                  for="book"
                  class="block mb-2 text-sm font-medium text-white"
                  >Pesquisar por livro</label
                >
                <input
                  type="text"
                  id="book"
                  name="book"
                  class="bg-gray-500 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Clean Code"
                />
              </div>
              <div>
                <label
                  for="user"
                  class="block mb-2 text-sm font-medium text-white"
                  >Pesquisar por usuário</label
                >
                <input
                  type="text"
                  id="user"
                  class="bg-gray-500 border border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="John"
                />
              </div>
              <div class="flex items-end gap-2">
                <button
                  type="submit"
                  class="text-white bg-blue-700 p-2.5 border border-blue-800 h-auto hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Pesquisar
                </button>
                <button
                  id="clean-search"
                  class="text-white p-2.5 border h-auto focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  Limpar
                </button>
              </div>
            </div>
          </form>
        </div>

        <div>
          <table class="box-border min-w-full shadow-sm rounded-lg overflow-hidden mt-4">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 bg-gray-700 border-b border-gray-700 font-bold text-left text-sm text-gray-200 uppercase tracking-wider">Livro</th>
                <th scope="col" class="px-6 py-3 bg-gray-700 border-b border-gray-700 font-bold text-left text-sm text-gray-200 uppercase tracking-wider">Portador</th>
                <th scope="col" class="px-6 py-3 bg-gray-700 border-b border-gray-700 font-bold text-left text-sm text-gray-200 uppercase tracking-wider">Data de Saída</th>
                <th scope="col" class="px-6 py-3 bg-gray-700 border-b border-gray-700 font-bold text-left text-sm text-gray-200 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody id="home-list">
              ${this.renderList(this.getFilteredBorrowedBooks())}
            </tbody>
          </table>
        </div>

        <!-- Modal -->
        <div
          id="lend-book-modal"
          tabindex="-1"
          aria-hidden="true"
          class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="modal-overlay fixed inset-0 bg-black opacity-50"></div>
          <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="relative bg-gray-700 rounded-lg shadow-2xl">
              <!-- Modal header -->
              <div
                class="flex items-center justify-between p-4 md:p-5 border-b border-gray-600 rounded-t"
              >
                <h3 class="text-xl font-semibold text-gray-200">
                  Emprestar Livro
                </h3>
                <button
                  type="button"
                  id="close-lend-book-modal"
                  class="text-gray-400 bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="default-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Fecha</span>
                </button>
              </div>
              <!-- Modal body -->
              <div class="p-4 md:p-5 space-y-4">
                <form id="lend-book-form">
                  <div class="mb-4">
                    <label
                      for="book-select"
                      class="block mb-1 text-sm font-medium text-white"
                      >Escolha um Livro</label
                    >
                    <select
                      id="book-select"
                      class="bg-gray-500 border border-gray-500 text-white text-sm rounded-lg w-full p-2"
                      required
                    >
                      <option value="">Selecione uma opção</option>
                      ${this.renderBookOptions()}
                    </select>
                  </div>
                  <div class="mb-4">
                    <label
                      for="user-select"
                      class="block mb-1 text-sm font-medium text-white"
                      >Escolha um Usuário</label
                    >
                    <select
                      id="user-select"
                      class="bg-gray-500 border border-gray-500 text-white text-sm rounded-lg w-full p-2"
                      required
                    >
                      <option value="">Selecione uma opção</option>
                      ${this.renderUserOptions()}
                    </select>
                  </div>
                  <button
                    type="submit"
                    class="text-white bg-blue-700 p-2.5 border border-blue-800 h-auto hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Registrar Empréstimo
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  public build(): void {
    const form = document.getElementById('home-form') as HTMLFormElement;
    form?.addEventListener('submit', (event) => this.search(event));

    const openModalButton = document.getElementById(
      'open-lend-book-modal'
    ) as HTMLButtonElement;
    const closeModalButton = document.getElementById(
      'close-lend-book-modal'
    ) as HTMLButtonElement;

    const cleanSearch = document.getElementById(
      'clean-search'
    ) as HTMLButtonElement;

    cleanSearch?.addEventListener('click', () => this.cleanSearch());

    const modal = document.getElementById('lend-book-modal') as HTMLDivElement;

    openModalButton?.addEventListener('click', () => {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
    closeModalButton?.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });

    const lendBookForm = document.getElementById(
      'lend-book-form'
    ) as HTMLFormElement;

    lendBookForm?.addEventListener('submit', (event) => this.lendBook(event));

    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target && target.matches('.return-book-button')) {
        const bookISBN = target.getAttribute('data-book-isbn');
        const userId = Number(target.getAttribute('data-user-id'));
        console.log(bookISBN, userId);
        this.handleReturnBook(bookISBN, userId);
      }
    });
  }

  private renderList(list: any[]): string {
    return list
      .map(
        (borrowedBook) => html`
          <tr class="bg-white border-b">
            <th
              scope="row"
              class="px-6 py-3 bg-gray-700 border-b border-gray-700 font-bold text-left text-sm text-gray-200 uppercase tracking-wider"
            >
              ${borrowedBook.book.title}
            </th>
            <th
              scope="row"
              class="px-6 py-3 bg-gray-700 border-b border-gray-700 font-bold text-left text-sm text-gray-200 uppercase tracking-wider"
            >
              ${borrowedBook.user.nome}
            </th>
            <th
              scope="row"
              class="px-6 py-3 bg-gray-700 border-b border-gray-700 font-bold text-left text-sm text-gray-200 uppercase tracking-wider"
            >
              ${formatDate(borrowedBook.date)}
            </th>
            <td
              scope="row"
              class="px-6 py-3 bg-gray-700 border-b border-gray-700 font-bold text-left text-sm text-gray-200 uppercase tracking-wider"
            >
              <button
                class="return-book-button text-white bg-red-600 p-2.5 border border-red-800 h-auto hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                data-book-isbn="${borrowedBook.book.ISBN}"
                data-user-id="${borrowedBook.user.ID}"
              >
                Devolver
              </button>
            </td>
          </tr>
        `
      )
      .join('');
  }

  private handleReturnBook(bookISBN: string | null, userId: number): void {
    const book = this.library.booksList.find((b) => b.ISBN === bookISBN);
    const user = this.library.usersList.find((u) => u.code === userId);

    if (book && user) {
      returnBook(this.library, user, book);
      this.updateTable();
    }
  }

  private lendBook(event: SubmitEvent) {
    event.preventDefault();

    const modal = document.getElementById('lend-book-modal') as HTMLDivElement;

    const form = event.target as HTMLFormElement;
    const bookSelect = form.elements.namedItem(
      'book-select'
    ) as HTMLSelectElement;
    const userSelect = form.elements.namedItem(
      'user-select'
    ) as HTMLSelectElement;

    const bookISBN = bookSelect.value;
    const userId = Number(userSelect.value);

    const book = this.library.booksList.find((b) => b.ISBN === bookISBN);
    const user = this.library.usersList.find((u) => u.code === userId);

    if (book && user) {
      lendBook(this.library, user, book);
      form.reset();
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      this.updateTable();
    }
  }

  private cleanSearch() {
    const searchBook = document.getElementById('home-form') as HTMLFormElement;
    searchBook.reset();

    this.searchTerm = '';
    this.searchTermUser = '';

    this.updateTable();
  }

  private search(event: SubmitEvent): void {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const bookInput = target?.elements.namedItem('book') as HTMLInputElement;
    const userInput = target?.elements.namedItem('user') as HTMLInputElement;
    this.searchTerm = bookInput.value.toLowerCase();
    this.searchTermUser = userInput.value.toLowerCase();
    this.updateTable();
  }

  private getFilteredBorrowedBooks(): any[] {
    if (!this.searchTerm && !this.searchTermUser)
      return this.library.borrowedBooks;

    return this.library.borrowedBooks.filter(
      (borrowedBook) =>
        borrowedBook.book.title.toLowerCase().includes(this.searchTerm) &&
        borrowedBook.user.name.toLowerCase().includes(this.searchTermUser)
    );
  }

  private updateTable(): void {
    const list = document.getElementById('home-list');
    if (list) {
      list.innerHTML = this.renderList(this.getFilteredBorrowedBooks());
    }
  }

  private renderBookOptions(): string {
    return this.library.booksList
      .map(
        (book) => html` <option value="${book.ISBN}">${book.title}</option> `
      )
      .join('');
  }

  private renderUserOptions(): string {
    return this.library.usersList
      .map((user) => html` <option value="${user.code}">${user.name}</option> `)
      .join('');
  }
}
