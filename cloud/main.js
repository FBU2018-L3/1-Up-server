const logger = require('parse-server').logger;

Parse.Cloud.define('hello', function(req, res) {
    res.success('Hi');
});

Parse.Cloud.afterSave(Parse.User, function(req){
    logger.info("Started");
    const user = req.object;
    logger.info("USER is: " + user.get("username"))

    var query = new Parse.Query(Parse.Installation);

    Parse.Push.send({
      where: query,
      data: {
        alert: 'Test',
        badge: 1,
        sound: 'default'
      }
    }, {
      success: function() {
        console.log('##### PUSH OK');
      },
      error: function(error) {
        console.log('##### PUSH ERROR');
      },
      useMasterKey: true
    });
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

