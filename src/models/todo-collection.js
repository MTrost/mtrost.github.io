class TodoCollection extends BaseCollection {

  constructor(tag, bus, projects) {

    // Configuration
    var localStorage_key = 'todos';

    super(tag, localStorage_key, bus, projects);

    // Setup
    this.fetch(projects);
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
      "title" : name,
      "due_date" : new Date(date),
      "priority" : priority,
      "project_client_id" : project.client_id,
//      "projectName" : project.title,
      "done" : false,
      "project_id" : project.id
    };
    super.add(issue);
    this.save(issue);
    //    this.bus.trigger('todosUpdated');
  }

  save(issue) {
    super.save();
    console.log(issue);
    debugger;
    $.ajax({
      method: "POST",
      url: "https://zhaw-issue-tracker-api.herokuapp.com/api/projects/" + issue.project_id + "/issues",
      data: JSON.stringify(issue),
      contentType: "application/json",
      dataType: "json",
      success: (response) => {
        console.log("Success!");
        this.collection.filter(issue => issue.client_id === response.client_id)[0].id = response.id;
        this.collection.filter(issue => issue.client_id === response.client_id)[0].projectName = issue.projectName;

        super.save();
      }
    });
  }


  completeIssue(todo) {
    //    this.save();
    super.save();
    debugger;
    $.ajax({
      method: "PUT",
      url: "https://zhaw-issue-tracker-api.herokuapp.com/api/projects/" + todo.project_id + "/issues/" + todo.id,
      data: JSON.stringify(todo),
      contentType: "application/json",
      dataType: "json",
      success: (response) => {
        console.log("Updated todo, you rock");
      }
    });


    this.bus.trigger('todosUpdated');
  }

  all(selectedProjects) {
    if(selectedProjects && selectedProjects.length > 0) {
      //      console.log(selectedProject);
      var ids = selectedProjects.map((project) => {
        return project.client_id;
      });

      return this.collection.filter(issue => ids.indexOf(issue.project_client_id) > -1);
    }
    else return this.collection;
  }

  deleteIssue(todo) {
    debugger;
    console.log(todo);
    this.collection = this.collection.filter(issue => issue.client_id !== todo.client_id);
    debugger;
    super.save();
    $.ajax({
      method: "DELETE",
      url: "https://zhaw-issue-tracker-api.herokuapp.com/api/projects/" + todo.project_id + "/issues/" + todo.id,
      success: (response) => {
        console.log("Deleted issue, you rock");
      }
    });
    this.bus.trigger('todosUpdated');
  }

}
