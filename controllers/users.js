const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const { PAGE_URL } = require('../config')


usersRouter.post('/' , async (request, response)=>{
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
});

const savedUser = await newUser.save();
console.log(savedUser);

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

return response.status(201).json('Usuario creado. Por favor verifica tu correo')

});


usersRouter.patch('/:id/:token' , async (request, response)=>{

try {
    
    const token = request.params.token;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decodedToken.id;
    await User.findByIdAndUpdate(id, {verified: true});
    return response.sendStatus(200)
    
} catch (error) {
  // Encontrar el email del usuario
  const id = request.params.id;
  const {email} = await User.findById(id);



  // firmar el nuevo token
    const token = jwt.sign({id:id}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d'
    });
  // Enviar el email  
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
      to: email,
      subject: 'verificacion de usuario',
      html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar correo</a>`, 
    });  

    
    return response.status(400).json({error: 'El link ya expiro. se ha enviado un nuevo link de verificacion a su correo'});
  }
  
  
  
  
});
  





module.exports = usersRouter;
