const { MailConfig } = require("../config/config");
const nodemailer = require('nodemailer');

class MailService {
    #transport;

  constructor() {
    try {
      const config = {
        host: MailConfig.host,
        port: MailConfig.port,
        auth: {
          user: MailConfig.user,
          pass: MailConfig.password
        },
      };
      if (MailConfig.provider === "gmail") {
        config.service = MailConfig.provider;
      }

      this.#transport = nodemailer.createTransport(config);
      console.log("******************SMTP connected successfullt******************");
    } catch (exception) {
        throw({
            code: 422,
            message: "Failed connecting smtp",
            status: "FAILED_CONNECTING_SMTP"
        })
    }
  }


  sendEmail = async({to, msg, subject, attachments=null, cc=null, bcc=null})=>{
    try{
        const messageBody = {
            to: to,
            from: MailConfig.from,
            subject: subject,
            html: msg
        }
        if(messageBody.attachments){
            messageBody.attachments = attachments;
        }
        if(messageBody.bcc){
            messageBody.bcc = bcc;
        }
        if(messageBody["cc"]){
            messageBody["cc"] = cc;
        }

        const response = await this.#transport.sendMail(messageBody);
        return response;
    }catch(exception){
        throw({
            code: 403,
            message: "Mail sending failed",
            status: "MAIL_SENDING_FAILED"
        })
    }

  }
}

const mailSvc = new MailService();
module.exports = mailSvc;
