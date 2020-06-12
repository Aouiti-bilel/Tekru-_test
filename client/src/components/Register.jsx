import React, {useState} from 'react'
import { register } from '../redux/userActions'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect, withRouter, Link } from 'react-router-dom'
import Alert from './Alert';
const Register = ({  register, isAuthenticated, history } ) => {
  
    const [formData, setFormData] = useState({
        name: '',
        pass: '',
        famiy_name: ''
    });

    const { name, pass, famiy_name } = formData
    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit =async e =>{
        e.preventDefault()
        register(formData, history)
     
    }
    if(isAuthenticated) {
        return  <Redirect to ='/'/>
       }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row'}}> 
        <form onSubmit={e=>onSubmit(e)} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop:'50px'}}>
            <Alert/>
     <TextField 
      style = {{ margin: '10px' }}
      type = "text"
      name="name"
      placeholder = "name "
      value = {name}
      onChange = {e => onChange(e)}
      required
      />

      <TextField 
       style = {{ margin: '10px' }}
      type = "text"
      name="famiy_name"
      placeholder = "famiy_name "
      value = {famiy_name}
      onChange = {e => onChange(e)}
      required
      />
      <TextField 
       style = {{ margin: '10px' }}
      type = "password"
      name = "pass"
      placeholder = "pass"
      value = {pass}
      onChange = {e => onChange(e)}
      required
      />

                 
<Button variant="contained" color="primary" style= {{ marginTop: '10px'}}  type="submit">Register</Button>
<h6>Already Have Account</h6>
      <Link to='/login'> LogIn</Link>
      </form>
    
  </div>
    )
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
 })
export default withRouter(connect(mapStateToProps, { register })(Register))