// const nodemailer = require("nodemailer");
// const axios = require("axios");

// const BASE_URL = "http://127.0.0.1:5001/api";

// const getEmailSettings = async () => {
//   const response = await axios.get(`${BASE_URL}/global-settings`);

//   if (!response.data?.success) {
//     throw new Error("Failed to fetch global settings");
//   }

//   return response.data.data;
// };

// const renderEmailTemplate = ({ title, subtitle, fields }) => {
//   const rows = fields
//     .map(
//       (f) => `
//       <tr>
//         <td style="padding:8px;font-weight:bold;border:1px solid #ddd;">${f.label}</td>
//         <td style="padding:8px;border:1px solid #ddd;">${f.value || "-"}</td>
//       </tr>
//     `
//     )
//     .join("");

//   return `
//     <div style="font-family:Arial;padding:20px;background:#f6f8fb">
//       <div style="max-width:600px;margin:auto;background:white;padding:20px;border-radius:8px">
//         <h2 style="color:#0f172a">${title}</h2>
//         <p>${subtitle}</p>
//         <table width="100%" style="border-collapse:collapse;margin-top:15px">
//           ${rows}
//         </table>
//       </div>
//     </div>
//   `;
// };

// const sendMail = async ({ to, subject, html }) => {
//   const settings = await getEmailSettings();

//   const transporter = nodemailer.createTransport({
//     host: settings.email_host,
//     port: settings.email_port,
//     secure: settings.email_port == 465, // important
//     auth: {
//       user: settings.email_user,
//       pass: settings.email_pass,
//     },
//   });

//   return transporter.sendMail({
//     from: `"Website Forms" <${settings.email_user}>`,
//     to,
//     subject,
//     html,
//   });
// };

// module.exports = { sendMail, getEmailSettings, renderEmailTemplate };
const nodemailer = require("nodemailer");
const axios = require("axios");

const BASE_URL = "http://127.0.0.1:5001/api";

/**
 * Fetch email settings from backend
 */
const getEmailSettings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/global-settings`);

    if (!response.data || response.data.success !== true) {
      throw new Error("Failed to fetch global settings");
    }

    return response.data.data;
  } catch (error) {
    console.error("❌ Email settings fetch error:", error.message);
    throw error;
  }
};

/**
 * Render reusable email template
 */
const renderEmailTemplate = ({ title, subtitle, fields = [] }) => {
  const rows = fields
    .map(
      (f) => `
        <tr>
          <td style="padding:8px;font-weight:bold;border:1px solid #ddd;">
            ${f.label}
          </td>
          <td style="padding:8px;border:1px solid #ddd;">
            ${f.value || "-"}
          </td>
        </tr>
      `
    )
    .join("");

  return `
    <div style="font-family:Arial;padding:20px;background:#f6f8fb">
      <div style="max-width:600px;margin:auto;background:white;padding:20px;border-radius:8px">
        <h2 style="color:#0f172a">${title}</h2>
        <p>${subtitle}</p>
        <table width="100%" style="border-collapse:collapse;margin-top:15px">
          ${rows}
        </table>
      </div>
    </div>
  `;
};


const sendMail = async ({ settings, to, subject, html }) => {
  if (!settings?.email_host) {
    throw new Error("Email settings are missing or invalid");
  }

  const transporter = nodemailer.createTransport({
    host: settings.email_host,
    port: Number(settings.email_port),
    secure: Number(settings.email_port) === 465,
    auth: {
      user: settings.email_user,
      pass: settings.email_pass,
    },
  });

  return transporter.sendMail({
    from: `"Website Forms" <${settings.email_user}>`,
    to,
    subject,
    html, // ✅ this WILL be rendered now
  });
};


module.exports = {
  sendMail,
  getEmailSettings,
  renderEmailTemplate,
};
