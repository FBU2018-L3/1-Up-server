const logger = require('parse-server').logger;

Parse.Cloud.define('hello', function(req, res) {
    res.success('Hi');
});

Parse.Cloud.define("setSleepReminder", function(req, res){
  console.log("Starting the push notification");
  let query = new Parse.Query(Parse.User);
  console.log("User is: " + req.params.userId);
  query.equalTo("objectId", req.params.userId);
  query.limit(1);
  query.find().then(function(results){
    if(results.length>0){
      const user = results[0];
      var pushQuery = new Parse.Query(Parse.Installation);
      pushQuery.equalTo('user', user);
      Parse.Push.send({
        where: pushQuery,
        data: {
          alert: "Hey you're + " + user.get("username"),
          badge: 1,
          sound: 'default'
        }
      }, {
        success: function() {
          console.log('##### PUSH OK');
          response.success("ok");
        },
        error: function(error) {
          console.error('##### PUSH ERROR');
          response.error("error");
        },
        useMasterKey: true
      });
    }
  }, function(error){
    console.error("ERROR getting user");
  })
});

