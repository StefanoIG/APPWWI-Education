import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getApiUrl } from '../../Config';

function CalificarTareaPage() {
  const { id } = useParams(); // ID de la tarea
  const [entregas, setEntregas] = useState([]); // Lista de entregas
  const [notas, setNotas] = useState({}); // Estado para almacenar las notas
  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: getApiUrl(''),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchEntregas = async () => {
    try {
      const response = await axiosInstance.get(`/tarea/${id}/entregas`);
      setEntregas(response.data);
    } catch (error) {
      console.error('Error al obtener entregas:', error);
      Swal.fire('Error', 'No se pudieron cargar las entregas', 'error');
    }
  };

  useEffect(() => {
    fetchEntregas();
  }, [id]);

  const handleNotaChange = (estudianteId, nota) => {
    setNotas((prevNotas) => ({ ...prevNotas, [estudianteId]: nota }));
  };

  const handleGuardarNotas = async () => {
    try {
      const payload = Object.entries(notas).map(([estudianteId, nota]) => ({
        estudiante_id: estudianteId,
        nota: parseFloat(nota),
      }));

      await axiosInstance.post(`/entrega/calificar/${id}`, { calificaciones: payload });
      Swal.fire('Éxito', 'Las notas fueron guardadas exitosamente', 'success');
    } catch (error) {
      console.error('Error al guardar las calificaciones:', error);
      Swal.fire('Error', 'No se pudieron guardar las notas', 'error');
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="flex justify-center bg-gray-100 min-h-screen p-6">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
            Calificar Entregas
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Estudiante</th>
                  <th className="border border-gray-300 px-4 py-2">Archivo</th>
                  <th className="border border-gray-300 px-4 py-2">Nota</th>
                </tr>
              </thead>
              <tbody>
                {entregas.length > 0 ? (
                  entregas.map((entrega) => (
                    <tr key={entrega.estudiante_id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {entrega.estudiante_nombre || 'Sin nombre'}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {entrega.archivo ? (
                          <a
                            href={entrega.archivo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            Ver Archivo
                          </a>
                        ) : (
                          <span className="text-red-500">No ha subido tarea</span>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          step="0.5"
                          value={notas[entrega.estudiante_id] || ''}
                          onChange={(e) =>
                            handleNotaChange(entrega.estudiante_id, e.target.value)
                          }
                          className="border rounded px-2 py-1 w-20 text-center"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      No hay entregas disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleGuardarNotas}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded focus:outline-none"
            >
              Guardar Notas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalificarTareaPage;
