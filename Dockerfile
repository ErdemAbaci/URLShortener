# 1. Temel image olarak Node 22 kullanıyoruz
FROM node:22-alpine

# 2. Çalışma dizinini oluştur
WORKDIR /app

# 3. package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Tüm proje dosyalarını kopyala
COPY . .

# 6. TypeScript'i build et
RUN npm run build

# 7. Uygulamanın çalışacağı portu belirt
EXPOSE 5000

# 8. Container başladığında çalışacak komut
CMD ["node", "dist/index.js"]
