const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const requestIp = require("request-ip");
const uuid = require("uuid");
const CryptoJS = require("crypto-js");

const response = require("../../shared_modules/response");
const statusCode = require("../../shared_modules/statusCode.json");
const authModel = require("../../model/webapplication/authModel");
const { config } = require("dotenv");


exports.loginWithEmail = async (req, res) => {
  try {
    let getUsersEmail = await authModel.getUsersFullDetails(req.body.email);
    if (getUsersEmail.length > 0) {

      let hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);
      if (getUsersEmail[0].password === hash) {
        const timestampUUID = uuid.v1();
        // console.log("Timestamp UUID (v1):", timestampUUID);
        const jwtToken = jwt.sign(
          {
            email: getUsersEmail[0].email,
            id: getUsersEmail[0].id,
            jwtId: timestampUUID,
          },
          process.env.JWTSECRETKEY,
          { expiresIn: process.env.JWTSESSIONTIMEOUTFORAPP }
        );
        // Insert Activity
        let activityInserted = await authModel.insertActivity({
          user_id: getUsersEmail[0].id,
          activity_type: "Login",
          ip: requestIp.getClientIp(req),
        });
        if (activityInserted) {
          let jwtId = await authModel.insertJwtID(
            timestampUUID,
            getUsersEmail[0].id
          );
          if (jwtId) {
           
            return res.send(
              response(statusCode.Accepted, true, "Login Successful", {
                id: getUsersEmail[0].id,
                email: getUsersEmail[0].email,
                authToken: jwtToken,
              })
            );
          } else {
            return res.send(
              response(
                statusCode.Partial_Content,
                false,
                "Something went wrong.Please try again"
              )
            );
          }
        } else {
          return res.send(
            response(statusCode.Partial_Content, false, "Something went wrong.Please try again")
          );
        }
      } else {
        return res.send(
          response(statusCode.See_Other, false, "Password does not match")
        );
      }
    } else {
      return res.send(
        response(statusCode.Not_Acceptable, false, "Please registered before login")
      );
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send(response());
  }
};

exports.changePassword = async (req, res) => {
  try {
    if (req.body.password === req.body.confirm_password) {
      let hash = CryptoJS.SHA256(req.body.password).toString(CryptoJS.enc.Hex);
      const updated = await authModel.updatePassword(hash, req.user_id);
      if (updated) {
        return res.send(response(statusCode.OK, true, "success"));
      } else {
        return res.send(
          response(
            statusCode.Not_Modified,
            false,
            "Unable to update password.Try again later"
          )
        );
      }
    }else{
      return res.send(response(statusCode.OK, true, "Both password should be same"));
    }
  } catch (error) {
    res.status(500).send(response());
  }
};

