var commonInjections = [
  '$scope', '$http', '$location', '$state', '$stateParams', '$window',
];

var APP_CONFIG = {
  app: [  /* App Dependencies */
    'ui.router'
  ],
  config: [ /* Config Dependencies */
    '$stateProvider', 
    '$urlRouterProvider', 
    '$locationProvider', 
    appConfig
  ],
  directive: {  /* All Directive Declarations here */
    messageListItem: directiveMessageListItem,
  },
  factory: {  /* All Factory Declarations here */
    AppFactory: [
      'API_ENDPOINT',
      appFactory
    ]
  },
  service: {  /* All Service Declarations here */
    APIService: [
      '$http', 
      '$q',
      'AppFactory',
      apiService
    ]
  },
  controller: { /* All Controller Declarations here */
    MessagesController: commonInjections.concat([ /* Common Dependencies Injected */
      'APIService',
      messagesController
    ])
  },
  constant: {  /* All Constant Declarations here */
    API_ENDPOINT: {
      HOME : '/home/list',
    },
    EVENT_MAP: {
      HOME_LOADED : 'home_loaded',
      HOME_DATA_REQUESTED : 'home_data_requested',
      HOME_DATA_SUCCESS : 'home_data_success',
      HOME_DATA_FAILED : 'home_data_failed'
    }
  }
};

// create np App instance
var ngApp = angular.module('app', APP_CONFIG.app);

// load config
bootstrap();

/**
 * bootstrap - load rest all modules
 * config, controller, service, constant, factory, directive
 */ 
function bootstrap() {
  for(var prop in APP_CONFIG) {
    switch(prop) {
      case 'app': break;
      case 'config': ngApp.config(APP_CONFIG[prop]); break;
      default: load('ngApp', prop, APP_CONFIG[prop]);
    }
  }
}

/**
 * @param {string} appName - angular app var name
 * @param {string} type - angular module - controller, service, factory etc
 * @param {*} list - list of module declarations
 */
function load(appName, type, list) {
  for (var prop in list)
    executeFunctionByName(appName + '.' + type, this, prop, list[prop]);
}

// makes function call based on the string formed
function executeFunctionByName(functionName, context /*, args */) {
  var args = [].slice.call(arguments).splice(2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
}