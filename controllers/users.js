const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const { PAGE_URL } = require('../config')

usersRouter.get('/', async (request, response) => {
  try {
    const userId = request.user.id; // Suponiendo que el ID del usuario está en la propiedad 'id' del objeto 'user'
    response.json({ userId });
    
  } catch (error) {
    console.log(error);
  }
});

usersRouter.post('/' , async (request, response)=>{
  console.log('Inicio de la solicitud de creación de usuario');
  console.log('Datos de la solicitud:', request.body);
const{name, email, password} = request.body;
if(!name||!email||!password){
return response.status(400).json({error:'Todos los espacios son requeridos'})
}
console.log(name, email, password);
const userExists = await User.findOne({email})

if (userExists){
  return response.status(400).json({error:'El email ya se encuentra en uso'})
};

const saltRounds = 10;

const passwordHash = await bcrypt.hash(password , saltRounds);

const newUser = new User({
    name,
    email,
    passwordHash,
    role: 'client',
});

const savedUser = await newUser.save();
console.log('Usuario creado:', savedUser);

const token = jwt.sign({id:savedUser.id}, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d'
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
const info = await transporter.sendMail({
    from: process.env.EMAIL_USER, 
    to: savedUser.email,
    subject: 'verificacion de usuario',
    html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar correo</a>`, 
  });  
console.log(token);
console.log(savedUser.role);

return response.status(201).json({ message: 'Usuario creado. Por favor verifica tu correo', user: savedUser });

});





module.exports = usersRouter;
