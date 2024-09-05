import { Library } from "./entities/Library";

export class App { 
    private _appElement: HTMLElement;
    private _library: Library;

    constructor(appElement: HTMLElement, library: Library) {
        this._appElement = appElement;
        this._library = library;
    }

    public init() {}

    public navigate() {}

    public render() {}
}
