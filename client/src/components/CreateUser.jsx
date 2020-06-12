import React, { useState} from 'react'
import { connect } from 'react-redux'
import { register } from '../redux/userActions'
 const CreateUser = ({ register}) => {
  
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
             register(formData);
             setFormData({
                  name: '',
                  pass: '',
                 famiy_name: ''
                })}   
    
    return (
        <div> 
       <form onSubmit={e=>onSubmit(e)}>
       <input 
       type = "text"
       name="name"
       placeholder = "name "
       value = {name}
       onChange = {e => onChange(e)}
       />
 
       <input 
       type = "text"
       name="famiy_name"
       placeholder = "famiy_name "
       value = {famiy_name}
       onChange = {e => onChange(e)}
       />
       <input 
       type = "password"
       name="pass"
       placeholder = "pass "
       value = {pass}
       onChange = {e => onChange(e)}
       />
       <button>create</button>
       </form> 
       </div>
    )
}
export default connect(null, { register })(CreateUser)