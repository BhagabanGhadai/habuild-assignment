const express=require('express')
const router=express.Router()
const client=require('../postgres')
const auth=require('../middleware/auth')
const {register,getUser}=require('../controllers/loginapi')
const {createTopic,createRanking,getTopic}=require('../controllers/topicAndRankingController')

//++++++++++++++++++++++++++++++++++++++++++SIGNUP & LOGIN+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.post('/register' , register); 
router.get('/user/:Id' , auth.userAuthentication,getUser); 

//+++++++++++++++++++++++++++++++++++++++++++topicAndRanking+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.post('/topic',createTopic)
router.post('/rank',createRanking)
router.get('/topic',getTopic)


module.exports=router