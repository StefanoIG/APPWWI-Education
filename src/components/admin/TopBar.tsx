import React from 'react';

function TopBar() {
  return (
    <nav
      aria-label="top bar"
      className="flex-none flex justify-between bg-white h-16"
    >
      {/* Barra superior izquierda */}
      <ul aria-label="top bar left" className="flex">
        {/* Botón agregar */}
        <li className="group relative">
          <button
            aria-haspopup="listbox"
            className="flex items-center h-full px-4 text-sm"
          >
            <i>
              <svg
                className="fill-current w-3 h-3 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M24 10h-10v-10h-2v10h-10v2h10v10h2v-10h10z" />
              </svg>
            </i>
            <span className="ml-2">Agregar</span>
          </button>
          <span className="absolute p-1 hidden group-hover:block">
            <ul
              role="listbox"
              className="outline-none py-2 bg-white border rounded-md w-screen max-w-md shadow-lg leading-relaxed"
            >
              <li
                role="option"
                className="px-6 py-1 my-1 hover:bg-blue-100 cursor-pointer"
              >
                Materia
              </li>
              <li
                role="option"
                className="px-6 py-1 my-1 hover:bg-blue-100 cursor-pointer"
              >
                Docente
              </li>
              <li
                role="option"
                className="px-6 py-1 my-1 hover:bg-blue-100 cursor-pointer"
              >
                Estudiante
              </li>
              {/* Agrega más opciones si es necesario */}
            </ul>
          </span>
        </li>
      </ul>

      {/* Barra superior derecha */}
      <ul aria-label="top bar right" className="px-8 flex items-center">
        {/* Campo de búsqueda */}
        <li className="relative">
          <input
            aria-label="search bar"
            role="search"
            className="pr-8 pl-4 py-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out focus:border-black focus:cursor-text w-4 focus:w-64 placeholder-transparent focus:placeholder-gray-500"
            type="text"
            placeholder="Buscar..."
          />
          <i className="pointer-events-none absolute top-0 right-0 h-full flex items-center pr-3">
            <svg
              className="fill-current w-4 h-4 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
            </svg>
          </i>
        </li>

        {/* Notificaciones */}
        <li className="h-8 w-8 ml-3">
          <button
            aria-label="notifications"
            className="w-full h-full text-white bg-gray-600 rounded-md focus:outline-none focus:shadow-outline"
          >
            <i>
              <svg
                className="fill-current w-4 h-4 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z" />
              </svg>
            </i>
          </button>
        </li>

        {/* Perfil de usuario */}
        <li className="h-10 w-10 ml-3">
          <button
            aria-label="perfil"
            className="h-full w-full rounded-full border focus:outline-none focus:shadow-outline"
          >
            <img
              className="h-full w-full rounded-full mx-auto"
              src="ruta/de/imagen/usuario.jpg"
              alt="Usuario"
            />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default TopBar;
