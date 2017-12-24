/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*** MODEL ***/

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.purgeUserBooks = exports.changeBookOwner = exports.removeBook = exports.saveBook = exports.denyRequest = exports.approveRequest = exports.cancelRequest = exports.requestBook = exports.sternGaze = exports.curseOfAlexandria = exports.otherShelves = exports.userShelves = exports.library = undefined;

var _Book = __webpack_require__(3);

var _Book2 = _interopRequireDefault(_Book);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Find every book in the database
var library = exports.library = function library(req, res) {
  _Book2.default.find({}, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      res.json(doc);
    }
  });
};

//Search for books owned by a particular user
var userShelves = exports.userShelves = function userShelves(req, res) {
  var user = req.params.user;

  _Book2.default.find({ owner: user }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      res.json(doc);
    } else {
      res.json('Nope, nothing');
    }
  });
};

//Search for books NOT owned by a particular user
var otherShelves = exports.otherShelves = function otherShelves(req, res) {
  var user = req.params.user;

  _Book2.default.find({ owner: { $ne: user } }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      res.json(doc);
    } else {
      res.json('Nope, you own the whole library.');
    }
  });
};

//Remove every book in the database
var curseOfAlexandria = exports.curseOfAlexandria = function curseOfAlexandria(req, res) {
  _Book2.default.remove({}, function (err, doc) {
    console.log('All books deleted...');
    res.json(doc);
  });
};

//Constantly checking
var sternGaze = exports.sternGaze = function sternGaze(message, socket) {
  socket.on(message, function (interval) {
    setInterval(function () {
      _Book2.default.find({}, function (err, doc) {
        socket.emit(doc);
      });
    }, interval);
  });
};

//Mark a book as requested by a user
var requestBook = exports.requestBook = function requestBook(req, res) {
  var user = req.params.user;

  var book = JSON.parse(decodeURIComponent(req.params.data));

  _Book2.default.findOneAndUpdate({ olkey: book.olkey }, { requested: true, requestor: user }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      res.json('Book requested.');
    }
  });
};

//Mark a book as NOT requested
var cancelRequest = exports.cancelRequest = function cancelRequest(req, res) {
  var user = req.params.user;

  var book = JSON.parse(decodeURIComponent(req.params.data));

  _Book2.default.findOneAndUpdate({
    olkey: book.olkey,
    requestor: user,
    requested: true
  }, { requested: false, requestor: '' }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      res.json('Request for book with olkey ' + book.olkey + ' canceled.');
    }
  });
};

//Approve Request
var approveRequest = exports.approveRequest = function approveRequest(req, res) {
  var user = req.params.user;

  var book = JSON.parse(decodeURIComponent(req.params.data));

  _Book2.default.findOne({ olkey: book.olkey, owner: user, requested: true }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      console.log('Before', doc);
      doc.owner = doc.requestor;
      doc.requestor = '';
      doc.requested = false;
      console.log('After', doc);
      doc.save(function (err, result) {
        console.log('Saved', result);
        res.json('You have successfully swapped a book!');
      });
    }
  });
};

//Deny request
var denyRequest = exports.denyRequest = function denyRequest(req, res) {
  var user = req.params.user;

  var book = JSON.parse(decodeURIComponent(req.params.data));

  _Book2.default.findOneAndUpdate({
    olkey: book.olkey,
    owner: user,
    requested: true
  }, { requested: false, requestor: '' }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      res.json('Request for book with olkey ' + book.olkey + ' denied.');
    }
  });
};

//Saves a new book to the database
var saveBook = exports.saveBook = function saveBook(req, res) {
  var user = req.params.user;

  var book = JSON.parse(decodeURIComponent(req.params.data));

  _Book2.default.findOne({
    username: user,
    olkey: book.olkey
  }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      res.json('This book is already in the database.');
    } else {
      var newBook = new _Book2.default({
        author: book.author,
        title: book.title,
        publication: book.publication,
        cover: book.cover,
        olkey: book.olkey,
        owner: user
      });
      newBook.save(function (err, doc) {
        if (err) {
          console.error(err);
        }
        res.json('This book has been saved! Praise Jesus! It is owned by ' + user + '!');
      });
    }
  });
};

//Remove a user's book from the database
var removeBook = exports.removeBook = function removeBook(req, res) {
  var user = req.params.user;

  var book = JSON.parse(decodeURIComponent(req.params.data));
  console.log(book);
  _Book2.default.remove({
    owner: user,
    olkey: book.olkey
  }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      console.log(doc + ' has been deleted.');
      res.json(doc + ' has been deleted.');
    }
  });
};

//Update the user's book ownership to their new username
//Invoked in userController
var changeBookOwner = exports.changeBookOwner = function changeBookOwner(user, newName) {
  _Book2.default.find({}, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      doc.map(function (item) {
        //Update book ownership to newName
        if (item.owner === user) {
          item.owner = newName;
        }

        //Update user requests to newName
        if (item.requestor === user && item.requested === true) {
          item.requestor = newName;
        }

        //Save changes
        item.save(function (err, ok) {
          if (err) {
            console.error(err);
          }
          console.log('Book ownership updated:', ok);
          res.json('Book ownership updated.');
        });
      });
    }
  });
};

//Purge user's books
//Invoked when deleting a user's account
var purgeUserBooks = exports.purgeUserBooks = function purgeUserBooks(user) {
  _Book2.default.find({}, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      doc.map(function (item) {
        //If user has requested books, cancel the requests
        if (item.requestor === user) {
          item.requested = false;
          item.requestor = '';
        }
        //If user's books have been requested, deny the requests
        if (item.owner === user && item.requested === true) {
          item.requested = false;
          item.requestor = '';
        }

        //Save changes
        item.save(function (err, ok) {
          if (err) {
            console.error(err);
          }
          console.log('Requests for ' + item + ' canceled or denied.');
        });
      });
    }
  });

  //If user owns the book, remove the book
  _Book2.default.remove({ owner: user }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      console.log(user + "'s books removed.'");
    }
  });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var Book = new Schema({
  author: String,
  cover: String,
  olkey: String,
  owner: String,
  publication: Number,
  requested: {
    default: false,
    type: Boolean
  },
  requestor: String,
  title: String
});

exports.default = _mongoose2.default.model('Book', Book);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*** MODEL ***/

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authConfig = undefined;

var _User = __webpack_require__(7);

var _User2 = _interopRequireDefault(_User);

var _passport = __webpack_require__(5);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(21);

var _bcrypt = __webpack_require__(8);

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*** CONTROLLERS ***/
var authConfig = exports.authConfig = function authConfig(passport) {
  /*** Configure the local strategy for use by Passport.                      *
   * The local strategy require a `verify` function which receives the        *
   * credentials (`username` and `password`) submitted by the user.  The      *
   * function must verify that the password is correct and then invoke `cb`   *
   * with a user object, which will be set at `req.user` in route handlers    *
   * after authentication.                                                  ***/
  passport.use(new _passportLocal.Strategy(function (username, password, done) {
    _User2.default.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log('No such user exists.');
        return done(null, false);
      }

      //Compare the stored hash to a hash of the submitted password
      _bcrypt2.default.compare(password, user.password, function (err, res) {
        //res === true if they match
        if (!res) {
          console.log('Bad password');
          return done(null, false);
        }
        return done(null, user);
      });
    });
  }));

  /*** Configure Passport authenticated session persistence.                  *
   * In order to restore authentication state across HTTP requests, Passport  *
   * needs to serialize users into and deserialize users out of the session.  *
   * The typical implementation of this is as simple as supplying the user ID *
   * when serializing, and querying the user record by ID from the database   *
   * when deserializing.                                                    ***/
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    _User2.default.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

/*** BCRYPT ***/


/*** PASSPORT ***/

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*** REGEX ***/

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regex = __webpack_require__(20);

var _regex2 = _interopRequireDefault(_regex);

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

/*** MODEL ***/


var User = new Schema({
  created: {
    type: Date,
    required: true,
    default: new Date()
  },
  location: {
    match: _regex2.default.location,
    minlength: 1,
    required: true,
    type: String
  },
  password: {
    match: _regex2.default.password,
    minlength: 8,
    required: true,
    type: String
  },
  username: {
    index: { unique: true },
    match: _regex2.default.username,
    minlength: 1,
    required: true,
    type: String
  }
});

exports.default = _mongoose2.default.model('User', User);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(10);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*** ES6+ ***/

__webpack_require__(4);

var _es6Promise = __webpack_require__(11);

var _es6Promise2 = _interopRequireDefault(_es6Promise);

__webpack_require__(12);

var _express = __webpack_require__(13);

var _express2 = _interopRequireDefault(_express);

var _dotenv = __webpack_require__(0);

var _dotenv2 = _interopRequireDefault(_dotenv);

var _morgan = __webpack_require__(14);

var _morgan2 = _interopRequireDefault(_morgan);

var _compression = __webpack_require__(15);

var _compression2 = _interopRequireDefault(_compression);

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressSession = __webpack_require__(16);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = __webpack_require__(5);

var _passport2 = _interopRequireDefault(_passport);

var _bodyParser = __webpack_require__(17);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = __webpack_require__(18);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _indexServer = __webpack_require__(19);

var _authConfig = __webpack_require__(6);

var _http = __webpack_require__(25);

var _http2 = _interopRequireDefault(_http);

var _socket = __webpack_require__(26);

var _socket2 = _interopRequireDefault(_socket);

var _socketServer = __webpack_require__(27);

var _socketServer2 = _interopRequireDefault(_socketServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_es6Promise2.default.polyfill();

/*** EXPRESS ***/

var app = (0, _express2.default)();

/*** ENVIRONMENT ***/
var path = process.cwd();

_dotenv2.default.load();

/*** DEVELOPMENT TOOLS ***/
var DEV = "development" === 'development';
var PROD = "development" === 'production';

DEV ? app.use((0, _morgan2.default)('dev')) : app.use((0, _morgan2.default)('tiny'));

/*** ENABLE COMPRESSION ***/

if (PROD) {
  app.use((0, _compression2.default)());
}

/*** MIDDLEWARE ***/
app.use('/js', _express2.default.static(path + '/dist/js')); //The first argument creates the virtual directory used in index.html
app.use('/styles', _express2.default.static(path + '/dist/styles'));
app.use('/img', _express2.default.static(path + '/dist/img'));

/*** MONGOOSE ***/

var db = _mongoose2.default.connection;
_mongoose2.default.Promise = _es6Promise2.default;
_mongoose2.default.connect(process.env.MONGO_URI, { useMongoClient: true }, function (err, db) {
  if (err) {
    console.error('Failed to connect to database!');
  } else {
    console.log('Connected to database.');
  }
});

/*** AUTHENTICATION ***/


var MongoStore = __webpack_require__(28)(_expressSession2.default);

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());

var sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: false,
    maxAge: 1800000 //30 minutes
  },
  store: new MongoStore({ mongooseConnection: db }, function (err) {
    console.log(err);
  }), //defaults to MemoryStore instance, which can cause memory leaks
  name: 'id'
};

if (PROD) {
  app.set('trust proxy', 1);
  sess.cookie.secure = true; //serve secure cookies in production
  sess.cookie.httpOnly = true;
}

app.use((0, _expressSession2.default)(sess));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

/*** ROUTES ***/

(0, _authConfig.authConfig)(_passport2.default);
(0, _indexServer.routes)(app, _passport2.default);

/*** WEB SOCKETS ***/

var server = _http2.default.createServer(app);

var io = (0, _socket2.default)(server);

(0, _socketServer2.default)(io);

/*** SERVE ***/
var port = process.env.PORT;
server.listen(port, function () {
  console.log('Server is listening on port', port + '.');
});

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("es6-promise");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*** ENVIRONMENT ***/

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = undefined;

var _dotenv = __webpack_require__(0);

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bookControllerServer = __webpack_require__(2);

var _authConfig = __webpack_require__(6);

var _userControllerServer = __webpack_require__(22);

var _searchControllerServer = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = process.cwd();

_dotenv2.default.load();

/*** DEVELOPMENT TOOLS ***/
var DEV = "development" === 'development';
var PROD = "development" === 'production';

/*** CONTROLLERS ***/

//Handle book additions, ownership updates, swap requests, and deletions


//Handle user updates and authentication


//Handle Add Book searches


/*** ROUTES ***/
var routes = exports.routes = function routes(app, passport) {
  //Enforce HTTPS in production
  if (PROD) {
    app.use('*', function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        console.log('Redirecting to', process.env.APP_URL + req.url);
        res.redirect(process.env.APP_URL + req.url);
      } else {
        next(); /* Continue to other routes if we're not redirecting */
      }
    });
  }

  //Login
  //This route exists because making it seems easier than convincing Passport.js
  //to send a simple `json` response when there are login errors.
  app.route('/welcome/jsValidate/:data').post(_userControllerServer.jsValidate);

  //Main login page and validation routes
  app.route('/welcome').get(function (req, res) {
    res.sendFile(path + '/dist/welcome.html');
  }).post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/welcome'
  }));

  //This is the name that will display in the client view
  var name_view = void 0;
  //Authorization check
  var permissions = function permissions(req, res, next) {
    if (req.isAuthenticated()) {
      name_view = req.user.username;
      return next();
    } else {
      if (DEV) {
        name_view = 'Developer';
        return next();
      } else {
        res.redirect('/welcome');
      }
    }
  };

  //Root
  app.route('/').get(permissions, function (req, res) {
    res.sendFile(path + '/dist/index.html');
  });

  //Logout
  app.route('/logout').get(permissions, function (req, res) {
    req.logout();
    res.redirect('/welcome');
  });

  //API - They stop working when I require permissions...
  //Search for a book
  app.route('/api/search/:s').post(_searchControllerServer.searchSubmit);
  //User requests a book
  app.route('/api/:user/request/:data').post(_bookControllerServer.requestBook);
  //User cancels their own book request
  app.route('/api/:user/cancelRequest/:data').post(_bookControllerServer.cancelRequest);
  //User denies request for their book
  app.route('/api/:user/denyRequest/:data').post(_bookControllerServer.denyRequest);
  //User approves request for their book
  app.route('/api/:user/approveRequest/:data').post(_bookControllerServer.approveRequest);
  //Update username and location
  app.route('/api/:user/update-profile/:data').post(_userControllerServer.updateProfile);
  //Update password
  app.route('/api/:user/update-password/:data').post(_userControllerServer.updatePassword);

  app.route('/api/:user/save/:data')
  //Save a book to a user
  .post(_bookControllerServer.saveBook)
  //Delete a user's book
  .delete(_bookControllerServer.removeBook);
  //See a user's books
  app.route('/api/:user/userBooks').get(_bookControllerServer.userShelves);
  //See books that do NOT belong to a user
  app.route('/api/:user/otherBooks').get(_bookControllerServer.otherShelves);

  //Users
  app.route('/api/users')
  //See all users
  .get(_userControllerServer.viewUsers)
  //Save a new user and log the user in
  .post(_userControllerServer.saveUser, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/welcome'
  }));

  //Get login name
  app.route('/api/users/logged').get(function (req, res) {
    if (DEV) {
      console.log('Client requesting username...');
    }
    res.json(name_view);
  });

  //Get user's location
  app.route('/api/:user/location').get(_userControllerServer.getLocation);

  //Delete user
  app.route('/api/deleteUser/:user').delete(_userControllerServer.deleteUser);

  /*** DEBUGGING - No UI ***/
  if (DEV) {
    //Remove all stored books
    app.use('/api/burn', _bookControllerServer.curseOfAlexandria);
    //Remove all users
    app.use('/api/purge', _userControllerServer.genocide);
    //See all books
    app.route('/api/library').get(_bookControllerServer.library);
  }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//The same regex is used in both client and
//server side validation

Object.defineProperty(exports, "__esModule", {
  value: true
});
var regex = {
  //Locations can't include numbers or most special characters and must be 1-100 characters
  location: /^[a-zA-Z\,\-\.\ ]{1,100}$/,
  //passwords should include at least 8 letters, numbers, and special characters
  password: /(?=.*[a-zA-Z]+)(?=.*[0-9]+)(?=.*[^a-zA-Z0-9]+).{8,}/,
  //Usernames can't include anything that's not a letter, number, or permitted special character and must be 1-40 characters
  username: /^[A-Za-z0-9\-\.\,\ ]{1,40}$/
};

exports.default = regex;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*** ENVIRONMENT ***/

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.updatePassword = exports.updateProfile = exports.saveUser = exports.getLocation = exports.jsValidate = exports.genocide = exports.viewUsers = undefined;

var _dotenv = __webpack_require__(0);

var _dotenv2 = _interopRequireDefault(_dotenv);

var _User = __webpack_require__(7);

var _User2 = _interopRequireDefault(_User);

var _bcrypt = __webpack_require__(8);

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _bookControllerServer = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = process.cwd();

_dotenv2.default.load();

/*** DEVELOPMENT TOOLS ***/
var DEV = "development" === 'development';
var PROD = "development" === 'production';

/*** MODELS ***/


/*** BCRYPT ***/

var saltRounds = 10;

/*** CONTROLLERS ***/
//Used to update book ownership when invoking updateProfile function
//Or to nullify user's book positions before account deletion


//View all users in the database
var viewUsers = exports.viewUsers = function viewUsers(req, res) {
  _User2.default.find({}, function (err, results) {
    if (err) {
      console.error(err);
    }
    if (results) {
      res.json(results);
    }
  });
};

//Remove every user in the database
var genocide = exports.genocide = function genocide(req, res) {
  _User2.default.remove({}, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      console.log('All users deleted...');
      res.json('All users deleted...');
    }
  });
};

//Check if user exists - used for login and signup pre-passport validation
var jsValidate = exports.jsValidate = function jsValidate(req, res) {
  if (DEV) {
    console.log('jsValidate');
  }
  var data = JSON.parse(decodeURIComponent(req.params.data));
  var user = data.username;
  var pass = data.password;
  if (DEV) {
    console.log('Validating username ' + user + ' with password ' + pass);
  }

  _User2.default.findOne({ username: user }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    //Signup validation
    //signup validation does not check any password against the database;
    //it only checks if the requested username is taken.
    if (!pass) {
      if (doc) {
        res.json('NO');
      } else {
        res.json('OK');
      }
    } else {
      //Login validation
      //If there is a password and that user exists
      if (doc) {
        //Check current password submission against what's in the database
        _bcrypt2.default.compare(pass, doc.password, function (err, verdict) {
          //If it works, validation complete
          if (verdict) {
            res.json('OK');
          } else {
            //If thse password doesn't work, there's a problem
            res.json('NO');
          }
        });
      } else {
        //If there's no such user, there's a problem
        res.json('NO');
      }
    }
  });
};

//Get user's location
var getLocation = exports.getLocation = function getLocation(req, res) {
  var user = req.params.user;

  _User2.default.findOne({ username: user }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      res.json(doc.location);
    } else {
      if (DEV) {
        res.json('CodeLand');
      }
    }
  });
};

//Save a new user to the database
var saveUser = exports.saveUser = function saveUser(req, res, next) {
  var user = req.body;
  _User2.default.findOne({ username: user.username }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      //Error if this user already exists
      res.json('NO');
    } else {
      //Otherwise has the password and save the user information
      _bcrypt2.default.hash(user.password, saltRounds, function (err, hash) {
        var newUser = new _User2.default({
          username: user.username,
          password: hash,
          location: user.location
        });

        newUser.save(function (err, doc) {
          if (err) {
            console.error(err);
          }
          console.log(user.username + ' successfully signed up. Logging in.');
          return next();
        });
      });
    }
  });
};

//Update location or username
var updateProfile = exports.updateProfile = function updateProfile(req, res) {
  var user = req.params.user;

  var update = JSON.parse(decodeURIComponent(req.params.data));

  if (DEV) {
    console.log('Update request received from ' + user);
  }

  //response will be NO if either update returns an error, else OK
  var response = void 0;

  //If user wants to update the username
  if (update.username) {
    //See if the requested username is already taken
    _User2.default.findOne({ username: update.username }, function (err, doc) {
      if (err) {
        console.error(err);
      }
      //If so, send an error message
      if (doc) {
        response = 'NO';
      } else {
        //Else if that name isn't taken, find the existing user
        _User2.default.findOneAndUpdate({ username: user }, { username: update.username }, function (err, doc2) {
          if (err) {
            console.error(err);
          }
          if (doc2) {
            (0, _bookControllerServer.changeBookOwner)(user, update.username);
            //If there are no previous errors, return OK, else NO
            response === 'NO' ? response = 'NO' : response = 'OK';
            console.log('THIS IS IT:', response);
          }
        });
      }
    });
  }

  //If user wants to update their location
  if (update.location) {
    if (DEV) {
      console.log('Updating location to', update.location);
    }
    _User2.default.findOneAndUpdate({ username: user }, { location: update.location }, function (err, ok) {
      if (err) {
        console.error(err);
      }
      if (ok) {
        console.log(ok);
        response === 'NO' ? response = 'NO' : response = 'OK';
      } else {
        //This is not expected to happen
        response = 'NO';
      }
    });
  }

  //This is a sort of hack to wait until response is defined before sending. Possibly improve using async/await, promises...
  var wait = setInterval(function () {
    if (response) {
      //This response should take into account both username and location updates, returning NO or OK
      if (DEV) {
        console.log('Response will be:', response);
      }
      res.json(response);
      clearInterval(wait);
    }
  }, 500);
};

//Update password
var updatePassword = exports.updatePassword = function updatePassword(req, res) {
  var user = req.params.user;

  var update = JSON.parse(decodeURIComponent(req.params.data));
  _User2.default.findOne({ username: user }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      //Check current password submission against what's in the database
      _bcrypt2.default.compare(update.currentPassword, doc.password, function (err, verdict) {
        //If it works, hash and save the new password submission
        if (verdict) {
          _bcrypt2.default.hash(update.newPassword, saltRounds, function (err, hash) {
            doc.password = hash;
            doc.save(function (err, result) {
              if (err) {
                console.error(err);
              }
              res.json('OK');
            });
          });
        } else {
          //Else send error
          res.json('NO');
        }
      });
    } else {
      //No user found - not expected
      res.json('NO');
    }
  });
};

//Delete user and user's books
var deleteUser = exports.deleteUser = function deleteUser(req, res) {
  var user = req.params.user;

  //Cancel user requests, deny requests for user's books, and remove user's books

  (0, _bookControllerServer.purgeUserBooks)(user);

  //Delete the user
  _User2.default.remove({ username: user }, function (err, doc) {
    if (err) {
      console.error(err);
    }
    if (doc) {
      console.log('User ' + user + ' deleted...');
      res.json('User ' + user + ' deleted...');
    }
  });
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchSubmit = undefined;

var _commonFunctions = __webpack_require__(24);

var searchSubmit = exports.searchSubmit = function searchSubmit(req, res) {
  (0, _commonFunctions.f)('GET', 'https://openlibrary.org/search.json?q=' + req.params.s, function (response) {
    var books = [];
    //Only sort through the first 20 responses
    for (var i = 0; i < 20; i++) {
      var b = response.docs[i];

      //Validate and Clean Author Entries
      var author = void 0;
      if (!b.author_name) {
        author = 'Unlisted';
      } else if (b.author_name.length === 1) {
        author = b.author_name[0];
      } else if (b.author_name.length === 2) {
        author = b.author_name.join(' and ');
      } else if (b.author_name.length > 2) {
        author = b.author_name[0] + ', ' + b.author_name[1] + ', et al.';
      } else {
        author = 'Unlisted';
      }
      //Validate and Clean Title
      var title = void 0;
      if (!b.title) {
        title = 'Unlisted Title';
      } else {
        title = b.title;
      }

      //Validate and Clean Publication Date
      var publication = void 0;
      if (!b.first_publish_year) {
        publication = 0;
      } else {
        publication = b.first_publish_year;
      }

      //Validate and Clean Cover Keys
      var cover = void 0;
      if (!b.cover_edition_key) {
        cover = null;
      } else {
        cover = b.cover_edition_key;
      }

      //Validate and Clean olkeys
      var k = void 0;
      if (b.key) {
        k = b.key;
        k = k.split('');
        k.splice(0, 7);
        k = k.join('');
      }

      //Assemble the book object
      var book = {
        author: author,
        title: title,
        publication: publication,
        cover: cover,
        olkey: k

        //Push the book object to the books array
      };if (book.cover) {
        books.push(book);
      }

      //Handle short responses
      if (i === response.docs.length - 1) {
        break;
      }
    }

    //Send the array to the client
    res.json(books);
  });
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var f = exports.f = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(method, url, cb1, cb2) {
    var a, b;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch(url, { method: method });

          case 3:
            a = _context.sent;
            _context.next = 6;
            return a.json();

          case 6:
            b = _context.sent;

            cb1(b);
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', _context.t0);

          case 13:
            _context.prev = 13;

            if (cb2) {
              cb2();
            }
            return _context.finish(13);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 10, 13, 16]]);
  }));

  return function f(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var uniq = exports.uniq = function uniq(a) {
  return Array.from(new Set(a));
}; //Deduplicate

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Book = __webpack_require__(3);

var _Book2 = _interopRequireDefault(_Book);

var _bookControllerServer = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ioEvents = function ioEvents(io) {
  io.on('connection', function (serverSocket) {
    console.log('Web Sockets connected.');

    serverSocket.on('librarian', function (received) {
      setInterval(function () {
        //User shelves
        _Book2.default.find({ owner: [received[1]] }, function (err, doc) {
          if (err) {
            console.error(err);
          }
          if (doc) {
            serverSocket.emit('librarian', [doc, null, null, null, null]);
          }
        });

        //Other shelves
        _Book2.default.find({ owner: { $ne: [received[1]] }, requested: false }, function (err, doc) {
          if (err) {
            console.error(err);
          }
          if (doc) {
            serverSocket.emit('librarian', [null, doc, null, null, null]);
          }
        });

        //Requested books
        _Book2.default.find({ requested: true }, function (err, doc) {
          if (err) {
            console.error(err);
          }
          if (doc) {
            serverSocket.emit('librarian', [null, null, doc, null, null]);
          }
        });

        //Requested by user
        _Book2.default.find({ requested: true, requestor: received[1] }, function (err, doc) {
          if (err) {
            console.error(err);
          }
          if (doc) {
            serverSocket.emit('librarian', [null, null, null, doc, null]);
          }
        });

        //Requests for user's books
        _Book2.default.find({ requested: true, owner: received[1] }, function (err, doc) {
          if (err) {
            console.error(err);
          }
          if (doc) {
            serverSocket.emit('librarian', [null, null, null, null, doc]);
          }
        });
      }, received[0]);
    });
    //    sternGaze('librarian', serverSocket)

    io.on('disconnect', function () {
      console.log('Web Sockets disconnected.');
    });
  });
};

exports.default = ioEvents;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("connect-mongo");

/***/ })
/******/ ]);
//# sourceMappingURL=server.bundle.js.map