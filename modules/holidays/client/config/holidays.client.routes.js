(function () {
  'use strict';

  angular
    .module('holidays')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('holidays', {
        abstract: true,
        url: '/holidays',
        template: '<ui-view/>'
      })
      .state('holidays.list', {
        url: '',
        templateUrl: 'modules/holidays/client/views/list-holidays.client.view.html',
        controller: 'HolidaysListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Holidays List'
        }
      })
      .state('holidays.create', {
        url: '/create',
        templateUrl: 'modules/holidays/client/views/form-holiday.client.view.html',
        controller: 'HolidaysController',
        controllerAs: 'vm',
        resolve: {
          holidayResolve: newHoliday
        },
        data: {
          roles: ['user', 'moderator', 'admin'],
          pageTitle : 'Holidays Create'
        }
      })
      .state('holidays.edit', {
        url: '/:holidayId/edit',
        templateUrl: 'modules/holidays/client/views/form-holiday.client.view.html',
        controller: 'HolidaysController',
        controllerAs: 'vm',
        resolve: {
          holidayResolve: getHoliday
        },
        data: {
          roles: ['user','moderator', 'admin'],
          pageTitle: 'Edit Holiday {{ holidayResolve.name }}'
        }
      })
      .state('holidays.view', {
        url: '/:holidayId',
        templateUrl: 'modules/holidays/client/views/view-holiday.client.view.html',
        controller: 'HolidaysController',
        controllerAs: 'vm',
        resolve: {
          holidayResolve: getHoliday
        },
        data:{
          pageTitle: 'Holiday {{ articleResolve.name }}'
        }
      });
  }

  getHoliday.$inject = ['$stateParams', 'HolidaysService'];

  function getHoliday($stateParams, HolidaysService) {
    return HolidaysService.get({
      holidayId: $stateParams.holidayId
    }).$promise;
  }

  newHoliday.$inject = ['HolidaysService'];

  function newHoliday(HolidaysService) {
    return new HolidaysService();
  }
})();
