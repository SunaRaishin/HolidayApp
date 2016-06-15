(function () {
  'use strict';

  angular
    .module('holidays')
    .controller('HolidaysListController', HolidaysListController);

  HolidaysListController.$inject = ['HolidaysService', '$scope', 'Authentication', 'moment'];

  function HolidaysListController(HolidaysService, $scope, Authentication, moment) {
    var vm = this;

    vm.holidays = HolidaysService.query();
    vm.authentication = Authentication;
    $scope.currUser = vm.authentication;
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    vm.calendarTitle = 'Title';
    $scope.setEvent = function(){
      vm.events = []; 
      for(var i=0; i<vm.holidays.length; i++){
        var currentHoliday = vm.holidays[i];
        if(currentHoliday.user.displayName === vm.authentication.user.displayName){
          vm.events.push({
            title: currentHoliday.name + ' requested by ' + currentHoliday.user.displayName ,
            type: 'warning',
            startsAt: new Date(currentHoliday.startDate),
            endsAt:  new Date(currentHoliday.endDate),
            draggable: false,
            resizable: false
          });
        }else if(vm.authentication.user.roles[0] === 'admin' || vm.authentication.user.roles[0] === 'moderator'){
          vm.events.push({
            title: currentHoliday.name + ' requested by ' + currentHoliday.user.displayName ,
            type: 'warning',
            startsAt: new Date(currentHoliday.startDate),
            endsAt:  new Date(currentHoliday.endDate),
            draggable: false,
            resizable: false
          });
        }
      }
    };

    $scope.calendar = true;
    $scope.toggleCalendar = function() {
      $scope.calendar = $scope.calendar === false ? true: false;
      $scope.setEvent();
    };
   

    vm.isCellOpen = true;

    vm.eventClicked = function(event) {
      alert('Clicked', event);
    };

    vm.eventEdited = function(event) {
      alert('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

  }
  
})();
