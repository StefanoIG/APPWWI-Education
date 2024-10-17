import React from 'react';

function Sidebar() {
  const menuItems = [
    { title: 'Inicio', href: '#inicio', icon: 'home' },
    { title: 'Materias', href: '#materias', icon: 'materias' },
    { title: 'Docentes', href: '#docentes', icon: 'docentes' },
    { title: 'Estudiantes', href: '#estudiantes', icon: 'estudiantes' },
    { title: 'Asignaciones', href: '#asignaciones', icon: 'asignaciones' },
    { title: 'Periodos', href: '#periodos', icon: 'periodos' },
    // Agrega más elementos según sea necesario
  ];
  return (
    <nav
      aria-label="side bar"
      aria-orientation="vertical"
      className="flex-none flex flex-col items-center text-center bg-teal-900 text-gray-400 border-r"
    >
      <div className="h-16 flex items-center w-full">
        <img
          className="h-6 w-6 mx-auto"
          src="ruta/de/tu/logo.png"
          alt="Logo"
        />
      </div>

      <ul>
        <li>
          <a
            title="Inicio"
            href="#inicio"
            className="h-16 px-6 flex items-center text-white bg-teal-700 w-full"
          >
            <i className="mx-auto">
              {/* Icono de inicio */}
              <svg
                className="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z" />
              </svg>
            </i>
          </a>
        </li>
        <li>
          <a
            title="Materias"
            href="#materias"
            className="h-16 px-6 flex items-center hover:text-white w-full"
          >
            <i className="mx-auto">
              {/* Icono de materias */}
              <svg
                className="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16v2h-16v-2zm0 4h16v2h-16v-2zm0 4h16v2h-16v-2zm0 4h16v2h-16v-2z" />
              </svg>
            </i>
          </a>
        </li>
        <li>
          <a
            title="Docentes"
            href="#docentes"
            className="h-16 px-6 flex items-center hover:text-white w-full"
          >
            <i className="mx-auto">
              {/* Icono de docentes */}
              <svg
                className="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.67 0 8 1.34 8 4v4h-16v-4c0-2.66 5.33-4 8-4zm0-2c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
              </svg>
            </i>
          </a>
        </li>
        <li>
          <a
            title="Estudiantes"
            href="#estudiantes"
            className="h-16 px-6 flex items-center hover:text-white w-full"
          >
            <i className="mx-auto">
              {/* Icono de estudiantes */}
              <svg
                className="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.67 0 8 1.34 8 4v4h-16v-4c0-2.66 5.33-4 8-4zm0-2c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
              </svg>
            </i>
          </a>
        </li>
        {/* Agrega más elementos según sea necesario */}
      </ul>

      <div className="mt-auto h-16 flex items-center w-full">
        <img
          style={{ filter: 'invert(85%)' }}
          className="h-8 w-10 mx-auto"
          src="ruta/de/otro/logo.png"
          alt="Logo"
        />
      </div>
    </nav>
  );
}

export default Sidebar;
