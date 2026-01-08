const authRouter = require('../module/auth/auth.router');
const brandRouter = require('../module/brand/brand.router');
const categoryRouter = require('../module/categories/category.router');
const userRouter = require('../module/user/user.router');
const productRouter = require('../product/product.router');

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

// brand router mounting
router.use('/brand', brandRouter);

// category route mounting
router.use('/category', categoryRouter);

router.use("/product", productRouter);

// router.use('/user', userRouter);

module.exports = router;