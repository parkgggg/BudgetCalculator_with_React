import React from "react";

export default function Form({ handleSubmit, value, setValue, cost, setCost }) {
  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handleChangeCost = (e) => {
    setCost(e.target.value);
  };

  return (
    <form
      className="flex flex-wrap justify-center pt-2 items-center"
      onSubmit={handleSubmit}
    >
        
      <div className="w-1/2 p-2">
        <p className="text-orange-400">지출 항목</p>
        <input
          type="text"
          name="value"
          className="w-full outline-0 border-b border-lime-700 px-3 py-2 mr-4 text-gray-500 "
          placeholder="예) 렌트비"
          value={value}
          onChange={handleChangeValue}
        ></input>
      </div>
      <div className="w-1/2">
        <p className="text-orange-400">금액</p>
        <input
          type="number"
          name="cost"
          className="w-full outline-0 border-b border-lime-700 px-3 py-2 mr-4 text-gray-500 "
          placeholder="예) 1000"
          value={cost}
          onChange={handleChangeCost}
        ></input>
      </div>
      <div className="mr-auto px-2">
      <input
        type="submit"
        className="p-2 text-sm text-white bg-lime-700 transition-all hover:scale-110 duration-300 rounded"
        value="제출"
      >
        
      </input>
      
      </div>

    </form>
  );
}
