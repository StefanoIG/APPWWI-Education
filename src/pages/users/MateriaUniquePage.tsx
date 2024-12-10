// src/pages/admin/TareasPage.tsx
import React from 'react';
import Sidebar from '../../components/admin/SideBar';
import TopBar from '../../components/admin/TopBar';
import Header from '../../components/admin/Header';

function TareasPage() {
  // Datos quemados
  const tareas = [
    {
      id: 1,
      titulo: 'Leer el capítulo 1 de "Data Mining Concepts"',
      descripcion: 'Realizar una lectura crítica y preparar un resumen.',
      estado: 'En progreso',
      fechaEntrega: '2024-12-15',
    },
    {
      id: 2,
      titulo: 'Proyecto: Análisis de patrones de datos',
      descripcion:
        'Desarrollar un análisis de un conjunto de datos utilizando herramientas de minería.',
      estado: 'Pendiente',
      fechaEntrega: '2024-12-20',
    },
    {
      id: 3,
      titulo: 'Quiz 1: Introducción a la Minería de Datos',
      descripcion: 'Completar el quiz en la plataforma antes de la fecha límite.',
      estado: 'Completada',
      fechaEntrega: '2024-12-10',
    },
    {
      id: 4,
      titulo: 'Foro: Discusión sobre algoritmos de clustering',
      descripcion:
        'Participar en el foro compartiendo un ejemplo de clustering en la vida real.',
      estado: 'En progreso',
      fechaEntrega: '2024-12-18',
    },
    {
      id: 5,
      titulo: 'Práctica: Implementación de árboles de decisión',
      descripcion:
        'Crear un script en Python que implemente un árbol de decisión.',
      estado: 'Pendiente',
      fechaEntrega: '2024-12-25',
    },
  ];

  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      {/* Menú lateral */}
      <Sidebar activeItem={'Tareas'} />

      <div className="flex-1 flex flex-col">
        {/* Barra superior */}
        <TopBar />

        {/* Encabezado de contenido */}
        <Header title="Tareas" />

        {/* Contenido principal */}
        <main className="flex-grow flex flex-col min-h-0 border-t">
          <section aria-label="main content" className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Lista de Tareas</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tareas.map((tarea) => (
                <div
                  key={tarea.id}
                  className="border rounded-lg p-4 bg-gray-100 shadow-md"
                >
                  <h3 className="text-lg font-bold">{tarea.titulo}</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {tarea.descripcion}
                  </p>
                  <p className="mt-2 text-sm">
                    <strong>Estado:</strong> {tarea.estado}
                  </p>
                  <p className="mt-1 text-sm">
                    <strong>Fecha de entrega:</strong> {tarea.fechaEntrega}
                  </p>
                  <button
                    className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                  >
                    Ver detalles
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

export default TareasPage;
