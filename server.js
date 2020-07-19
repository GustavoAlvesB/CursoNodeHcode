const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const app = express()
const path = require('path')

app.use(bodyParser.urlencoded({extended:true}))

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,'uploads/')
    },
    filename:(req,file,callback)=>{
        callback(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname))
    }
})
// uplod tem que ficar aqui se não da erro pois ele recebe um objteo de storage que esta criado logo acima.
const upload = multer({storage})

app.get('/',(req,res)=>{
    // res.json({ message: 'Bem vindo'})
    res.sendFile(__dirname+'/index.html')
 })

 /* estamos interferindo na hora da chamada e passando nossa constante ou função para tratar esta chamada, e estamos chando o singles pq é um arquivo só mas poderia ser mais de um ao mesmo tempo, como vamos inteferir nesta chamada temos que usar o next pois e padrão da linguagem usa onext para ele proceguir quando acabar.*/
 app.post('/upload',upload.single('arquvio'),(req,res,next)=>{
     const file = req.file
     if (!file){
         const ero = new Error('Seleciona o arquivo ai CARAI');
         ero.httpStatusCode = 400
         return next(ero)         
     }     
     //res.send("Upload efetuado com sucesso.")
     res.send(file)
 })

app.listen( process.env.PORT || 3000,'127.0.0.1',()=>{
    console.log('Server rodando na port 3000')
})