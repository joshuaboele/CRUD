Customers = new Mongo.Collection("customers");

if (Meteor.isClient) {
  Session.set('sort', {voornaam: 1});

  // This code only runs on the client
  Template.body.helpers({
    customers: function(){
      return Customers.find({}, {sort: Session.get('sort')});
    }
  });
  Template.customer.events({
    "click .delete": function () {
      Customers.remove(this._id);
    //
    // },
    // "click .edit": function () {
    //   Customers.update ({"$set" : {"voornaam" : "achternaam"}})
    }
  });
  Template.body.events({
    "click .header": function(e){
      var data = $(e.target).data('col');
      var sort = Session.get('sort');
      if (sort[data]) {
        sort[data] = sort[data] * -1;
      } else {
        sort = {};
        sort[data] = 1;
      }
      Session.set('sort', sort);
    }
  });
  Template.invoerveldje.events({
    'submit form': function(e,t){

      e.preventDefault();

      var registervoornaam    = t.find('#register-voornaam').value;
      var registerachternaam  = t.find('#register-achternaam').value;
      var registertelefoon   = t.find('#register-telefoon').value;
      var registeremail    = t.find('#register-email').value;

      Customers.insert({
        voornaam: registervoornaam,
        achternaam: registerachternaam,
        telefoon: registertelefoon,
        email: registeremail
      });
      t.find('#register-voornaam').value = '';
      t.find('#register-achternaam').value = '';
      t.find('#register-telefoon').value = '';
      t.find('#register-email').value = '';
    }
  })
}
