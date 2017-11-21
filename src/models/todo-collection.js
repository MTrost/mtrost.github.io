class TodoCollection extends BaseCollection {

  constructor(tag, bus) {

    // Configuration
    var localStorage_key = 'todos';

    super(tag, localStorage_key, bus);

    // Setup
    this.fetch();
//     this.bus.on('deleteIssue', (uuid) => {
//       this.deleteIssue(uuid);
//       this.bus.trigger('todosUpdated');
//     });
//     this.bus.on('completeIssue', (issue) => {
//       this.completeIssue(issue);
// //      this.bus.trigger('todosUpdated');
//     });
  }

  add(name, date, priority, project) {
    debugger;
    var issue = {
      "name" : name,
      "date" : date,
      "priority" : priority,
      "project" : project.uuid,
      "projectName" : project.name,
      "done" : false
    };
    super.add(issue);
    this.bus.trigger('todosUpdated');
  }

  completeIssue(tag) {
    debugger;
    let index = this.collection.findIndex(issue => issue.uuid === tag.uuid);
    console.log(this.collection[index]);
    debugger;
    this.collection[index].done = !this.collection[index].done;
    console.log(this.collection[index]);

    this.save();
    this.bus.trigger('todosUpdated');
  }

  all(selectedProject) {
    debugger;
    if(selectedProject) {
      console.log(selectedProject);
      return this.collection.filter(issue => issue.project === selectedProject);
    }
    else return this.collection;
  }

  deleteIssue(uuid) {
    this.collection = this.collection.filter(issue => issue.uuid !== uuid);
    this.save();
    this.bus.trigger('todosUpdated');
  }

}
