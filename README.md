# Finder App

**Finder** ist eine App, die Menschen hilft, verlorene Gegenstände schnell und einfach wiederzufinden und Finder für ihre Ehrlichkeit zu belohnen. Sie bietet eine intuitive Benutzeroberfläche und eine sichere Plattform zur Verwaltung von verlorenen und gefundenen Gegenständen.

## Features

- **Benutzerregistrierung und -anmeldung**: Sichere Authentifizierung für Nutzer.
- **Token-Authentifizierung**: Zugang zu geschützten Seiten nur mit gültigem Token.
- **Gegenstandserfassung**: Nutzer können verlorene oder gefundene Gegenstände melden.
- **Suchfilter**: Filter nach Datum, Standort und Art des Gegenstands.
- **Belohnungssystem**: Finder erhalten Finderlohn.
- **Benachrichtigungen**: Nutzer werden benachrichtigt, wenn ihre Gegenstände gefunden wurden.
- **Profilverwaltung**: Nutzer können ihre Kontoinformationen verwalten.

## Technologien

- **Frontend**: 
  - React Native
  - Tailwind CSS
- **Backend**:
  - Express.js
- **Datenbank**:
  - MongoDB Atlas

## Verzeichnisstruktur

finder-app/
│
├── src/
│   ├── components/
│   ├── assets/
│   ├── screens/
│   └── navigation/
├── finder-backend/
│   ├── models/
│   ├── routes/
│   └── controllers/
├── .env
└── README.md

## Setup

### Voraussetzungen

- Node.js und npm installiert
- MongoDB Atlas Cluster eingerichtet

### Lokales Setup

1. Klone das Repository:

   ```bash
   git clone https://github.com/MarioB06/finder-App.git
   cd finder-app
   
2. Installiere die Abhängigkeiten für das Frontend:

   ```bash
   cd finder-app
   npm install


3. Installiere die Abhängigkeiten für das Backend:

   ```bash
    cd finder-backend
    npm install


4. Erstelle eine .env-Datei und füge die Umgebungsvariablen hinzu:

   ```bash
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>


5. Starte den Server und die App:

   ```bash
    node index.js
    expo start


6. Öffne die App mit dem Expo-Client auf deinem iOS- oder Android-Gerät.