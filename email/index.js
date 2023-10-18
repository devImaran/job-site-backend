const nodemailer=require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zainsaifi413@gmail.com',
      pass: 'zain@8877890975@Md',
    }
  });
  


module.exports=transporter