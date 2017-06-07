function appFactory(API_ENDPOINT) {
  return {
    base: '/base' + API_ENDPOINT.HOME
  };
}