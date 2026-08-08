# Discord Bot

Publiczny, modułowy i skalowalny bot Discord rozwijany w JavaScript z wykorzystaniem Discord.js.

Projekt jest budowany dla małych i dużych społeczności. Łączy administrację, moderację, bezpieczeństwo, automatyzację i funkcje społecznościowe, a architektura pozostawia miejsce na przyszłe API i panel WWW.

## Status projektu

Projekt jest w aktywnym rozwoju przed pierwszym publicznym wydaniem `v0.1.0-beta`.

Kod developerski znajduje się na branchu `develop`. Zmiany przeznaczone do wydania trafiają przez Pull Request do `main` i są weryfikowane przed publikacją.

## Funkcje obecnego etapu

- konfiguracja per serwer,
- SQLite i migracje,
- system komend slash,
- administracja i moderacja,
- historia sankcji,
- AutoMod,
- Anti-Spam,
- podstawowy Anti-Raid,
- audyt zdarzeń,
- tickety i reporty,
- narzędzia użytkowe i serwerowe,
- logowanie oraz graceful shutdown,
- testy jednostkowe fundamentów.

## Dokumentacja

- [Instalacja i wdrożenie](docs/installation.md)
- [Konfiguracja](docs/configuration.md)

## Rozwój

Zmiany są grupowane w większe etapy. Każdy etap jest opisywany w Pull Requestach. Przed wydaniami użytkownicy otrzymają pełne Release Notes zawierające nowe funkcje, zmiany, poprawki, informacje bezpieczeństwa i znane ograniczenia.

## Technologia

- JavaScript
- Node.js 22+
- Discord.js 14
- SQLite
- REST API — planowane

## Licencja

Warunki licencji projektu zostaną sfinalizowane przed pierwszym publicznym wydaniem. Do tego czasu nie należy traktować repozytorium jako zgody na kopiowanie, redystrybucję lub wykorzystanie kodu poza zakresem dozwolonym przez właściciela projektu.
