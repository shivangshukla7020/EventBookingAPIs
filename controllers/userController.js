require('dotenv').config();
const { Users, Bookings } = require('../database/initializeModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const signupUser = async (req, res) =>{

    try{
        const { userName, email, password } = req.body;

        if(!userName || !email || !password){
            return res.status(400).json({message : "All feilds are required"});
        }

        const existing = await Users.findOne({where : { email }});

        if(existing){
            return res.status(400).json({message : "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 15);

        const user = {
            userName,
            email,
            password : hashedPassword,
            role : 'user'
        }

        await Users.create(user);

        res.status(201).json({message : "User created successfully"});
    }
    catch(err){
        return res.status(500).json({message : `Internal error occured : ${err}`});
    }
}

const loginUser = async (req, res) => {
    try{
        if(req.cookies.jwt){
            return res.status(400).json({message : 'Logout first'});
        }
        const { email, password } = req.body;

        const user = await Users.findOne({where : { email }});

        if(!user){
            return res.status(404).json({message : 'No user found'});
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword){
            return res.status(400).json({message : 'Wrong password'});
        }

        const jwt_token = jwt.sign({userId : user.id, role : user.role}, SECRET_KEY, {expiresIn : '2h'});

        res.cookie('jwt', jwt_token, {
            httpOnly : true,
            maxAge: 2*60 * 60 * 1000,
        })

        return res.status(200).json({message : 'Login Successfull'});
    }
    catch(err){
        return res.status(500).json({message : `Internal error occured : ${err}`});
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
        });
        return res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        return res.status(500).json({ message: `Internal error occurred: ${err}` });
    }
};

const findById = async (req, res) =>{
    try{
        const id = req.params.userId;
        const user = await Users.findOne({where : { id }, attributes: { exclude: ['password'] }});
        if(!user){
            return res.status(404).json({message : 'No user found'});
        }
        res.status(200).json(user);
    }
    catch(err){
        return res.status(500).json({message : 'Internal error occured'});
    }
}

const updateById = async (req, res) =>{
    try{
        const userId = req.params.userId;
        const user = await Users.findOne({where : { id : userId }});
        if(!user){
            return res.status(404).json({message : 'No user found'});
        }
        const { userName, email, password } = req.body;

        user.userName = userName;
        user.email = email;
        user.password = await bcrypt.hash(password,15);

        await user.save();
        res.status(200).json({message : 'User updated successfully'});
    }
    catch(err){
        return res.status(500).json({message : 'Internal error occured'});
    }
}

const deleteById = async (req, res) =>{
    try{
        const userId = req.params.userId;
        const user = await Users.findOne({where : { id : userId }, attributes: { exclude: ['password'] }});
        if(!user){
            return res.status(404).json({message : 'No user found'});
        }

        //We must ensure all related bookings gets removed too
        await Bookings.destroy({where : {userId}});

        await user.destroy();

        return res.status(200).json({message : 'User deleted successfully'});
    }
    catch(err){
        return res.status(500).json({message : 'Internal error occured'});
    }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { signupUser, loginUser, logoutUser, findById, updateById, deleteById, getAllUsers};