require("dotenv").config();

const MailConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    provider: process.env.SMTP_PROVIDER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM
};


DbConfig = {
    dbUrl: process.env.MONGODB_URL,
    dbName: process.env.DB_NAME
}

const AppConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY,
    jwt_secret: process.env.JWT_SECRET
}

module.exports = {
    MailConfig,
    DbConfig,
    AppConfig
}
