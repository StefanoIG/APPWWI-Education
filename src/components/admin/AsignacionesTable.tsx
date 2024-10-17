// src/components/admin/AsignacionesTable.tsx
import React from 'react';

interface Asignacion {
  id: number;
  materia: string;
  docente: string;
  estudiante: string;
  fechaAsignacion: string;
}

interface AsignacionesTableProps {
  asignaciones: Asignacion[];
}

const AsignacionesTable: React.FC<AsignacionesTableProps> = ({ asignaciones }) => {
  const handleEdit = (id: number) => {
    // Lógica para editar la asignación con el ID proporcionado
    console.log(`Editar asignación con ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Lógica para eliminar la asignación con el ID proporcionado
    console.log(`Eliminar asignación con ID: ${id}`);
  };

  return (
    <div className="flex-1 overflow-auto px-4 py-4 bg-gray-100">
      {/* Tabla de asignaciones */}
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Materia
            </th>
            <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Docente
            </th>
            <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estudiante
            </th>
            <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha de Asignación
            </th>
            <th className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {asignaciones.map((asignacion) => (
            <tr key={asignacion.id}>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {asignacion.id}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {asignacion.materia}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {asignacion.docente}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {asignacion.estudiante}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {asignacion.fechaAsignacion}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                <button
                  className="text-blue-600 hover:text-blue-900"
                  onClick={() => handleEdit(asignacion.id)}
                >
                  Editar
                </button>
                <button
                  className="text-red-600 hover:text-red-900 ml-4"
                  onClick={() => handleDelete(asignacion.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AsignacionesTable;
