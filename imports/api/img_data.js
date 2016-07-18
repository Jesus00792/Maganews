
var imageStore = new FS.Store.GridFS("images");

Photo = new FS.Collection("images", {
  stores: [imageStore]
});

Photo.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  }
});

Photo.deny({
  remove: function(){
    return false;
  }
});
