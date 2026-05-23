import { catadores } from "./dados.js";

let grafico;

export function atualizarCards() {

    document.getElementById("total").innerText =
        catadores.length;

    document.getElementById("ativos").innerText =
        catadores.filter(c => c.status === "Ativo").length;

    document.getElementById("inativos").innerText =
        catadores.filter(c => c.status === "Inativo").length;
}

export function atualizarGrafico() {

    const ativos =
        catadores.filter(c => c.status === "Ativo").length;

    const inativos =
        catadores.filter(c => c.status === "Inativo").length;

    const ctx =
        document.getElementById("graficoPizza");

    if (!ctx) return;

    if (grafico) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: "pie",

        data: {
            labels: ["Ativos", "Inativos"],

            datasets: [{
                data: [ativos, inativos],

                backgroundColor: [
                    "#22c55e",
                    "#ef4444"
                ]
            }]
        }
    });
}