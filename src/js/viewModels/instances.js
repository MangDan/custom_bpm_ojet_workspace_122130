/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojarraydataprovider', 'text'],
 function(oj, ko, $) {
    function InstancesViewModel() {
      var self = this;

      // router 초기화
      self.router;
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additional available methods.

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
        // Implement if needed
        // Implement if needed
        // To-Do : Router 정리.. 중요..
        if (self.router) {

          oj.Logger.log("change to openInstance module.");
          self.currentModule("openInstance");

          return;
        }

        var parentRouter = info.valueAccessor().params['ojRouter']['parentRouter'];
        
        //self.router = parentRouter.getChildRouter('task');  //self.router return으로 변경

        // 동일한 이름의 child는 생성 불가...
        //if (self.router === undefined) {  //self.router return으로 변경
          self.router = parentRouter.createChildRouter('instance')
            .configure(
              {
                'openInstance': { label: 'Open Instance', isDefault: true },
                'closeInstance': { label: 'Close Instance' }
              });

          // Now that the router for this view exist, synchronise it with the URL
          oj.Router.sync();
        //};

        //console.log("self.router.currentState() : " + self.router.currentState());
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };

      // To-Do : Module 정리
      self.currentModule = ko.observable("openInstance");
      self.modulePath = ko.pureComputed(
        function () {
          console.log("modulePath");

          var name = self.currentModule();

          return (name === 'oj:blank' ? name : "instances/" + name);
        }
      );

      // 처음 로드할 때는 selection change 발생. 두번째 부터는 클릭할 경우 발생...
      self.handleSelection = function (event) {
        var selection = event.detail.value;

        if (selection !== undefined)  // 다른 모듈로 이동하면 undefined
          self.currentModule(selection);
      };

      //router.stateId
      //self.selection = function(event) {
      //  console.log("selection");
      //};

      // To-Do :  createChildRouter 정리 (Root 에서 만들어진 Child(This)에 대해서 navData 생성)
      // Navigation setup
      var instancesNavData = [
        {
          name: 'Open Instance', id: 'openInstance',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'
        },
        {
          name: 'Close Instance', id: 'closeInstance',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
        }
      ];

      var lgQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP);

      self.large = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(lgQuery);

      self.dataSource = new oj.ArrayDataProvider(instancesNavData, { idAttribute: 'id' });
      //self.selectTask = ko.observable("startTask");

      //self.selectTask.subscribe(function (selectedMenu) {
      //  oj.Logger.info("selectedMenu : " + selectedMenu);
      //});

      //self.selectHandler = function(event) {
      //    console.log("selectHandler");
      //}
      //   self.selectHandler = function(event) {
      //     if ('menu' === event.target.id && event.detail.originalEvent) {
      //        // router takes care of changing the selection
      //        event.preventDefault();
      //        // Invoke go() with the selected item.
      //        viewModel.router.go(event.detail.key);
      //     }
      //  };

    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new InstancesViewModel();
  }
);
