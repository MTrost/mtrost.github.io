class BaseCollection {

  constructor(tag, key, bus) {
    this.localStorage_key = key;
    // Local state + load from localStorage
//    console.log(bus);
    this.collection = this.fetch();
    this.bus = bus;
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
  fetch() {
    return JSON.parse(localStorage.getItem(this.localStorage_key)) || [];
    this.bus.trigger('collectionUpdated');
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
