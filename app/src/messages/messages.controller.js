function messagesController($scope, $http, $location, $state, $stateParams, $window, APIService) {
  console.log('home controller running...');
  $scope.listOfMessages = [
    {
      from: {
        name: 'Bryan Cranston',
        image: ''
      },
      message: 'Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.',
      imp: true
    },
    {
      from: {
        name: 'Aaron Paul',
        image: ''
      },
      message: 'Aaron Paul played the role of Jesse in Breaking Bad. He also featured in the "Need For Speed" Movie.',
      imp: true
    },
    {
      from: {
        name: 'Bob Odenkirk',
        image: ''
      },
      message: 'Bob Odinkrik played the role of Saul in Breaking Bad. Due to public fondness for the character, Bob stars in his own show now, called "Better Call Saul".',
      imp: false
    }
  ];
}