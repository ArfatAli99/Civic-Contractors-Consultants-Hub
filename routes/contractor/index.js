const express = require('express'),
  router = express.Router(),
  { check, validationResult } = require('express-validator/check')
  var ContractorController = require('../../controllers/ContractorController');
  var ProjectController = require('../../controllers/ProjectController');
  var CommonController = require('../../controllers/CommonController');
  var fileUploadMiddlewareHelper = require('../../middlewares/fileUpload');
var CommonValidationMiddlewareHelper = require('../../middlewares/CommonValidationMiddlewareHelper'); 





                                     //User Locations

router.post('/add-contractor',ContractorController.addContractor);

router.post('/upload-cr-certificate',fileUploadMiddlewareHelper.uploadFiles([{name: 'upload', maxCount: 1}],global.constants.uploads.upload_cr_certificate),ContractorController.uploadCrCertificate);

router.post('/upload-owners-national-id',fileUploadMiddlewareHelper.uploadFiles([{name: 'upload', maxCount: 1}],global.constants.uploads. upload_owners_national_id),ContractorController.uploadOwnersNationalId);

router.post('/upload-man-powers',fileUploadMiddlewareHelper.uploadFiles([{name: 'upload', maxCount: 1}],global.constants.uploads.upload_manpowers_report),ContractorController.uploadManPowersReport)

router.post('/upload-company-profile',fileUploadMiddlewareHelper.uploadFiles([{name: 'upload', maxCount: 1}],global.constants.uploads.company_profile),ContractorController.companyProfile)

router.post('/upload-other-documents',fileUploadMiddlewareHelper.uploadFiles([{name: 'upload', maxCount: 1}],global.constants.uploads.other_files),ContractorController.otherFile)

router.get('/contractor-data',ContractorController.fetchDataUser );

router.get('/project-details',CommonValidationMiddlewareHelper.contractor_validate('fetchProject'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ContractorController.fetchProject);

router.post('/project-bids',CommonValidationMiddlewareHelper.project_validate('bid'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.createProjectBids);

router.get('/project-zip',CommonValidationMiddlewareHelper.verifyToken,ProjectController.fetchProjectDoc);

router.put('/project-bids',CommonValidationMiddlewareHelper.project_validate('createBid'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken, ProjectController.updateBids);

router.get('/project-listing',CommonValidationMiddlewareHelper.verifyToken,ProjectController.contractorProjectListing);



router.get('/project-tender',CommonValidationMiddlewareHelper.verifyToken,ProjectController.contractorTenderData);


router.get('/version-list',CommonValidationMiddlewareHelper.verifyToken,ProjectController.versionListing);

router.get('/notifications',CommonValidationMiddlewareHelper.verifyToken,ProjectController.notificationsListing);


router.put('/notifications',CommonValidationMiddlewareHelper.admin_validate('uniqueId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.notificationUpdate);


router.post('/bank',CommonValidationMiddlewareHelper.verifyToken,ContractorController.bankData);


router.put('/contractor',CommonValidationMiddlewareHelper.verifyToken,fileUploadMiddlewareHelper.uploadFiles([{name: 'upload', maxCount: 1}],global.constants.uploads.contractor_profile_photo),ContractorController.editContractorDataFlow);


router.get('/my-projects',CommonValidationMiddlewareHelper.verifyToken,ContractorController.MyProjects)


router.get('/profile-photo-fetch',CommonValidationMiddlewareHelper.verifyToken,ContractorController.fetchPhoto);


router.post('/profile-photo',CommonValidationMiddlewareHelper.verifyToken,fileUploadMiddlewareHelper.uploadFiles([{name: 'upload', maxCount: 1}],global.constants.uploads.contractor_profile_photo),ContractorController.uploadProfilePhoto);


router.post('/base-image-upload',CommonValidationMiddlewareHelper.verifyToken,CommonController.baseImageUpload)

router.post('/email-check',CommonValidationMiddlewareHelper.verifyToken,ContractorController.emailExist);

module.exports = router;