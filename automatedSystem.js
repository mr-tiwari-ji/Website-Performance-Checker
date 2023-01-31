const nodemailer = require('nodemailer');

function monitorPerformance(url) {
  https.get(url, (res) => {
    // Check the status code of the response
    if (res.statusCode !== 200) {
      console.log(`Error: Website returned status code ${res.statusCode}`);
      sendNotification(`Error: Website returned status code ${res.statusCode}`);
      return;
    }

    // Check the response time of the website
    const responseTime = res.elapsedTime;
    if (responseTime > 2000) {
      console.log(`Warning: Website response time is ${responseTime}ms`);
      sendNotification(`Warning: Website response time is ${responseTime}ms`);
    } else {
      console.log(`Website performance is good. Response time is ${responseTime}ms`);
    }
  }).on('error', (error) => {
    console.log(`Error: ${error.message}`);
    sendNotification(`Error: ${error.message}`);
  });
}

function sendNotification(message) {
  // Set up the nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@example.com',
      pass: 'your-password'
    }
  });

  // Set up the email options
  const mailOptions = {
    from: '"Website Monitor" <your-email@example.com>',
    to: 'team@example.com',
    subject: 'Website Monitoring Alert',
    text: message
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Notification sent: ${info.response}`);
    }
  });
}
