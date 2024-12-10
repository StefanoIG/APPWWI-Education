// src/pages/admin/MateriasPage.tsx
import React from 'react';
import Sidebar from '../../components/admin/SideBar';
import TopBar from '../../components/admin/TopBar';
import Header from '../../components/admin/Header';

function MateriasPage() {
  // Datos quemados
  const materias = [
    {
      id: 1,
      nombre: 'Aplicaciones Web II',
      carrera: 'Tecnologías de la Información 2024-AS',
      completado: '25%',
    },
    {
      id: 2,
      nombre: 'Minería de Datos',
      carrera: 'Tecnologías de la Información 2024-AS',
      completado: '15%',
    },
    {
      id: 3,
      nombre: 'Prácticas Laborales I',
      carrera: 'Tecnologías de la Información 2024-AS',
      completado: '35%',
    },
    {
      id: 4,
      nombre: 'Seguridad de la Información',
      carrera: 'Tecnologías de la Información 2024-AS',
      completado: '40%',
    },
    {
      id: 5,
      nombre: 'Ingeniería de Software II',
      carrera: 'Tecnologías de la Información 2024-AS',
      completado: '44%',
    },
    {
      id: 6,
      nombre: 'Tecnologías de Conmutación y Enrutamiento',
      carrera: 'Tecnologías de la Información 2024-AS',
      completado: '30%',
    },
  ];

  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      {/* Menú lateral */}
      <Sidebar activeItem={'Materias'} />

      <div className="flex-1 flex flex-col">
        {/* Barra superior */}
        <TopBar />

        {/* Encabezado de contenido */}
        <Header title="Materias" />

        {/* Contenido principal */}
        <main className="flex-grow flex flex-col min-h-0 border-t">
          <section aria-label="main content" className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Lista de Materias</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {materias.map((materia) => (
                <div
                  key={materia.id}
                  className="border rounded-lg p-4 bg-gray-100 shadow-md"
                >
                  <h3 className="text-lg font-bold">{materia.nombre}</h3>
                  <p className="text-sm text-gray-600">{materia.carrera}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Progreso: {materia.completado}
                  </p>
                  <button
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                  >
                    Ver más
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default MateriasPage;
