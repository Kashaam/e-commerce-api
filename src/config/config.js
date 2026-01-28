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
    jwt_secret: process.env.JWT_SECRET,
    frontend_url: process.env.FRONTEND_URL
}


const SQL_CONFIG = {
    dialect: process.env.SQL_DIALECT,
    user: process.env.SQL_USER,
    pwd: process.env.SQL_PWD,
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    dbname: process.env.SQL_DB_NAME

}

module.exports = {
    MailConfig,
    DbConfig,
    AppConfig,
    SQL_CONFIG
}
