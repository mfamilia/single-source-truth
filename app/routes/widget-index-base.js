import Ember from 'ember';

export default Ember.Route.extend({
  widgetMeta: null, //set in initializer
  beforeModel: function(){
    var firstRouteName = this.widgetMeta.sections[0].routeName;
    this.transitionTo(firstRouteName);
  }
});
