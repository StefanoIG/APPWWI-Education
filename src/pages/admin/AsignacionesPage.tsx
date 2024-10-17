// src/pages/AsignacionesPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';
import TopBar from '../../components/admin/TopBar';
import Header from '../../components/admin/Header';
import AsignacionesTable from '../../components/admin/AsignacionesTable';

interface Asignacion {
  id: number;
  materia: string;
  docente: string;
  estudiante: string;
  fechaAsignacion: string;
}

function AsignacionesPage() {
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);

  // Función para cargar datos de asignaciones desde la API
  const fetchAsignaciones = async () => {
    try {
      const response = await axios.get('http://tu-api.com/api/asignaciones');
      setAsignaciones(response.data);
    } catch (error) {
      console.error('Error al cargar las asignaciones:', error);
    }
  };

  useEffect(() => {
    fetchAsignaciones();
  }, []);

  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      {/* Menú lateral */}
      <Sidebar activeItem="Asignaciones" />

      <div className="flex-1 flex flex-col">
        {/* Barra superior */}
        <TopBar />

        {/* Encabezado de contenido */}
        <Header title="Asignaciones" />

        {/* Contenido principal */}
        <main className="flex-grow flex min-h-0 border-t">
          {/* Sección de contenido principal */}
          <section
            aria-label="main content"
            className="flex min-h-0 flex-col flex-auto"
          >
            {/* Encabezado de la sección principal */}
            <header className="bg-white border-b flex items-center py-4 px-4">
              <h2 id="content-caption" className="font-semibold text-xl">
                Lista de Asignaciones
              </h2>
              <div className="ml-auto">
                <button
                  title="Agregar nueva asignación"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  + Nueva Asignación
                </button>
              </div>
            </header>

            {/* Contenido principal */}
            <AsignacionesTable asignaciones={asignaciones} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default AsignacionesPage;
