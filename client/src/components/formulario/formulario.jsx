import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './formulario.css'

const MySwal = withReactContent(Swal)
// const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

const Formulario = () => {
  const [button, setButton] = useState(false)
  const [inputs, setinputs] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    job: '',
    password: ''
  })

  useEffect(() => {
    console.log(inputs)
  }, [inputs])

  const onChange = (e) => {
    // e.prenventDefault()
    const { name, value } = e.target
    setinputs({
      ...inputs,
      [name]: value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const clave = Object.keys(inputs)
    let propiedad = ''
    for (const prop of clave) {
      if (inputs[prop] === '') {
        propiedad = prop
        break
      }
    }
    if (propiedad === '') {
      setButton(true)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      }
      const response = await fetch('https://sendgmail.onrender.com/email', requestOptions)
      const data = await response.json()
      if (data.error) {
        MySwal.fire(
          {
            title: data.error,
            confirmButtonText: 'Aceptar',
            icon: 'error'
          }
        )
        setButton(false)
      } else {
        MySwal.fire(
          {
            title: 'Correo Enviado',
            confirmButtonText: 'Aceptar',
            icon: 'success'
          }
        )
        setButton(false)
      }
    } else {
      MySwal.fire(
        {
          title: `Completar ${propiedad}`,
          confirmButtonText: 'Aceptar',
          icon: 'warning'
        }
      )
    }
  }

  return (
    <div className='form-container'>
      <form className='form' onChange={onChange} onSubmit={onSubmit}>
        <div className='form-div'>
          <div className='container-labes'>
            <label name='name'>Nombre:</label>
            <label name='email'>Email:</label>
            <label name='company'>Empresa:</label>
            <label name='subject'>Asunto:</label>
            <label name='job'>Puesto:</label>
            <label name='password'>Contraseña:</label>
          </div>
          <div className='container-inputs'>
            <input type='text' name='name' className='input' placeholder='nombre' />
            <input type='email' name='email' className='input' placeholder='email' />
            <input type='text' name='company' className='input' placeholder='empresa' />
            <input type='text' name='subject' className='input' placeholder='asunto' />
            <input type='text' name='job' className='input' placeholder='puesto' />
            <input type='text' name='password' className='input' placeholder='puesto' />
          </div>
        </div>
        <div className='container-button'>
          {button ? (<span className='loader' />) : <button type='submit' className='form-button'>Enviar</button>}
        </div>
      </form>
    </div>
  )
}

export default Formulario
