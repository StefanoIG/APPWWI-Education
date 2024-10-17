// src/pages/MateriasPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/SideBar';
import TopBar from '../../components/admin/TopBar';
import Header from '../../components/admin/Header';
import MateriasTable from '../../components/admin/MateriasTable';
import Modal from '../../components/modal';
import MateriaForm from '../../components/forms/MateriaForm';

interface Materia {
  id: number;
  nombre: string;
  nivel: string;
  descripcion: string;
}

function MateriasPage() {
  const [materias, setMaterias] = useState<Materia[]>([]);

  // Función para cargar datos de materias desde la API
  const fetchMaterias = async () => {
    try {
      const response = await axios.get('http://tu-api.com/api/materias');
      setMaterias(response.data);
    } catch (error) {
      console.error('Error al cargar las materias:', error);
    }
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMateria, setSelectedMateria] = useState<Materia | null>(null);

  const handleCreate = () => {
    setSelectedMateria(null);
    setIsModalOpen(true);
  };

  const handleEdit = (materia: Materia) => {
    setSelectedMateria(materia);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: Materia) => {
    try {
      if (data.id) {
        // Actualizar materia existente
        await axios.put(`http://tu-api.com/api/materias/${data.id}`, data);
      } else {
        // Crear nueva materia
        await axios.post('http://tu-api.com/api/materias', data);
      }
      setIsModalOpen(false);
      fetchMaterias(); // Actualizar la lista de materias
    } catch (error) {
      console.error('Error al guardar la materia:', error);
    }
  };


  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      {/* Menú lateral */}
      <Sidebar activeItem="Materias" />

      <div className="flex-1 flex flex-col">
        {/* Barra superior */}
        <TopBar />

        {/* Encabezado de contenido */}
        <Header title="Materias" />

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
                Lista de Materias
              </h2>
              <div className="ml-auto">
                <button
                  title="Agregar nueva materia"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCreate}
                >
                  + Nueva Materia
                </button>
              </div>
            </header>

            {/* Contenido principal */}
            <MateriasTable materias={materias} onEdit={handleEdit} />
          </section>
        </main>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedMateria ? 'Editar Materia' : 'Nueva Materia'}
      >
        <MateriaForm initialData={selectedMateria} onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}

export default MateriasPage;
