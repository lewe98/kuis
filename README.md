## Kuis - das Bilder-Quiz
###### *CS2018 Entwicklung mobiler Applikationen - Sommersemester 2020*

> Die Kuis-App bietet dem Nutzer die Möglichkeit, sein Allgemeinwissen mithilfe von Rätseln diverser Kategorien zu verbessern.
> Abzeichen und Statistiken steigern die Motivation und bieten einen langfristigen Spielspaß.



# Anforderung Doku!!!!!!!!
Für alle Punkte gilt natürlich, dass Sie nur beschreiben und mit Grafiken illustrieren, was wirklich relevant ist.
Gerne können Sie noch weitere Punkte ergänzen, wenn diese zum Verständnis Ihrer Software nützlich sind.

Des Weiteren sollten sie berücksichtigen, dass die Zielgruppe in erster Linie „Softwareentwickler“ sind.

Der Idealfall wäre, wenn ich nach dem Lesen Ihrer Dokumentation, sofort mit der Entwicklung in diesem Projekt loslegen kann.

Die Dokumentation können sie direkt in ihr GitLab-Projekt-Wiki schreiben, oder als PDF-Datei im Repository ablegen.



![Kuis](https://www.brand-fit.de/wp-content/uploads/2016/05/Platzhalter.jpg)



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
    - Xcode öffnen > ``Clone an existing project`` > ``https://git.thm.de/jhmn46/itask`` > master oder staging branch auswählen

- Cocoa Pods installieren:
    - Sobald das Repository geklont wurde, alle aktiven Xcode Fenster schließen. 
      Im Anschluss mithilfe des Terminals in den Projektordner navigieren und ``$ pod install`` ausführen.
      Dadurch werden die in der ``Podfile`` eingetragenen Abhängigkeiten installiert.
      Diese werden mithilfe des CocoaPods dependency manager geladen. 
      Sollte CocoaPods noch nicht installiert sein, muss folgender Befehl im Terminal eingegeben werden: ``$ sudo gem install cocoapods``.

- Das Projekt öffnen:
    - Durch die Installation der Abhängigkeiten wird eine ``.xcworkspace`` Datei generiert.
      Diese wird in Zukunft verwendet, um das Projekt zu öffnen.
      ``New Scheme...`` > Target: iTask > Name: iTask



## Android Emulation
Um das Projekt in der IDE [Android Studio](https://developer.android.com/studio/) 
aufzurufen, kann das zusammenfassende Scipt ``npm run ema`` ausgeführt werden.
Dieses Script besteht aus folgenden Schritten:

1. Um das Projekt zu bauen (und den `www` Ordner zu generieren), wird ``ionic build`` ausgeführt.
2. Alle Änderungen im Source Code werden mit ``npx cap sync`` übernommen.
3. Um das Android Projekt zu öffnen, muss ``npx cap open android`` im Terminal eingegeben werden.

Falls noch kein Emulations Device konfiguriert wurde, kann eines mithilfe des ``AVD Manager`` aufgesetzt werden.


## Ordnerstruktur
```iTask
├── iTask
│   ├── Confetti
│   │   ├── ParticlesEmitter.swift (Logik, um Partikeleffekte zu generieren)
│   │   ├── Confetti.swift (Darstellung der Partikeleffekte)
│   ├── Sound
│   │   ├── success.mp3 (Audio-Datei)
│   │   ├── failure.mp3 (Audio-Datei)
│   │   ├── later.mp3 (Audio-Datei)
│   │   ├── plop.mp3 (Audio-Datei)
│   │   ├── reset.mp3 (Audio-Datei)
│   │   ├── PlaySound.swift (Funktion, um sämtliche Sounds abzuspielen)
│   ├── InitViews
│   │   ├── ContentView.swift (View für registrierte Nutzer)
│   │   ├── Register.swift (Registrierungs-Formular)
│   │   ├── Loading.swift (Ladebildschirm)
│   ├── TabBar
│   │   ├── HeuteView.swift (View für die täglichen Aufgbane)
│   │   ├── UebersichtView.swift (View für Statistiken)
│   │   ├── FreundeView.swift (View für Freunde)
│   │   ├── EinstellungenView.swift (View für Einstellungen)
│   ├── EinstellungenViews
│   │   ├── ImpressumWebview.swift (Webview mit Impressum)
│   │   ├── DatenschutzWebview.swift (Webview mit Datenschutzangaben)
│   │   ├── AufgabenEinreichenView.swift (Sheet zum Einreichen von Aufgaben)
│   │   ├── Einstellungen.swift (Verwaltung sämtlicher persistierter Einstellungen)
│   ├── FreundeViews
│   │   ├── FreundeHinzufuegenView.swift (Sheet zum Hinzufuegen von Freunden)
│   ├── Models
│   │   ├── UserModel.swift (Model des Users)
│   │   ├── AufgabenModel.swift (Model der Aufgaben)
│   ├── Services
│   │   ├── FirebaseFunctions.swift (Sämtliche Firebase Funktionen)
│   │   ├── CoraDataFunctions.swift (Sämtliche CoreData Funktionen)
│   │   ├── GlobalFunctions.swift (Ausgelagerte, globale Funktionen)
│   ├── BodyViews
│   │   ├── AktuellFirstView.swift (View für Auswahl zwischen heutigen Aufgaben)
│   │   ├── AktuellSecondView.swift (View für Anzeige ausgewählter Aufgabe)
│   │   ├── AufgabeDetail.swift (Eigentliche Aufgabe, wird eingebunden)
│   │   ├── Additives_diagramm.swift (Diagramm, um Statistiken darzustellen)
│   │   ├── NavigationConfigurator.swift (ViewController für das Heute-Tab)
│   ├── AppDelegate.swift
│   ├── SceneDelegate.swift
│   ├── LaunchScreen.storyboard
│   ├── info.plist
│   ├── GoogleService-info.plist
│   ├── iTask.xcdatamodeld
│   ├── Assets.xcassets
│   ├── Preview Content
│   │   ├── Preview Assets.xcassets
├── Products
│   ├── DoDay.app
├── Pods
├── Frameworks
```



## Fazit
#### Julian Hermanspahn
Insgesamt hat mir die Veranstaltung sehr gut gefallen. Positiv hervorheben möchte ich, dass wir die gelernten Inhalte direkt umsetzen durften (Wahrzeichen, Core Data, etc.). Auch die Einteilung in Expertengruppen war eine tolle Idee. So hat man sich intensiv mit einem Thema beschäftigt und konnte sich sehr gut darin vertiefen. Allerdings gab es keine "Qualitätssicherung", wodurch man nicht wusste, ob man die Inhalte einer Expertengruppe "bedenkenlos" übernehmen konnte. Ich hätte mir insgesamt mehr Vorlesungen und Unterlagen gewünscht, um aus einer größeren Menge an Vorlagen und Hilfestellungen schöpfen zu können. 

Natürlich ist es nicht möglich, eine komplette Programmiersprache innerhalb weniger Wochen zu vermitteln, daher sind natürlich öfters Probleme bei der Bearbeitung des persönlichen Projekts aufgetreten. Dadurch wurde der Workflow gestört und wir haben uns an gewissen Problemen die Zähne ausgebissen. Ich mir gewünscht, dass z.B. einmal pro Woche eine Sprechstunde mit den Dozenten stattgefunden hätte, um größere "Leerläufe" zu vermeiden. Allerdings wurde man auf diese Weise geschult, sich selbstständig in fremde Sachverhalte einzuarbeiten.
Außerdem konnte man sich innerhalb des Teams durch eine gute Zusammenarbeit in vielen Bereichen ergänzen und weiterhelfen.



#### Tim Hoffmann



#### Lewe Lorenzen



#### Mario Mollame


