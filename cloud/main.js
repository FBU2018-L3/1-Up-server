
Parse.Cloud.define('hello', function(req, res) {
    res.success('Hi');
});

Parse.Cloud.afterSave(Parse.User, function(request, response){
    let user = request.object;
    try{
      console.log(user.get("isAsleep"))
    }
    catch(f){
      console.error(error);
    }
});

