(function () {
  'use strict';

  angular
    .module('holidays')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Holidays',
      state: 'holidays',
      type: 'dropdown',
      roles: ['user', 'moderator', 'admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'holidays', {
      title: 'List Holidays',
      state: 'holidays.list',
      roles: ['user','moderator', 'admin']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'holidays', {
      title: 'Create Holiday',
      state: 'holidays.create',
      roles: ['user', 'moderator']
    });
  }
})();
