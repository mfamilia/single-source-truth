import Ember from 'ember';

export default Ember.Route.extend({
  templateName: 'widget-base',
  model: function(params) {
    return this.store.find(this.routeName, params.widget_id);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    var widgetMeta = this.router.widgetMeta[this.routeName];
    this.controllerFor('widget-navigation').setProperties({
      'model': widgetMeta,
      'widget': model
    });
  }
});
