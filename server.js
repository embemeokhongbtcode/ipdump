const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/', async (req, res) => {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const timestamp = new Date().toLocaleString();
      console.log(`IP: ${ip}, Timestamp: ${timestamp}`);

      const webhookUrl = 'https://discord.com/api/webhooks/1122424847910322186/yRPU3FgNhiRj_fnfBuDkO_eaYyDDUnhf_2aywZc8eoyz8MmGAQ3dFIZ-AG5z6vl95qYM';
      const payload = {
            content: `IP: ${ip}, Timestamp: ${timestamp}`
      };

      try {
            await axios.post(webhookUrl, payload);
            console.log('Webhook sent successfully');
      } catch (error) {
            console.error('Failed to send webhook:', error.message);
      }

      const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Trang web đơn giản</title>
        <link rel="stylesheet" href="style.css">
        <script>
          window.onload = function() {
            const ipElement = document.getElementById('ip');
            const timestampElement = document.getElementById('timestamp');
            ipElement.textContent = 'IP: ' + '${ip}';
            timestampElement.textContent = 'Timestamp: ' + '${timestamp}';
          }
        </script>
        <style>
          body {
            background-color: #f2f2f2;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          
          h1 {
            color: #333;
          }
          
          p {
            color: #666;
          }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>DUMEMAY</h1>
            <p id="ip"></p>
            <p id="timestamp"></p>
        </div>
    </body>
    </html>
  `;
      res.send(html);
});

app.listen(port, () => {
      console.log(`dang dung ${port}`);
});