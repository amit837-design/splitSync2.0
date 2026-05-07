const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
  const { data, error } = await resend.emails.send({
    from: "SplitSync <onboarding@resend.dev>",
    to,
    subject,
    text,
  });
  if (error) throw new Error(error.message);
  return data;
};

module.exports = sendEmail;
