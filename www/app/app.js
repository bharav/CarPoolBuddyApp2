angular.module('carPoolBuddyApp2', ['ionic'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
   .state('app', {
    url: '/app',
    abstract:true,
    templateUrl: 'app/homelayout/home-layout.html'
  })
    .state('app.findride', {
    url: '/findride',
    views:{
      'mainContent':{
      templateUrl: "app/findride/findride.html"
      }
    }
  })
    .state('app.findride-pickup', {
    url: '/findride?to',
    views:{
      'mainContent':{
      templateUrl: "app/findride/pickup.html"
      }
    }
  })
 
   .state('app.findride-confirm', {
    url: '/findride/:from?to',
    views:{
      'mainContent':{
      templateUrl: "app/findride/confirm.html"
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/findride');

});
