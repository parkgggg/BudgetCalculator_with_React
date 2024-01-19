import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Item.css";

const Item = ({ expense, handleDelete, handleEdit }) => {
  return (
    <li className="item">
      <div className="info">
        <span className="expense">{expense.charge}</span>
        <span className="cost">{expense.cost}</span>
      </div>
      <div>
        <button className="edit-btn" onClick={() => handleEdit(expense.id)}>
          <MdEdit />
        </button>
        <button className="clear-btn" onClick={() => handleDelete(expense.id)}>
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default Item;
