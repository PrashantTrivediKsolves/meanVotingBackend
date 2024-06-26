import  express from 'express';

const routeruser = express.Router();

import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'your-secret-key';

import {newuserModel} from '../postges/user.js';

routeruser.post('/signup', async (req, res) => {
  try {
    const { username,age,mobile, email,address, aadharCard,password,isVoted,role} = req.body;
    const newUser = await newuserModel.create({ username,age,mobile, email,address,aadharCard,password,isVoted,role});
    res.status(201).json(newUser);
  }
   catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// signin......

routeruser.post('/login', async (req, res) => {

  const { aadharCard, password } = req.body;
  try {
      const user = await newuserModel.findOne({ where: { aadharCard } });

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign(
          { id: user.id, email: user.email,username:user.username,role:user.role},
          JWT_SECRET, 
          // { expiresIn: '1h' } 
      );
      res.cookie('token', token, {
        httpOnly: true, 
        secure: true,   
        sameSite: 'none' 
    });
      res.status(200).json({
          message: 'Login successful',
          token,
          email:user.email,
          username:user.username,
          role:user.role,
          id:user.id,
      });

  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default routeruser;


