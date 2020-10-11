var UserModel = require("../model/UserManagement.model");
var crypto = require("crypto");
var randomString = require("randomstring");

exports.getAUser = (req, res) => {
  class User {
    constructor() {
      this.emailId = req.params.id;
    }
  }
  //res.send("success");
  var user = new User();
  UserModel.getAUser(user, function (err, response) {
    if (response) {
      console.log(response);
      if (response.success == false) {
        res.status(200).json({
          success: false,
          message: "email or password is incorrect",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "login successful",
        });
      }
    } else {
      res.status(200).json({
        success: false,
        message: "some error occured ",
      });
    }
  });
};
exports.getCurrentUser = (req, res) => {
  class User {
    constructor() {
      this.emailId = req.body.emailId;
    }
  }
  //res.send("success");
  var user = new User();
  console.log(req.body.emailId);
  UserModel.getCurrentUser(user, function (err, response) {
    if (response) {
      console.log(response);
      if (response.success == false) {
        res.status(200).json({
          success: false,
          message: response.message,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "login successful",
          user: response,
        });
      }
    } else {
      res.status(200).json({
        success: false,
        message: "some error occured ",
      });
    }
  });
};

exports.addUser = (req, res) => {
  class User {
    constructor() {
      this.firstName = req.body.firstName;
      this.lastName = req.body.lastName;
      this.phoneNumber = req.body.phoneNumber;
      this.password = req.body.password;
      this.emailId = req.body.emailId;
    }
  }
  console.log(req.firstName + req.lastName + req.password);
  var user = new User();
  var mykey = crypto.createCipher("aes-128-cbc", "mypassword");
  var mystr = mykey.update(user.password, "utf8", "hex");
  mystr += mykey.final("hex");
  console.log(mystr + ":mystr_second");
  user.password = mystr;

  var mykey1 = crypto.createDecipher("aes-128-cbc", "mypassword");
  var mystr1 = mykey1.update(mystr, "hex", "utf8");
  console.log(mystr + ":mystr1_first");
  mystr1 += mykey1.final("utf8");
  console.log(mystr1 + ":mystr1_second");

  //res.send("success");
  UserModel.addUser(user, function (err, response) {
    if (response) {
      res.status(200).json({
        success: true,
        message: "successfully signed up",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "error occured",
      });
    }
  });
};

exports.login = (req, res) => {
  class User {
    constructor() {
      this.password = req.body.password;
      this.emailId = req.body.emailId;
    }
  }
  var user = new User();
  var mykey = crypto.createCipher("aes-128-cbc", "mypassword");
  var mystr = mykey.update(user.password, "utf8", "hex");
  mystr += mykey.final("hex");
  console.log(mystr + ":mystr_second");
  user.password = mystr;
  //res.send("success");
  UserModel.login(user, function (err, response) {
    if (response) {
      console.log(response);
      if (response.success == false) {
        res.status(200).json({
          success: false,
          message: "email or password is incorrect",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "login successful",
        });
      }
    } else {
      res.status(200).json({
        success: false,
        message: "some error occured ",
      });
    }
  });
};

exports.changePassword = (req, res) => {
  class User {
    constructor() {
      this.password = req.body.password;
      this.emailId = req.body.emailId;
      this.newPassword = req.body.newPassword;
    }
  }
  var user = new User();
  var mykey = crypto.createCipher("aes-128-cbc", "mypassword");
  var encryped_password = mykey.update(user.password, "utf8", "hex");
  encryped_password += mykey.final("hex");
  user.password = encryped_password;
  var mynewkey = crypto.createCipher("aes-128-cbc", "mypassword");
  var encryped_new_password = mynewkey.update(user.newPassword, "utf8", "hex");
  encryped_new_password += mynewkey.final("hex");
  user.newPassword = encryped_new_password;
  //res.send("success");
  UserModel.changePassword(user, function (err, response) {
    if (response) {
      //console.log(response);
      if (response.success == false) {
        res.status(200).json({
          success: false,
          message: response.message,
        });
      } else {
        res.status(200).json({
          success: true,
          message: response.message,
        });
      }
    } else {
      res.status(200).json({
        success: false,
        message: "some error occured ",
      });
    }
  });
};

exports.forgotPassword = (req, res) => {
  class User {
    constructor() {
      this.password = null;
      this.encrypted_password = null;
      this.emailId = req.body.emailId;
    }
  }
  var user = new User();
  randomPassword = randomString.generate({
    length: 18,
    charset: "alphanumeric",
  });
  user.password = randomPassword;
  var mykey = crypto.createCipher("aes-128-cbc", "mypassword");
  var encrypted_password = mykey.update(randomPassword, "utf8", "hex");
  encrypted_password += mykey.final("hex");
  user.encrypted_password = encrypted_password;
  //res.send("success");
  UserModel.forgotPassword(user, function (err, response) {
    if (response) {
      //console.log(response);
      if (response.success == false) {
        res.status(200).json({
          success: false,
          message: response.message,
        });
      } else {
        res.status(200).json({
          success: true,
          message: response.message,
        });
      }
    } else {
      res.status(200).json({
        success: false,
        message: "some error occured ",
      });
    }
  });
};

exports.deleteUser = (req, res) => {
  class User {
    constructor() {
      this.emailId = req.params.emailId;
    }
  }
  console.log("request");
  console.log(req.body);
  var user = new User();
  //res.send("success");
  UserModel.deleteUser(user, function (err, response) {
    if (response) {
      //console.log(response);
      if (response.success == false) {
        res.status(200).json({
          success: false,
          message: response.message,
        });
      } else {
        res.status(200).json({
          success: true,
          message: response.message,
        });
      }
    } else {
      res.status(200).json({
        success: false,
        message: "some error occured ",
      });
    }
  });
};

exports.feedback = (req, res) => {
  class Feedback {
    constructor() {
      this.emailId = req.body.emailId;
      this.subject = req.body.subject;
      this.feedback = req.body.feedback;
    }
  }
  var feedback = new Feedback();
  //res.send("success");
  UserModel.feedback(feedback, function (err, response) {
    if (response) {
      res.status(200).json({
        success: true,
        message: "feedback submitted successfully",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "error occured",
      });
    }
  });
};

exports.addToFav = (req, res) => {
  UserModel.addToFav(req.body);
};

exports.deleteFav = (req, res) => {
  UserModel.deleteFav(req.body);
};

exports.getFavListingByUser = (req, res) => {
  class User {
    constructor() {
      this.emailId = req.body.emailid;
    }
  }
  var user = new User();
  UserModel.getFavListingByUser(user, function (err, response) {
    if (response) {
        res.status(200).json({
          success: true,
          object: response
        });
    } else {
      res.status(200).json({
        success: false,
        message: "some error occured ",
      });
    }
  });
};
