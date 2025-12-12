require("dotenv").config();

const MailConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    provider: process.env.SMTP_PROVIDER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM
};



module.exports = {
    MailConfig
}
