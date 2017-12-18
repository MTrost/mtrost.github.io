class BaseCollection {

  constructor(tag, key, bus, projects) {
    this.localStorage_key = key;
    // Local state + load from localStorage
    //    console.log(bus);
    this.bus = bus;
    this.fetch(projects);

    //    console.log(bus);


    if(tag) {
      this.riotjs_tag = tag;
    }
  }


  all(uuid) {
    return this.collection;
  }

  // Saving collection to localStorage
  save() {
    debugger;
    localStorage.setItem(this.localStorage_key, JSON.stringify(this.collection));
  }

  // Adds a model to the collection and persists it
  add(model){
    model.client_id = this.generateUUID();
    this.collection.push(model);

    //    this.riotjs_tag.update();
    this.bus.trigger('collectionUpdated');
  }

  // Fetch models from localStorage into collection
  fetch(projects) {

    this.collection = [];
    var that = this;

    if(!projects) {
      that.collection =  JSON.parse(localStorage.getItem(this.localStorage_key)) || [];
      that.bus.trigger('collectionUpdated');
    } else {
      console.log(projects);
      for(var i = 0; i < projects.length; i++) {
        console.log(projects[i]);
        //        console.log(project.id);
        //        var id = project.id;

        //        var url = "http://zhaw-issue-tracker-api.herokuapp.com/api/projects/" + project.id + "/issues";
        (function get(i, project) {
          //  console.log(project);
          //  var id = project.id;
          //  console.log(id);
          // var url = "http://zhaw-issue-tracker-api.herokuapp.com/api/projects/" + id + "/issues";
          $.ajax({
            method: "GET",
            url: "https://zhaw-issue-tracker-api.herokuapp.com/api/projects/" + project.id + "/issues",
            dataType: "json",
            success: (response) => {
              for(var j = 0; j < response.length; j++) {
                console.log(response);
                response[j].projectName = project.title;
                debugger;
                that.collection.push(response[j]);
                debugger;
                console.log(response[j]);

              }
                              that.bus.trigger('todosUpdated');
            }
          });
        })(i, projects[i]);
      }
      debugger;

    }
  }


  generateUUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}
