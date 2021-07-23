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

router.get('/:id', async (req, res) => {
    const course = await Course.getById(req.params.id)
    res.render('course', {
        layout: 'empty',
        'title': `Course ${course.title}`,
        course: course
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }
    const course = await Course.getById(req.params.id)
    res.render('course-edit', {
        'title': `Edit ${course.title}`,
        course
    })
})

router.post('/edit', async (req, res) => {
    await Course.update(req.body)
    res.redirect('/courses')
})


module.exports = router