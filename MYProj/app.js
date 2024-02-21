//Using the node making rest api


// const http=require('http');

// const port=3000


// const server=http.createServer((req,res)=>{
//     // console.log(req.url)
//     if(req.url =='/home'){
//         res.statusCode=200
//         // res.setHeader('Content-Type','text/html')
//         res.write('<h1> Home page</h1>')
//         res.end()
//     }
//     else if(req.url =='/about'){
//         res.statusCode=200 
//         // res.setHeader('Content-Type','text/html')
//         res.write('<h1>Its about page</h1>')
//         res.end()
//     }
//     else{
//         res.statusCode=404
//         res.write('Page Not found')
//         res.end();
//     }
// })


// server.listen(port,()=>{
//     console.log(`Server is running on port no ${port} `);
// })

///DEVELOPING THE REST API USING the express 

const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
   
    res.status(200).send('Hello World!')
})

app.get('/about', (req, res) => {
   
    res.status(200).send('About Page')
})
//Middle ware
app.use((req,res,next)=>{
    res.send(404).send("<h1> Page Not Found on the server</h1>")
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})