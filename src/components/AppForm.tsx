import { useState, useRef } from "react";

export default function AppForm({ AddTodo }: { AddTodo: (todo: string) => void }) {
    const [todo, setTodo] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <form
            className="fc w-full"
            onSubmit={(event) => {
                event.preventDefault();
                AddTodo(todo);
                setTodo("");
                if (inputRef.current) {
                    inputRef.current.value = "";
                    inputRef.current?.focus();
                }
            }}>
            <input
                ref={inputRef}
                onInput={(e) => setTodo((e.target as HTMLInputElement).value)}
                id="todoInput"
                type="text"
                className="flex-1 border border-violet-600 focus:outline-none py-1.5 px-3 text-lg rounded-l bg-transparent text-light placeholder:text-light-50/30"
                placeholder="What is the task today?"
            />
            <button
                type="submit"
                className="py-3 px-2 text-sm sm:text-base  bg-violet-600 text-light rounded-r sm:px-5 sm:py-2.5 trans hover:bg-violet-400 focus:outline focus:outline-2 focus:outline-violet-600 font-semibold">
                Add Task
            </button>
        </form>
    );
}
