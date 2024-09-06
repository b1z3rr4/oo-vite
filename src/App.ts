import { Library } from './abstracts/Library';
import { Page } from './abstracts/Page';
import { NotFound } from './pages/404';
import { Books } from './pages/books';
import { Home } from './pages/home';
import { Users } from './pages/users';

export class App {
  private _appElement: HTMLElement;
  private _library: Library;

  constructor(appElement: HTMLElement, library: Library) {
    this._appElement = appElement;
    this._library = library;
  }

  public init() {
    this.render();

    document.body.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (target && target.dataset.route) {
        event.preventDefault();
        this.navigate(target.dataset.route);
      }
    });

    window.addEventListener('popstate', () => this.render());
  }

  public navigate(path: string) {
    history.pushState(null, '', path);
    this.render();
  }

  public render() {
    const path = window.location.pathname;
    let pageComponent: Page;

    switch (path) {
      case '/':
        pageComponent = new Home(this._library);
        break;
      case '/users':
        pageComponent = new Users(this._library);
        break;
      case '/books':
        pageComponent = new Books(this._library);
        break;
      default:
        pageComponent = new NotFound();
        break;
    }

    this._appElement.innerHTML = pageComponent.render();
    pageComponent.build();
  }
}
