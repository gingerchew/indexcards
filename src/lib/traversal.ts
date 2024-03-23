export function getById<TElement>(id: string): TElement|null {
    const foundEl = document.getElementById(id) as TElement;

    return foundEl;
}