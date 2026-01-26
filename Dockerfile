# ---------- BUILD ----------
  FROM node:20-alpine AS builder

  WORKDIR /app
  
  # Activer corepack pour utiliser pnpm
  RUN corepack enable
  
  # Copier uniquement les fichiers nécessaires pour l'installation
  COPY package.json pnpm-lock.yaml ./
  
  # Install des deps avec pnpm (lockfile strict)
  RUN pnpm install --frozen-lockfile
  
  # Copier le reste du code
  COPY . .
  
  # Build Next.js
  RUN pnpm build
  
  # ---------- RUN ----------
  FROM node:20-alpine AS runner
  
  WORKDIR /app
  ENV NODE_ENV=production
  
  # Activer corepack dans le conteneur de run aussi
  RUN corepack enable
  
  # Copier ce qui est nécessaire pour faire tourner l'app
  COPY --from=builder /app/package.json ./
  COPY --from=builder /app/pnpm-lock.yaml ./
  COPY --from=builder /app/.next ./.next
  COPY --from=builder /app/public ./public
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/next.config.* ./
  
  EXPOSE 3000
  
  # Démarrage en prod (doit exister dans tes scripts)
  CMD ["pnpm", "start"]
  