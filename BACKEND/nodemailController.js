// emailController.js
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const User = require("./models/Applicants_DB")
const Employee = require("./models/Employee_DB")
const crypto = require('crypto');
const bcrypt = require("bcrypt")
const UserVerificationToken = require('./models/UserVerificationtoken');
let emailCount = 0;

const emailCountFilePath = path.join(__dirname, 'emailCount.txt');

// Middleware to read email count from file
const getEmailCountFromFile = () => {
  try {
    const data = fs.readFileSync(emailCountFilePath, 'utf8');
    emailCount = parseInt(data) || 0;
  } catch (err) {
    console.error('Error reading email count from file:', err);
  }
};

// Middleware to save email count to file
const saveEmailCountToFile = () => {
  try {
    fs.writeFileSync(emailCountFilePath, emailCount.toString(), 'utf8');
  } catch (err) {
    console.error('Error saving email count to file:', err);
  }
};

exports. getEmailCount = async (req, res) => {
  getEmailCountFromFile();
  res.json({ count: emailCount });
};


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ashenafie.wale@gmail.com',
    pass: 'dxvr wcvc opmq mrqh'
  }
});
exports.changePassword = async (req, res) => {
  const { token, password } = req.body;
  console.log(token, password);
  const user = await UserVerificationToken
    .findOne
    ({
      token: token
    });
  if (!user) {
    return res.status(404).send('Invalid token');
  }
  const user1 = await User.findOne({
    _id: user.userid
  });
  
  user1.password = bcrypt.hashSync(password, 5);
  await user1.save();
  await user.deleteOne();
  res.status(200).send('Password changed successfully');
};
exports.changeEmployeePassword = async (req, res) => {
  const { token, password } = req.body;
  console.log(token, password);
  const user = await UserVerificationToken
    .findOne
    ({
      token: token
    });
  if (!user) {
    return res.status(404).send('Invalid token');
  }
  const user1 = await Employee.findOne({
    _id: user.userid
  });
  
  user1.password = bcrypt.hashSync(password, 5);
  await user1.save();
  await user.deleteOne();
  res.status(200).send('Password changed successfully');
};

exports.sendResetApplicantEmail = async (req, res) => {
  const { email } = req.body;


 
  const user = await User.findOne({
    email: email
  });
  if (!user) {
    return res.status(404).send('User not found');
  }
  const token = new UserVerificationToken({
    userid: user._id,
    token: crypto.randomBytes(16).toString('hex')
  });
  await token.save();
  const mailOptions = {
 from: 'ashenafie.wale@gmail.com',
 to:email,
  subject: 'Reset your password',
  text: `Copy and paste the following token to reset your password: ${token.token}`
  };

  transporter.sendMail(mailOptions, function (error, info) {

    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    }
    else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');

   ;
    }
  }
  );
}
exports.sendResetEmployeeEmail= async (req, res) => {
  const { email } = req.body;
  const user = await Employee.findOne({
    email
  });
  if (!user) {
    return res.status(404).send('User not found');
  }
  const token = new UserVerificationToken({
    userid: user._id,
    token: crypto.randomBytes(16).toString('hex')
  });
  await token.save();

  const mailOptions = {
 from: 'ashenafie.wale@gmail.com',
 to:email,
  subject: 'Reset your password',
  text: `Copy and paste the following token to reset your password: ${token.token}`
  };

  transporter.sendMail(mailOptions, function (error, info) {

    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    }
    else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
  
    }
  }
  );
}



exports.sendEmail = (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'ashenafie.wale@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, function (error, info) {
    
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
      emailCount++;
      saveEmailCountToFile();

    }
  });
};
