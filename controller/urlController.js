const Url = require('../model/Url');

exports.home = (req, res) => {
  res.render('index')
}

exports.agregarUrl = async (req, res, next) => {
  let respuesta;
  const urlOriginal = req.body.urlOriginal
  const url = new Url({urlOriginal});

  try {
    let resultado = await url.save();
    respuesta = {
      codigo: 201,
      mensaje: 'Almacenado Correctamente',
      url: resultado.urlCorta
    }
  } catch (error) {
    console.log(error);
    respuesta = {
      codigo: 400,
      error: 'Hubo un error'
    }
  }
  res.json(respuesta);
  next()
}

exports.redireccionarUrl = async (req, res, next) => {
  const url = await Url.findOne({ urlCorta: req.params.url});
  if (!url) {
    res.redirect('/?error=404');
    next();
  }
  res.redirect(url.urlOriginal);
  next();
}
