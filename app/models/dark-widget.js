import Widget from './widget';

var DarkWidget = Widget.extend({});

DarkWidget.reopenClass({
  FIXTURES: [
    { id: 2, name: 'Darkness rules' }
  ]
});

export default DarkWidget;
