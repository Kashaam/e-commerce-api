const authRouter = require('../module/auth/auth.router');

const router = require('express').Router();


router.get('/health', (req, res, next)=>{
    res.json({
        data: null,
        message: "API is healthy",
        status: "HEALTH_CHECK_SUCCESS"
    })
});


// router mounting for any other modules
router.use("/auth", authRouter);



module.exports = router;