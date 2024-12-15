import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getApiUrl } from '../../Config';

function DetalleTareaPage() {
  const { id } = useParams();
  const [tarea, setTarea] = useState(null);
  const [entrega, setEntrega] = useState({ comentarios: '', archivo: null });
  const [rol] = useState(localStorage.getItem('rol'));
  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: getApiUrl(''),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    fetchTarea();
  }, [id]);

  const fetchTarea = async () => {
    try {
      const response = await axiosInstance.get(`/tareas/detalle/${id}`);
      setTarea(response.data);
    } catch (error) {
      console.error('Error al obtener la tarea:', error);
    }
  };

  const handleFileChange = (e) => {
    setEntrega({ ...entrega, archivo: e.target.files[0] });
  };

  const handleSubmitEntrega = async () => {
    const formData = new FormData();
    formData.append('comentarios', entrega.comentarios);
    if (entrega.archivo) formData.append('archivo', entrega.archivo);

    try {
      await axiosInstance.post(`/tareas/entregar/${id}`, formData);
      Swal.fire('Éxito', 'Entrega realizada con éxito', 'success');
    } catch (error) {
      Swal.fire('Error', 'No se pudo entregar la tarea', 'error');
    }
  };

  const handleEdit = () => {
    Swal.fire({
      title: 'Editar Tarea',
      html: `
        <label class="block mb-2 text-gray-600">Título</label>
        <input id="titulo" class="swal2-input mb-3" value="${tarea.titulo || ''}" />
      
        <label class="block mb-2 text-gray-600">Descripción</label>
        <textarea id="descripcion" class="swal2-textarea mb-3">${tarea.descripcion || ''}</textarea>
      
        <label class="block mb-2 text-gray-600">Fecha de Entrega</label>
        <input type="date" id="fecha_entrega" class="swal2-input mb-3" value="${tarea.fecha_entrega || ''}" />
        
        <label class="hidden">Curso ID</label>
        <input id="curso_id" class="hidden" value="${tarea.curso_id || ''}" />
        
        <label class="block mb-2 text-gray-600">Subir Archivo</label>
        <input type="file" id="archivo" class="swal2-input" />
      `,
      confirmButtonText: 'Guardar Cambios',
      showCancelButton: true,
      preConfirm: () => {
        // Accede a los elementos correctamente usando Swal.getPopup()
        const popup = Swal.getPopup();
        const titulo = (popup.querySelector('#titulo') as HTMLInputElement)?.value.trim();
        const descripcion = (popup.querySelector('#descripcion') as HTMLTextAreaElement)?.value.trim();
        const fecha_entrega = (popup.querySelector('#fecha_entrega') as HTMLInputElement)?.value;
        const curso_id = (popup.querySelector('#curso_id') as HTMLInputElement)?.value.trim();
        const archivo = (popup.querySelector('#archivo') as HTMLInputElement)?.files?.[0];

        // Validación
        if (!titulo || !descripcion || !fecha_entrega || !curso_id) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return false;
        }

        return { titulo, descripcion, fecha_entrega, curso_id, archivo };
      },
    }).then(async (result) => {
      if (result.isConfirmed && result.value) {
        const { titulo, descripcion, fecha_entrega, curso_id, archivo } = result.value;

        // Crear un nuevo FormData
        const formDataTest = new FormData();
        formDataTest.append('titulo', titulo);
        formDataTest.append('descripcion', descripcion);
        formDataTest.append('fecha_entrega', fecha_entrega);
        formDataTest.append('curso_id', curso_id);

        if (archivo) {
          formDataTest.append('archivo', archivo);
        }

        // Verificar lo que contiene el FormData
        for (let pair of formDataTest.entries()) {
          console.log(pair[0] + ':', pair[1]);
        }

        try {
          await axiosInstance.put(`/tareas/${tarea.id}`, formDataTest);
          Swal.fire('Actualizado', 'La tarea ha sido editada', 'success');
          fetchTarea();
        } catch (error) {
          console.error('Error en PUT:', error);
          Swal.fire('Error', 'No se pudo editar la tarea', 'error');
        }
      }
    });
  };




  if (!tarea) {
    return <div className="text-center mt-10 text-lg">Cargando...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center bg-gray-100 min-h-screen p-6">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
            {rol === 'profesor' ? 'Gestionar Tarea' : 'Detalles de la Tarea'}
          </h2>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-blue-700 mb-2">
              {tarea.titulo}
            </h3>
            <p className="text-gray-700 mb-4">{tarea.descripcion}</p>
            <p className="text-gray-600">
              <strong>Fecha de Entrega: </strong>
              {new Date(tarea.fecha_entrega).toLocaleDateString() || 'Sin definir'}
            </p>
          </div>

          {rol === 'profesor' ? (
            <button
              onClick={handleEdit}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
            >
              Editar Tarea
            </button>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
              <h3 className="text-lg font-semibold mb-4">Entrega de Tarea</h3>
              <textarea
                value={entrega.comentarios}
                onChange={(e) =>
                  setEntrega({ ...entrega, comentarios: e.target.value })
                }
                className="w-full h-24 border rounded-lg px-3 py-2 mb-4"
                placeholder="Comentarios de entrega..."
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 border rounded-lg px-3 py-2 mb-4"
                accept=".pdf,.docx,.txt"
              />
              <button
                onClick={handleSubmitEntrega}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Subir Tarea
              </button>
            </div>
          )}
        </div>
      </div>
    </div>


  );
}

export default DetalleTareaPage;
