import { useEffect, useState } from 'react'
import axios from 'axios'
        
//const baseUrl= 'http://localhost:3001/api/mensaje'
const baseUrl = 'https://proyecto-tableromensaje.onrender.com/api/mensaje/'



const BottonBar = ({ mensaje, HandleChange, Publicar }) => {
  return (
    <div style={{ position: "fixed",
                  bottom:"0",
                  left:"0",
                  width:"100%",
                  backgroundColor:"lightblue",
                  padding:"10px",
                  textAlign:"center" }}>
      <form onSubmit={Publicar}>
        <input value={mensaje} onChange={HandleChange} />
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

const App = () => {
    const [mensaje,setMensaje] = useState([])
    const [mensajeInput,setMensajeInput] = useState('')
    

      useEffect(() => {
          axios.get(baseUrl).then(
            response=>{
              console.log("using useEffect||"+response.data)
              setMensaje(response.data)
            }
          )
      },[]) 


  const HandleChange =(event)=>{
        console.log("INPUT MENSAJE:: "+event.target.value)
        setMensajeInput(event.target.value)
  }

  const Publicar=(e)=>{
      e.preventDefault()
      console.log("MENSAJE::"+mensajeInput)

        const MensajeObjet = {
              content: mensajeInput
            }

        axios.post(baseUrl,MensajeObjet).then(response=>{
            setMensaje(mensaje.concat(response.data)) 
//            setMensajeInput('')           
        })
  }
  const Borrar =(event)=>{
          const x = event.target.value
          const url = baseUrl+x 

        axios.delete(url).then( ()=>{
            setMensaje(mensaje.filter(mens => mens.id != x))
        })
  }


  const Listar=()=>{
    return(
        <div>
            {mensaje.map((mensaje, index) =>{
              return(
                <div>
                    <div key={index}>{index+1}||{mensaje.content}
                      <button key ={index} onClick={Borrar} value={mensaje.id}>borrar </button>
                    </div>
                </div>
              )
            })}
        </div>
    )
  }

  return (
    <div>
          <p>Tablero de mensajes</p>
    <div>
      <Listar/>
    </div>

      <BottonBar mensajeInput={mensajeInput} HandleChange={HandleChange} Publicar={Publicar} />
    </div>
  )
}

export default App
