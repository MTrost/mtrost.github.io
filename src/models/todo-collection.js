class TodoCollection extends BaseCollection {

  constructor(tag, bus) {

    // Configuration
    var localStorage_key = 'todos';

    super(tag, localStorage_key, bus);

    // // Setup
    // this.fetch();
    // this.bus.on('projectSelected', (el, uuid) => {
    //  this.all(uuid);
    // });
  }

  add(model) {
    super.add(model);
    this.bus.trigger('todosUpdated');
  }

  all(selectedProject) {
debugger;
    if(selectedProject) {
      return this.collection.filter((todo) => {return todo.project === selectedProject;});
    }
    else return this.collection;
  }

}
