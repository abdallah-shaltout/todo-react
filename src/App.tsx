import AppForm from "@/components/AppForm";
import AppItem from "@/components/AppItem";
import { generate_string, saveTodos, getTodos } from "@/libs";
import { type TodoType } from "@/types";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function App() {
    const [parent] = useAutoAnimate();
    const [todos, setTodos] = useState<TodoType[]>([]);
    const TodoListItems = todos.map((todo) => (
        <AppItem key={todo.id} todo={todo} DeleteTodo={DeleteTodo} UpdateTodo={UpdateTodo} />
    ));

    useEffect(() => {
        const savedTodos = getTodos();
        if (savedTodos) {
            setTodos(savedTodos);
        }
    }, []);
    function AddTodo(todo: string) {
        if (!todo.length) return;
        const res = [
            {
                id: generate_string(),
                title: todo,
                completed: false,
            },
            ...todos,
        ];
        setTodos(res);
        saveTodos(res);
    }

    function DeleteTodo(id: string) {
        const res = todos.filter((todo) => todo.id !== id);
        setTodos(res);
        saveTodos(res);
    }

    function UpdateTodo(id: string, todo: TodoType) {
        if (!todo.title) return;
        const res = todos.map((t) => (t.id === id ? todo : t));
        setTodos(res);
        saveTodos(res);
    }

    return (
        <>
            <div className="petit-formal text-center mt-5">
                <h1 className="text-3xl lg:text-6xl ">My React Todo App</h1>
                <h2 className="text-xl text-amber-500 font-bold trans hover:text-light cursor-default">
                    By Abdallah Shaltout
                </h2>
                <a
                    target="_blank"
                    href="https://github.com/abdallah-shaltout/todo-react"
                    className="bg-slate-800 px-4 flex-center gap-3 font-medium mx-auto w-fit my-2 py-2 text-xl !font-sans rounded-md trans hover:bg-slate-700">
                    <span>GitHub</span>
                    <i className="bi bi-github"></i>
                </a>
            </div>
            <div className="bg-slate-800 p-5 rounded-md shadow  mx-auto max-w-xl w-nine flex-center flex-col gap-4 ">
                <h1 className="text-3xl ">Get Things Done!</h1>
                <AppForm AddTodo={AddTodo} />
                <ul
                    ref={parent}
                    className="w-full flex flex-col gap-3 overflow-y-auto max-h-[55vh] custom-scroll pr-2">
                    {TodoListItems}
                </ul>
            </div>
        </>
    );
}

export default App;
