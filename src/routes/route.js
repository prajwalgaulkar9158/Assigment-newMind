const express=require('express')
const router=express.Router()
const fileController=require('../controller/fileController')


router.post('/createFile',fileController.createFile)

router.get('/getAll',fileController.getAll)

router.get('/getByName/:fileName',fileController.getByName)

router.delete('/deleteFile/:fileId',fileController.deleteFile)

router.put('/updateFile/:fileId',fileController.updateFile)

 
module.exports=router