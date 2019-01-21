"use strict";

describe("logic", function() {
  describe("login", function() {
    it("should succeed on correct credentials", function() {
      var expected = users.find(function(user) {
        return user.email === "johndoe@mail.com";
      });

      console.log(typeof expected.password);

      var loggedInUser;

      login(expected.email, expected.password, function(user) {
        loggedInUser = user;
      });

      expect(loggedInUser).toBeDefined();
      expect(loggedInUser.name).toEqual(expected.name);
      expect(loggedInUser.surname).toEqual(expected.surname);
      expect(loggedInUser.email).toEqual(expected.email);
      expect(loggedInUser.password).toBeUndefined();
      expect(loggedInUser).not.toEqual(expected);
    });

    it("should fail on wrong email", function() {
      var inventedEmail = "invented@mail.com";

      // var error;

      // try {
      //     login(inventedEmail, '123', function() {});
      // } catch(err) {
      //     error = err;
      // }

      // expect(error).toBeDefined();
      // expect(error.message).toBe('user ' + inventedEmail + ' not found');

      // ALT jasmine

      expect(function() {
        login(inventedEmail, "123", function() {});
      }).toThrow(Error("user " + inventedEmail + " not found"));
    });

    it("should fail on wrong password", function() {
      expect(function() {
        login("johndoe@mail.com", "123", function() {});
      }).toThrow(Error("wrong password"));
    });

    it("should fail on undefined email", function() {
      var loggedInUser;

      var loggedInEmail = undefined;
      var loggedInPassword = "p4ssw0rd";

      expect(function() {
        login(loggedInEmail, loggedInPassword);
      }).toThrow(TypeError(loggedInEmail + " is not a string"));

      expect(loggedInUser).toBeUndefined();
    });

    it("should fail on numeric email", function() {
      var loggedInUser;

      var loggedInEmail = 10;
      var loggedInPassword = "p4ssw0rd";

      expect(function() {
        login(loggedInEmail, loggedInPassword);
      }).toThrow(TypeError(loggedInEmail + " is not a string"));

      expect(loggedInUser).toBeUndefined();
    });

    it("should fail on boolean email", function() {
      var loggedInUser;

      var loggedInEmail = false;
      var loggedInPassword = "p4ssw0rd";

      expect(function() {
        login(loggedInEmail, loggedInPassword);
      }).toThrow(TypeError(loggedInEmail + " is not a string"));

      expect(loggedInUser).toBeUndefined();
    });

    it("should fail on object email", function() {
      var loggedInUser;

      var loggedInEmail = {};
      var loggedInPassword = "p4ssw0rd";

      expect(function() {
        login(loggedInEmail, loggedInPassword);
      }).toThrow(TypeError(loggedInEmail + " is not a string"));

      expect(loggedInUser).toBeUndefined();
    });

    it("should fail on array email", function() {
      var loggedInUser;

      var loggedInEmail = [];
      var loggedInPassword = "p4ssw0rd";

      expect(function() {
        login(loggedInEmail, loggedInPassword);
      }).toThrow(TypeError(loggedInEmail + " is not a string"));

      expect(loggedInUser).toBeUndefined();
    });

    it("should fail on empty email", function() {
      var loggedInUser;

      var loggedInEmail = "";
      var loggedInPassword = "p4ssw0rd";

      expect(function() {
        login(loggedInEmail, loggedInPassword);
      }).toThrow(Error("email cannot be empty"));

      expect(loggedInUser).toBeUndefined();
    });

    it("should fail on undefined password", function() {
      var loggedInUser;

      var loggedInEmail = "jw@mail.com";
      var loggedInPassword = undefined;

      expect(function() {
        login(loggedInEmail, loggedInPassword);
      }).toThrow(TypeError(loggedInPassword + " is not a string"));

      expect(loggedInUser).toBeUndefined();
    });

    it("should fail on numeric password", function() {
      var loggedInUser;

      var loggedInEmail = "jw@mail.com";
      var loggedInPassword = 10;

      expect(function() {
        login(loggedInEmail, loggedInPassword);
      }).toThrow(TypeError(loggedInPassword + " is not a string"));

      expect(loggedInUser).toBeUndefined();
    });

    it("should fail on boolean password", function() {
      var loggedInUser;

      var loggedInEmail = "jw@mail.com";
      var loggedInPassword = false;

      expect(function() {
        login(loggedInEmail, loggedInPassword);
      }).toThrow(TypeError(loggedInPassword + " is not a string"));

      expect(loggedInUser).toBeUndefined();
    });

    it("should fail on object password", function() {
      var loggedInUser;

      var loggedInEmail = "jw@mail.com";
      var loggedInPassword = {};

      expect(function() {
        login(loggedInEmail, loggedInPassword);
      }).toThrow(TypeError(loggedInPassword + " is not a string"));

      expect(loggedInUser).toBeUndefined();
    });

    it("should fail on array password", function() {
      var loggedInUser;

      var loggedInEmail = "jw@mail.com";
      var loggedInPassword = [];

      expect(function() {
        login(loggedInEmail, loggedInPassword);
      }).toThrow(TypeError(loggedInPassword + " is not a string"));

      expect(loggedInUser).toBeUndefined();
    });

    it("should fail on empty password", function() {
      var loggedInUser;

      var loggedInEmail = "jw@mail.com";
      var loggedInPassword = "";

      expect(function() {
        login(loggedInEmail, loggedInPassword);
      }).toThrow(Error(loggedInEmail + " is not a string"));

      expect(loggedInUser).toBeUndefined();
    });
  });

  describe("register", function() {
    var registeringEmail = "jw@mail.com";

    beforeEach(function() {
      var userIndex = users.findIndex(function(user) {
        return user.email === registeringEmail;
      });

      if (userIndex > -1) users.splice(userIndex, 1);
    });

    it("should succeed on valid data", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = "Wayne";
      var registeringEmail = "jw@mail.com";
      var registeringPassword = "p4ssw0rd";

      register(
        registeringName,
        registeringSurname,
        registeringEmail,
        registeringPassword,
        registeringPassword,
        function() {
          registered = true;
        }
      );

      expect(registered).toBeTruthy();

      var registeredUser = users.find(function(user) {
        return user.email === registeringEmail;
      });

      expect(registeredUser).toBeDefined();
      expect(registeredUser.email).toEqual(registeringEmail);
      expect(registeredUser.name).toEqual(registeringName);
      expect(registeredUser.surname).toEqual(registeringSurname);
      expect(registeredUser.password).toEqual(registeringPassword);
    });

    it("should fail on undefined name", function() {
      var registered;

      var registeringName = undefined;
      var registeringSurname = "Wayne";
      var registeringEmail = "jw@mail.com";
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringName + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on numeric name", function() {
      var registered;

      var registeringName = 10;
      var registeringSurname = "Wayne";
      var registeringEmail = "jw@mail.com";
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringName + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on boolean name", function() {
      var registered;

      var registeringName = true;
      var registeringSurname = "Wayne";
      var registeringEmail = "jw@mail.com";
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringName + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on object name", function() {
      var registered;

      var registeringName = {};
      var registeringSurname = "Wayne";
      var registeringEmail = "jw@mail.com";
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringName + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on array name", function() {
      var registered;

      var registeringName = [];
      var registeringSurname = "Wayne";
      var registeringEmail = "jw@mail.com";
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringName + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on empty name", function() {
      var registered;

      var registeringName = "";
      var registeringSurname = "Wayne";
      var registeringEmail = "jw@mail.com";
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(Error("name cannot be empty"));

      expect(registered).toBeUndefined();
    });

    it("should fail on undefined surname", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = undefined;
      var registeringEmail = "jw@mail.com";
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringSurname + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on numeric surname", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = 10;
      var registeringEmail = "jw@mail.com";
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringSurname + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on boolean surname", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = false;
      var registeringEmail = "jw@mail.com";
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringSurname + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on object surname", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = {};
      var registeringEmail = "jw@mail.com";
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringSurname + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on array surname", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = [];
      var registeringEmail = "jw@mail.com";
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringSurname + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on empty surname", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = "";
      var registeringEmail = "jw@mail.com";
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(Error("surname cannot be empty"));

      expect(registered).toBeUndefined();
    });

    it("should fail on undefined email", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = "Wayne";
      var registeringEmail = undefined;
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringEmail + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on numeric email", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = "Wayne";
      var registeringEmail = 10;
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringEmail + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on boolean email", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = "Wayne";
      var registeringEmail = false;
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringEmail + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on object email", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = "Wayne";
      var registeringEmail = {};
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringEmail + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on array email", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = "Wayne";
      var registeringEmail = [];
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringEmail + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on empty email", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = "Wayne";
      var registeringEmail = "";
      var registeringPassword = "p4ssw0rd";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(Error("email cannot be empty"));

      expect(registered).toBeUndefined();
    });

    it("should fail on undefined password", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = "Wayne";
      var registeringEmail = "jw@mail.com";
      var registeringPassword = undefined;

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringPassword + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on numeric password", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = "Wayne";
      var registeringEmail = "jw@mail.com";
      var registeringPassword = 10;

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringPassword + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on boolean password", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = "Wayne";
      var registeringEmail = "jw@mail.com";
      var registeringPassword = false;

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringPassword + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on object password", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = "Wayne";
      var registeringEmail = "jw@mail.com";
      var registeringPassword = {};

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringPassword + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on array password", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = "Wayne";
      var registeringEmail = "jw@mail.com";
      var registeringPassword = [];

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(TypeError(registeringPassword + " is not a string"));

      expect(registered).toBeUndefined();
    });

    it("should fail on empty password", function() {
      var registered;

      var registeringName = "John";
      var registeringSurname = "Wayne";
      var registeringEmail = "jw@mail.com";
      var registeringPassword = "";

      expect(function() {
        register(
          registeringName,
          registeringSurname,
          registeringEmail,
          registeringPassword,
          registeringPassword,
          function() {
            registered = true;
          }
        );
      }).toThrow(Error("password cannot be empty"));

      expect(registered).toBeUndefined();
    });
  });
});
