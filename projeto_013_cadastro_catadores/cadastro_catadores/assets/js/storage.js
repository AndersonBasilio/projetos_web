import { catadores } from "./dados.js";

export function salvarLocalStorage() {
    localStorage.setItem(
        "catadores",
        JSON.stringify(catadores)
    );
}