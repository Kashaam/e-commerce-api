const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/sql.config");
const { Status } = require("../../config/constant.config");



const BannerModel = sequelize.define("Banner", {
    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull:true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(Object.values(Status)),
        defaultValue: Status.INACTIVE
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    },
})




module.exports = BannerModel;