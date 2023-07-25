const express= require("express")
const session = require("express-session")
const passport = require("passport")
const userRouter = require("./routes/user.routes")
const FileStore= require("session-file-store")(session)
const MongoStore = require('connect-mongo');
const handlebars = require("express-handlebars")
const cookiesParser = require("cookie-parser")
const ViewRoutes = require("./routes/view.routes")
const AuthRoutes = require("./routes/auth.routes")
const Database = require("./db/db")
const initializePassport = require("./config/passport")



const app = express()



app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://danilolaura:resbalones123@clusterecommerce.0exvxqh.mongodb.net/ecommerce"
    }),
    secret:"danilosecreto",
    resave: true,
    saveUninitialized: true
}))
app.use(express.json())
initializePassport()
app.use(passport.initialize())
app.use(passport.session())



app.use(express.urlencoded({extended:true}))

//handlebars
app.engine("handlebars" , handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", __dirname+"/views")
//cookies
app.use(cookiesParser("coderS3cr3t0"))
app.use(express.static(__dirname+"/public"))


app.use(session({    
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://danilolaura:resbalones123@clusterecommerce.0exvxqh.mongodb.net/ecommerce"
    }),
    secret:"daneleteSecret",
    resave:true,
    saveUninitialized: true
}))



app.get("/sessionSet", (req, res)=>{
    req.session.user = "Danilo"
    req.session.age = 19

    res.send("session creada")
})

app.get("/sessionGet", (req, res)=>{
    res.send(req.session)
})




// function auth(req, res, next){
//     if (req.session.user == "danilo" && req.session.admin) {
//         return next()
//     }
//     return res.status(401).send("Error en la autenticacion")
// }



// app.get("/login", (req, res)=>{
//     let {username, password} = req.query
//     if (username !== "danilo" || password!=="resbalones123") {
//         return res.send("INICIO INCORRECTO !")
//     }
//     req.session.user = username
//     req.session.admin = true

//     res.send("Usuario correcto!")
// })


// app.get("/privado", auth , (req,res)=>{
//     res.send("Si estas viendo esto, es porque ya te logueaste")
// })

app.get("/logout", (req, res)=>[
    req.session.destroy(err => {
        if (err) res.send("Fail pa") 
            res.send("cerro sesion")
        
    })
])



// app.get("/setCookie", (req, res)=>{
//     res.cookie("codercookie" ,{user: "danilorocco200@gmail.com"} , {signed:true}).send("Cookie creada!!")
// })

// app.get("/getCookie", (req, res)=>{
//     res.send(req.signedCookies)
// })

// app.get("/formulario", (req, res)=>{
//     res.sendFile(__dirname+"/public/index.html")
// })




// app.get("/deleteCookie", (req, res)=>{
//     res.clearCookie("codercokie").send("cookie eliminada")
// })

app.use("/view", ViewRoutes)
app.use("/auth", AuthRoutes)
app.use("/user", userRouter)



app.listen(8080, ()=>{
    console.log("SERVER ON");
    Database.connect()
})