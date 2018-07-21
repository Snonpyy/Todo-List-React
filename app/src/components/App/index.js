/*
 * Npm import
 */
import React from 'react';


/*
 * Local import
 */
import Form from 'src/components/Form';
import Counter from 'src/components/Counter';
import Tasks from 'src/components/Tasks';
import tasksInitial from 'src/data';

/*
 * Code
 */
// On transforme l'array d'objets en array d'id
const ids = tasksInitial.map(obj => obj.id);
// Puis on "déverse" tous ces id en argument avec ...
// Et Math.max calcule l'id maximum
// Si l'array est vide, on fait lastId = 0
let lastId = ids.length > 0 ? Math.max(...ids) : 0;


/*
 * Component
 */
class App extends React.Component {
  /*
   * State initial
   */
  state = {
    tasks: tasksInitial,
    input: '',
  }


  /*
   * Actions
   */
  addTask = () => {
    // J'incrémente l'id
    lastId += 1;

    // On crée l'objet tâche
    const task = {
      id: lastId,
      label: this.state.input,
      done: false,
    };

    /* On ajoute la tâche au state */
    // On récupère l'ancienne liste + ajouter la nouvelle tâche
    // On donne à setState la nouvelle liste

    // Notation object
    this.setState({
      tasks: [task, ...this.state.tasks],
      input: '',
    });
  }

  checkTask = idToCheck => () => {
    // Je calcule mes nouvelles données
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === idToCheck) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });

    // Je mets à jour le state
    this.setState({ tasks: newTasks });
  }

  deleteTask = idToDelete => () => {
    // On crée un nouvel array sans la task idToDelete
    // C'est-à-dire si chacune des taches ont un id différent de idToDelete
    const newTasks = this.state.tasks.filter(task => task.id !== idToDelete);

    // On vient donner le nouveau state
    this.setState({ tasks: newTasks });
  }

  favoriteTask = idToFav => () => {
    // Je calcule ma nouvelle liste
    const newTasks = this.state.tasks.map((task) => {
      if (task.id === idToFav) {
        return {
          ...task,
          favorite: !task.favorite,
        };
      }
      return task;
    });

    // Je mets à jour le state
    this.setState({ tasks: newTasks });
  }

  changeInput = (value) => {
    this.setState({ input: value });
  }

  /*
   * Render
   */
  render() {
    // Vars
    const { tasks, input } = this.state;

    // On récupère les tâches pas effectuées
    const undoneTasks = tasks.filter(task => !task.done);

    // et on compte combien il y en a
    const count = undoneTasks.length;

    // Order tasks
    const orderedTasks = [
      // Tâches non effectuées favori
      ...undoneTasks.filter(task => task.favorite),
      // Tâches non effectuées non favori
      ...undoneTasks.filter(task => !task.favorite),
      // Tâches effectuées
      ...tasks.filter(task => task.done),
    ];



    // On retourne la vue
    return (
      <div id="todo">
        <Form
          onFormSubmit={this.addTask}
          onInputChange={this.changeInput}
          inputValue={input}
        />
        <Counter count={count} />
        <Tasks
          tasks={orderedTasks}
          actions={{
            onInputChange: this.checkTask,
            onDeleteTask: this.deleteTask,
            onFavoriteTask: this.favoriteTask,
          }}
        />
      </div>
    );
  }
}


/*
 * Export default
 */
export default App;
