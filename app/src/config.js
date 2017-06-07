function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('');
  $urlRouterProvider.otherwise('/home')
  $stateProvider
    .state('home', {
      url: '/home',
      views: {
          '@': {
              templateUrl: 'messages/index.html',
              controller : 'MessagesController',
          },
          'messages@home': {
              templateUrl: 'messages/messages.html',
          }
      }
    });
}