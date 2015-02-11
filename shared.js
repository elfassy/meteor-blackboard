Lines = new Meteor.Collection('lines');

if (Meteor.isClient){
  Meteor.subscribe("lines");

  drawLine = function (ctx, from, to) {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.closePath();
    ctx.stroke();
  }

  Template.canvas.helpers({
    userName: function(){
      return Meteor.user().emails[0].address
    }
  })
  Template.canvas.events({
    'drag canvas': function(event, template) {
      var to = {x: parseInt(event.gesture.center.pageX), y: parseInt(event.gesture.center.pageY)};
      
      drawLine(ctx, from, to);
      console.log(from, to);
      Lines.insert({from: from, to: to, user_id: Meteor.userId()});
      
      from = to;
    },
    'click #clear': function() {
      Meteor.call('wipeClean');
    }
  });
}




if (Meteor.isServer){

  Meteor.methods({
    wipeClean: function() {
      Lines.remove({user_id: Meteor.userId()});
    }
  });

  Meteor.publish("lines", function(){
    return Lines.find();
  });
}
