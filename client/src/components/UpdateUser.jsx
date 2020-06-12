import React, { useState} from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../redux/userActions'
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
       {!hideForm ? <button onClick={()=>setHideForm(!hideForm)}>Edit</button>: 
       <form onSubmit={e=>onSubmit(e)}>
       <input 
       type = "text"
       name="name"
       placeholder = {userData.name}
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
        <button>update</button>
        <button onClick={()=>setHideForm(!hideForm)}>close</button>
       </form>
      }
       </div>
    )
}
export default connect(null, { updateUser })(CreateUser)