const express = require('express');
const router = express.Router();
const {overallLimit,criticalLimit}= require('../utils/ratelimit')
const accessController = require('../controller/webapplication/accessController')
const authController = require('../controller/mobileapp/authController')
const statisticsController = require('../controller/mobileapp/statisticsController')
const validate = require('../shared_modules/zodValidator')
const validator = require('../middleware/userSchemaValidation')

const {uploadContactUs} = require('../config/multerConfig')
let ContactUsfile = uploadContactUs.fields([{ name: 'image' }, { name: 'video' }])

router.use(overallLimit)
/*for all api single login is supported so send 'version=website' in headers for web api */
router.get('/stopapplicationflag',statisticsController.stopApplicationFlag);
router.post('/userregistration',validator.RegistrationSchema,accessController.userRegistration);
router.post('/loginwithemail',criticalLimit,validator.LoginSchema,authController.loginWithEmail);
router.post('/contactus',ContactUsfile,validator.ContactUsSchema, accessController.contactUS);


const { ensureWebToken } = require('../utils/auth/jwtUser');
router.use(ensureWebToken)

router.get('/getuserprofile',accessController.userProfile);
router.post('/changepassword',criticalLimit,validator.ChangePasswordSchema,authController.changePassword);


module.exports = router;