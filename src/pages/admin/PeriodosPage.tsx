// src/pages/PeriodosPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/SideBar';
import TopBar from '../../components/admin/TopBar';
import Header from '../../components/admin/Header';
import PeriodosTable from '../../components/admin/PeriodosTable';
import Modal from '../../components/modal';
import PeriodoForm from '../../components/forms/PeriodoForm';
import { getApiUrl } from '../../Config';

interface Periodo {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
}

function PeriodosPage() {
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPeriodo, setSelectedPeriodo] = useState<Periodo | undefined>(undefined);

  // Función para cargar datos de periodos desde la API
  const fetchPeriodos = async () => {
    try {
      const response = await axios.get(getApiUrl('api/periodos'));
      setPeriodos(response.data);
    } catch (error) {
      console.error('Error al cargar los periodos:', error);
    }
  };

  useEffect(() => {
    fetchPeriodos();
  }, []);

  const handleCreate = () => {
    setSelectedPeriodo(null);
    setIsModalOpen(true);
  };

  const handleEdit = (periodo: Periodo) => {
    setSelectedPeriodo(periodo);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: Periodo) => {
    try {
      if (data.id) {
        // Actualizar periodo existente
        await axios.put(getApiUrl(`api/periodos/${data.id}`), data);
      } else {
        // Crear nuevo periodo
        await axios.post(getApiUrl('api/periodos'), data);
      }
      setIsModalOpen(false);
      fetchPeriodos(); // Actualizar la lista de periodos
    } catch (error) {
      console.error('Error al guardar el periodo:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(getApiUrl(`api/periodos/${id}`));
      fetchPeriodos(); // Actualizar la lista de periodos
    } catch (error) {
      console.error('Error al eliminar el periodo:', error);
    }
  };

  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      {/* Menú lateral */}
      <Sidebar activeItem="Periodos" />

      <div className="flex-1 flex flex-col">
        {/* Barra superior */}
        <TopBar />

        {/* Encabezado de contenido */}
        <Header title="Periodos" />

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
                Lista de Periodos
              </h2>
              <div className="ml-auto">
                <button
                  title="Agregar nuevo periodo"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCreate}
                >
                  + Nuevo Periodo
                </button>
              </div>
            </header>

            {/* Contenido principal */}
            <PeriodosTable
              periodos={periodos}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </section>
        </main>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPeriodo ? 'Editar Periodo' : 'Nuevo Periodo'}
      >
        <PeriodoForm initialData={selectedPeriodo} onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}

export default PeriodosPage;
