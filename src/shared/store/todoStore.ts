import { create } from "zustand";

// types
type todoListType = {
  id: number;
  isChecked: boolean;
  list: string;
};
type categoryType = {
  id: number;
  categoryName: string;
  isUsed: boolean;
  todoList: todoListType[];
};

type storeType = {
  categoryList: categoryType[];
  name: string;
  allCategory: (argTodo: []) => void;
  addName: (argName: string) => void;
  addCategory: (argCategory: categoryType) => void;
  removeCategory: (argId: number) => void;
  changeIsUsed: (argCategory: categoryType) => void;
  addList: (argTodoList: todoListType) => void;
  removeList: (argTodoList: todoListType) => void;
  changeIsChecked: (argTodoList: todoListType) => void;
};

export const useTodoStore = create<storeType>((set, get) => ({
  // states
  categoryList: [
    {
      id: 1,
      categoryName: "Home",
      isUsed: true,
      todoList: [],
    },
  ],
  name: "",

  // refactor...

  // name of the user
  addName: (argName) => {
    set(() => ({ name: argName }));
    localStorage.setItem("todo-name", JSON.stringify(get().name));
  },

  // categoryFn
  allCategory: (argTodo) => {
    set((state: storeType) => ({
      categoryList: argTodo,
    }));
  },
  addCategory: (argCategory) => {
    set((state: storeType) => ({
      categoryList: [...state.categoryList, argCategory],
    }));
    localStorage.setItem("todo-data", JSON.stringify(get().categoryList));
  },
  removeCategory: (argId) => {
    set((state: storeType) => ({
      categoryList: state.categoryList.filter(
        (item: categoryType) => argId !== item.id
      ),
    }));
    localStorage.setItem("todo-data", JSON.stringify(get().categoryList));
  },
  changeIsUsed: (argCategory) => {
    set((state: storeType) => ({
      categoryList: state.categoryList.map((item: categoryType) => {
        if (argCategory.categoryName === item.categoryName) {
          return {
            id: item.id,
            categoryName: item.categoryName,
            isUsed: true,
            todoList: item.todoList,
          };
        }
        return {
          id: item.id,
          categoryName: item.categoryName,
          isUsed: false,
          todoList: item.todoList,
        };
      }),
    }));
    localStorage.setItem("todo-data", JSON.stringify(get().categoryList));
  },

  // todoList
  // adding list in the chosen category
  addList: (argTodoList) => {
    set((state: storeType) => ({
      categoryList: state.categoryList.map((item: categoryType) => {
        if (item.isUsed) {
          return {
            id: item.id,
            categoryName: item.categoryName,
            isUsed: true,
            todoList: [...item.todoList, argTodoList],
          };
        }
        return item;
      }),
    }));
    localStorage.setItem("todo-data", JSON.stringify(get().categoryList));
  },
  removeList: (argTodoList) => {
    set((state: storeType) => ({
      categoryList: state.categoryList.map((item: categoryType) => {
        if (item.isUsed === true) {
          return {
            id: item.id,
            categoryName: item.categoryName,
            isUsed: item.isUsed,
            todoList: item.todoList.filter((item: todoListType) => {
              return item.id !== argTodoList.id;
            }),
          };
        }
        return item;
      }),
    }));
    localStorage.setItem("todo-data", JSON.stringify(get().categoryList));
  },
  changeIsChecked: (argTodoList) => {
    set((state: storeType) => ({
      categoryList: state.categoryList.map((item: categoryType) => {
        if (item.isUsed === true) {
          return {
            id: item.id,
            categoryName: item.categoryName,
            isUsed: item.isUsed,
            todoList: item.todoList.map((item: todoListType) => {
              if (item.id === argTodoList.id) {
                return {
                  id: item.id,
                  isChecked: !item.isChecked,
                  list: item.list,
                };
              } else return item;
            }),
          };
        }
        return item;
      }),
    }));
    localStorage.setItem("todo-data", JSON.stringify(get().categoryList));
  },
}));
