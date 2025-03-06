# TEST_IDRD

Este proyecto es una aplicación web dividida en dos partes: un backend en NestJS y un frontend en Vue 3.

## Estructura del proyecto
```
TEST_IDRD
├── back_idrd    # Carpeta del backend
└── front_idrd   # Carpeta del frontend
```

## Prerrequisitos
- Node.js (versión 20 o superior)
- PostgreSQL instalado en la máquina

---

## Instalación del Backend

1. Clona el repositorio y navega a la carpeta del backend:
```bash
cd back_idrd
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura la base de datos PostgreSQL:
   - Crea una base de datos llamada `IDRD_TEST`.
   - Configura los campos de conexión en el archivo `back_idrd/src/app.module.ts`:

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'IDRD_TEST',
})
```
   Configura los campos de conexión en el archivo back_idrd/src/app.module.ts:

4. Inicia el servidor en modo desarrollo:
```bash
npm run start:dev
```

5. Luego de iniciar el backend, puedes insertar los departamentos y ciudades en la base de datos con la siguiente consulta SQL:

```sql
-- Insertar departamentos
INSERT INTO public.departamento (nombre) 
VALUES 
('Antioquia'),
('Bogotá'),
('Cundinamarca');

-- Insertar ciudades con su respectivo departamento
INSERT INTO public.ciudades (nombre, departamento_id) 
VALUES
('Medellin', 1), 
('Barbosa', 1), 
('Bello', 1), 
('Caldas', 1),
('Bogotá DC', 2),
('Chia', 3), 
('Cajicá', 3), 
('Cota', 3);
```

---

## Instalación del Frontend

1. Navega a la carpeta del frontend:
```bash
cd front_idrd
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

---

## Demo
A continuación puedes ver una demostración del proyecto en funcionamiento:

![Demo del Proyecto](src/assets/demo.gif)

---
