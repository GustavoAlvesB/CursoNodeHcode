const express =  require('express')
const app = express()
const adminRouter = require('./routes/adminRouter')
const usuariosRouter = require('./routes/usuariosRouter')

/*com este comando estamos habilitando e tbm acisando ao express que temos arquvios estatico na pasta public e e quando executado o projeto ele ira automaticamente chamar estes arquivos.
app.use(express.static('public'))
*/
/*aqui estmos habilitando o nosso projeto a interpretar json sem isso ele não reconehce o mesmo.*/
app.use(express.json())

/*toda requisição que começar om /admin vai ser encamiada para adminRote*/
app.use('/admin',adminRouter)
app.use('/usuarios',usuariosRouter)


/*Criamos uma função Middeleware para toda vez que for inicializado a tela principa, executar algo em nivel de rota.*/
function loReq(req,res,next){
    console.log("Executando a função Middeleware para a rota principa.")
    return next()
}

/*aquii éoutra forma de fazer uma função middeleware com uma erofunction e sempre temos que passar os 3 parametrso que ~sao o req res e next ou proximo que é para quando acabar de executar o middeleware ele continuar a aplicação normal.*/
app.use((req,res,next)=>{   
    console.log("Executandoi Middelware em nivel aplciação") 

    return next()
})

app.get('/',loReq,(req,res)=>{
    res.send("Sejabem vindo, Aqui é painel geral.")
})
app.get('/admin',(req,res)=>{
    res.send("Painel do Administrador")
})

app.listen(3000, ()=>{
    console.log("Serve rodando : http://localhost:3000")
})
