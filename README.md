# npm run server To run server
# npm run dev to run both client && server
# i use My Local DataBase name is "Terku"
# BACKEND
  # DEpendicies
   -Express JS
   -JWT
   -BbcryptJS
   -Sequlize
   -express-validator"
   ---- REST Architecture => Server.js  : entry Point
                          => userRoute  : Contain all API
                                                  =>Rgister User +-->Validation --> password HASH ---> save User then return it
                                                  =>Login User   +-->Validation -->Last_Login -->SIGN TOKEN
                                                  =>Update USer
                                                  =>Delete User
                                                  =>return Current user LogedIn
                                                  =>All user

                          => UserModel  : contain The Model of the User
                          => auth, DB   : Both Are Utility
# FRONTEND
 # DEpendicies
   redux
   redux-thunk
   react-redux
   react-moment
   material-ui


  Client Folder
     Components
        => LOGIN 
        =>REGISTER
        =>NAVBAR
        =>UPDATE USER
        =>CREATE USER
      redux 
        <> store ->rootReducer--> reducer --> actions-->Alert
 // Note that the  component ReactTable is just an exemple and i forget to deleted        
