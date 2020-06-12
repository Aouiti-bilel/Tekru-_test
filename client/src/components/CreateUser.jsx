import React, { useState} from 'react'
import { connect } from 'react-redux'
import { register } from '../redux/userActions'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from './Alert'
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
       <Alert/>
       <TextField 
       type = "text"
       name="name"
       placeholder = "name "
       value = {name}
       onChange = {e => onChange(e)}
       style ={{marginLeft: '10px'}}
       />
 
       <TextField 
       type = "text"
       name="famiy_name"
       placeholder = "famiy_name "
       value = {famiy_name}
       onChange = {e => onChange(e)}
       style ={{marginLeft: '10px'}}
       />
       <TextField 
       type = "password"
       name="pass"
       placeholder = "pass "
       value = {pass}
       onChange = {e => onChange(e)}
       style ={{marginLeft: '10px'}}
       />
      <Button variant="contained" color="primary" style= {{ marginLeft: '20px'}}  type="submit">ADD</Button>
     
       </form> 
       </div>
    )
}
export default connect(null, { register })(CreateUser)