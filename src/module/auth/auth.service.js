const { Status } = require("../../config/constant.config");
const mailSvc = require("../../services/mail.service");
const bcrypt = require("bcryptjs");
const { randomStringGenerator } = require("../../utilities/helper");
const userModel = require("../user/user.model");
const cloudinarySvc = require("../../services/cloudinary.service");
const authModel = require("./auth.model");

class AuthService {
  createTransformUser = async (req) => {
    try {
      const data = req.body;
      const file = req.file;

      //TODO: for file uploads like image should be handled here as well
      if (file) {
        data.image = await cloudinarySvc.fileUpload(file.path, "/user");
      }

      data.password = bcrypt.hashSync(data.password, 12);
      data.status = Status.INACTIVE;
      data.activationToken = randomStringGenerator(100);

      const { confirmPassword, ...mappedData } = data;
      return mappedData;
    } catch (exception) {
      throw exception;
    }
  };

  createUser = async (data) => {
    try {
      const response = new userModel(data);
      return await response.save();
    } catch (exception) {
      console.log("Exception in createUser auth service..", exception);
      throw exception;
    }
  };

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

  newUserWelcomeEmail = async (user) => {
    try {
      await mailSvc.sendEmail({
        to: user.email,
        subject: "Welcome — your account is now active",
        msg: `<!doctype html>
    <html>
      <body style="margin:0;padding:0;font-family:Arial, sans-serif;background-color:#f4f6f8;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;margin:40px 0;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="padding:22px;text-align:center;background:#0b74de;color:#ffffff;font-size:20px;font-weight:700;">
            Welcome to our platform
              </td>
            </tr>
            <tr>
              <td style="padding:24px;color:#333333;font-size:16px;line-height:1.5;">
            Hello ${user.name || user.email || "User"},<br/><br/>
            Your account has been successfully activated. Welcome — you can now sign in and start using our services.
            <div style="margin:18px 0;text-align:center;">
              <a href="${
                user.loginLink ||
                `${process.env.FRONTEND_URL || "https://example.com"}/login`
              }" style="display:inline-block;padding:12px 20px;background:#0b74de;color:#ffffff;border-radius:6px;text-decoration:none;font-weight:600;">
                Sign in to your account
              </a>
            </div>
            <p style="margin-top:16px;color:#374151;font-size:14px;">
              A few things you might want to do next:
            </p>
            <ul style="color:#374151;font-size:14px;line-height:1.6;margin:8px 0 0 18px;padding:0;">
              <li>Complete your profile to get personalized recommendations.</li>
              <li>Explore your dashboard to manage settings and orders.</li>
              <li>Visit our help center for guides and FAQs.</li>
            </ul>
            <p style="margin-top:18px;color:#6b7280;font-size:13px;">
              If you need assistance, contact us at <a href="mailto:${
                process.env.SUPPORT_EMAIL || "support@example.com"
              }" style="color:#0b74de;text-decoration:none;">${
          process.env.SUPPORT_EMAIL || "support@example.com"
        }</a>.
            </p>
            <p style="color:#6b7280;font-size:13px;margin-top:12px;">
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

  createAuthData = async (data) => {
    try {
      const response = authModel(data);
      return await response.save();
    } catch (exception) {
      throw exception;
    }
  };
}

const authSvc = new AuthService();
module.exports = authSvc;
