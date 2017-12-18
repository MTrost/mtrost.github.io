class ProjectCollection extends BaseCollection {

  constructor(tag, bus) {
    // Configuration
    var localStorage_key = "projects";

    //    console.log(bus);
    super(tag, localStorage_key, bus);
    //    console.log(this.bus);
    this.selectedProject = "";
  }

  add(model) {
    model.active = false;
    super.add(model);
    this.save(model);
    console.log(model);
    this.bus.trigger('projectsUpdated');
  }

  getActiveProjects() {
    return this.collection.filter(project => project.active === true);
    }

  save(model) {
    super.save();
    console.log(model);
    $.ajax({
      method: "POST",
      url: "https://zhaw-issue-tracker-api.herokuapp.com/api/projects",
      data: JSON.stringify(model),
      contentType: "application/json",
      dataType: "json",
      success: (response) => {
        console.log("Success!");
        this.collection.filter(project => project.client_id === response.client_id)[0].id = response.id;
        super.save();

      }
      });
    }
  }
