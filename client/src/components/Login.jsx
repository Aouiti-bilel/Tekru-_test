import React, {useState} from 'react'
import { login } from '../redux/userActions'
import { connect } from 'react-redux'

const Login = ({  login }) => {
  
    const [formData, setFormData] = useState({
        name: '',
        pass: '',
    });

    const { name, pass } = formData
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e =>{
        e.preventDefault()
        login(formData)
    }
    return (
       <div> 
       <form onSubmit={e=>onSubmit(e)}>
     <input 
      className='custom-input'
      type = "text"
      name="name"
      placeholder = "name "
      value = {name}
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
      <input style= {{ marginTop: '10px'}} className='login-btn' type="submit" value= "login"/>
      
      </form>
    
  </div>
    )
}
export default connect(null, { login })(Login)