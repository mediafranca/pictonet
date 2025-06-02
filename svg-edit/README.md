# PictoNet - Generador Visual de Pictogramas AAC

PictoNet es un generador visual para comunicación aumentativa y alternativa (AAC), diseñado para crear pictogramas SVG personalizables con una interfaz intuitiva y amigable.

## 🎯 Características Principales

### Editor SVG Avanzado
- **Editor de vértices nodo por nodo**: Edita el parámetro "d" de elementos path con control total sobre coordenadas
- **Sistema de herencia de estilos CSS**: Los grupos heredan estilos a elementos hijos automáticamente
- **Highlighting visual**: Elementos seleccionados se resaltan con borde azul claro
- **Zoom dinámico**: Rango de 10% a 500% con botón de reset
- **Interfaz de 4 pestañas**: Source (código), Tree (DOM), Element (propiedades), Vértices

### Sistema de Instancias
- **Navegación por instancias**: Cada ubicación (ej: `pictos.net/maori`) tiene su propia base de datos
- **Pictogramas por instancia**: Cada instancia almacena sus propios pictogramas y estilos
- **Diccionario multiidioma**: Traducciones específicas por instancia
- **Estilos CSS personalizados**: Gestión de clases CSS por instancia

### Funcionalidades Técnicas
- **Reactivity en tiempo real**: Los cambios se reflejan inmediatamente en la vista
- **Base de datos PostgreSQL**: Persistencia completa con esquema por instancias
- **Gestión de cambios**: Indicador de cambios sin guardar con opción de persistencia
- **Exportación SVG**: Descarga directa de pictogramas generados

## 🏗️ Arquitectura Técnica

### Frontend
- **React 18** con TypeScript
- **Tailwind CSS** para estilos
- **Shadcn/ui** para componentes
- **TanStack Query** para gestión de estado servidor
- **Wouter** para routing

### Backend
- **Express.js** con TypeScript
- **Drizzle ORM** para base de datos
- **PostgreSQL** como base de datos principal
- **Zod** para validación de schemas

### Base de Datos
```sql
-- Instancias (ej: maori, english, spanish)
instances (id, slug, name, description)

-- Pictogramas por instancia
pictograms (id, instance_id, name, svg_code, structure, prompt, tags)

-- Estilos CSS por instancia
css_styles (id, instance_id, class_name, styles)

-- Diccionario por instancia
dictionary (id, instance_id, word, translation, pictogram_id)
```

## 🚀 Instalación y Despliegue Local

### Prerrequisitos
- **Node.js 18+**
- **PostgreSQL 12+**
- **npm** o **yarn**

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd pictonet
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Base de Datos

#### Opción A: PostgreSQL Local
```bash
# Instalar PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Crear base de datos
sudo -u postgres createdb pictonet

# Crear usuario
sudo -u postgres psql
CREATE USER pictonet_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE pictonet TO pictonet_user;
\q
```

#### Opción B: PostgreSQL en Docker
```bash
docker run --name pictonet-postgres \
  -e POSTGRES_DB=pictonet \
  -e POSTGRES_USER=pictonet_user \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres:15
```

### 4. Variables de Entorno
Crear archivo `.env` en la raíz:
```env
DATABASE_URL=postgresql://pictonet_user:your_password@localhost:5432/pictonet
PGHOST=localhost
PGPORT=5432
PGUSER=pictonet_user
PGPASSWORD=your_password
PGDATABASE=pictonet
NODE_ENV=development
```

### 5. Ejecutar Migraciones
```bash
npm run db:push
```

### 6. Iniciar Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5000`

## 📱 Uso de la Aplicación

### Editor Principal
1. **Panel Izquierdo** (4 pestañas):
   - **Source**: Código SVG editable
   - **Tree**: Navegación jerárquica del DOM
   - **Element**: Propiedades del elemento seleccionado
   - **Vértices**: Editor nodo por nodo para paths

2. **Panel Derecho**: Vista previa SVG con:
   - Zoom dinámico (10% - 500%)
   - Información de dimensiones
   - Controles de exportación

### Editor de Vértices
- Selecciona un elemento `path` en el árbol DOM
- Ve a la pestaña "Vértices"
- Edita coordenadas X,Y de cada nodo
- Cambia tipos de comando (M, L, C, Q, S, T, A, Z)
- Gestiona puntos de control para curvas Bezier
- Agrega/elimina vértices dinámicamente

### Gestión de Estilos
- Los grupos (elementos `g`) pueden tener clases CSS
- Los elementos hijos heredan automáticamente los estilos
- Edita estilos en tiempo real desde el panel Element
- Los cambios se reflejan inmediatamente en la vista

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev                 # Inicia servidor desarrollo

# Base de datos
npm run db:push            # Aplica cambios schema a BD
npm run db:studio          # Abre Drizzle Studio (GUI)

# Construcción
npm run build              # Construye para producción
npm run start              # Inicia servidor producción

# Utilidades
npm run lint               # Ejecuta linter
npm run type-check         # Verifica tipos TypeScript
```

## 🏢 Despliegue en Producción

### Variables de Entorno Producción
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/database
```

### Build y Deploy
```bash
# Construir aplicación
npm run build

# Ejecutar migraciones en producción
npm run db:push

# Iniciar servidor
npm start
```

### Docker (Opcional)
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000
CMD ["npm", "start"]
```

## 🔒 Configuración de Seguridad

### Base de Datos
- Usar conexiones SSL en producción
- Configurar permisos de usuario restrictivos
- Backup regular de datos

### Aplicación
- Configurar CORS apropiado
- Usar HTTPS en producción
- Validar todas las entradas de usuario

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Para soporte técnico o preguntas:
- Abre un issue en el repositorio
- Consulta la documentación técnica
- Revisa los logs de la aplicación

## 🔄 Roadmap

### Próximas Funcionalidades
- [ ] Integración con APIs de IA para generación automática
- [ ] Sistema de feedback RLHF con rating facial
- [ ] Editor visual de drag & drop
- [ ] Exportación a múltiples formatos (PNG, PDF)
- [ ] Colaboración en tiempo real
- [ ] Templates predefinidos por categorías