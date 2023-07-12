import { types } from "mobx-state-tree";

const Todo = types
  .model("Todo", {
    id: types.identifier,
    text: types.string,
    completed: false,
  })
  .actions((self) => ({
    toggle() {
      self.completed = !self.completed;
    },
  }));

const TodoStore = types
  .model("TodoStore", {
    todos: types.array(Todo),
  })
  .views((self) => ({
    get completedTodosCount() {
      return self.todos.filter((todo) => todo.completed).length;
    },
  }))
  .actions((self) => ({
    addTodo(todo) {
      self.todos.unshift(todo);
    },
    removeTodo(todoId) {
      const index = self.todos.findIndex((todo) => todo.id === todoId);
      if (index !== -1) {
        self.todos.splice(index, 1);
      }
    },
  }));

//   // Persist the TodoList model in local storage
// const persistedTodoList = persist("todoList", TodoStore);

// // Create the root store
// const RootStore = types.model("RootStore", {
//   todoList: TodoStore,
// });

// // Create the hooks for accessing the stores
// const { useStore } = createTypedHooks<RootStore>();

// // Create the initial state
// const initialState = {
//   todoList: {
//     todos: [],
//   },
// };

// // Create a function to initialize the state
// const initializeStore = (snapshot = initialState) => {
//   const store = RootStore.create(snapshot);
//   return store;
// };

export default TodoStore;
