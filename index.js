const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')

const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const User = require('./models/user')


const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
    try {
        req.user = await User.findById('60fe8a0c89143e3ae3a3fdab')
        next()
    } catch (e) {
        console.log(e)
    }
})

app.use(express.static(path.join(__dirname, 'public', '')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)


const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = `mongodb+srv://root:root099350866@nodejs.65jk9.mongodb.net/shop?retryWrites=true&w=majority`
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

        const candidate = await User.findOne()
        if (!candidate) {
            const user = new User({
                email: 'ashot@mail.ru',
                name: 'Ashot',
                cart: {items: []}
            })
            await user.save()
        }
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()


// const fullUrl = `
// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://root:<password>@nodejs.65jk9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
// `
