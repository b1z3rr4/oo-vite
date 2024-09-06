export abstract class Page {
  constructor() {}

  abstract render(): string;

  build(): void {}
}
