# Usa Ubuntu como imagen base
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Instala Node.js 20 y herramientas necesarias
RUN apt update && \
    apt upgrade -y && \
    apt install -y curl git imagemagick openssh-client ca-certificates && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt install -y nodejs && \
    npm install -g npm && \
    rm -rf /var/lib/apt/lists/*

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia todos los archivos de tu proyecto
COPY . .

# Instala dependencias (incluye cfonts) al iniciar
CMD npm install cfonts && npm install && node index.js 