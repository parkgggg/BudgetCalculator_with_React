import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "./List";

export const Lists = React.memo(({ handleClick, todoData, setTodoData }) => {
  
  //드래그 이벤트 리스너
  const handleEnd = (result) => {
    if (!result.destination) return;

    const newTodoData = [...todoData];
    const [recorderdItem] = newTodoData.splice(result.source.index, 1);

    newTodoData.splice(result.destination.index, 0, recorderdItem);
    setTodoData(newTodoData);
    localStorage.setItem("todoData", JSON.stringify(newTodoData));
  };

  return (
    <DragDropContext onDragEnd={handleEnd}>
      <Droppable droppableId="todo">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todoData.map((data, index) => (
              <Draggable
                key={data.id}
                draggableId={data.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <List
                    handleClick={handleClick}
                    key={data.id}
                    id={data.id}
                    title={data.title}
                    cost={data.money}
                    todoData={todoData}
                    setTodoData={setTodoData}
                    provided={provided} 
                    snapshot={snapshot}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
});

export default Lists;
