const express = require('express'),
  router = express.Router(),
  { check, validationResult } = require('express-validator/check')

var AccountController = require('../../controllers/AccountController');
var AdminConsultantController = require('../../controllers/AdminConsultantController');
var AdminController = require('../../controllers/AdminController');
var UserController = require('../../controllers/UserController');
var ConsultenthubController = require('../../controllers/ConsultenthubController');
var fileUploadMiddlewareHelper = require('../../middlewares/fileUpload');
var CommonValidationMiddlewareHelper = require('../../middlewares/CommonValidationMiddlewareHelper'); 
var ProjectController= require('../../controllers/ProjectController');
var projectTemplateController=require('../../controllers/ProjectTemplateController');
var impersonateController=require('../../controllers/ImpersonateController');
var ContractorController = require('../../controllers/ContractorController');



              // //***************** Common routes ****************//


router.post('/admin-login',CommonValidationMiddlewareHelper.admin_validate('verify_admin'),CommonValidationMiddlewareHelper.validation_return, AdminController.verifyAdmin);

router.post('/invite-to-consultant',CommonValidationMiddlewareHelper.admin_validate('invite_to_consultant'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken, AdminController.inviteToConsultant);

router.get('/inviteconsultant-list',CommonValidationMiddlewareHelper.admin_validate('fetchuserlist'),CommonValidationMiddlewareHelper.validation_return, CommonValidationMiddlewareHelper.verifyToken,AdminController.inviteConsultantList);

router.post('/cms',CommonValidationMiddlewareHelper.client_validate('cms_add'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.cmsAdd);

router.put('/upload-image-home-slider',fileUploadMiddlewareHelper.uploadFiles([{name: 'image', maxCount: 1}],global.constants.uploads.home_slider),CommonValidationMiddlewareHelper.verifyToken,AdminController.imageUploadHomeSlider);

router.put('/image-home-slider-update',fileUploadMiddlewareHelper.uploadFiles([{name: 'image', maxCount: 1}],global.constants.uploads.home_slider),CommonValidationMiddlewareHelper.verifyToken,AdminController.imageUploadHomeSliderUpdate);

router.post('/upload-video-home-slider',fileUploadMiddlewareHelper.uploadFiles([{name: 'image', maxCount: 1}],global.constants.uploads.home_slider),CommonValidationMiddlewareHelper.verifyToken,AdminController.videoUploadHomeSlider);

router.put('/forget-password',CommonValidationMiddlewareHelper.admin_validate('forget_password'),CommonValidationMiddlewareHelper.validation_return, AdminController.forgetPassword);

router.put('/reset-password', CommonValidationMiddlewareHelper.admin_validate('resetPassword'),CommonValidationMiddlewareHelper.validation_return, AdminController.resetPassword);

//********************* consultation hub *********************//

router.get('/consultation-hub',ConsultenthubController.fetchConsultantHub); 


router.get('/consultation-hub-frontend', CommonValidationMiddlewareHelper.general_validation('consultanthublist'),CommonValidationMiddlewareHelper.validation_return, ConsultenthubController.fetchConsultantHubFrontend);

router.post('/consultation-hub',CommonValidationMiddlewareHelper.verifyToken,CommonValidationMiddlewareHelper.general_validation('consultanthubdetails'),CommonValidationMiddlewareHelper.validation_return, ConsultenthubController.fetchConsultantFormDetails); 

router.put('/consultion-hub-change-status',CommonValidationMiddlewareHelper.verifyToken,ConsultenthubController.changeStatus)

router.put('/update-admin-consultant-profile',CommonValidationMiddlewareHelper.verifyToken,AdminConsultantController.updateAdminConsultant);

router.put('/update-company-logo',fileUploadMiddlewareHelper.uploadFiles([{name: 'company_logo', maxCount: 1}], global.constants.uploads.profile_photo),CommonValidationMiddlewareHelper.verifyToken,AdminConsultantController.updateCompanyLogo);


router.post('/pervious-projects',fileUploadMiddlewareHelper.uploadFiles([{name: 'image', maxCount: 1}], global.constants.uploads.project_images),CommonValidationMiddlewareHelper.verifyToken,AdminConsultantController.perviousImages);


router.put('/project-image-status',CommonValidationMiddlewareHelper.verifyToken,AdminConsultantController.imagesStatusUpdate)


//********************* askme  *********************//

router.post('/askme-from',CommonValidationMiddlewareHelper.admin_validate('ask_me_from'),CommonValidationMiddlewareHelper.validation_return,AdminController.askMeFrom);

router.get('/ask-me',CommonValidationMiddlewareHelper.verifyToken,AdminController.showAskMe);

router.post('/ask-me',CommonValidationMiddlewareHelper.admin_validate('showAskmeId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.showAskMeId)

//********************* user management  *********************//

/*router.post('/users',CommonValidationMiddlewareHelper.admin_validate('fetchuserlist'),CommonValidationMiddlewareHelper.validation_return, UserController.fetchUserList);

router.post('/users',CommonValidationMiddlewareHelper.admin_validate('getuserdetails'),CommonValidationMiddlewareHelper.validation_return, UserController.userDetails);*/
router.post('/fetch-user-list',CommonValidationMiddlewareHelper.admin_validate('fetchuserlist'),CommonValidationMiddlewareHelper.validation_return, UserController.fetchUserList);

router.post('/get-user-details',CommonValidationMiddlewareHelper.admin_validate('getuserdetails'),CommonValidationMiddlewareHelper.validation_return,UserController.userDetails);

router.post('/update-user-status',CommonValidationMiddlewareHelper.admin_validate('updateuserstatus'),CommonValidationMiddlewareHelper.validation_return, UserController.userStatusChange);

router.get('/user-project-details',CommonValidationMiddlewareHelper.verifyToken, UserController.projectDetails);
//********************* cms management  *********************//

router.put('/cms',CommonValidationMiddlewareHelper.verifyToken,AdminController.editCms);

router.post('/cms',CommonValidationMiddlewareHelper.verifyToken,AdminController.fetchCms);

router.get('/cms-grid',CommonValidationMiddlewareHelper.cms_grid('fetchCmsGrid'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.fetchCmsGrid);

router.post('/cms-grid',CommonValidationMiddlewareHelper.cms_grid('createCmsGrid'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.addCmsGrid);

router.put('/cms-grid',CommonValidationMiddlewareHelper.cms_grid('updateCmsGrid'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.updateCmsGrid);

router.delete('/cms-grid',CommonValidationMiddlewareHelper.cms_grid('deleteCmsGrid'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.deleteCmsGrid);

router.get('/cms-grid-details',CommonValidationMiddlewareHelper.cms_grid('fetchCmsGridDetails'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.fetchCmsGridDetails);

router.put('/article-approve-status',CommonValidationMiddlewareHelper.verifyToken,AdminController.activrarticle);

router.post('/article',CommonValidationMiddlewareHelper.admin_validate('articleCreation'),CommonValidationMiddlewareHelper.validation_return,AdminController.addArtical);

router.get('/articles',AdminController.viewarticle);

router.get('/article-details',AdminController.viewArticleDetails);
router.put('/article-details',CommonValidationMiddlewareHelper.verifyToken,AdminController.updateArticle);
router.post('/article_image',CommonValidationMiddlewareHelper.verifyToken,fileUploadMiddlewareHelper.uploadFiles([{name: 'upload', maxCount: 1}],global.constants.uploads.article_photo),AdminController.uploadArticleImage);


//router.put('/article-details',CommonValidationMiddlewareHelper.verifyToken,AdminController.updateArticleDetails);

router.post('/article-topic',CommonValidationMiddlewareHelper.admin_validate('articleTopicCreation'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.addArticleTopic);

router.put('/article-topic',CommonValidationMiddlewareHelper.admin_validate('articleTopicUpdate'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.UpdateArticleTopic);

router.put('/article-topic-change-status',CommonValidationMiddlewareHelper.admin_validate('articleTopicChangeStatus'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.changeStatusArticleTopic);

router.get('/article-topics',CommonValidationMiddlewareHelper.admin_validate('articleTopicFetch'),CommonValidationMiddlewareHelper.validation_return,AdminController.listArticleTopic);

router.get('/article-topic-details',CommonValidationMiddlewareHelper.admin_validate('articleTopicDetailsFetch'),CommonValidationMiddlewareHelper.validation_return,AdminController.ArticleTopicDetails);

router.get('/article-topic-user',CommonValidationMiddlewareHelper.admin_validate('articleTopicFetch'),CommonValidationMiddlewareHelper.validation_return,AdminController.listUserArticleTopic);

router.post('/invite-articles',CommonValidationMiddlewareHelper.admin_validate('inviteArticle'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.inviteArticle);

router.get('/topics',CommonValidationMiddlewareHelper.admin_validate('getTopicsToInvite'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.getTopicsToInvite)

//********************* cms management  *********************//
router.get('/images',CommonValidationMiddlewareHelper.verifyToken,AdminController.showImage);

router.post('/images',CommonValidationMiddlewareHelper.admin_validate('show_image_id'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.viewImageDetails);

router.put('/upload-image-home-partner',fileUploadMiddlewareHelper.uploadFiles([{name: 'image', maxCount: 1}],global.constants.uploads.home_partner),CommonValidationMiddlewareHelper.verifyToken,AdminController.updateImage)

router.post('/upload-image-home-partner',fileUploadMiddlewareHelper.uploadFiles([{name: 'image', maxCount: 1}],global.constants.uploads.home_partner),CommonValidationMiddlewareHelper.verifyToken,AdminController.createImage)

router.put('/image-change-status',CommonValidationMiddlewareHelper.admin_validate('updateimagestatus'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.imageStatusChange)

router.put('/change-image-visibility',CommonValidationMiddlewareHelper.admin_validate('updateimagevisibility'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.imageVisibilityChange)

// router.post('/upload-image-our-story',fileUploadMiddlewareHelper.uploadFiles([{name: 'image', maxCount: 1}],global.constants.uploads.cms_content))
router.post('/upload-image-our-story',fileUploadMiddlewareHelper.uploadFiles([{name: 'upload', maxCount: 1}],global.constants.uploads.cms_content), AdminController.uploadImageOurStory)

router.put('/slider-description',CommonValidationMiddlewareHelper.admin_validate('sliderDescriptionCreate'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.sliderDescriptionCreate)

//router.get('/fetch-project-scope', UserController.projectScope);


//********************* sitesettings management  *********************//


router.get('/sitesettings',CommonValidationMiddlewareHelper.verifyToken,AdminController.siteSettings)

router.put('/sitesettings',CommonValidationMiddlewareHelper.verifyToken,AdminController.updateSiteSettings)


//********************* Project Management  *********************//

router.post('/project-doc',fileUploadMiddlewareHelper.uploadFiles([{name: 'image', maxCount: 1}],global.constants.uploads.project_docs),ProjectController.uploadProjectDoc);

router.put('/project', CommonValidationMiddlewareHelper.verifyToken, ProjectController.updateProject);

//********************* Project Scope Management  *********************//

router.post('/project-scope',CommonValidationMiddlewareHelper.admin_project_scope('createProjectScope'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.createProjectScope)

router.put('/project-scope-details',CommonValidationMiddlewareHelper.admin_project_scope('updateProjectScope'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.updateProjectScope)

router.get('/project-scope',CommonValidationMiddlewareHelper.admin_project_scope('fetchProjectScope'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.fetchProjectScope)

router.get('/project-scope-details',CommonValidationMiddlewareHelper.admin_project_scope('fetchProjectScopeDetails'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.fetchProjectScopeDetails)

router.delete('/project-scope',CommonValidationMiddlewareHelper.admin_project_scope('deleteProjectScope'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.deleteProjectScope)

router.get('/project-listsort',ProjectController.projectFetchAdmin);

//********************* Project stage and task Management  *********************//


router.post('/project-stage',CommonValidationMiddlewareHelper.admin_project_stage('createProjectStage'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.createProjectStage)

router.put('/project-task',CommonValidationMiddlewareHelper.admin_project_stage('createOrUpdateProjectStage'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.createProjectTasks)

router.post('/project-reject',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.projectClosed);
router.put('/project-status-change',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,ProjectController.projectApproveOrDisapprove);

router.post('/project-details',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.projectDetailsTaskStage);

router.get('/project-template',CommonValidationMiddlewareHelper.verifyToken,ProjectController.projectTemplateList);

router.post('/project-template',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.projectTemplateFetch);

router.get('/project-details',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.projectDetails);

router.get('/project',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.projectClientConsultant);

router.put('/stage-status',CommonValidationMiddlewareHelper.verifyToken,AdminController.stageDelete);

//router.get('/contractor-project-data',ProjectController.contractotrProject);

router.get('/project-list',CommonValidationMiddlewareHelper.verifyToken,ProjectController.listProject);

router.put('/update-stage',CommonValidationMiddlewareHelper.admin_validate('uniqueId'),CommonValidationMiddlewareHelper.validation_return,ProjectController.updateStage);

//router.get('/fetch-project-contractor',ProjectController.contractorDetails)

router.get('/stage',CommonValidationMiddlewareHelper.verifyToken,ProjectController.stageListing);

router.post('/stage',CommonValidationMiddlewareHelper.admin_validate('uniqueId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.fetchProjectTask);


router.post('/add-template',CommonValidationMiddlewareHelper.verifyToken,ProjectController.projectTemplate);


router.post('/import-stage',CommonValidationMiddlewareHelper.admin_validate('importTemplate'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.importStage);

//********************* Website Language Management  *********************//

router.post('/language',CommonValidationMiddlewareHelper.admin_validate('addLanguage'),CommonValidationMiddlewareHelper.validation_return, CommonValidationMiddlewareHelper.verifyToken, AdminController.addLanguage);

router.put('/language',CommonValidationMiddlewareHelper.admin_validate('editLanguage'),CommonValidationMiddlewareHelper.validation_return, CommonValidationMiddlewareHelper.verifyToken, AdminController.editLanguage);

router.get('/language',CommonValidationMiddlewareHelper.admin_validate('languages'),CommonValidationMiddlewareHelper.validation_return, CommonValidationMiddlewareHelper.verifyToken, AdminController.languages);

router.get('/language-details',CommonValidationMiddlewareHelper.admin_validate('languageDetails'),CommonValidationMiddlewareHelper.validation_return, CommonValidationMiddlewareHelper.verifyToken, AdminController.languageDetails);

router.put('/reject',CommonValidationMiddlewareHelper.admin_validate('uniqueId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.deactivateConsultant);

router.put('/approved',CommonValidationMiddlewareHelper.admin_validate('uniqueId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.activeContractor);

router.put('/approved-edit',CommonValidationMiddlewareHelper.admin_validate('uniqueId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.activeContractorEdit);

router.post('/slider-image',fileUploadMiddlewareHelper.uploadFiles([{name: 'image', maxCount: 1}],global.constants.uploads.home_partner),CommonValidationMiddlewareHelper.verifyToken,AdminController.videoUploadHomeSliderImage);


router.put('/slider-image-upload',fileUploadMiddlewareHelper.uploadFiles([{name: 'image', maxCount: 1}],global.constants.uploads.home_partner),CommonValidationMiddlewareHelper.verifyToken,AdminController.updateHomeSliderImage);


router.get('/section-scope',CommonValidationMiddlewareHelper.verifyToken,ProjectController.scopeCatagoryFetch);

router.get('/master-scope',CommonValidationMiddlewareHelper.verifyToken,ProjectController.masterCatagoryFetch);

router.post('/scope-map',CommonValidationMiddlewareHelper.admin_validate('catagoryMap'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.sectionCatagoryMap);

router.get('/scope',CommonValidationMiddlewareHelper.verifyToken,ProjectController.sectionScope);

router.get('/scope-map',CommonValidationMiddlewareHelper.verifyToken,ProjectController.masterMapFetch);

router.post('/scope-map-data',CommonValidationMiddlewareHelper.admin_validate('uniqueId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.masterMapDetails);

// router.put('/project',ProjectController.editProjectAdmin);
router.put('/project',ProjectController.updateProject);

//********************* template Management  *********************//

router.put('/project-template-delete',CommonValidationMiddlewareHelper.admin_validate('templateId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.templateDelete);

router.get('/project-template-list',CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.templateShow);

router.post('/project-template-view',CommonValidationMiddlewareHelper.admin_validate('templateId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.templateShowById);

router.post('/template-stage',CommonValidationMiddlewareHelper.admin_project_stage('createProjectStageTemplate'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.templateStageAdd);

router.post('/template-task',CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.templateTaskAdd);

router.put('/template-stage',CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.templateStageUpdate);

router.put('/template-stage-delete',CommonValidationMiddlewareHelper.admin_validate('templateId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.templateStageDelete);


router.put('/template-task-delete',CommonValidationMiddlewareHelper.admin_validate('templateId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.templateTaskDeleteData);

router.post('/template-add',CommonValidationMiddlewareHelper.admin_validate('nameadd'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.templateAdd);

router.get('/template-task-list',CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.templateTaskShow);

router.post('/template-task-add',CommonValidationMiddlewareHelper.admin_validate('nameadd'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.templateTaskAddData);

router.get('/template-task-view',CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.templateTaskListShow);

router.put('/project-template-task-delete',CommonValidationMiddlewareHelper.admin_validate('templateId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.templateTaskDelete);

router.post('/project-template-task-add',CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.templateTaskDataAdd);

router.put('/task-template-delete',CommonValidationMiddlewareHelper.admin_validate('templateId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.taskDelete);

router.get('/template-task-id',CommonValidationMiddlewareHelper.admin_validate('templateId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.taskTempleShowId);

router.get('/template-task-dropdown',CommonValidationMiddlewareHelper.verifyToken,projectTemplateController.templateTaskShowDropdown);

//********************* Impersonate  *********************//


router.post('/impersonate',CommonValidationMiddlewareHelper.admin_validate('impersonate'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,impersonateController.validationEntry);

router.post('/impersonate-login',CommonValidationMiddlewareHelper.admin_validate('validationhash'),CommonValidationMiddlewareHelper.validation_return,impersonateController.login);

//*********************  project docs  *********************//

router.post('/project-doc-upload',CommonValidationMiddlewareHelper.verifyToken,AdminController.uploadDocFromAdmin);

router.put('/project-doc-delete',CommonValidationMiddlewareHelper.admin_validate('uniqueId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.projectDocumentDelete);

router.post('/project-tags-edit',CommonValidationMiddlewareHelper.verifyToken,AdminController.editTags);



/********************* contract pdf  *********************/

router.get('/contract-pdf',CommonValidationMiddlewareHelper.verifyToken,ProjectController.contractSignPdf);


/********************* project bid  *********************/

router.get('/project-bid',CommonValidationMiddlewareHelper.admin_validate('projectId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.projectBid);





router.put('/contractor',CommonValidationMiddlewareHelper.verifyToken,fileUploadMiddlewareHelper.uploadFiles([{name: 'upload', maxCount: 1}],global.constants.uploads.contractor_profile_photo),ContractorController.editContractorData);

/********************* import  *********************/
router.post('/import-task',CommonValidationMiddlewareHelper.admin_validate('import'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.importTask);

router.post('/import-task-templte',CommonValidationMiddlewareHelper.admin_validate('import'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,ProjectController.importTaskTemplate);


router.get('/contractor-demo',CommonValidationMiddlewareHelper.admin_validate('templateId'),CommonValidationMiddlewareHelper.validation_return,CommonValidationMiddlewareHelper.verifyToken,AdminController.contractorDemoShow);

/********************* contractor profile pdf *********************/

router.post('/contractor-pdf',CommonValidationMiddlewareHelper.admin_validate('uniqueId'),CommonValidationMiddlewareHelper.validation_return,AdminController.ContractorProfile);

router.post('/scope',CommonValidationMiddlewareHelper.verifyToken,AdminController.editScope);

router.post('/email',ProjectController.emailList);

router.get('/client-list',CommonValidationMiddlewareHelper.verifyToken,AdminController.clientList);
router.get('/contractor-list',CommonValidationMiddlewareHelper.verifyToken,AdminController.contractorList);
router.get('/consultant-list',CommonValidationMiddlewareHelper.verifyToken,AdminController.consultantList);
router.post('/note',AdminController.addNotes);

/********************* project lists  *********************/
router.get('/draft-project',CommonValidationMiddlewareHelper.verifyToken,AdminController.draftProjects); 
router.get('/peding-projects',CommonValidationMiddlewareHelper.verifyToken,AdminController.adminapprovedProjects);
router.get('/submitted-projects',CommonValidationMiddlewareHelper.verifyToken,AdminController.submittedProjects);
router.get('/signed-projects',CommonValidationMiddlewareHelper.verifyToken,AdminController.signedProjects);




module.exports = router;