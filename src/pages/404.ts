import { Page } from '../abstracts/Page';
import { html } from '../utils/html';

export class NotFound extends Page {
  render(): string {
    return html`
      <h1 class="text-red-700 text-2xl">404</h1>
      <p>Pagina não encontrada!</p>
    `;
  }
}
