const mailSvc = require("../../services/mail.service");

class AuthService {
    createTransformUser = (user)=>{
       
    }


  sendUserRegisterNotification = async (user) => {
    try {
      await mailSvc.sendEmail({
        to: user.email,
        subject: "Activate your account",
        msg: `<!doctype html>
<html>
  <body style="margin:0;padding:0;font-family:Arial, sans-serif;background-color:#f4f6f8;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;margin:40px 0;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="padding:22px;text-align:center;background:#0b74de;color:#ffffff;font-size:20px;font-weight:700;">
                Activate your account
              </td>
            </tr>
            <tr>
              <td style="padding:24px;color:#333333;font-size:16px;line-height:1.5;">
                Hello ${user.name || user.email || "User"},<br/><br/>
                Thank you for registering. To complete your registration and activate your account, please use the activation token below or click the button.
                <div style="text-align:center;margin:18px 0;">
                  <span style="display:inline-block;padding:12px 18px;border-radius:6px;background:#f1f5f9;color:#111827;font-weight:600;border:1px solid #e6eef6;">
                    ${user.activationToken || "N/A"}
                  </span>
                </div>
                <div style="text-align:center;margin:18px 0;">
                  <a href="${
                    user.activationLink ||
                    `${
                      process.env.FRONTEND_URL || "https://example.com"
                    }/activate/${user.activationToken || ""}`
                  }" style="display:inline-block;padding:12px 20px;background:#0b74de;color:#ffffff;border-radius:6px;text-decoration:none;font-weight:600;">
                    Activate account
                  </a>
                </div>
                <p style="color:#6b7280;font-size:13px;margin-top:20px;">
                  If you did not sign up for this account, please ignore this email.
                </p>
                <p style="color:#6b7280;font-size:13px;margin-top:6px;">
                  Regards,<br/>The Team
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:14px;text-align:center;font-size:12px;color:#9ca3af;background:#f8fafc;">
                This is an automated message — please do not reply.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
      });
    } catch (exception) {
      throw exception;
    }
  };
}

const authSvc = new AuthService();
module.exports = authSvc;
