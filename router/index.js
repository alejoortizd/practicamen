const { Router } = require('express');
const { home, agregarUrl, redireccionarUrl } = require('../controller/urlController');
const router = Router();

router.get('/', home);
router.post('/', agregarUrl);
router.get('/:url', redireccionarUrl)

module.exports = router;
