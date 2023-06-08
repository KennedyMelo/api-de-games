const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const connection = require('./models/database')
const auth = require('./middlewares/auth')
const app = express()

//creating token
const JWTSecret = "jashdadsljadhfljhdflkndf"

//models
const Game = require('./models/Game')
const User = require('./models/User')

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Database 
connection.authenticate().then(() => {
    console.log('Conexão feita com o Banco de dados')
}).catch(err => {
    console.log('Houve erro na conexão com o banco de dados: ' + err)
})

app.get('/games', auth, (req, res) =>{
    res.statusCode = 200
    Game.findAll().then(games => {
        res.json(games)
    })
})
app.get('/game/:id', auth, (req, res) =>{
    let id = req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    } else{
        id = parseInt(id)
        Game.findByPk(id).then(game =>{
            if(game != undefined){
                res.statusCode = 200
                res.json(game)
            } else{
                res.sendStatus(404)
            }
        })       
    }
})

app.post('/game', auth, (req, res) => {
    let {title, price, year} = req.body
    Game.create({
        title,
        price,
        year
    })
    res.sendStatus(200)
})

app.delete("/game/:id", auth, (req, res) =>{
    let id = req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    } else{
        id = parseInt(id)
        Game.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.sendStatus(200)
        }).catch(err => {
            res.sendStatus(404)
        })
    }
})

app.put('/game/:id', auth, (req, res) => {
    let id = req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    } else{
        id = parseInt(id)
        let {title, price, year} = req.body
        Game.update({title: title, price: price, year: year}, {
            where: {
                id: id
            }
        }).then(() => {
            res.sendStatus(200)
        })        
    }
})
app.post('/signup', (req, res) => {
    let {name, email, password} = req.body
    User.create({
        name,
        email,
        password
    })
    res.sendStatus(200)
})
app.post("/auth", (req, res) => {
    let {email, password} = req.body
    if(email != undefined){
        User.findOne({where: {email: email}}).then(user => {
            if(user != undefined){
                if(user.password == password){
                    jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn: '48h'}, (err, token) => {
                        if(err){
                            res.status(400)
                            res.json({err: "Falha interna"})
                        } else{
                            res.status(200)
                            res.json({token: token})
                        }
                    })
                } else{
                    res.status(401)
                    res.json({err: "Credenciais inválidas!"})
                }
            } else{
                res.status(404)
                res.json({err: "O E-mail não existe na base de dados!"})
            }
        })
    } else{
        res.status(400)
        res.json({err: "O E-mail enviado é inválido"})
    }
})
app.listen(8080, () => {
    console.log('API Rodando!')
})