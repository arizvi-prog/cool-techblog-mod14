const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new', (req, res) => {
    res.render('new-post', { loggedIn: req.session.loggedIn });
});

router.post('/new', async (req, res) => {
    try {
        await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id/edit', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({ plain: true });
        res.render('edit-post', { ...post, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/post/:id/edit', async (req, res) => {
    try {
        await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id/delete', async (req, res) => {
    try {
        await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
