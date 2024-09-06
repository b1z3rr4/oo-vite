export interface Page {
    render(): string
    build?: () => void;
}
