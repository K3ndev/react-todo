import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Sidebar, TodoList, ModalLogin } from "./shared/components/index";
import { useTodoStore } from "./shared/store/todoStore";

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
  addName: (argName: string) => void;
  allCategory: (argTodo: []) => void;
  name: string;
};
function App() {
  // store
  const { name, addName, allCategory } = useTodoStore<storeType>(
    (states) => states
  );

  // states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const date = new Date();
  const day = format(date, "iiii");
  const month = format(date, "MMM");
  const dayNum = format(date, "dd");
  const periodFN = () => {
    const tempPeriod = format(date, "a");
    if (tempPeriod === "PM") {
      return "afternoon";
    } else {
      return "morning";
    }
  };
  const period = periodFN();

  const getLocalData = () => {
    return localStorage.getItem("todo-data");
  };
  const getLocalName = () => {
    return localStorage.getItem("todo-name");
  };
  useEffect(() => {
    if (getLocalData() !== null) {
      allCategory(JSON.parse(getLocalData()!));
    }
    if (getLocalName() === null) {
      setIsModalOpen(true);
      addName("Human");
    }

    if (getLocalName() !== null) {
      addName(JSON.parse(getLocalName()!));
    }
  }, []);

  return (
    <>
      {isModalOpen && <ModalLogin setIsModalOpen={setIsModalOpen} />}
      <main className="relative flex h-screen w-screen gap-7 bg-[#EAEDEE] p-10">
        <Sidebar />

        <section className="flex h-[90vh] w-full flex-col items-center gap-7 lg:w-[66%]">
          <div className="flex w-full flex-col gap-4 md:w-[100%]">
            <div className="flex justify-start w-full mt-9">
              <div className="flex gap-5">
                <div className="w-full">
                  <h1 className="w-full text-xl font-normal leading-none text-black md:text-2xl lg:text-3xl">
                    Good {period} {name}
                  </h1>
                  <p className="text-base	font-normal leading-6 text-[#6D6D6D] md:text-base lg:text-2xl">
                    It&apos;s {day}, {month} {dayNum}
                  </p>
                </div>
              </div>
            </div>
            <TodoList />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
