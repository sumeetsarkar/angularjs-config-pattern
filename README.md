# AngularJS Config Pattern

> Demo project to showcase config JSON driven bootstraping of angular modules

The idea is to have all the angular modules, commonly controller, service, factory, directive, constant and its respective dependencies all declare in one single JSON and then bootstrapping Angular app upon reading the JSON.

### Analogy
This pattern allows us to group all modules with dependencies into one single config JSON making it easier to maintain, kind of like node package.json 

### Benefits
1. Modules can be grouped for common dependencies.
2. Any specific dependency of a module can be just declared as an incremental diff.
3. Avoids all the dependencies being scattered around the project.
4. Module additions can be controlled programmatically while bootstrapping.

Surely all this can be done with conventional way of declaring Angular modules, but it would not be as manageable, leading to messy and spread across code.

Also, it kind of makes all modules appear as regular javascript functions and hence appears less intimidating for newbies learning Angular.

## Understanding the JSON structure

[TL;DR Jump to example code for Config declaration & bootstrapping](app/src/index.js)

Its all about breaking down the way Angular modules are declared.

### How a typical Angular module looks when declared

```javascript
angular
    .module('app')  /* Angular app */
    .moduleType('ModuleName', /* Module Name */ [
        'dep1', 'dep2', 'dep3', /* dependencies */
        function moduleFunc(dep1, dep2, dep3) {
            // module function body
        }
    ]);
// Here, moduleType can be controller, service, constant, factory, directive etc. 
```

### Looks like a pattern doesn't it? If not, then look now.

```javascript
angular.module('app').moduleType('ModuleName', ['dep1', 'dep2', 'dep3', function moduleFunc(dep1, dep2, dep3) {} ]);

/*
    Its more like -
    app.moduleType( 'moduleName', [ array of dependencies, ...., function statment ] );
    more like -
    app.moduleType( 'moduleName', injectionArray );
    Now, declaring a sample controller below in JSON
*/

var APP_CONFIG = {
    controller: {
        'ControllerName': [ 'dep1', 'dep2', 'dep3', myController ]
    }
};

function myController(dep1, dep2, dep3) {
    console.log('my controller started...');
}

/*
    This APP_CONFIG can be then read by a loader function to bootstrap and entire Angular app.
*/
```

Hence, as we can understand now, in similar fashion, we can declare the Angular modules in JSON, where each moduleType is a collection of actual modules along with its dependencies. By doing such a declaration, it opens up opportunity to declare common injection arrays, discussed below.

[Jump to Bootstraping](app/src/index.js)

### Declare common dependencies
Declare common injection arrays, to be used by controllers or other modules. Or declare multiple common injection arrays, to be used by group of modules.
For example, let say there is a Messages feature in app and all the modules declared for this feature, the controllers, service all need a common set of dependencies to work on. With this approach single base minimum dependency array can be declared for such modules. 

```javascript
var commonInjections = ['$scope', '$http', '$location', '$state', '$stateParams', '$window'];
```

### Sample JSON config

```javascript
{
  app: [  /* Angular App Dependencies */
    'ui.router'
  ],
  config: [ /* Angular Config Dependencies */
    '$stateProvider',       /* dependencies */
    '$urlRouterProvider', 
    '$locationProvider', 
    appConfig   /* config function */
  ],
  directive: {  /* All Directive Declarations here */
    listItem: dirListItem,      /* directive function dirListItem */
    detailItem: dirDetailItem   /* directive function dirDetailItem */
  },
  factory: {  /* All Factory Declarations here */
    AppFactory: [       /* Angular factory AppFactory declared */
      'Collection1',    /* Angular Constant Collection1 dependency */
      appFactory
    ]
  },
  service: {  /* All Service Declarations here */
    APIService: [
      '$http',       /* dependencies */
      '$q',
      'AppFactory',
      apiService    /* apiService is the function declaring */
    ]
  },
  controller: { /* All Controller Declarations here */
    ListController: commonInjections.concat([ /* Common Dependencies */
      'APIService',     /* extra dependencies, not included by common dependency array */
      listController    /* controller function */
    ]),
    DetailController: commonInjections.concat([ /* Common Dependencies */
      'AppFactory',     /* extra dependencies */
      detailController  /* controller function */
    ]),
    ContactUsController: [ /* Only specific Dependencies */
      'Collection2',        
      contactUsController   /* controller function */
    ])
  },
  constant: {  /* All Constant Declarations here */
    Collection1: {      /* Collection Name */
      KEY1 : 'Value1',  /* Collection Key Value pairs */
      KEY2 : 'Value2',
    },
    Collection2: {
      KEY1 : 'Value1',
      KEY2 : 'Value2',
    }
  }
};
```

### Install dependencies
    npm install

### Build
    npm run build

### Run
    npm run start
