const { getEmailSettings, renderEmailTemplate, sendMail } = require("../utils/mailer");

exports.handleForm = async (req, res) => {
  try {
    const { type, data } = req.body;

    const settings = await getEmailSettings();
    console.log(settings);
    

    let subject = "";
    let html = "";
    let to = settings.admin_email;

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
      to = settings.appointment_email;
      console.log("res",to)

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
      to = settings.contact_email ;

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
              Treatment Looking For: ${data.treatment || "-"}<br/>
              Description: ${data.message || "-"}
            `,
          },
        ],
      });
    }
    console.log("QWERTY", to);
    

    await sendMail({
      settings,
      to,
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
