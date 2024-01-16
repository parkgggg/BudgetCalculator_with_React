import React, { useState } from "react";

const List = React.memo(
  ({
    handleClick,
    id,
    title,
    cost,
    todoData,
    setTodoData,
    provided,
    snapshot,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedCost, setEditedCost] = useState(cost);

    // 항목 수정 리스너
    const handleEditTitleChange = (e) => {
      setEditedTitle(e.target.value);
    };

    const handleEditCostChange = (e) => {
      setEditedCost(e.target.value);
    };

    //수정 후 제출 버튼 클릭 이벤트 리스너
    const handleSubmit = (e) => {
      e.preventDefault();

      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = editedTitle;
          data.money = editedCost;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div
          className={`flex items-center justify-between w-full px-4 py-1 my-2 bg-gray-100 text-gray-600  border rounded`}
        >
          <div className="items-center">
            <form onSubmit={handleSubmit}>
              <input
                className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
                value={editedTitle}
                onChange={handleEditTitleChange}
                autoFocus
              />
              <input
                className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
                value={editedCost}
                onChange={handleEditCostChange}
                autoFocus
              />
            </form>
            <span>
              {title}
              {cost}
            </span>
          </div>
          <div className="items-center">
            <button
              className="px-4 py-2 float-right"
              onClick={() => setIsEditing(false)}
            >
              x
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="px-4 py-2 float-right"
            >
              Save
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging ? "bg-gray-400" : "bg-white"
          } flex items-center justify-between w-full px-4 py-1 my-2 text-black border-2 border-gray-200 transition-all hover:scale-110 duration-300`}
        >
          <div className="w-full flex items-center justify-between">
            {" "}
            <div className="w-1/2 p-3 ">{title}</div>
            <div className="flex w-1/2 items-center">
              <div className="w-3/4 p-3 text-gray-300">{cost}</div>
              <div className="w-1/4 p- items-center ">
                <button
                  className="px-1 py-py mr-1"
                  onClick={() => setIsEditing(true)}
                >
                  <svg className="w-5 h-5 fill-red-300" viewBox="0 0 20 20">
                    <path d="M18.303,4.742l-1.454-1.455c-0.171-0.171-0.475-0.171-0.646,0l-3.061,3.064H2.019c-0.251,0-0.457,0.205-0.457,0.456v9.578c0,0.251,0.206,0.456,0.457,0.456h13.683c0.252,0,0.457-0.205,0.457-0.456V7.533l2.144-2.146C18.481,5.208,18.483,4.917,18.303,4.742 M15.258,15.929H2.476V7.263h9.754L9.695,9.792c-0.057,0.057-0.101,0.13-0.119,0.212L9.18,11.36h-3.98c-0.251,0-0.457,0.205-0.457,0.456c0,0.253,0.205,0.456,0.457,0.456h4.336c0.023,0,0.899,0.02,1.498-0.127c0.312-0.077,0.55-0.137,0.55-0.137c0.08-0.018,0.155-0.059,0.212-0.118l3.463-3.443V15.929z M11.241,11.156l-1.078,0.267l0.267-1.076l6.097-6.091l0.808,0.808L11.241,11.156z"></path>
                  </svg>
                </button>
                <button className="px-1 py-py" onClick={() => handleClick(id)}>
                  <svg className="w-5 h-5 fill-red-300" viewBox="0 0 20 20">
                    <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default List;
