import { App } from './App';
import { Library } from './entities/Library';
import './style.css';
import { html } from './utils/html';

document.body.innerHTML = html`
  <nav class="p-4 text-white shadow-md">
    <div class="container flex items-center justify-between mx-auto">
      <a data-route="/" href="#" class="text-lg font-semibold text-white">
        Biblioteca
      </a>
      <div class="space-x-4">
        <a data-route="/users" href="#" class="text-white font-bold"
          >Usuários</a
        >
        <a data-route="/books" href="#" class="text-white font-bold">Livros</a>
      </div>
    </div>
  </nav>
  <main class="container p-4 mx-auto">
    <div id="app"></div>
  </main>
`;

const appElement = document.getElementById('app');

const library = new Library();

if (appElement) {
  const app = new App(appElement, library);
  app.init();
}
