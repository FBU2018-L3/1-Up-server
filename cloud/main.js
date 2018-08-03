const logger = require('parse-server').logger;

Parse.Cloud.define('hello', function(req, res) {
    res.success('Hi');
});

Parse.Cloud.define("setSleepReminder", function(req, res){
  let query = new Parse.Query(Parse.User);
  // Set the date that the notification is supossed to arrive
  let date = new Date();
  date.setMinutes(date.getMinutes()+5);
  query.equalTo("objectId", req.params.userId);
  query.limit(1);
  query.find().then(function(results){
    console.log("### SENDING PUSH NOTIFS");
    if(results.length>0){
      const user = results[0];
      var pushQuery = new Parse.Query(Parse.Installation);
      pushQuery.equalTo('user', user);
      Parse.Push.send({
        where: pushQuery,
        //push_time: date,
        data: {
          alert: "Hey " + user.get("username") + " don't remove this so in the morning you remember to set your state as awake!",
          badge: 1,
          sound: 'default'
        }
      }, {
        success: function() {
          console.log('##### PUSH OK');
          res.success("ok");
        },
        error: function(error) {
          console.error('##### PUSH ERROR');
          res.error("error");
        },
        useMasterKey: true
      });
    }
  }, function(error){
    res.error("ERROR getting user");
    console.error("ERROR getting user");
  })
  res.success("ok");
});

Parse.Cloud.beforeSave("Event", function(request, response){
  if(request.object.get("isPrivate")==null){
    request.object.set("isPrivate", false);
  }
  response.success();
});

Parse.Cloud.beforeSave("PowerUp", function(request, response){
  let powerUp = request.object;
    if (powerUp.isNew()) {
      let query = new Parse.Query(Parse.User);
      query.equalTo("objectId", powerUp.get("sentTo").id);
      query.limit(1);
      query.find().then(function(results){
        if(results.length>0){
          console.log('##### PUSH START');
          const user = results[0];
          var pushQuery = new Parse.Query(Parse.Installation);
          pushQuery.equalTo('user', user);
          Parse.Push.send({
            where: pushQuery,
            //push_time: date,
            data: {
              alert: "You got a new PowerUp, check it out!",
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
              response.success("error on sending push notifs");
            },
            useMasterKey: true
          });
        }
        else{
          response.error("error on sending push notifs");
          console.error("ERROR getting user");  
        }
      }, function(error){
        response.error("error on sending push notifs");
        console.error("ERROR getting user");
      });
    }
    response.success("ok");
});