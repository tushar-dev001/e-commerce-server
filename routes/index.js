const express = require('express')
const router = express.Router()
const api = process.env.BASE_URL
const apiRoutes = require('./api')

///api/v1
router.use(api, apiRoutes)

router.use(api, (req, res)=>res.json("No Api Found On This Route"))



module.exports = router