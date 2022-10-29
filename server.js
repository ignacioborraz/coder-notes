const app = require('./app')

const PORT = process.env.PORT || 8000
app.set('port',PORT)

app.listen(app.get('port'), () =>
    console.log('SERVER READY ON PORT: '+app.get('port'))
)
