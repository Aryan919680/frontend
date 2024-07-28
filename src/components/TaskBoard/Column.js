// import React from 'react';
// import Task from './Task';

// const Column = ({ status, tasks, onStatusChange, onDelete }) => {
//   return (
//     <div className="column">
//       <h2>{status}</h2>
//       {tasks.map((task) => (
//         <Task
//           key={task._id}
//           task={task}
//           onStatusChange={onStatusChange}
//           onDelete={onDelete}
//         />
//       ))}
//     </div>
//   );
// };

// export default Column;

import React from 'react';
import styled from 'styled-components';

const Column = ({ status, tasks, onStatusChange, onDelete }) => {
  return (
    <ColumnContainer>
      <h2>{status}</h2>
      {tasks.map(task => (
        <TaskCard key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
          <ButtonGroup>
            <button onClick={() => onDelete(task._id)}>Delete</button>
            <button onClick={() => onStatusChange(task._id, 'Edit')}>Edit</button>
            <button>View Details</button>
          </ButtonGroup>
        </TaskCard>
      ))}
    </ColumnContainer>
  );
};

export default Column;

const ColumnContainer = styled.div`
  flex: 1;
  padding: 10px;
  background-color: #f5f5f5;
  margin: 0 10px;
  border-radius: 5px;

  h2 {
    text-align: center;
  }
`;

const TaskCard = styled.div`
  background-color: #e3f2fd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;

  h3 {
    margin-top: 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    margin-top: 10px;
    padding: 5px;
    background-color: #90caf9;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
`;
