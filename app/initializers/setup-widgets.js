import { widgetTypes, widgetMeta } from 'single-source-truth/router';
import WidgetBaseRoute from 'single-source-truth/routes/widget-base';
import WidgetIndexBaseRoute from 'single-source-truth/routes/widget-index-base';
import WidgetModel from 'single-source-truth/models/widget';

export default {
  name: 'setup-widgets',
  initialize: function(container, app) {
    widgetTypes.forEach(function(widgetName){
      app.register('model:' + widgetName, WidgetModel);
      app.register('route:' + widgetName, WidgetBaseRoute);
      app.register('route:' + widgetName + '/index', WidgetIndexBaseRoute.extend({
        widgetMeta: widgetMeta[widgetName]
      }));
    });
  }
};
