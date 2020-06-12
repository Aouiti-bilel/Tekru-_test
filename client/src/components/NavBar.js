import React from 'react';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { logout } from '../redux/userActions'




function NavBar({ isAuthenticated, logout }) {
  return (
    <div style={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}  >
             Management
          </Typography>
          {
              isAuthenticated && <Button color="inherit" onClick={()=>logout()}>Logout</Button>
          }
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
 })
export default connect(mapStateToProps, { logout })(NavBar)