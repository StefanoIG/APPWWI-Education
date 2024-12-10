import React, { useState } from 'react';
import Sidebar from '../../components/admin/SideBar';
import TopBar from '../../components/admin/TopBar';
import Header from '../../components/admin/Header';

function DetalleTareaPage() {
  // Datos de la tarea
  const tarea = {
    id: 1,
    titulo: 'Proyecto: Análisis de patrones de datos',
    descripcion:
      'Desarrollar un análisis de un conjunto de datos utilizando herramientas de minería de datos. Implementar técnicas de aprendizaje supervisado y no supervisado.',
    fechaEntrega: '2024-12-20',
  };

  // Estado para datos de entrega del estudiante
  const [entrega, setEntrega] = useState({
    estudiante_id: 123,
    comentarios:
      'Este es mi análisis de los datos proporcionados. He utilizado K-means y regresión lineal para la clasificación y predicción.',
    archivo: '', // Inicialmente vacío si no hay archivo subido
  });

  // Estado para gestionar el archivo subido temporalmente
  const [archivoSubido, setArchivoSubido] = useState<File | null>(null);

  // Manejar el evento de subida del archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArchivoSubido(e.target.files[0]);
    }
  };

  // Manejar el envío del archivo
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (archivoSubido) {
      // Simulamos la subida del archivo al servidor
      setEntrega((prevEntrega) => ({
        ...prevEntrega,
        archivo: archivoSubido.name, // Guardamos el nombre del archivo subido
      }));
      setArchivoSubido(null); // Reseteamos el archivo temporal
      alert('Archivo subido exitosamente');
    } else {
      alert('Por favor selecciona un archivo');
    }
  };

  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white">
      {/* Menú lateral */}
      <Sidebar activeItem={'Tareas'} />

      <div className="flex-1 flex flex-col">
        {/* Barra superior */}

        {/* Encabezado de contenido */}
        <Header title="Detalle de Tarea" />

        {/* Contenido principal */}
        <main className="flex-grow flex flex-col min-h-0 border-t">
          <section aria-label="main content" className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Detalles de la Tarea</h2>

            {/* Datos de la tarea */}
            <div className="border rounded-lg p-6 bg-gray-100 shadow-md mb-6">
              <h3 className="text-lg font-bold mb-2">{tarea.titulo}</h3>
              <p className="text-sm text-gray-600 mb-2">{tarea.descripcion}</p>
              <p className="text-sm">
                <strong>Fecha de Entrega: </strong>
                {tarea.fechaEntrega}
              </p>
            </div>

            {/* Datos de entrega */}
            <div className="border rounded-lg p-6 bg-gray-100 shadow-md">
              <h3 className="text-lg font-bold mb-4">Datos de Entrega</h3>

              <div className="mb-4">
                <strong>Comentarios del Estudiante:</strong>
                <p className="text-sm mt-2">{entrega.comentarios}</p>
              </div>

              <div className="mb-4">
                <strong>Archivo Entregado:</strong>
                {entrega.archivo ? (
                  <p className="text-sm mt-2">
                    <a
                      href={`#`} // Link para descargar el archivo (puedes actualizar con una URL real)
                      className="text-blue-500 hover:underline"
                    >
                      {entrega.archivo}
                    </a>
                  </p>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-2">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="border rounded px-3 py-2 text-sm"
                      accept=".zip,.pdf,.doc,.docx,.xls,.xlsx"
                    />
                    <button
                      type="submit"
                      className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      Subir Archivo
                    </button>
                  </form>
                )}
              </div>

              <div className="mb-4">
                <strong>ID del Estudiante:</strong>
                <p className="text-sm mt-2">{entrega.estudiante_id}</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default DetalleTareaPage;
