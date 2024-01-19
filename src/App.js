import React, { useState } from "react";
import "./App.css";
import { List } from "./components/List";
import Form from "./components/Form";
import Alert from "./components/Alert";

const App = () => {
  //항목
  const [charge, setCharge] = useState("");
  //금액
  const [cost, setCost] = useState(0);
  //고유 key로 사용할 id
  const [id, setId] = useState("");
  //수정 중인지 확인하는 플래그
  const [edit, setEdit] = useState(false);

  //
  const [alert, setAlert] = useState({ show: false });

  //지출 항목 객체(테스트용 초기값 3개)
  const [expenses, setExpenses] = useState([
    { id: 1, charge: "렌트비", cost: 2000 },
    { id: 2, charge: "교통비", cost: 400 },
    { id: 3, charge: "식비", cost: 1200 },
  ]);

  //항목 setter (Form.js에서 onChange()와 사용)
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  //금액 setter (Form.js에서 onChange()와 사용)
  const handleCost = (e) => {
    setCost(e.target.valueAsNumber);
  };

  const clearAll = () => {
    setExpenses([]);
  };

  //상태 변경 알림 창(7초)
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 7000);
  };

  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
    handleAlert({ type: "danger", text: "아이템이 삭제되었습니다." });
  };

  //선택된 항목을 수정하기 위해 기존값 가져오기(후에 입력창으로 넘겨줌)
  const handleEdit = (id) => {
    const expense = expenses.find((item) => item.id === id);
    const { charge, cost } = expense;
    setId(id);
    setCharge(charge);
    setCost(cost);
    setEdit(true);
  };

  //입력 버튼 이벤트 리스너
  const handleSubmit = (e) => {
    e.preventDefault();

    //항목과 금액이 정확하게 입력되었을 때만,
    if (charge !== "" && cost > 0) {
      //수정 후 다시 등록하는 경우, 항목명과 금액을 바꿔줘야 됨
      if (edit) {
        //불변성 유지를 위해 새로운 expenses를 생성(깊은 복사)
        //id가 동일한 항목(선택된 항목)인 경우에만 수정 후 복사
        const newExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, cost } : item;
        });
        //expenses state 새로 만든 newExpenses 할당
        setExpenses(newExpenses);
        //Edit 플래그 상태 변경
        setEdit(false);
        handleAlert({ type: "success", text: "아이템이 수정되었습니다" });
      } else {
        const newExpense = { id: crypto.randomUUID(), charge, cost };

        //불변성 유지를 위해 새로운 expenses를 생성(깊은 복사)
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
        handleAlert({ type: "success", text: "아이템이 생성되었습니다." });
      }

      setCharge("");
      setCost(0);
    } else {
      handleAlert({
        type: "danger",
        text: "charge는 빈 값일 수 없으며 cost는 0보다 커야 합니다.",
      });
    }
  };

  return (
    <main className="main-container">
      {/* header - "main" - footer */}

      {/*상태 변경 메시지*/}
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}

      <h1>예산 계산기</h1>
      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        {/* 입력란 및 제출 버튼 Form*/}
        <Form
          handleSubmit={handleSubmit}
          charge={charge}
          handleCharge={handleCharge}
          cost={cost}
          handleCost={handleCost}
          edit={edit}
        />
      </div>

      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        <List
          expenses={expenses}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          clearAll={clearAll}
        />
      </div>

      <div
        className={{
          display: "flex",
          justifyContent: "end",
          marginTop: "1rem",
        }}
      >
        <p style={{ fontSize: "2rem" }}>
          총지출:
          <span>
            {expenses.reduce((acc, curr) => {
              return (acc += curr.cost);
            }, 0)}
            원
          </span>
        </p>
      </div>
    </main>
  );
};

export default App;
