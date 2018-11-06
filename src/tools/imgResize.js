const resizeImage = function(file, size, callback) {
  var fileTracker = new FileReader;
  fileTracker.onload = function() {
    var image = new Image();
    image.onload = function(){
      var canvas = document.createElement("canvas");
      if(image.width > size) {
        image.height *= size / image.width;
        image.width = size;
      }
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);
      callback(canvas.toDataURL("image/jpeg", 0.6));
    };
    image.src = this.result;
  }
  fileTracker.readAsDataURL(file);
  fileTracker.onabort = function() {
    alert("The upload was aborted.");
  }
  fileTracker.onerror = function() {
    alert("An error occured while reading the file.");
  }
};

export default resizeImage