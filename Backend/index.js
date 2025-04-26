const express = require("express")
const cors = require('cors')
const app = express()

app.use(express.json())// Para usar la información enviada por body
app.use(cors())

let mensajes =[
    {id :1,
     content:"mensaje 1"
    },
    {id:2,
     content:"mensaje 2"
    }
]

const maxID = () =>{
    const maxID = mensajes.length > 0 ? 
                    Math.max(...mensajes.map(mens => mens.id)) : 0
    return (maxID +1)
}

app.get("/api/mensaje",(request, response)=>{
        response.json(mensajes)
})
app.get("/api/mensaje/:id",(request, response)=>{
     const id = request.params.id
     const x = mensajes.find(x => x.id == id)
     response.json(x)
})

app.delete("/api/mensaje/del/:id",(request,response)=>{
    const id = Number(request.params(id))
    mensajes = mensajes.filter(y => y.id != id)
        response.status('204').end()
})
app.post("/api/mensaje",(request,response)=>{
    const text = request.body

    if(!text.content){ return response.status(200).json({
                                            error: "no content"})}
    const cuerpo ={
        id : maxID(),
        content : text.content
    }

    mensajes = mensajes.concat(cuerpo)
    response.json(cuerpo)

})


const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})