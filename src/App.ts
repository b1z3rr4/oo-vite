import { Library } from "./entities/Library";
import { Page } from "./interfaces/Page";

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
        let pageComponent: Page = { render: () => 'oi', build: () => { } };

        switch (path) {
            case '/':
                pageComponent = { render: () => 'home', build: () => { } }
                break;
            case '/users':
                pageComponent = { render: () => 'usuarios', build: () => { } }
                break;
            case '/books':
                pageComponent = { render: () => 'livros', build: () => { } }
                break;
            default:
                pageComponent = { render: () => '404 nao encontrei', build: () => { } }
                break;
        }

        this._appElement.innerHTML = pageComponent.render();
        pageComponent.build();
    }
}
