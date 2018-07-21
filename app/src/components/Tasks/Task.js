/*
 * Npm import
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Star from 'react-icons/lib/fa/star';
import EmptyStar from 'react-icons/lib/fa/star-o';
import Trash from 'react-icons/lib/fa/trash-o';


/*
 * Local import
 */


/*
 * Code
 */
const Task = ({
  id,
  done,
  label,
  favorite,
  onInputChange,
  onDeleteTask,
  onFavoriteTask,
}) => {
  const Fav = favorite ? Star : EmptyStar;
  return (
    <li
      className={classNames(
        'todo',
        { 'todo--done': done },
        { 'todo--favorite': favorite },
      )}
    >
      <input
        type="checkbox"
        className="todo-check"
        checked={done}
        onChange={onInputChange(id)}
      />
      <label className="todo-label">{label}</label>
      <Trash className="todo-trash" onClick={onDeleteTask(id)} />
      <Fav className="todo-star" onClick={onFavoriteTask(id)} />
    </li>
  );
};
Task.propTypes = {
  id: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onFavoriteTask: PropTypes.func.isRequired,
};


/*
 * Export default
 */
export default Task;
