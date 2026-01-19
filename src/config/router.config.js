const authRouter = require('../module/auth/auth.router');
const bannerRouter = require('../module/banner/banner.router');
const brandRouter = require('../module/brand/brand.router');
const categoryRouter = require('../module/categories/category.router');
const orderRouter = require('../module/order/order.router');
const productRouter = require('../module/product/product.router');
const userRouter = require('../module/user/user.router');


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

router.use('/user', userRouter);


// order and orderDetail router mounting
router.use('/order', orderRouter)



//banner router mounting
router.use('/banner', bannerRouter);

module.exports = router;