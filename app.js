const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser')

const adminRoutes = require('./server/routes/admin')
const shopRoutes = require('./server/routes/shop')
const error = require('./server/controllers/error');
const { mongoConnect } = require('./util/database');
const User = require('./server/models/user')


app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
   User.findById('64c4ff2e2097a553383ea6eb')
      .then(user => {
         req.user = new User(user.name, user.email, user.cart, user._id)
         next()
      })
      .catch(err => {
         console.log(err)
      })
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(error.errorPage)


mongoConnect(() => {
   app.listen(3000, () => {
      console.log('listening to port 3000');
   });
})

