FROM oven/bun:1

WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lockb* ./
RUN bun install

# Copy application code
COPY . .

# Expose Next.js port
EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0

# Override entrypoint to fix tini issue
ENTRYPOINT []

CMD ["bun", "next", "dev"]
