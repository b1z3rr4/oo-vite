import './style.css'
import { App } from './App';
import { Library } from './entities/Library';

document.body.innerHTML = `
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
