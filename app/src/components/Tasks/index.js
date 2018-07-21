/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';


/*
 * Local import
 */
import Task from './Task';


/*
 * Code
 */
const Tasks = ({ tasks, actions }) => (
  <ul id="todo-list">
    {tasks.map(task => (
      <Task
        key={task.id}
        {...task}
        {...actions}
      />
    ))}
  </ul>
);
Tasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
};


/*
 * Export default
 */
export default Tasks;
