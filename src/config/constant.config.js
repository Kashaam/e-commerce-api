const Status = {
    ACTIVE: "active",
    INACTIVE: "inactive"
}

const Roles = {
    ADMIN: "admin",
    CUSTOMER: "customer",
    SELLER: "seller"
}


const Gender = {
    MALE: "male",
    FEMALE: "female",
    OTHER: "other"
}

const OREDR_STATUS = {
    CART: "cart",
    PENDING: "pending",
    VERIFIED: "verified",
    CANCLLED: "canclded",
    PROCESSING: "processing",
    DELIVERED: "delivered"

}

const Payment_Method = {
    COD: "cod",
    ESEWA: "esewa",
    KHALTI: "khalti",
    IPS: "connectips",
    BANK: "bank"

}


const Payment_Status = {
    PENDIND: "pending",
    PAID: "paid",
    REFUND: "refund"
}

module.exports = {
    Status,
    Roles,
    Gender,
    OREDR_STATUS,
    Payment_Method,
    Payment_Status
}