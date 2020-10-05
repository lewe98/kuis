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
* [Ordnerstruktur](#ordnerstruktur)
* [Fazit](#fazit)



## Einleitung
Eine Einleitung, in der auf fachlicher Ebene beschrieben wird, um was es in ihrem Projekt geht 
und was mit der Software schönes gemacht werden kann. 
Hierzu gehören z.B. alle Anforderungen und die daraus resultierenden Anwendungsfälle + Datenmodell.



## Featureliste
- Landing
    - bla
- Startseite
    - bla
- Lernmodus
    - bla
- Modulübersicht
    - bla
- Statistik
    - bla
- Abzeichen
    - bla
- Profil
    - bla
- Hilfe
    - bla



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
Welche Systeme sind beteiligt und wie kommunizieren diese miteinander.



## Softwarearchitektur
„Wichtige" statische und dynamische Aspekte der Softwarearchitektur mit 
standardisierten Notationen, wie z.B. UML oder FMC beschreiben.



## Client Dokumentation
Um die API Dokumentation aufzurufen, muss folgender Befehl ausgeführt werden:
> npm run compodoc



## Technologie-Stack
Technologie | Verwendungszweck
---------------------|----------
[WebStorm 2020.2.1](https://www.jetbrains.com/webstorm/) | Entwicklungsumgebung
[Ionic 5](https://ionicframework.com/) | Cross-Platform Mobile App Development
[Angular](https://angular.io/) | Frontend Development
[Kuchen-Diagramm](https://valor-software.com/ng2-charts/) | Frontend Development
[Firebase Firestore](https://firebase.google.com/docs/firestore) | Datenbank (Cloud Firestore)
[Firebase Storage](https://firebase.google.com/docs/storage) | Datenbank (Storage)
[Push Notifications](https://firebase.google.com/docs/cloud-messaging) | Benachrichtigungen



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


