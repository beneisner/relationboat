// Home Route
Router.route('/', {
  name: 'home',
  action: function () {
    this.render('layout');
  }
});