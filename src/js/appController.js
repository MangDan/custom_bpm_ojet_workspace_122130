/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas'],
  function(oj, ko) {
     function ControllerViewModel() {
       var self = this;

       // To-Do :  Logger 정리
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

       // Router setup
       self.router = oj.Router.rootInstance;
       self.router.configure({
         'tasks': {label: 'Tasks', isDefault: true},
         'instances': {label: 'Instances'},
         'monitoring': {label: 'Monitoring'},
         'about': {label: 'About'}
       });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
       
      // Navigation setup
      var navData = [
      {name: 'Tasks', id: 'tasks',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
      {name: 'Instances', id: 'instances',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
      {name: 'Monitoring', id: 'monitoring',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
      {name: 'About', id: 'about',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'}
      ];
      self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});
      
      // To-Do :  createChildRouter : Root 에서 한개 이상의 Child 생성 불가함..
      // 각 Child에서 createChildRouter 해야함.
      // Create and configure the child router to be used for tasks
      // self.taskRouter = self.router.createChildRouter('task').
      // configure(
      // {
      //   'startTask':   { label: 'Start Task',  isDefault: true },
      //   'assignedTask':   { label: 'Assigned Task'},
      //   'completedTask':   { label: 'Completed Task'}
      // });
      // Drawer
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function() {oj.OffcanvasUtils.close(self.drawerParams);});
      self.drawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function() {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      }
      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      $("#navDrawer").on("ojclose", function() { $('#drawerToggleButton').focus(); });

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("BPM Workspace");
      // User Info used in Global Navigation area

      self.userLogin = ko.observable("john.hancock@oracle.com");

      oj.Logger.info(sessionStorage.getItem("bpmContext"));
      var bpmContext = sessionStorage.getItem("bpmContext");

      if(bpmContext !== null) {
        if(bpmContext === 'anonymous') {
          self.userLogin("Anonymous");
        } else {
          var bpmContextObj = JSON.parse(bpmContext); //userFirstName, email, type, language
          self.userLogin((bpmContextObj.userFirstName === null ? bpmContextObj.identityName : bpmContextObj.userFirstName));
        }
      } else {
        $(location).attr('href', "login.html");
      };

      // Custom
      self.preferences = function(event) {
        oj.Logger.info(event.target.value);

        // Logout...
        if(event.target.value === "out") {
          sessionStorage.clear();
          $(location).attr('href', "login.html");
          return true;
        }
      };

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
        new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
        new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
        new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
      ]);
     }

     return new ControllerViewModel();
  }
);
