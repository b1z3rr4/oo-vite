import { Library } from '../abstracts/Library';
import { Page } from '../abstracts/Page';
import { Book } from '../entities/Book';
import { DigitalBook } from '../entities/DigitalBook';
import { addBook } from '../use-cases/addBook';
import { html } from '../utils/html';

export class Books extends Page {
  private library: Library;

  constructor(library: Library) {
    super();
    this.library = library;
  }

  public render(): string {
    const books =
      this.library.booksList.length > 0 ? this.library.booksList : [];

    return html`
      <div class="container mx-auto p-4">
        <h2 class="text-4xl font-extrabold mb-8 text-white">Lista de Livros</h2>
        <button
          id="open-book-modal"
          class="text-white bg-blue-700 p-2.5 border border-blue-800 h-auto hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Adicionar
        </button>
        <table
          class="box-border min-w-full shadow-sm rounded-lg overflow-hidden mt-4"
        >
          <thead>
            <tr>
              <th
                class="px-6 py-3 bg-gray-700 border-b border-gray-700 font-bold text-left text-sm text-gray-200 uppercase tracking-wider"
              >
                Título
              </th>
              <th
                class="px-6 py-3 bg-gray-700 border-b border-gray-700 font-bold text-left text-sm text-gray-200 uppercase tracking-wider"
              >
                Autor
              </th>
              <th
                class="px-6 py-3 bg-gray-700 border-b border-gray-700 font-bold text-left text-sm text-gray-200 uppercase tracking-wider"
              >
                Código ISBN
              </th>
              <th
                class="px-6 py-3 bg-gray-700 border-b border-gray-700 font-bold text-left text-sm text-gray-200 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody class="bg-gray-600 divide-y divide-gray-700">
            ${books
              .map(
                (book) => html`
                  <tr>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
                    >
                      ${book.title}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
                    >
                      ${book.author}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
                    >
                      ${book.ISBN}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
                    >
                      ${book.available ? 'Disponível' : 'Emprestado'}
                    </td>
                  </tr>
                `
              )
              .join('')}
          </tbody>
        </table>

        <!-- Modal -->
        <div
          id="book-modal"
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
                  Registrar Livro
                </h3>
                <button
                  type="button"
                  id="close-book-modal"
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
                <form id="book-form" class="space-y-4">
                  <div>
                    <label
                      for="title"
                      class="block mb-1 text-sm font-medium text-white"
                      >Título</label
                    >
                    <input
                      type="text"
                      id="title"
                      name="title"
                      class="bg-gray-500 border border-gray-500 text-white text-sm rounded-lg w-full p-2"
                      placeholder="Título do Livro"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="author"
                      class="block mb-1 text-sm font-medium text-gray-700"
                      >Autor</label
                    >
                    <input
                      type="text"
                      id="author"
                      name="author"
                      class="bg-gray-500 border border-gray-500 text-white text-sm rounded-lg w-full p-2"
                      placeholder="Autor do Livro"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="isbn"
                      class="block mb-1 text-sm font-medium text-gray-700"
                      >Código ISBN</label
                    >
                    <input
                      type="text"
                      id="isbn"
                      name="isbn"
                      class="bg-gray-500 border border-gray-500 text-white text-sm rounded-lg w-full p-2"
                      placeholder="Código ISBN do Livro"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="format"
                      class="block mb-1 text-sm font-medium text-white"
                      >Formato</label
                    >
                    <select
                      id="format"
                      name="format"
                      class="bg-gray-500 border border-gray-500 text-white text-sm rounded-lg w-full p-2"
                      required
                    >
                      <option value="1">Físico</option>
                      <option value="2">Digital</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    class="text-white bg-blue-700 p-2.5 border border-blue-800 h-auto hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Adicionar Livro
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
    const modal = document.getElementById('book-modal');
    const openModalButton = document.getElementById('open-book-modal');
    const closeModalButton = document.getElementById('close-book-modal');
    const bookForm = document.getElementById('book-form') as HTMLFormElement;

    if (openModalButton && modal) {
      openModalButton.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      });
    }

    if (closeModalButton && modal) {
      closeModalButton.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      });
    }

    if (bookForm) {
      bookForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(bookForm);
        const title = formData.get('title') as string;
        const author = formData.get('author') as string;
        const isbn = formData.get('isbn') as string;
        const format = formData.get('format') as string;

        if (title && author && isbn) {
          const newBook =
            format === '1'
              ? new Book(title, author, isbn)
              : new DigitalBook(title, author, isbn, 'PDF');
          addBook(this.library, newBook);
          bookForm.reset();
          modal?.classList.add('hidden');
          modal?.classList.remove('flex');
          this.updateBookList();
        }
      });
    }
  }

  private updateBookList(): void {
    const booksTableBody = document.querySelector('tbody');
    if (booksTableBody) {
      booksTableBody.innerHTML = this.library.booksList
        .map(
          (book) => html`
            <tr>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
              >
                ${book.title}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
              >
                ${book.author}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
              >
                ${book.ISBN}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
              >
                ${book.available ? 'Disponível' : 'Emprestado'}
              </td>
            </tr>
          `
        )
        .join('');
    }
  }
}
