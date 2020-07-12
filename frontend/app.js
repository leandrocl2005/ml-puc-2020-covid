const express = require('express')
const nunjucks = require('nunjucks')
const axios = require('axios')

const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.set("view engine", "njk")

nunjucks.configure("views", {
    express: app,
    autoescape: false, /* to render html as data, see about.work */
    nocache: true 
})


app.get("/", function(req, res) {
    return res.render("index.njk")
})

app.post("/", async function(req, res) {
    const data = req.body
    let formatted_data = {}
    Object.keys(data).forEach(function(key,index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object 
        if (key!="SG_UF"){
            formatted_data[key] = [Number(data[key])]
        } else {
            formatted_data[key] = [data[key]]
        }
    });
    let pred = await axios.post('http://localhost:5000/predict', formatted_data)
    .then(function(response){
      return response.data
    });

    return res.render("index.njk", {result: pred['tempo']})

})

app.listen(8000, function(){
    console.log("server is run!")
})
