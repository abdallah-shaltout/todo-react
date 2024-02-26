import { type TodoType } from "@/types";
function getTodos() {
    return (JSON.parse(localStorage.getItem("todos") || "[]") || []) as TodoType[];
}

function saveTodos(todos: TodoType[]) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteAllTodos() {
    localStorage.removeItem("todos");
}
function generate_string(len: number = 15) {
    const res: string[] = new Array(len);
    const alpha_beta = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    for (let i = 0; i <= len; i++) {
        res[i] = alpha_beta[Math.floor(Math.random() * alpha_beta.length + 1)];
    }
    return res.join("");
}

export { getTodos, saveTodos, deleteAllTodos, generate_string };
