const express = require('express'),
  router = express.Router(),
  { check, validationResult } = require('express-validator/check')

var ConsultantController = require('../../controllers/ConsultantController.js');
var CommonValidationMiddlewareHelper = require('../../middlewares/CommonValidationMiddlewareHelper');
var ProjectController = require('../../controllers/ProjectController');
var CommonController = require('../../controllers/CommonController');
var fileUploadMiddlewareHelper = require('../../middlewares/fileUpload');


// //***************************** User routes ******************************************//

                                     //User Locations

// router.post('/get-user-locations',UserValidationMiddleware.verifyToken, commonController.get_user_locations)

router.post('/project',CommonValidationMiddlewareHelper.verifyToken,ProjectController.createProject);

router.put('/project',CommonValidationMiddlewareHelper.verifyToken,ProjectController.updateProject);

router.get('/verify-email-consultant',CommonValidationMiddlewareHelper.verifyToken,ConsultantController.verifyLink); 


router.get('/project-details',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken, ProjectController.projectDetailsForclient);

router.post('/consultant-invite-client',CommonValidationMiddlewareHelper.user_validate('consultant_invite_client'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken, ConsultantController.consultant_invite_client)

router.get('/consultant-invite-client-link',CommonValidationMiddlewareHelper.user_validate('detailsOfConsultantInviteClientLink'),CommonValidationMiddlewareHelper.validation_return, ConsultantController.detailsOfConsultantInviteClientLink)

router.get('/project-listing',CommonValidationMiddlewareHelper.verifyToken,ProjectController.consultentProjectListing)

router.get('/scope-pdf',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.projectScopePdf);

router.get('/notifications',CommonValidationMiddlewareHelper.verifyToken,ProjectController.notificationsListing);

router.put('/notifications',ProjectController.notificationUpdate);

router.get('/consultant-details',CommonValidationMiddlewareHelper.verifyToken,CommonController.fetchConsultant)


router.post('/profile-photo',CommonValidationMiddlewareHelper.verifyToken,fileUploadMiddlewareHelper.uploadFiles([{name: 'upload', maxCount: 1}],global.constants.uploads.consultant_profile_photo),ConsultantController.consultantProfilePhoto);

router.put('/profile-photo',CommonValidationMiddlewareHelper.verifyToken,fileUploadMiddlewareHelper.uploadFiles([{name: 'upload', maxCount: 1}],global.constants.uploads.consultant_profile_photo),ConsultantController.consultantProfilePhotoUpdate);

router.post('/consultant',ConsultantController.consulantProfileAdd);
module.exports = router;