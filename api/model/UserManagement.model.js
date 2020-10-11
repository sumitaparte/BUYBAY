var mongodb = require("../DatabaseConfig");
var nodemailer = require("nodemailer");
const listingData = require("../model/listingModel");

var User = function (user) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.phoneNumber = user.phoneNumber;
  this.password = user.password;
  this.emailId = user.emailId;
  this.favlisting = user.favlisting;
};

User.getAUser = (user, response) => {
  mongodb.connect().then((client) => {
    const db = client.db("<DB_NAME>");
    const collection = db.collection("user");
    console.log("in get A user");
    console.log(user);
    collection
      .find({ emailId: user.emailId })
      .toArray()
      .then((result) => {
        console.log(result);
        if (result.length) {
          response(null, result);
        } else {
          response(null, {
            success: false,
            message: "incorrect email or password",
          });
        }
      })
      .catch((error) => {
        response(error, null);
        console.log(error);
      });
  });

  console.log("jasfvbjvf");
};

User.getCurrentUser = (user, response) => {
  mongodb.connect().then((client) => {
    const db = client.db("<DB_NAME>");
    const collection = db.collection("user");
    collection
      .find({ emailId: user.emailId })
      .toArray()
      .then((result) => {
        console.log(result);
        if (result.length == 1) {
          response(null, result);
        } else {
          response(null, {
            success: false,
            message: "some error occured",
          });
        }
      })
      .catch((error) => {
        response(error, null);
        console.log(error);
      });
  });

  console.log("jasfvbjvf");
};
User.addUser = (user, response) => {
  mongodb.connect().then((client) => {
    const db = client.db("<DB_NAME>");
    const collection = db.collection("user");
    console.log(user);
    collection
      .insertOne(user)
      .then((result) => {
        response(null, result);
      })
      .catch((error) => {
        response(error, null);
        console.log(error);
      });
  });
  console.log("jasfvbjvf");
};

User.login = (user, response) => {
  mongodb.connect().then((client) => {
    const db = client.db("<DB_NAME>");
    const collection = db.collection("user");
    console.log(user);
    collection
      .find({ emailId: user.emailId })
      .toArray()
      .then((result) => {
        console.log(result);
        if (result.length == 1 && result[0].password == user.password) {
          response(null, result);
        } else {
          response(null, {
            success: false,
            message: "incorrect email or password",
          });
        }
      })
      .catch((error) => {
        response(error, null);
        console.log(error);
      });
  });

  console.log("jasfvbjvf");
};

User.changePassword = (user, response) => {
  mongodb.connect().then((client) => {
    const db = client.db("<DB_NAME>");
    const collection = db.collection("user");
    console.log("change Password:");
    console.log(user);
    collection
      .findOneAndUpdate(
        { emailId: user.emailId, password: user.password },
        { $set: { password: user.newPassword } },
        { upsert: false }
      )
      .then((result) => {
        console.log(result);
        if (result.lastErrorObject.updatedExisting == true) {
          response(null, {
            success: true,
            message: "password updated successfully",
          });
        }else{
            response(null, {
                success: false,
                message: "entered password is incorrect",
              });
        }
      })
      .catch((error) => {
        response(error, null);
        console.log(error);
      });
  });

  console.log("jasfvbjvf");
};

User.forgotPassword = (user, response) => {
  

  var transporter = nodemailer.createTransport({
    service: "gmail",
    host : "smtp.gmail.com",
    port : 587,
    secure : false,
    auth: {
      user: "csci5709.webgrp18@gmail.com",
      pass: "webdev@123",
    },
  });

  var mailOptions = {
    from: "csci5709.webgrp18@gmail.com",
    to: user.emailId,
    subject: "Your new password",
    text: "Your new password is:"+ user.password,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  mongodb.connect().then((client) => {
    const db = client.db("<DB_NAME>");
    const collection = db.collection("user");
    console.log(user);
    collection
      .findOneAndUpdate(
        { emailId: user.emailId },
        { $set: { password: user.encrypted_password } },
        { upsert: false }
      )
      .then((result) => {
        console.log(result);
        if (result.lastErrorObject.updatedExisting == true) {
            response(null, {
                success: true,
                message: "password updated successfully, email has been sent to your registered email address with the new password",
            });
        } else{
            response(null, {
                success: false,
                message: "error occurred while updating password, please ignore the current email received from our side.",
            });
        }
        
      })
      .catch((error) => {
        response(error, null);
        console.log(error);
      });
  });
};

User.deleteUser = (user, response) => {
    mongodb.connect().then((client) => {
      const db = client.db("<DB_NAME>");
      const collection = db.collection("user");
      console.log(user);
      collection
        .findOneAndDelete(
          { emailId: user.emailId}
        )
        .then((result) => {
          console.log(result);
          if (result.lastErrorObject.n == 1) {
            response(null, {
              success: true,
              message: "user deleted successfully",
            });
          }else{
              response(null, {
                  success: false,
                  message: "error occured while deleting the account",
                });
          }
        })
        .catch((error) => {
          response(error, null);
          console.log(error);
        });
    });
  };

  User.feedback = (feedback, response) => {
    mongodb.connect().then((client) => {
      const db = client.db("<DB_NAME>");
      const collection = db.collection("feeback");
      collection
        .insertOne(feedback)
        .then((result) => {
          response(null, result);
        })
        .catch((error) => {
          response(error, null);
          console.log(error);
        });
    });
  };

  User.addToFav = (user, response) => {
    console.log(user)

    mongodb.connect().then((client) => {
      const db = client.db("<DB_NAME>");
      const collection = db.collection("user");
      collection
      .findOneAndUpdate({emailId: user.user}, { $push: {favlisting: user.listingId}})
         .then((result) => {
           console.log(result.lastErrorObject);
           if (result.lastErrorObject.n == 1) {
             response(null, result);
           } else {
             response(null, {
               success: false,
               message: "incorrect email or password",
             });
           }
         })
         .catch((error) => {
           console.log(error)
           response(error, null);
           console.log(error);
         });
    });
  };

  User.deleteFav = (user, response) => {
    mongodb.connect().then((client) => {
      const db = client.db("<DB_NAME>");
      const collection = db.collection("user");
      collection
      .findOneAndUpdate({emailId: user.user}, { $pull: {favlisting: user.listingId}})
         .then((result) => {
           console.log(result.lastErrorObject);
           if (result.lastErrorObject.n == 1) {
             response(null, result);
           } else {
             response(null, {
               success: false,
               message: "incorrect email or password",
             });
           }
         })
         .catch((error) => {
           response(error, null);
           console.log(error);
         });
    });
  };

  User.getFavListingByUser = (user, response) => {
    console.log(user)
    mongodb.connect().then((client) => {
      const db = client.db("<DB_NAME>");
      const collection = db.collection("user");
      collection
        .find({ emailId: user.emailId })
        .toArray()
        .then((result) => {
          if (result.length) {
             console.log(result[0].favlisting);
             const matchedlisting = listingData.find({ listingId : { $in: result[0].favlisting }} , function(err,resp){
              if(err) res.send(err.message);
              response(null, resp);
              });
             
          } else {
            response(null, {
              success: false,
              message: "incorrect user email in session",
            });
          }
        })
        .catch((error) => {
          response(error, null);
          console.log(error);
        });
    });
  };
  
module.exports = User;
