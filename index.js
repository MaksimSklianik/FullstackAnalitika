const app = require('./app')

const port = process.env.PORT || 5000;


app.listen(500, () => {
    console.log(`server is been start ${port}`)
})
