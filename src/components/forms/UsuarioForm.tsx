// src/components/forms/UsuarioForm.tsx
import React, { useState } from 'react';

interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  password?: string;
  carrera?: string; // Campo adicional para estudiantes
}

interface UsuarioFormProps {
  initialData?: Usuario;
  onSubmit: (data: Usuario) => void;
  rol_id: number; // 2 para Docente, 3 para Estudiante
}

const UsuarioForm: React.FC<UsuarioFormProps> = ({
  initialData,
  onSubmit,
  rol_id,
}) => {
  const [nombre, setNombre] = useState(initialData?.nombre || '');
  const [apellido, setApellido] = useState(initialData?.apellido || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [password, setPassword] = useState('');
  const [carrera, setCarrera] = useState(initialData?.carrera || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validar y enviar los datos
    const data: Usuario = {
      id: initialData?.id,
      nombre,
      apellido,
      email,
      password: password || undefined,
      carrera: rol_id === 3 ? carrera : undefined, // Solo para estudiantes
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />
      </div>
      <div>
        <label>Apellido</label>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />
      </div>
      {!initialData && (
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2 mb-4"
          />
        </div>
      )}
      {rol_id === 3 && (
        <div>
          <label>Carrera</label>
          <input
            type="text"
            value={carrera}
            onChange={(e) => setCarrera(e.target.value)}
            className="w-full border rounded p-2 mb-4"
          />
        </div>
      )}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {initialData ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default UsuarioForm;
