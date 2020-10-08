## Kuis - Dein Bilderrätsel
###### *CS2018 Entwicklung mobiler Applikationen - Sommersemester 2020*

> Die Kuis-App bietet dem Nutzer die Möglichkeit, sein Allgemeinwissen mithilfe von Rätseln diverser Kategorien zu verbessern.
> Abzeichen und Statistiken steigern die Motivation und bieten einen langfristigen Spielspaß.



# Anforderung Doku!!!!!!!!
Für alle Punkte gilt natürlich, dass Sie nur beschreiben und mit Grafiken illustrieren, was wirklich relevant ist.
Gerne können Sie noch weitere Punkte ergänzen, wenn diese zum Verständnis Ihrer Software nützlich sind.

Die Dokumentation können sie direkt in ihr GitLab-Projekt-Wiki schreiben, oder als PDF-Datei im Repository ablegen.



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
#TODO
Eine Einleitung, in der auf fachlicher Ebene beschrieben wird, um was es in ihrem Projekt geht 
und was mit der Software schönes gemacht werden kann. 
Hierzu gehören z.B. alle Anforderungen und die daraus resultierenden Anwendungsfälle + Datenmodell.



## Featureliste
- Landing
    - Die App begrüßt den Nutzer auf der Landingpage. Dort finden sich ein Onboarding-Screen, mit einer
    Übersicht der Features, sowie Weiterleitungen zur Authentifizierung und zur Hilfe.
- Startseite
    - Auf der Startseite erhält der Nutzer eine übersichtliche Darstellung aller zur Verfügung stehenden Seiten.
- Lernmodus
    - Im Lernmodus bekommt der Benutzer ein Rätsel präsentiert, das aus einem Bild, einer Frage und 
    vier möglichen Antworten besteht, von denen aber nur eine Antwort richtig ist.
    Der Lernmodus enthält zehn zufällige Fragen, die sich aus den heruntergeladenen Quiz-Modulen zusammensetzen.
    Sobald eine Frage sechs Mal in Folge richtig beantwortet wurde, wird sie nicht mehr im Lernmodus angezeigt.
- Modulübersicht
    - Die Mödulübersicht enthält alle vom Nutzer heruntergeladenen Quiz-Module. Die Module können dort heruntergeladen und
    auch wieder gelöscht werden.
- Statistik
    - Auf der Statistikseite werden alle absolvierten Lernrunden, sowie frei ausgewählte Module der Modulübersicht ausgewertet.
    Zudem findet man dort seine gesamte Spielzeit des Lernmodus, sowie richtig und falsch beantwortete Fragen.
- Abzeichen
    - Um eine langfristige Motivation zu bieten, kann man als Nutzer diverse Abzeichen freischalten.
- Profil
    - Auf der Profilseite finden sich zum Einen die Möglichkeit, seinen Nutzernamen zu bearbeiten, sich Auszuloggen oder 
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
- Das Repository mithilfe von Xcode klonen:
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
│   │   ├── icon.png (App-Icon)
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
Die Projektarbeit ist insgesamt sehr zufriedenstellend verlaufen.
Durch die Erfahrungen, die wir mit der Entwicklung des Leistungensammlers machen durften, waren wir in der Lage, die App so zu entwickeln, sodass
zum Einen die Anforderungen der Aufgabenstellung umgesetzt werden konnten. Zum Anderen könnten die Wünsche und Erwartungen der Probanden der User Experience Tests
erfüllt wurden.

Durch eine durchdachte Planung war es möglich, mithilfe des Projektmanagement-Werkzeugs "Jira" und der "Scrum"-Methodik die Entwicklung in sieben Sprints aufzuteilen,
sodass man eine stetige Entwicklung aufrecht erhalten konnte und man in keinen "Leerlauf" geraten ist.
Trotz der aktuellen COVID-19 Pandemie war es möglich, mit Telekommunikations-Software wie "Zoom" und "Discord" kurze Kommunikationswege zu gewährleisten
und sogar Pair-Programming dank "Screen-Sharing" durchzuführen.

Der komplette Entwicklungszyklus wurde dank eines sehr guten und freundschaftlichen Arbeitsklimas bestärkt und wir sind uns alle sicher, dass wir 
jederzeit wieder in dieser Konstellation zusammen arbeiten würden.

