const {Router} = require('express')
const router = Router()

const Course = require('../models/course')

router.get('/', async(req, res) => {
    const courses = await Course.getAll()

    res.status(200).render('courses', {
        title: 'Courses Page',
        isCourses: true,
        courses: courses
    })
})


module.exports = router