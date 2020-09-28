const formulario = document.querySelector('#agregar-url');
formulario.addEventListener('submit', async e => {
  e.preventDefault();

  const urlOriginal = document.querySelector('#urlOriginal').value;

  const respuesta = await fetch(e.target.action, {
    method: e.target.method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ urlOriginal })
  });

  const resultado = await respuesta.json();

  const alertas = document.querySelector('.mensaje-url');
  if (alertas) {
    document.querySelector('.mensaje-url').remove();
  }

  if(resultado.codigo === 201) {
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-url');
    mensaje.innerHTML = `<p>Se ha acortado correctamente la URL, visita <a target="_blank" rel="noopener noreferrer" href="/${resultado.url}"> ${resultado.url}</a></p>`;

    const contenedor = document.querySelector('main');
    contenedor.appendChild(mensaje);

  } else {
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-url', 'error');
    mensaje.innerHTML = `<p>${resultado.error}</p>`;

    const contenedor = document.querySelector('main');
    contenedor.appendChild(mensaje);
  }
});

const urlParams = new URLSearchParams(window.location.search);

if(urlParams.has('error')) {
  const mensaje = document.createElement('div');
  mensaje.classList.add('mensaje-url', 'error');
  mensaje.innerHTML = `<p>URL no valida</p>`;

  const contenedor = document.querySelector('main');
  contenedor.appendChild(mensaje);
}
