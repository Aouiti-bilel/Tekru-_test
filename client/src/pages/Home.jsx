import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout  } from '../redux/userActions'
const Home = ({ isAuthenticated, logout }) => {
    if(!isAuthenticated) {
        return  <Redirect to ='/auth'/>
       }
    return (
        <div>
            <h3> here is where you wanna List the table of all users</h3>
            <button onClick={()=>logout()}>Logout</button>
        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
 })
export default connect(mapStateToProps, { logout })(Home)