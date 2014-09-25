import Ember from 'ember';
import config from './config/environment';

export var widgetTypes = [];
export var widgetMeta = {};

var Router = Ember.Router.extend({
  location: config.locationType,
  widgetMeta: widgetMeta
});

var resource = Ember.RouterDSL.prototype.resource;
var route = Ember.RouterDSL.prototype.route;

/*
 * The object set to `widgetMeta[name]` becomes the content
 * of the widget-navigation controller while that widget is active
 * by way of the widget-base route
 */
Ember.RouterDSL.prototype.widget = function(name) {
  widgetTypes.push(name);
  widgetMeta[name] = widgetMeta[name] || {
    sections: []
  };

  resource.apply(this, arguments);
};

/*
 * A `sectionMeta` object created here is set as the `activeSection`
 * property of the widget-navigation controller while that section
 * is active, by way of the section-base route
 */
Ember.RouterDSL.prototype.section = function(name, options) {
  var parentName = this.parent;
  var routeName = parentName + '.' + name;
  var meta = widgetMeta[parentName];
  var sectionOptions = options || {};
  var routeOptions = {};
  if (sectionOptions.path){
    routeOptions.path = sectionOptions.path;
  }
  var widgetSections = meta.sections;
  var previousSection = widgetSections[widgetSections.length - 1];
  var SectionMeta = Ember.Object.extend({
    singularLabel: function() {
      return Ember.String.singularize(this.get('label'));
    }.property('label'),
  });

  var sectionMeta = SectionMeta.create({
    widgetRouteName: parentName,
    routeName: routeName,
    slug: name,
    label: sectionOptions.label,
    icon: sectionOptions.icon,
    previousSection: previousSection
  });

  widgetMeta[routeName] = sectionMeta;

  if (previousSection){
    previousSection.nextSection = sectionMeta;
  }
  meta.sections.push(sectionMeta);

  route.apply(this, [name, routeOptions]);
};

Router.map(function() {
  this.widget('fun-widget', { path: 'fun-widget/:widget_id' }, function(){
    this.section('setup', { label: 'Setup' });
    this.section('actions', { path: 'actions/', label: 'Fun Actions'} );
    this.section('images', { path: 'images/', label: 'Fun Images'} );
  });
  this.widget('sad-widget', { path: 'sad-widget/:widget_id' }, function(){
    this.section('setup', { label: 'Setup' });
    this.section('results', { path: 'results', label: 'Sad Results' });
    this.section('videos', { path: 'videos/', label: 'Sad Videos'} );
  });
  this.widget('dark-widget', { path: 'dark-widget/:widget_id' }, function(){
    this.section('setup', { label: 'Setup' });
    this.section('actions', { path: 'actions/', label: 'Dark Actions' } );
    this.section('images', { path: 'images/', label: 'Dark Images' } );
  });
});

export default Router;
