import React, {useState} from 'react'
import { register } from '../redux/userActions'
import { connect } from 'react-redux'

const Register = ({  register } ) => {
  
    const [formData, setFormData] = useState({
        name: '',
        pass: '',
        famiy_name: ''
    });

    const { name, pass, famiy_name } = formData
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e =>{
        e.preventDefault()
        register(formData)
    }

    return (
       <div> 
       <form onSubmit={e=>onSubmit(e)}>
     <input 
      type = "text"
      name="name"
      placeholder = "name "
      value = {name}
      onChange = {e => onChange(e)}
      required
      />

      <input 
      type = "text"
      name="famiy_name"
      placeholder = "famiy_name "
      value = {famiy_name}
      onChange = {e => onChange(e)}
      required
      />
      <input 
      className='custom-pass-input'
      type = "password"
      name = "pass"
      placeholder = "pass"
      value = {pass}
      onChange = {e => onChange(e)}
      required
      />

                 
      <input style= {{ marginTop: '10px'}} className='login-btn' type="submit" value= "Register"/>
      
      </form>
    
  </div>
    )
}

export default connect(null, { register })(Register)