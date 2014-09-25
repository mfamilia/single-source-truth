import Widget from './widget';

var SadWidget = Widget.extend({});

SadWidget.reopenClass({
  FIXTURES: [
    { id: 2, name: 'Sadness all around' }
  ]
});

export default SadWidget;
