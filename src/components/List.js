import React from "react";
import { MdDelete } from "react-icons/md";
import "./List.css";
import Item from "./Item";

export const List = ({ expenses, handleEdit, handleDelete, clearAll }) => {
  return (
    <>
      {/* <> == <React Fragement> JSX는 여러 태그들을 나열할 때, */}
      {/* 하나의 부모 태그로 감싸줘야함. 불필요한 <div>를 하나 더 만드는 대신 <>, <React Fragment> 사용  */}
      <ul className="list">
        {/* 각 항목 리스트 */}
        {expenses.map((expense) => {
          return (
            <Item
              expense={expense}
              key={expense.id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearAll}>
          목록 지우기
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default Item;
