import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/admin/SideBar';
import TopBar from '../../components/admin/TopBar';
import Header from '../../components/admin/Header';
import { getApiUrl } from '../../Config';

function DetalleTareaPage() {
  const { id } = useParams();  // Obtiene la ID de la tarea desde la URL
  const [tarea, setTarea] = useState(null);
  const [entrega, setEntrega] = useState({
    comentarios: '',
    archivo: null,  // Estado para el archivo subido
  });
  const [rol, setRol] = useState(localStorage.getItem('rol'));
  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: getApiUrl(''),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchTarea = async () => {
      try {
        const response = await axiosInstance.get(`/tareas/detalle/${id}`);
        setTarea(response.data);
      } catch (error) {
        console.error('Error al obtener la tarea:', error);
      }
    };

    fetchTarea();
  }, [id]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEntrega({ ...entrega, archivo: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!entrega.archivo) {
      alert('Por favor selecciona un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('tarea_id', id);
    formData.append('estudiante_id', localStorage.getItem('estudianteId')); // Asumimos que tienes el ID del estudiante almacenado
    formData.append('comentarios', entrega.comentarios);
    formData.append('archivo', entrega.archivo);

    try {
      await axiosInstance.post('/entregas', formData);
      alert('Entrega subida exitosamente');
    } catch (error) {
      console.error('Error al subir la entrega:', error);
      alert('Error al subir la entrega');
    }
  };

  if (!tarea) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      <Sidebar activeItem={'Tareas'} />
      <div className="flex-1 flex flex-col">
        <Header title="Detalle de Tarea" />
        <main className="flex-grow flex flex-col min-h-0 border-t">
          <section aria-label="main content" className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Detalles de la Tarea</h2>
            <div className="border rounded-lg p-6 bg-gray-100 shadow-md mb-6">
              <h3 className="text-lg font-bold mb-2">{tarea.titulo}</h3>
              <p className="text-sm text-gray-600 mb-2">{tarea.descripcion}</p>
              <p className="text-sm"><strong>Fecha de Entrega: </strong>{tarea.fechaEntrega}</p>
            </div>

            <div className="border rounded-lg p-6 bg-gray-100 shadow-md">
              <h3 className="text-lg font-bold mb-4">Datos de Entrega</h3>

              <div className="mb-4">
                <strong>Comentarios del Estudiante:</strong>
                <textarea
                  value={entrega.comentarios}
                  onChange={(e) => setEntrega({ ...entrega, comentarios: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>

              <div className="mb-4">
                <strong>Archivo Entregado:</strong>
                {entrega.archivo ? (
                  <p className="text-sm mt-2">{entrega.archivo.name}</p>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-2">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="border rounded px-3 py-2 text-sm"
                      accept=".pdf,.docx,.txt"
                    />
                    <button
                      type="submit"
                      className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      Subir Tarea
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default DetalleTareaPage;
