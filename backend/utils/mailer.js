const nodemailer = require("nodemailer");
const axios = require("axios");

const BASE_URL = "http://127.0.0.1:5001/api"

let cachedSettings = null;


const getEmailSettings = async () => {
  if (!cachedSettings) {
    const response = await axios.get(`${BASE_URL}/global-settings`);

    if (!response.data?.success) {
      throw new Error("Failed to fetch global settings");
    }

    cachedSettings = response.data.data;
  }

  return cachedSettings;
};

const sendMail = async ({ to, subject, html }) => {
  const settings = await getEmailSettings(); 

  const transporter = nodemailer.createTransport({
    host: settings.email_host,
    port: settings.email_port,
    secure: false,
    auth: {
      user: settings.email_user,
      pass: settings.email_pass,
    },
  });

  return transporter.sendMail({
    from: `"Website Forms" <${settings.email_user}>`,
    to,
    subject,
    html,
  });
};

module.exports = { sendMail };
