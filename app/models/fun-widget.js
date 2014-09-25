import Widget from './widget';

var FunWidget = Widget.extend({});

FunWidget.reopenClass({
  FIXTURES: [
    { id: 1, name: 'Fun is cool' }
  ]
});

export default FunWidget;
