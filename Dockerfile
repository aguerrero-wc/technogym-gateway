# Dockerfile
FROM node:22.16.0 AS base

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependencias
RUN npm ci --only=production

# Etapa de desarrollo
FROM node:22.16.0 AS dev

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig.json ./

# Instalar todas las dependencias (incluyendo devDependencies)
RUN npm ci

# Copiar código fuente
COPY . .

# Generar cliente Prisma
RUN npx prisma generate

EXPOSE 3000

# Comando para desarrollo
CMD ["npm", "run", "dev"]

# Etapa de construcción
FROM base AS builder

WORKDIR /app

# Instalar todas las dependencias para build
RUN npm ci

# Copiar código fuente
COPY . .

# Generar cliente Prisma
RUN npx prisma generate

# Compilar TypeScript
RUN npm run build

# Etapa de producción
FROM node:22.16.0-slim AS production

WORKDIR /app

# Crear usuario no-root
RUN groupadd --gid 1001 nodejs && \
    useradd --uid 1001 --gid nodejs --create-home nodejs

# Copiar dependencias de producción
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./

# Copiar código compilado y archivos necesarios
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma

# Cambiar propietario
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]