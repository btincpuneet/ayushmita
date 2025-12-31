const { sendMail } = require("../utils/mailer");



const renderEmailTemplate = ({ title, subtitle, fields }) => {
  const fieldsHtml = fields
    .map(
      (field) => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e0e0e0;">
          <strong style="color:#333;">${field.label}:</strong>
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e0e0e0; color:#555;">
          ${field.value || "-"}
        </td>
      </tr>
    `
    )
    .join("");

  return `



  
  <div style="margin:0;padding:0;background-color:#f6f6f6;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:20px;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:6px;overflow:hidden;">
            
            <!-- HEADER -->
            <tr>
              <td style="background:#88b04b;padding:25px;">
                <h2 style="margin:0;color:#ffffff;">${title}</h2>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:30px;">
                <p style="font-size:15px;color:#555;margin-bottom:20px;">
                  ${subtitle}
                </p>

                <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0;border-radius:4px;">
                  ${fieldsHtml}
                </table>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#343a40;color:#fff;text-align:center;padding:20px;font-size:13px;">
                © ${new Date().getFullYear()} Your Company Name
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
  `;
};

exports.handleForm = async (req, res) => {
  try {
    const { type, data } = req.body;

    let subject = "";
    let html = "";

    if (type === "consultation") {
      subject = "New Free Consultation Request";

      html = renderEmailTemplate({
        title: "Free Consultation Request",
        subtitle: "A new consultation request has been submitted.",
        fields: [
          { label: "Appointment Date", value: data.appointment_date },
          { label: "Full Name", value: data.name },
          { label: "Email", value: data.email },
          { label: "Mobile Number", value: data.mobile },
          { label: "Country", value: data.country },
          { label: "City", value: data.city },
          { label: "Age", value: data.age },
          { label: "Gender", value: data.gender },
          { label: "Treatment Requirement", value: data.requirement },
          { label: "Page URL", value: data.hidden_url },
        ],
      });
    }

    if (type === "appointment") {
      subject = "New Appointment Booking";

      html = renderEmailTemplate({
        title: "Appointment Request",
        subtitle: "A new appointment booking has been received.",
        fields: [
          { label: "Full Name", value: data.name },
          { label: "Phone Number", value: data.mobile },
          { label: "Email", value: data.email },
          { label: "Country", value: data.country },
          { label: "Treatment", value: data.treatment },
          { label: "Message", value: data.message },
        ],
      });
    }

    if (type === "contact") {
      subject = "New Contact Us Message";

      html = renderEmailTemplate({
        title: "Contact Us Message",
        subtitle: "A new message has been sent via Contact Us form.",
        fields: [
          { label: "Full Name", value: data.name },
          { label: "Phone Number", value: data.mobile },
          { label: "Email", value: data.email },
          { label: "Country", value: data.country },
          {
            label: "Message",
            value: `
      Treatment Looking For: ${data.treatment || "-"}
      <br/>
      Description: ${data.message || "-"}
    `,
          },
        ],
      });
    }

    await sendMail({
      to: process.env.ADMIN_EMAIL,
      subject,
      html,
    });

    res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};

