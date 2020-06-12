import React, { useState} from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../redux/userActions'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

 const CreateUser = ({  updateUser, userData= { id: ''} }) => {
    const [hideForm, setHideForm] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        pass: '',
        famiy_name: ''
    });

    const { name, famiy_name } = formData
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e =>{
        e.preventDefault()
     
            updateUser(formData, userData.id);
            setFormData({
                name: '',
                famiy_name: ''
              })
        }
    
    return (
        <div> 
       {!hideForm ? <Button variant="contained" color="primary"  onClick={()=>setHideForm(!hideForm)}>Edit</Button>: 
       <form onSubmit={e=>onSubmit(e)}>
       <TextField 
       type = "text"
       name="name"
       placeholder = {userData.name}
       value = {name}
       onChange = {e => onChange(e)}
       />
 
       <TextField 
       type = "text"
       name="famiy_name"
       placeholder = {userData.famiy_name}
       value = {famiy_name}
       onChange = {e => onChange(e)}
       />
        <button>update</button>
      
        <button onClick={()=>setHideForm(!hideForm)}>close</button>
       </form>
      }
       </div>
    )
}
export default connect(null, { updateUser })(CreateUser)