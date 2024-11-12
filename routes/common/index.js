const express = require('express'),
  router = express.Router(),
  { check, validationResult } = require('express-validator/check')

var AccountController = require('../../controllers/AccountController');
var AdminController = require('../../controllers/AdminController');
var AdminConsultantController = require('../../controllers/AdminConsultantController');
var CommonController = require('../../controllers/CommonController');
var ConsultenthubController = require('../../controllers/ConsultenthubController');
var fileUploadMiddlewareHelper = require('../../middlewares/fileUpload');
var CommonValidationMiddlewareHelper = require('../../middlewares/CommonValidationMiddlewareHelper');
var ConsultantController = require('../../controllers/ConsultantController.js');
var ProjectController = require('../../controllers/ProjectController.js');
var ContractorController = require('../../controllers/ContractorController');
var impersonateController=require('../../controllers/ImpersonateController');


              // //***************** Common routes ****************//

router.post('/client-and-consultant-sign-up', fileUploadMiddlewareHelper.uploadFiles([{name: 'profile_image', maxCount: 1}], global.constants.uploads.profile_photo), CommonController.client_and_consultant_sign_up);

router.post('/generate-otp', CommonValidationMiddlewareHelper.phone_validate('generateOtp'),CommonValidationMiddlewareHelper.validation_return, CommonController.generateOtp);

router.post('/verify-otp', CommonValidationMiddlewareHelper.phone_validate('verify_otp'),CommonValidationMiddlewareHelper.validation_return, CommonController.verify_otp);

router.get('/account-activation-email-link-details', CommonValidationMiddlewareHelper.email_validate('detailsOfAccountActivationEmailLink'),CommonValidationMiddlewareHelper.validation_return, CommonController.detailsOfAccountActivationEmailLink);

router.get('/verify-email-consultant',CommonController.verifyLink); 

router.get('/verify-email-client',CommonController.verifyLink); 

// router.post('/login', CommonValidationMiddlewareHelper.user_validate('login'), CommonController.login);
router.post('/login', CommonController.login);

router.put('/user-forget-password', CommonValidationMiddlewareHelper.user_validate('user_forget_password'),CommonValidationMiddlewareHelper.validation_return, CommonController.userForgetPassword);

router.get('/details-of-forget-password-link', CommonValidationMiddlewareHelper.user_validate('getDetailsOfForgetPasswordLink'),CommonValidationMiddlewareHelper.validation_return, CommonController.getDetailsOfForgetPasswordLink);

router.put('/reset-password', CommonValidationMiddlewareHelper.user_validate('resetPassword'),CommonValidationMiddlewareHelper.validation_return, CommonController.resetPassword);

router.put('/log-out', CommonValidationMiddlewareHelper.user_validate('logOut'),CommonValidationMiddlewareHelper.validation_return, CommonValidationMiddlewareHelper.verifyToken, CommonController.logOut);

router.post('/ask-me',CommonValidationMiddlewareHelper.admin_validate('ask_me_from'),CommonValidationMiddlewareHelper.validation_return,AdminController.askMeFrom);

router.post('/verify-token', CommonValidationMiddlewareHelper.verifyToken);

router.get('/articles',CommonController.viewArticle)

router.put('/article',CommonValidationMiddlewareHelper.admin_validate('articleupdation'),CommonValidationMiddlewareHelper.validation_return,CommonController.updateArtical);

router.post('/cms-page',CommonValidationMiddlewareHelper.general_validation('cmscheck'),CommonValidationMiddlewareHelper.validation_return, CommonController.get_cms_page);

router.get('/cms-grid',CommonController.fetchCmsGrid);

router.post('/info-data', CommonController.get_info_data);

router.get('/consultation-hub', CommonValidationMiddlewareHelper.general_validation('consultanthublist'),CommonValidationMiddlewareHelper.validation_return, ConsultenthubController.fetchConsultantHubFrontend); 

router.post('/consultation-hub',CommonValidationMiddlewareHelper.general_validation('consultanthubdetails'),CommonValidationMiddlewareHelper.validation_return, ConsultenthubController.fetchConsultantFormDetails); 








// router.get('/images',CommonValidationMiddlewareHelper.verifyPublicToken, CommonController.showImage);
router.get('/images', CommonController.showImage);

              // //***************** Admin Consultant routes ****************//


router.post('/verify-email-link_of-admin-consultant', CommonValidationMiddlewareHelper.admin_consultant_validate('verify_email_link_of_admin_consultant'),CommonValidationMiddlewareHelper.validation_return, AdminConsultantController.verify_email_link_of_admin_consultant);

// router.post('/register', CommonValidationMiddlewareHelper.admin_consultant_validate('verify_email_link_of_admin_consultant'),CommonValidationMiddlewareHelper.validation_return, AdminConsultantController.register);

router.post('/admin-consultant-register',fileUploadMiddlewareHelper.uploadFiles([{name: 'company_logo', maxCount: 1}], global.constants.uploads.profile_photo), AdminConsultantController.adminConsultantRegister);

router.get('/details-of-article-invitation-link',CommonValidationMiddlewareHelper.admin_consultant_validate('getDetailsOfArticleInvitationLink'),CommonValidationMiddlewareHelper.validation_return, AdminConsultantController.getDetailsOfArticleInvitationLink);

router.post('/upload-company-engineer-profile-picture',fileUploadMiddlewareHelper.uploadFiles([{name: 'image', maxCount: 1}],global.constants.uploads.company_engineer_profile_photo),AdminConsultantController.uploadCompnayEngineerProfilePicture);

router.post('/upload-company-engineer-cv',fileUploadMiddlewareHelper.uploadFiles([{name: 'image', maxCount: 1}],global.constants.uploads.company_engineer_cv),AdminConsultantController.uploadCompnayEngineerCv);

router.post('/upload-admin-consultant-project',fileUploadMiddlewareHelper.uploadFiles([{name: 'image', maxCount: 60}],global.constants.uploads.project_images),AdminConsultantController.uploadAdminConsultantProjectImages);

router.post('/test-email', CommonController.test_email);

//router.get('/test', CommonController.test);

router.get('/downolad-project-drawing-zip', ProjectController.downloadProjectDrawingZip);

router.get('/download-program-work-pdf',CommonValidationMiddlewareHelper.user_validate('downloadProgramOfWorksPdf'),CommonValidationMiddlewareHelper.validation_return,ProjectController.downloadProgramOfWorksPdf);

router.get('/download-project-contract-pdf',CommonValidationMiddlewareHelper.user_validate('downloadProjectContractPdf'),CommonValidationMiddlewareHelper.validation_return, ProjectController.downloadProjectContractPdf);

router.get('/project-contract-details',CommonValidationMiddlewareHelper.contract_validate('getProjectContractDetails'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken, ProjectController.getProjectContractDetails);

router.post('/tender-submit',CommonValidationMiddlewareHelper.contract_validate('submitProjectTender'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken, ProjectController.submitProjectTender);

// router.post('/upload-image-in-server',fileUploadMiddlewareHelper.uploadFiles([{name: 'image', maxCount: 1}],global.constants.uploads.website_images),CommonController.image_upload)

router.get('/project-data-search',CommonValidationMiddlewareHelper.project_validate('searchProjectData'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken, ProjectController.searchProjectData);

router.post('/email-test',CommonController.emailTest)


router.get('/user',CommonValidationMiddlewareHelper.verifyToken,CommonController.fetchUser)

router.post('/email-verification',CommonValidationMiddlewareHelper.verifyToken,CommonController.emailVerify)


router.put('/update',CommonValidationMiddlewareHelper.verifyToken,fileUploadMiddlewareHelper.uploadFiles([{name: 'upload', maxCount: 1}],global.constants.uploads.client_profile_photo),CommonController.editClientProfile)


router.put('/consultant-profile',CommonValidationMiddlewareHelper.verifyToken,fileUploadMiddlewareHelper.uploadFiles([{name: 'upload', maxCount: 1}],global.constants.uploads.consultant_profile_photo),CommonController.editConsultantProfile);


router.get('/language',CommonValidationMiddlewareHelper.general_validation('languages'),CommonValidationMiddlewareHelper.validation_return, CommonController.languagePageWise);


router.get('/profile-photo-fetch',CommonValidationMiddlewareHelper.verifyToken,ContractorController.fetchPhoto);


router.post('/impersonate-login',CommonValidationMiddlewareHelper.admin_validate('validationhash'),CommonValidationMiddlewareHelper.validation_return,impersonateController.login);

router.put('/mail-verification',CommonValidationMiddlewareHelper.admin_validate('validationhashEmail'),CommonValidationMiddlewareHelper.validation_return,CommonController.verifyemailLink);

router.get('/services',AdminConsultantController.fetchServices);

router.post('/client',CommonController.clientExistanceCheck);
module.exports = router;