const express = require('express'),
  router = express.Router(),
  { check, validationResult } = require('express-validator/check')


//var UserValidationMiddleware = require('../../middlewares/UserValidationMiddleware');
//const consultenthubcontroller=require('../../controllers/consultenthub');
//const admincontroller=require('../../controllers/AdminController');

var ClientController = require('../../controllers/ClientController');
var ProjectController = require('../../controllers/ProjectController');
var UserController = require('../../controllers/UserController');
var NotificationsController=require('../../controllers/NotificationsController');
var CommonController = require('../../controllers/CommonController');
var CommonValidationMiddlewareHelper = require('../../middlewares/CommonValidationMiddlewareHelper');
var AdminController = require('../../controllers/AdminController'); 
var fileUploadMiddlewareHelper = require('../../middlewares/fileUpload');

router.post('/client-invite-consultent',CommonValidationMiddlewareHelper.client_validate('mail_required'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ClientController.inviteConsultent);

router.get('/verify-email-client',CommonValidationMiddlewareHelper.verifyToken,ClientController.verifyLink); 

router.post('/project', CommonValidationMiddlewareHelper.verifyToken, ProjectController.createProject);

router.put('/project', CommonValidationMiddlewareHelper.verifyToken, ProjectController.updateProject);

router.post('/project-doc',fileUploadMiddlewareHelper.uploadFiles([{name: 'image', maxCount: 1}],global.constants.uploads.project_docs),ProjectController.uploadProjectDoc);


router.put('/remove-project-doc',CommonValidationMiddlewareHelper.project_validate('deleteProjectProjectDocs'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken, ProjectController.deleteProjectProjectDocs);

router.get('/project-scope',CommonValidationMiddlewareHelper.verifyToken, UserController.projectScope);

router.get('/project',CommonValidationMiddlewareHelper.verifyToken,ProjectController.projectListingSearching);

router.get('/project-zip',CommonValidationMiddlewareHelper.verifyToken,ProjectController.fetchProjectDoc);

router.get('/project-details',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return, ProjectController.projectDetailsForclient);

router.get('/project-contractor',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,ProjectController.contractorDetails)

router.get('/project-tender-data',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.contractotrProject);

router.get('/project-tender-data-view',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.fetchProjectContractor);

router.get('/scope-pdf',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.projectScopePdf);

router.get('/project-sign-details',CommonValidationMiddlewareHelper.client_validate('projectSignDetails'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken, ProjectController.projectSignDetails);

router.get('/payment-pdf',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.modeOfPayment);



router.put('/sign-update',CommonValidationMiddlewareHelper.verifyToken,ProjectController.signUpdate);




router.post('/sign',CommonValidationMiddlewareHelper.verifyToken,ProjectController.ProjectSignUpdate)

router.put('/project-reject',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.projectBidsReject);


router.get('/version-list',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.versionListing);

router.get('/notifications',CommonValidationMiddlewareHelper.verifyToken,NotificationsController.notificationsListing);

router.put('/notifications',CommonValidationMiddlewareHelper.admin_validate('uniqueId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,NotificationsController.notificationUpdate);

router.post('/profile-photo',CommonValidationMiddlewareHelper.verifyToken,fileUploadMiddlewareHelper.uploadFiles([{name: 'upload', maxCount: 1}],global.constants.uploads.client_profile_photo),ClientController.profilePhoto);

router.put('/notifications-statuschage',CommonValidationMiddlewareHelper.admin_validate('uniqueId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,NotificationsController.notifictionsDelete);

router.get('/cover-page',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.clientTenderingCoverPage);

router.get('/contract-pdf',CommonValidationMiddlewareHelper.contract_validate('contract_pdf'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.contractSignPdf);



router.put('/request-contact',CommonValidationMiddlewareHelper.admin_validate('projectContractorId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.requestContact);

router.post('/signature',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.clientSign);

router.get('/task-details',CommonValidationMiddlewareHelper.verifyToken,ProjectController.taskCount)

router.post('/base-image-upload',CommonValidationMiddlewareHelper.verifyToken,CommonController.baseImageUpload)


router.get('/sign-finall',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.signMailSent);

router.get('/scope-pdf-demo',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.projectScopePdfImage);

router.get('/specifications',CommonValidationMiddlewareHelper.verifyToken,ProjectController.specifiactionsView);


router.post('/contractor-pdf',CommonValidationMiddlewareHelper.admin_validate('uniqueId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.ContractorProfile);


router.post('/view-bid',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.viewPdfDemo);

router.get('/scope',AdminController.scopeList);

router.post('/email-update',ProjectController.mailCheckForCreateProject);


router.get('/random-string',ClientController.getRandomString);

module.exports = router;