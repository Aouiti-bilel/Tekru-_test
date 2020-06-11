import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Home = ({ isAuthenticated }) => {
    if(!isAuthenticated) {
        return  <Redirect to ='/auth'/>
       }
    return (
        <div>
            <h3> here is where you wanna List the table of all users</h3>
        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
 })
export default connect(mapStateToProps)(Home)