
# Node.js Email Sender

A simple Node.js app that sends emails using Nodemailer. It serves an HTML form to input email details and sends the message via Gmail.

## Features

- Simple HTTP server in Node.js
- Email sending using Nodemailer
- HTML form for email input

## Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/cotamilhas/nodejs-email-sender.git
   ```
   
2. Navigate to the project directory:
   ```bash
   cd nodejs-email-sender
   ```

3. Install dependencies:
   ```bash
   npm install nodemailer
   ```

## Usage

1. Set up your Gmail credentials in the `config.js` file.
2. Start the server:
   ```bash
   node app.js
   ```

3. Open your browser and go to:
   ```
   http://localhost:8081
   ```

4. Fill out the form and click "Send" to send an email.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
