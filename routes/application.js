const express=require('express')
const router=express.Router();
const {userAppliedJob}=require('../controllers/user')
const {authenticate}=require('../common-middleware')
const {adminMiddleware}=require('../common-middleware')
const {userMiddleware}=require('../common-middleware')
const {hrMiddleware}=require('../common-middleware')
const {jobCreate}=require('../controllers/application')
const {jobShow}=require('../controllers/application')
const {approvedJobs}=require('../controllers/application')
const {declinedJobs}=require('../controllers/application')
const {showApprovedJobs}=require('../controllers/application')
const {showDeclinedJobs}=require('../controllers/application')
const {singleJobDetail}=require('../controllers/application')
const {userAppliedJobShow}=require('../controllers/application')
const {userAppliedJobShowAll}=require('../controllers/application')
const {jobRequestValidator,jobRequestValidatorResult}=require('../validator')
const {approveRequestValidator,approveRequestValidatorResult}=require('../validator')


router.post('/user/job/apply',authenticate,userMiddleware,userAppliedJob)
router.get('/user/job/applied/show/:id',authenticate,userMiddleware,userAppliedJobShow)
router.get('/user/all/jobs/applied',authenticate,userAppliedJobShowAll)
router.post('/admin/job/create',authenticate,jobRequestValidator,jobRequestValidatorResult,jobCreate)
router.get('/job/show/all',jobShow)
router.post('/hr/job/approved',authenticate,hrMiddleware,approveRequestValidator,approveRequestValidatorResult,approvedJobs)
router.post('/declined/hr/job',authenticate,hrMiddleware,declinedJobs)
router.get('/job/approved/show',showApprovedJobs)
router.get('/job/declined/show',showDeclinedJobs)
router.get('/job/show/single/:id',singleJobDetail)



module.exports=router;