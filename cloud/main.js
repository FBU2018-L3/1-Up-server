
Parse.Cloud.define('hello', function(req, res) {
    res.success('Hi');
});

Parse.Cloud.afterSave(Parse.User, function(req, res){
    Console.log("After saved started");
    // const userId = req.object.id;
    // let query = new Parse.Query(Parse.User);
    // query.equalTo("objectId", userId);
    // query.limit(1);
    // query.find().then(function(results){
    //   if(results.length>0){
    //     var user = results[0];
    //     console.log(user.get("isAsleep"));
    //   }
    // }, function(error){
    //   console.error("ERROR getting user");
    // })
    // Console.log("User obtained succesfully");
    // try{
    //   console.log(user.get("isAsleep"))
    // }
    // catch(f){
    //   console.error(error);
    // }
});

