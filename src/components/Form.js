import React from "react";
import { MdSend } from 'react-icons/md';
import "./Form.css";

const Form = ({
  handleSubmit,
  charge,
  handleCharge,
  cost,
  handleCost,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* Submit 이벤트 발생 시 handleSubmit 호출 */}
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">지출 항목</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            value={charge}
            placeholder="예) 렌트비"
            onChange={handleCharge}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="charge">비용</label>
        <input
          type="number"
          className="form-control"
          id="cost"
          name="cost"
          value={cost}
          placeholder="예) 렌트비"
          onChange={handleCost}
        />
      </div>
      <div>
        <button type="submit" className="btn">
          {edit ? "수정" : "제출"}
          <MdSend className="btn-icon"/>
        </button>
      </div>
    </form>
  );
};

export default Form