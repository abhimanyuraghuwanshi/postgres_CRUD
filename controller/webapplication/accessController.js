const dotenv = require("dotenv").config();
const statusCode = require("../../shared_modules/statusCode.json");
const response = require("../../shared_modules/response");
const authModel = require("../../model/webapplication/authModel");
const CryptoJS = require("crypto-js");
const path = require("path");

exports.userRegistration = async (req, res) => {
  try {
    const check = await authModel.checkIfExist(req.body.email);
    if (check.length == 0) {
      if (req.body.password === req.body.confirm_password) {
        req.body.password = CryptoJS.SHA256(req.body.password).toString(
          CryptoJS.enc.Hex
        );
        const register = await authModel.insertUser(req.body);
        console.log(register);
        if (register) {
          return res.send(
            response(statusCode.OK, true, "Registration successfull")
          );
        } else {
          return res.send(
            response(
              statusCode.Bad_Request,
              false,
              "Unable to register.Try again"
            )
          );
        }
      } else {
        return res.send(
          response(
            statusCode.Conflict,
            false,
            "Password and confirm password should be same."
          )
        );
      }
    } else {
      return res.send(
        response(
          statusCode.Already_Reported,
          false,
          "Email already registered."
        )
      );
    }
  } catch (error) {
    console.log(error);
    res.send(response());
  }
};

exports.userProfile = async (req, res) => {
  try {
    let profile = await authModel.getUsersProfile(req.user_id);
    if (profile.length > 0) {

      const twoFoldersUp = path.join(__dirname, "..", "..");
      profile[0].profile_pic = path.join(
        twoFoldersUp,
        "uploads/contactUs/",
        profile[0].profile_pic
      );
      
      res.send(response(200, true, "Success", profile[0]));
    } else {
      res.send(response(200, false, "Unable to fetch data"));
    }
  } catch (error) {
    res.send(response());
  }
};

exports.contactUS = async (req, res) => {
  try {
    const { image, video } = req.files;
    // Access uploaded image and video details in req.files object
    req.body.imageName = image == undefined ? "none" : image[0].filename;
    req.body.videoName = video == undefined ? "none" : video[0].filename;

    if (req.body.mobile_type == undefined) {
      req.body.mobile_type = "none";
    }
    if (req.body.mobile_detail == undefined) {
      req.body.mobile_detail = "none";
    }
    // console.log(req.body)

    let recieved = await authModel.contactUsForm(req.body);
    if (recieved) {
      res.send(
        response(200, true, "We've got your query. We'll reply shortly!")
      );
    } else {
      res.send(
        response(200, false, "Uh-oh! It didn't work. Give it another shot.")
      );
    }
  } catch (error) {
    res.send(response());
  }
};
