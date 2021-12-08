const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const LoginCredentials = require('../models/loginCredentials');
const Realestate = require('../models/realestate');

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,20}$/;

const checkEmailAvailability = async (req,res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) //no user found, email available
            return res.status(200).send("Email available");
        else //user found, email unavailable
            return res.status(400).send("המייל הזה כבר קיים אצלנו. כדאי לנסות להתחבר");
        } catch(err) {
        res.status(500).send("קיימת תקלה זמנית בשרתים שלנו, אנא נסו שוב מאוחר יותר");
    }
}

const registerUser = async (req,res) => {
    const {email,password} = req.body;
 
    //data validation
    if(!validator.isEmail(email)) return res.status(400).send("Invalid email");
    if(!passwordRegex.test(password)) return res.status(400).send("Invalid password");

    //Create user
    try {
        const user = new User({...req.body});
        //Set login credentials so user doesn't have to login again after register
        const loginCredentials = new LoginCredentials({
            token: jwt.sign({data:user.id},process.env.SECRET),
        })
        await user.save();
        await loginCredentials.save();
        res.cookie('AuthToken',loginCredentials.token);
        return res.status(200).send("");
    } catch (err) {
        if(err.code === 11000) { //mongodb duplication, email already exists in db
            return res.status(400).send("המייל הזה כבר קיים אצלנו. כדאי לנסות להתחבר");
        }
        return res.status(500).status("Internal Server Error");
    }
}

const checkValidToken = async (req,res) => {
    const user = req.user;
    res.status(200).send({
        name:user.name,
        surname:user.surname,
        cellphone: user.cellphone,
        email: user.email,
    })
}

const logoutUser = async (req,res) => {
    try {
        const token = await LoginCredentials.findOneAndDelete({token:req.cookies.AuthToken});
        res.clearCookie("AuthToken");
        if(token) return res.status(200).send("Logged Out successfully");
        else return res.status(400).send("Unauthorized");
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user) //if user not in db
        return res.status(400).send("אחד הפריטים שהוזנו אינו נכון");
        if(!bcrypt.compareSync(password,user.password)) //if password is incorrect
        return res.status(400).send("אחד הפריטים שהוזנו אינו נכון");
        //create token and return data
        const loginCredentials = new LoginCredentials({
            token: jwt.sign({data:user.id},process.env.SECRET),
        })
        await loginCredentials.save();
        res.cookie("AuthToken",loginCredentials.token)
        return res.status(200).send({name:user.name,surname:user.surname});    
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
}

const publishRealestate = async (req,res) => {
    
    const user = req.user;
    const {
        adMailingList,
        addToMailingList,
        contactCellphone,
        contactEmail,
        contactMailingList,
        contactName,
        contactTerms,
        contactVirtualNumber,
        contactWeekend,
        secondaryContactCellphone,
        secondaryContactName,
        balconies,
        builtArea,
        category,
        city,
        description,
        entryDate,
        entryFlexible,
        entryNow,
        estateCondition,
        estateType,
        features,
        floor,
        images,
        mainImage,
        number,
        onPillars,
        parkingSpots,
        price,
        publishPlan,
        rooms,
        street,
        totalArea,
        totalFloors,
    } = req.body;

    try {
        const realestate = new Realestate();
        realestate.owner = user._id;
        realestate.userData = {
            adMailingList,
            addToMailingList,
            contactCellphone,
            contactEmail,
            contactMailingList,
            contactName,
            contactTerms,
            contactVirtualNumber,
            contactWeekend,
            secondaryContactCellphone,
            secondaryContactName,
        }
        realestate.realestateData = {
            balconies,
            builtArea,
            category,
            city,
            description,
            entryDate,
            entryFlexible,
            entryNow,
            estateCondition,
            estateType,
            features: Object.keys(features).filter(key=>features[key]===true),
            floor,
            images: images.filter(img=>img!==""),
            mainImage,
            number,
            onPillars,
            parkingSpots,
            price,
            publishPlan,
            rooms,
            street,
            totalArea,
            totalFloors,
        }
        await realestate.save();
        res.status(201).send("Realestate published!")

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    registerUser,
    checkEmailAvailability,
    checkValidToken,
    logoutUser,
    loginUser,
    publishRealestate,
}