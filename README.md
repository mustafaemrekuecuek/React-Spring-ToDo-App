# Meine Erste React ToDo-App

Dieses Projekt repräsentiert meine ersten Schritte in der Welt der React-Entwicklung. Es handelt sich um eine einfache ToDo-App, die grundlegende Konzepte wie Komponenten, Zustandsmanagement, und Kommunikation mit einem Backend (Spring Boot) demonstriert.

## Funktionen

- Anzeigen von ToDo-Elementen
- Hinzufügen neuer ToDos
- Markieren von ToDos als erledigt
- Filtern von ToDos basierend auf ihrem Status (alle, erledigt, offen)
- Dynamische Anpassung der Ansicht basierend auf dem ausgewählten Datum

## Technologien

- React (Frontend)
- Spring Boot (Backend)
- PostgreSQL (Datenbank)
- React Router (für die Navigation)

## Datenbank Einrichtung

Um diese Anwendung auszuführen, benötigen Sie eine PostgreSQL-Datenbank. Befolgen Sie diese Schritte, um Ihre Datenbank einzurichten:

1. **Installieren Sie PostgreSQL**: Falls Sie PostgreSQL noch nicht installiert haben, laden Sie es von [der offiziellen PostgreSQL-Website](https://www.postgresql.org/download/) herunter und folgen Sie den Installationsanweisungen.

2. **Erstellen Sie eine neue Datenbank**: Nach der Installation öffnen Sie die PostgreSQL-Kommandozeile und erstellen Sie eine neue Datenbank. Ersetzen Sie `your_database_name` mit dem gewünschten Namen für Ihre Datenbank:

    ```sql
    CREATE DATABASE your_database_name;
    ```

3. **Konfigurieren Sie Ihre Anwendung**: Stellen Sie sicher, dass Ihre Spring Boot-Anwendung richtig konfiguriert ist, um die neu erstellte Datenbank zu verwenden. Dies beinhaltet die Aktualisierung der `application.properties` oder `application.yml` Datei im Spring Boot-Projekt mit den entsprechenden Datenbankverbindungsdetails:

    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/your_database_name
    spring.datasource.username=your_database_username
    spring.datasource.password=your_database_password
    ```

    Ersetzen Sie `your_database_name`, `your_database_username` und `your_database_password` mit Ihren eigenen Werten.

4. **Starten Sie die Anwendung**: Nachdem die Datenbank konfiguriert und die Anwendung entsprechend eingestellt ist, können Sie Ihre Anwendung starten.

## Lokale Einrichtung

Um dieses Projekt lokal auszuführen, folgen Sie diesen Schritten:

1. **Klonen Sie das Repository:**

   ```bash
   git clone https://github.com/mustafaemrekuecuek/React-Spring-ToDoApp.git
   cd Frontend
2. **Installieren Sie die Abhängigkeiten:**
   Im Root-Verzeichnis und im Frontend-Verzeichnis des Projekts:
   ```bash
   npm install
4. **Starten sie das Projekt**
   ```bash
   npm start
   
Das Projekt wird nun auf http://localhost:3000 ausgeführt.

## Weiterentwicklung
Dies ist mein erstes React-Projekt. Zukünftige Updates könnten zusätzliche Features oder Verbesserungen der Benutzeroberfläche umfassen.
