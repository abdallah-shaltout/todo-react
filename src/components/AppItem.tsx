import { type TodoType } from "@/types";
import { useState, useRef, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function AppItem({
    todo,
    DeleteTodo,
    UpdateTodo,
}: {
    todo: TodoType;
    DeleteTodo: (id: string) => void;
    UpdateTodo: (id: string, todo: TodoType) => void;
}) {
    const [parent] = useAutoAnimate();
    const editInput = useRef<HTMLInputElement>(null);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(todo.title);
    useEffect(() => {
        if (editInput.current && showEdit) {
            editInput.current.focus();
            editInput.current.value = todo.title;
        }
    }, [showEdit, todo.title]);

    return (
        <li
            ref={parent}
            className={`bg-violet-600 text-light trans w-full  rounded ${
                todo.completed && "!bg-slate-700 "
            }`}>
            {showEdit ? (
                <form
                    className="flex-between sm:gap-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setShowEdit(false);
                        UpdateTodo(todo.id, { ...todo, title });
                    }}>
                    <div className="flex-1 max-w-full">
                        <input
                            ref={editInput}
                            onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
                            type="text"
                            className="w-full font-bold py-3 px-4 bg-transparent focus:outline-none"
                            placeholder="What is the task today?"
                        />
                    </div>
                    <div className="fc gap-1 text-lg pr-4 py-2">
                        <button type="submit" className="icon-btn">
                            <i className="bi bi-check-lg"></i>
                        </button>
                        <button
                            type="button"
                            className="icon-btn"
                            onClick={() => {
                                setShowEdit(false);
                                setTitle(todo.title);
                            }}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                </form>
            ) : (
                <div className="flex-between gap-2">
                    <p
                        className={`font-bold flex-1 cursor-pointer px-4 py-3  ${
                            todo.completed && "line-through text-light-50/50"
                        }`}
                        onClick={() =>
                            UpdateTodo(todo.id, { ...todo, completed: !todo.completed })
                        }>
                        {todo.title}
                    </p>
                    <div className="fc gap-1 text-lg  pr-4 py-2">
                        <button
                            className="icon-btn"
                            disabled={todo.completed}
                            onClick={() => setShowEdit(true)}>
                            <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="icon-btn" onClick={() => DeleteTodo(todo.id)}>
                            <i className="bi bi-trash2-fill"></i>
                        </button>
                    </div>
                </div>
            )}
        </li>
    );
}
