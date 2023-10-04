import { defineStore } from "pinia";

export const useTodoListStore = defineStore('todolist', {
    state: () => ({
        todoList: [],
        id: 0
    }),
    actions: {
        addTodo(item) {
            this.todoList.push({ item, id: this.id++, completed: false });
        },
        deleteTodo(itemId) {
            this.todoList = this.todoList.filter(x => {
                return x.id !== itemId;
            });
        },
        toggleCompleted(idToFind) {
            const todo = this.todoList.find(x => x.id === idToFind);
            if(todo) {
                todo.completed = !todo.completed;
            }
        }
    }
});
