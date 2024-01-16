import React, { useState, useCallback } from "react";
import "./App.css";
import Lists from "./components/Lists.js";
import Form from "./components/Form.js";

const initialTodoData = localStorage.getItem("todoData")
  ? JSON.parse(localStorage.getItem("todoData"))
  : [];

export default function App() {
  const [todoData, setTodoData] = useState(initialTodoData);

  const [value, setValue] = useState("");
  const [cost, setCost] = useState(0);

  //삭제 버튼 이벤트 리스너
  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    },
    [todoData]
  );

  //입력 버튼 이벤트 리스너
  const handleSubmit = (e) => {
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: value,
      money: cost,
    };

    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
    setCost(0);
    localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));
  };

  //목록 지우기 이벤트 리스너
  const handleRemoveClick = () => {
    setTodoData([]);
    localStorage.setItem("todoData", JSON.stringify([]));
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-orange-400">
        <div>예산 계산기</div>

        <div className="w-full p-6 m-4 bg-white shadow md:w-3/4 md:max-w-screen-md lg:w-3/4 lg:max-w-screen-md">
          <Form
            handleSubmit={handleSubmit}
            value={value}
            setValue={setValue}
            cost={cost}
            setCost={setCost}
          />
          <Lists
            handleClick={handleClick}
            todoData={todoData}
            setTodoData={setTodoData}
          />

          <div className="flex justify-between mb-3 ">
            <button
              onClick={handleRemoveClick}
              className="flex flex-row items-center justify-center w-full px-4 py-4 mb-4 text-sm font-bold bg-lime-700 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10 hover:shadow-lg hover:-translate-y-1"
            >
              목록 지우기
              <span className="ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 fill-white"
                >
                  <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
