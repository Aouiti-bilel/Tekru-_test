import React, {useState} from 'react'
import { login } from '../redux/userActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'
import Alert from './Alert';
const Login = ({  login, isAuthenticated }) => {
  
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
      name = "pass"
      placeholder = "pass"
      value = {pass}
      onChange = {e => onChange(e)}
      required
      />          
      <Button variant="contained" color="primary" style= {{ marginTop: '10px'}}  type="submit">Login</Button>
      <h6>If You Dont Have An account,  </h6>
      <Link to='/register'> Signup</Link>
      </form>
      
  </div>
    )
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
 })
export default connect(mapStateToProps, { login })(Login)