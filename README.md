## Kuis - Dein Bilderrätsel
###### *CS2018 Entwicklung mobiler Applikationen - Sommersemester 2020*



> Teste dein Wissen! - Messe deinen Fortschritt! - Erreiche Abzeichen!



![Kuis](https://firebasestorage.googleapis.com/v0/b/pictures-app-68662.appspot.com/o/logo%2Fkuis.png?alt=media&token=f5871f7c-6370-4e2a-8378-4d8a6a7d0b55)



## Gruppenmitglieder
* Julian Hermanspahn
* Tim Hoffmann
* Lewe Lorenzen
* Mario Mollame



## Inhalt
* [Einleitung](#einleitung)
* [Featureliste](#featureliste)
* [Softwareentwicklungsprozess](#softwareentwicklungsprozess)
* [Systemarchitektur](#systemarchitektur)
* [Softwarearchitektur](#softwarearchitektur)
* [Dokumentation](#client-dokumentation)
* [Technologie-Stack](#technologie-stack)
* [Installationsanleitung](#installationsanleitung)
* [Android Emulation](#android-emulation)
* [Ordnerstruktur](#ordnerstruktur)
* [Fazit](#fazit)



## Einleitung
Die Kuis-App bietet dem Nutzer die Möglichkeit, sein Allgemeinwissen mithilfe von Rätseln diverser Kategorien zu verbessern.
Abzeichen können im Laufe der Zeit gesammelt und Statistiken verbessert werden; diese steigern die Motivation und bieten einen langfristigen Spielspaß.

Hierzu werden die zu erreichbaren Abzeichen, sowie Module und Nutzerinformationen in einem Backend gespeichert.
Ein Modul besteht aus einer unterschiedlichen Anzahl an Rätseln einer spezifischen Kategorie. 
Eine Frage dieses Moduls enthält ein Bild, eine Frage und vier möglichen Antworten, von denen aber nur eine Antwort richtig ist.
Die Module können von einem Nutzer aus dem Backend importiert und hinzugefügt werden.
Um diese Module lernen zu können hat man die Wahl zwischen einem Freien- und einem Lernmodus.
Anschließend können diese Module wieder von dem Nutzer entfernt werden, sollte er diese Kategorie nicht mehr lernen wollen.
Dabei gehen alle Fortschritte dieses Moduls verloren.

Zusätzlich hat der Nutzer die Möglichkeit eine Hilfeansicht zu öffnen in denen die wichtigsten Vorgänge beschrieben sind.
Der Nutzer registriert sich um seine persönlichen Einstellungen und Fortschritte festzuhalten zu können, sowie einen personalisierten Bereich mit seinen Daten einsehen zu können.
Hierfür hat man zusätzlich die Möglichkeit, sein bereits bestehendes Google-konto zu verwenden.
Ein Nutzer kann sich jederzeit von jedem beliebigen Gerät mit Internetanbindung einloggen.
Abgerundet wird die Kuis-App mit einem Impressum, Informationen zu dem Datenschutz und den Nutzungsbedingungen.



## Featureliste
- Authentifikation
    - Ein Nutzer kann sich manuell oder mit einem Google-Account registrieren und anmelden. Hierbei wird eine Bestätigungsmail an die verwendete E-Mail versendet.
     Wird diese bestätigt, kann er in seinem personaliesierten Bereich sein Nutzernamen ändern. Zusätzlich hat er die Möglichkeit sein Passwort zurückzusetzen.
- Landing
    - Die App begrüßt den Nutzer auf der Landingpage. Dort finden sich ein Onboarding-Screen, mit einer
    Übersicht der Features, sowie Weiterleitungen zur Authentifizierung und zur Hilfe.
- Startseite
    - Auf der Startseite erhält der Nutzer eine übersichtliche Darstellung aller zur Verfügung stehenden Seiten, sowie die Möglichkeit das Impressum zu erreichen oder sich auszuloggen.
- Lernmodus
    - Der Lernmodus enthält zehn zufällige Fragen, die sich aus den heruntergeladenen Quiz-Modulen zusammensetzen.
    Sobald eine Frage sechs Mal in Folge richtig beantwortet wurde, wird sie nicht mehr im Lernmodus angezeigt und gilt somit als gelernt.
- Modulübersicht
    - Die Modulübersicht enthält alle vom Nutzer heruntergeladenen Quiz-Module. Die Module können dort importiert und
    auch wieder gelöscht werden. Diese können unterschiedlich sortiert oder gefiltert werden. Zusätzlich können diese mit einer Suchleiste gesucht werden.
- Statistik
    - Auf der Statistikseite werden alle absolvierten Lernrunden, sowie frei ausgewählten Module der Modulübersicht ausgewertet.
    Zudem findet man dort seine gesamte Spielzeit des Lernmodus, sowie die Anzahl der richtig und falsch beantworteten Fragen.
- Abzeichen
    - Um eine langfristige Motivation zu bieten, kann man als Nutzer diverse Abzeichen freischalten. Dazu kann der Nutzer bis zu 17 unterschiedliche Abzeichen erreichen. 
- Profil
    - Auf der Profilseite finden sich zum einen die Möglichkeit, seinen Nutzernamen zu bearbeiten, sich auszuloggen oder 
    gar seinen Account zu löschen.
- Hilfe
    - Falls man einmal nicht weiter weiß, bietet die Hilfe-Seite auf jede Frage eine hilfreiche Antwort.



## Softwareentwicklungsprozess
Zu Beginn des Entwicklungsprozesses hat das Team sämtliche Aufgaben in Trello aufgeschrieben und priorisiert.
Zum Start des ersten Sprints hat das Team gemeinsam Aufgaben verteilt, die für alle zu einem ähnlichen Workload führten.
Die verteilten Aufgaben sollten bis Sprintende (eine Woche, je von Donnerstag bis Donnerstag) erledigt sein.
An Montagen hat sich das Team zudem verbindlich getroffen und hat eventuelle Probleme und den aktuellen Stand besprochen.
Die Kommunikation fand über die gemeinsame WhatsApp-Gruppe oder über Zoom statt.
Nach dem dritten Sprint einigte sich das Team auf einen Wechsel von der autonomen Arbeitsweise zur Pair-Programming-Methode,
um auftretende Problemstellungen besser zu bearbeiten.

Die App wurde durchgängig von allen drei Gruppenmitgliedern zu gleichen Teilen entwickelt. Aktuelle Entwicklungsstände wurden auf Branches in Git gepusht.
Fertige Aufgaben wurden im Canban-Board Trello entsprechend von "In Progress" zu "Review" bewegt. Die reviewten Änderungen wurden anschließend in den "Staging"-Branch gemerged.
Kritische Issues wurden nach Absprache ebenfalls in Git als Issues angelegt.



## Systemarchitektur
![Systemarchitektur](/praesentation/pictures/Screenshot_2020-10-08_124734.png)



## Softwarearchitektur
![ERD](/praesentation/pictures/EMA_ERD.png)
„Wichtige" statische und dynamische Aspekte der Softwarearchitektur mit 
standardisierten Notationen, wie z.B. UML oder FMC beschreiben.



## Client Dokumentation
Um die API Dokumentation aufzurufen, muss folgender Befehl ausgeführt werden:
> npm run compodoc

Nun kann man `http://127.0.0.1:8080` im Browser aufrufen, um die Dokumentation einzusehen.



## Technologie-Stack
Technologie | Verwendungszweck
---------------------|----------
[WebStorm 2020.2.1](https://www.jetbrains.com/webstorm/) | Entwicklungsumgebung
[Ionic 6.11.11](https://ionicframework.com/) | Cross-Platform Mobile App Development
[Angular](https://angular.io/) | Frontend Development
[chart.js](https://valor-software.com/ng2-charts/) | Frontend Development (pie-chart)
[Firebase Firestore](https://firebase.google.com/docs/firestore) | Datenbank (Cloud Firestore)
[Firebase Storage](https://firebase.google.com/docs/storage) | Datenbank (Storage)
[Google People API](https://developers.google.com/people) | Authentifizierung
[GoogleAuth](https://github.com/CodetrixStudio/CapacitorGoogleAuth) | Authentifizierung auf Android
[Compodoc](https://compodoc.app/) | Schnittstellen Dokumentation



## Installationsanleitung
- Das Repository klonen:
    - ``https://git.thm.de/ema-ss20/pictures-app`` > ``master`` branch auswählen > das Repository klonen

- Abhängigkeiten installieren:
    - Sobald das Repository geklont wurde, können in der IDE oder dem Terminal mitilfe des Befehls
    ``npm i`` alle Abhängigkeiten installiert werden. Für diesen Befehl wird die JavaScript-Laufzeitumgebung
    [Node.js](https://nodejs.org/) benötigt.

- Das Projekt starten:
    - Nun kann das Projekt mit dem Befehl ``ionic serve`` gestartet werden. Das Projekt verwendet das
    [Ionic-Framework](https://ionicframework.com/). Wenn der Befehl nicht eingegeben werden kann, muss Ionic mit dem Befehl 
    ``npm install -g @ionic/cli`` installiert werden.



## Android Emulation
Um das Projekt in der IDE [Android Studio](https://developer.android.com/studio/) 
aufzurufen, kann das zusammenfassende Scipt ``npm run ema`` ausgeführt werden.
Dieses Script besteht aus folgenden Schritten:

1. Um das Projekt zu bauen (und den `www` Ordner zu generieren), wird ``ionic build`` ausgeführt.
2. Alle Änderungen im Source Code werden mit ``npx cap sync`` übernommen.
3. Um das Android Projekt zu öffnen, muss ``npx cap open android`` im Terminal eingegeben werden.

Falls noch kein Emulations Device konfiguriert wurde, kann eines mithilfe des ``AVD Manager`` aufgesetzt werden.


## Ordnerstruktur
```pictures-app
├── pictures-app
│   ├── android (Beinhaltet das kompilierte Android Studio-Projekt)
│   │   ├── ...
│   ├── e2e (E2E Testing)
│   │   ├── ...
│   ├── node_modules (Beinhaltet alle installierten Node Pakete, sobald npm i ausgeführt wurde)
│   │   ├── ...
│   ├── praesentation (Abbildungen für README.md)
│   │   ├── ...
│   ├── resources
│   │   ├── resources
│   │   |   ├── android (App-Icons und Splash-Screens für verschiedene Auflösungen)
│   │   |   |   ├── icon
│   │   |   |   |   ├── ...
│   │   |   |   ├── splash
│   │   |   |   |   ├── ...
│   │   ├── icon.png (App-Icon)
│   │   ├── splash.png (Splash-Screen-Icon)
│   ├── src
│   │   ├── app
│   |   │   ├── components (Alle Komponenten)
│   |   │   |   ├── ...
│   |   │   ├── models (Alle Models)
│   |   │   |   ├── ...
│   |   │   ├── pages (Alle Pages)
│   |   │   |   ├── ...
│   |   │   ├── services (Alle Services)
│   |   │   |   ├── ...
│   |   │   ├── app.component.html
│   |   │   ├── app.component.scss
│   |   │   ├── app.component.spec.ts
│   |   │   ├── app.component.ts
│   |   │   ├── app.module.ts
│   |   │   ├── app-routing.module.ts
│   │   ├── assets
│   │   ├── environments
│   │   ├── theme
│   │   ├── global.scss
│   │   ├── index.html
│   │   ├── main.ts
│   │   ├── polyfills.ts
│   │   ├── test.ts
│   │   ├── zone-flags.ts
│   ├── .gitignore
│   ├── angular.json
│   ├── browserlist
│   ├── capacitor.config.json
│   ├── ionic.config.json
│   ├── karma.conf.js
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.spec.json
│   ├── tslint.json
```



## Fazit
Die Projektarbeit ist unserer Meinung nach zufriedenstellend verlaufen und sehr gut gelungen.
Durch die Erfahrungen, die wir mit der Entwicklung des Leistungensammlers machen durften, waren wir in der Lage, die App so zu entwickeln, sodass
zum Einen die Anforderungen der Aufgabenstellung umgesetzt werden konnten. Zum Anderen könnten die Wünsche und Erwartungen der Probanden der User Experience Tests
erfüllt wurden. Dadruch wurden viele zusätzliche Features implementiert, die das Projekt noch einmal abrunden.

Durch eine durchdachte Planung war es möglich, mithilfe des Projektmanagement-Werkzeugs "Jira" und der "Scrum"-Methodik die Entwicklung in sieben Sprints aufzuteilen,
sodass man eine stetige Entwicklung aufrecht erhalten konnte und man in keinen "Leerlauf" geraten ist.
Trotz der aktuellen COVID-19 Pandemie war es möglich, mit Telekommunikations-Software wie "Zoom" und "Discord" kurze Kommunikationswege zu gewährleisten
und sogar Pair-Programming dank "Screen-Sharing" durchzuführen.

Der komplette Entwicklungszyklus wurde dank eines sehr guten und freundschaftlichen Arbeitsklimas bestärkt und wir sind uns alle sicher, dass wir 
jederzeit wieder in dieser Konstellation zusammen arbeiten würden.

