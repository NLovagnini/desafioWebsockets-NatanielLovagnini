const Container = require('./class.js')
const prodContainer = new Container('./products.json')
const {Router} = require('express')
const router = Router()
const multer = require('multer')



//multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+"/public/uploads")
    },
    filename: function (req, file, cb){
        cb(null, file.originalname )
    }
})

router.use(multer({storage}).single("thumbnail"))


 


router.get('/', (req, res) =>{
    res.send(prodContainer.getAllProds())
})

router.post('/', async (req, res) =>{
    
    const newObj = req.body
    const objImg = req.file
    newObj.thumbnail = `/uploads/${objImg.filename}`
    prodContainer.save(newObj)
    res.redirect("/")
})

router.put('/:id', async (req, res) =>{
    const {id} = req.params
    const body = req.body
    const objImg = req.file
    newObj.thumbnail = `/uploads/${objImg.filename}`
    if (await getById(id-1) == undefined){
        return res.json({error: 'producto no encontrado'})
    }
    const newObj ={
        title: body.title,
        price: body.price,
        thumbnail: newObj.thumbnail
    }
    prodContainer.updateById(id, newObj)
    res.send(newObj)
})


module.exports = router