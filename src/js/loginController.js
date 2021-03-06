/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'obpmConfig', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojrouter'],
  function (oj, ko) {
    function LoginControllerViewModel() {
      var self = this;

      self.username = ko.observable();
      self.password = ko.observable("welcome1");

      self.login_anonymous = function(event) {
        sessionStorage.setItem('bpmContext', 'anonymous');
        self.redirectPage("index.html");
      };

      self.login = function (event) {
        oj.Logger.log(obpmConfig.serverurl, obpmConfig.resturi, obpmConfig.adminuser, obpmConfig.adminpw);

          $.ajax({
            type: "GET",
            url: obpmConfig.serverurl + obpmConfig.resturi + "identities/user/" + self.username(),
            cache: false,
            headers: {
              Authorization: "Basic " + btoa(self.username() + ":" + self.password())
            },
            success: function(data) {
              console.log(data);
              sessionStorage.setItem("bpmContext", JSON.stringify(data));
              sessionStorage.setItem("userToken", btoa(self.username() + ":" + self.password()));
              self.redirectPage("index.html");
            },
            error: function() {
              sessionStorage.clear();
              self.redirectPage("login.html");
            }
          });
      };

      self.redirectPage = function (page) {
        $(location).attr('href', page);
      };

      // Check Session Storage...
      var bpmContext = sessionStorage.getItem('bpmContext');

      // if not exist bpmContext..
      if(bpmContext !== null) {
        oj.Logger.log("bpmContext is not null");
        self.redirectPage("index.html");

        return true;
      };
    };
    return new LoginControllerViewModel();
  }
);
