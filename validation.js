const { check } = require('express-validator')

const validName = check('name', 'Please Enter Your Name').not().isEmpty();
const famiy_name = check('name', 'Please Enter Your Name').not().isEmpty();
const validPassword = check('pass', 'Please Enter A valid Password').isLength({ min: 4})

module.exports = {
    validName: validName,
    validPassword: validPassword,
    validfamiy_name: famiy_name,
}