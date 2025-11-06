# react-hello-copilot

## creamos manualmente el proyecto desde línea de comandos

- $ npm create vite@latest react-hello-copilot

## le damos permisos de escritura a la carpeta

- $ sudo chmod -R 777 ./react-hello-copilot
- $ cd react-hello-copilot
- $ code .

## abrimos terminal desde VSC y ejecutamos

- $ sudo npm run dev
- http://localhost:5173/

## creamos un componente simple, <Card /> como prueba y lo cargamos en App.jsx

## (prompts) empezamos a solicitar ayuda a Github Copilot

- **@workspace** Modifica la aplicación para que muestre un mensaje en pantalla "Hello from React 19"
- Con qué combinación de letras puedo generar el esqueleo de un componente React JS ?
  rafce + TAB
- Quiero agregar bootstrap para darle estilo a mis componentes
  **$ sudo npm install bootstrap**
- He instalado bootstrap, dónde lo cargo y cómo ? agrega la importación de Bootstrap CSS en el archivo main.jsx y nos pregunta si queremos añadir Bootstrap JS también.
- Le pedimos un ejemplo bootstrap usando ventanas modales
- Le preguntamos por la implementación del modal de bootstrap y nos explica, con mucho detalle, como funciona.
- Agrega un nuevo componente que nos permita realizar llamadas a un API Rest para obtener un listado de post que mostraremos en pantalla: **https://jsonplaceholder.typicode.com/**
- Agrega paginación para que podamos ver todos los post, de 10 en 10
- **@workspace /explain** Explicame el componente PostsList. Cómo funciona ?
- Seleccionamos todo el código del componente PostsList y le pedimos (botón derecho + Explicar) que explique su funcionamiento.
- **/new** Crea un nuevo componente, en este mismo proyecto @workspace, CommentList.jsx que obtenga una lista de comentarios desde el API https://jsonplaceholder.typicode.com/.
  Solo queremos mostrar el email del autor y el body del comentario.
  Además queremos realizar la paginación utilizando el propio api, pasando el limit y el page en la URL, de manera que se invocará a la API cada vez que queramos visualizar otra página.
