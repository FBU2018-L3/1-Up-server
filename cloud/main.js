
Parse.Cloud.define('hello', function(req, res) {
    res.success('Hi');
});

Parse.Cloud.afterSave(Parse.User, function(request){
    let user = request.get("user");
    try{
      console.log(user.get("isAsleep"))
    }
    catch(error){
      console.error(error);
    }
});

