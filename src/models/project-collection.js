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
    super.add(model);
    this.bus.trigger('projectsUpdated');
    }






}
