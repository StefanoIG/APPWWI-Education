// src/components/forms/AsignacionForm.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the Asignacion interface
interface Asignacion {
  id: number;
  materiaId: string;
  docenteId: string;
  estudianteId: string;
  fechaAsignacion: string;
}

// Define the Materia interface
interface Materia {
  id: string;
  nombre: string;
}

// Define the Docente interface
interface Docente {
  id: string;
  nombre: string;
}

// Define the Estudiante interface
interface Estudiante {
  id: string;
  nombre: string;
  apellido: string;
}

interface AsignacionFormProps {
  initialData?: Asignacion;
  onSubmit: (data: Asignacion) => void;
}

const AsignacionForm: React.FC<AsignacionFormProps> = ({ initialData, onSubmit }) => {
  const [materiaId, setMateriaId] = useState(initialData?.materiaId || '');
  const [docenteId, setDocenteId] = useState(initialData?.docenteId || '');
  const [estudianteId, setEstudianteId] = useState(initialData?.estudianteId || '');
  const [fechaAsignacion, setFechaAsignacion] = useState(
    initialData?.fechaAsignacion || ''
  );

  const [materias, setMaterias] = useState<Materia[]>([]);
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  useEffect(() => {
    // Fetch de materias
    axios.get('http://tu-api.com/api/materias').then((response) => {
      setMaterias(response.data);
    });
    // Fetch de docentes
    axios.get('http://tu-api.com/api/docentes').then((response) => {
      setDocentes(response.data);
    });
    // Fetch de estudiantes
    axios.get('http://tu-api.com/api/estudiantes').then((response) => {
      setEstudiantes(response.data);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validar y enviar los datos
    const data: Asignacion = {
      id: initialData?.id || 0,
      materiaId,
      docenteId,
      estudianteId,
      fechaAsignacion,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Materia</label>
        <select
          value={materiaId}
          onChange={(e) => setMateriaId(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        >
          <option value="">Seleccione una materia</option>
          {materias.map((materia) => (
            <option key={materia.id} value={materia.id}>
              {materia.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Docente</label>
        <select
          value={docenteId}
          onChange={(e) => setDocenteId(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        >
          <option value="">Seleccione un docente</option>
          {docentes.map((docente) => (
            <option key={docente.id} value={docente.id}>
              {docente.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Estudiante</label>
        <select
          value={estudianteId}
          onChange={(e) => setEstudianteId(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        >
          <option value="">Seleccione un estudiante</option>
          {estudiantes.map((estudiante) => (
            <option key={estudiante.id} value={estudiante.id}>
              {estudiante.nombre} {estudiante.apellido}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Fecha de Asignación</label>
        <input
          type="date"
          value={fechaAsignacion}
          onChange={(e) => setFechaAsignacion(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {initialData ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default AsignacionForm;
