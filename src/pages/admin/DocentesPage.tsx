// src/pages/DocentesPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/SideBar';
import TopBar from '../../components/admin/TopBar';
import Header from '../../components/admin/Header';
import UsuariosTable from '../../components/admin/UsuariosTable';
import Modal from '../../components/modal';
import UsuarioForm from '../../components/forms/UsuarioForm';
import { getApiUrl } from '../../Config';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
}

function DocentesPage() {
  const [docentes, setDocentes] = useState<Usuario[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

  // Función para cargar datos de docentes desde la API
  const fetchDocentes = async () => {
    try {
      const response = await axios.get(getApiUrl('api/usuarios/docentes'));
      setDocentes(response.data);
    } catch (error) {
      console.error('Error al cargar los docentes:', error);
    }
  };

  useEffect(() => {
    fetchDocentes();
  }, []);

  const handleCreate = () => {
    setSelectedUsuario(null);
    setIsModalOpen(true);
  };

  const handleEdit = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: Usuario) => {
    try {
      if (data.id) {
        // Actualizar docente existente
        await axios.put(getApiUrl(`api/usuarios/${data.id}`), {
          ...data,
          rol_id: 2, // Docente
        });
      } else {
        // Crear nuevo docente
        await axios.post(getApiUrl('api/usuarios'), {
          ...data,
          rol_id: 2, // Docente
        });
      }
      setIsModalOpen(false);
      fetchDocentes(); // Actualizar la lista de docentes
    } catch (error) {
      console.error('Error al guardar el docente:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(getApiUrl(`api/usuarios/${id}`));
      fetchDocentes();
    } catch (error) {
      console.error('Error al eliminar el docente:', error);
    }
  };

  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      {/* Menú lateral */}
      <Sidebar activeItem="Docentes" />

      <div className="flex-1 flex flex-col">
        {/* Barra superior */}
        <TopBar />

        {/* Encabezado de contenido */}
        <Header title="Docentes" />

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
                Lista de Docentes
              </h2>
              <div className="ml-auto">
                <button
                  title="Agregar nuevo docente"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCreate}
                >
                  + Nuevo Docente
                </button>
              </div>
            </header>

            {/* Contenido principal */}
            <UsuariosTable
              usuarios={docentes}
              onEdit={handleEdit}
              onDelete={handleDelete}
              tipoUsuario="Docente"
            />
          </section>
        </main>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUsuario ? 'Editar Docente' : 'Nuevo Docente'}
      >
        <UsuarioForm
          initialData={selectedUsuario}
          onSubmit={handleSubmit}
          rol_id={2} // Docente
        />
      </Modal>
    </div>
  );
}

export default DocentesPage;
