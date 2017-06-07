function directiveMessageListItem() {
  return {
    restrict: "E",
    scope: {
      info: "=info",
    },
    templateUrl: 'directives/message-list-item.html'
  };
}