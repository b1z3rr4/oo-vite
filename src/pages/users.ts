import { Library } from '../abstracts/Library';
import { User } from '../entities/User';
import { addUser } from '../use-cases/addUser';
import { html } from '../utils/html';

export class Users {
  private library: Library;

  constructor(library: Library) {
    this.library = library;
  }

  public render(): string {
    const users =
      this.library.usersList?.length > 0 ? this.library.usersList : [];

    return html`
      <div class="container mx-auto p-4">
        <h2 class="text-4xl font-extrabold mb-8 text-white">
          Lista de Usuários
        </h2>
        <button
          id="open-modal"
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
                Nome
              </th>
              <th
                class="px-6 py-3 bg-gray-700 border-b border-gray-700 font-bold text-left text-sm text-gray-200 uppercase tracking-wider"
              >
                Código
              </th>
            </tr>
          </thead>
          <tbody class="bg-gray-600 divide-y divide-gray-700">
            ${users
        .map(
          (user) => html`
                  <tr>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
                    >
                      ${user.name}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
                    >
                      ${user.code}
                    </td>
                  </tr>
                `
        )
        .join('')}
          </tbody>
        </table>

        <!-- Modal -->
        <div
          id="user-modal"
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
                  Registrar Usuário
                </h3>
                <button
                  type="button"
                  id="close-modal"
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
                <form id="user-form" class="space-y-4">
                  <div>
                    <label
                      for="nome"
                      class="block mb-1 text-sm font-medium text-white"
                      >Nome</label
                    >
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      class="bg-gray-500 border border-gray-500 text-white text-sm rounded-lg w-full p-2"
                      placeholder="Nome do Usuário"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="id"
                      class="block mb-1 text-sm font-medium text-white"
                      >Código</label
                    >
                    <input
                      type="number"
                      id="id"
                      name="id"
                      class="bg-gray-500 border border-gray-500 text-white text-sm rounded-lg w-full p-2"
                      placeholder="Código do Usuário"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    class="text-white bg-blue-700 p-2.5 border border-blue-800 h-auto hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  >
                    Adicionar Usuário
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
    const modal = document.getElementById('user-modal');
    const openModalButton = document.getElementById('open-modal');
    const closeModalButton = document.getElementById('close-modal');
    const userForm = document.getElementById('user-form') as HTMLFormElement;

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

    if (userForm) {
      userForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(userForm);
        const nome = formData.get('nome') as string;
        const id = parseInt(formData.get('id') as string, 10);

        if (nome && !isNaN(id)) {
          const newUser = new User(nome, id);
          addUser(this.library, newUser);
          userForm.reset();
          modal?.classList.add('hidden');
          modal?.classList.remove('flex');
          this.updateUserList();
        }
      });
    }
  }

  private updateUserList(): void {
    const usersTableBody = document.querySelector('tbody');
    if (usersTableBody) {
      usersTableBody.innerHTML = this.library.usersList
        .map(
          (user) => html`
            <tr>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
              >
                ${user.name}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
              >
                ${user.code}
              </td>
            </tr>
          `
        )
        .join('');
    }
  }
}
