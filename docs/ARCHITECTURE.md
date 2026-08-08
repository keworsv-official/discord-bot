# Architektura

Projekt jest podzielony na warstwy i moduły. Celem jest ograniczenie zależności pomiędzy funkcjami oraz umożliwienie późniejszego skalowania bez przepisywania całej aplikacji.

## Warstwy

### Bootstrap

Uruchamia aplikację, ładuje konfigurację środowiska i inicjalizuje główne zależności.

### Core

Zawiera elementy wspólne dla całej aplikacji, między innymi logger, kontener zależności i cykl życia aplikacji.

### Modules

Każdy większy system bota powinien być niezależnym modułem. Przykładowe moduły docelowe:

- moderation,
- automod,
- antiraid,
- antinuke,
- tickets,
- reports,
- economy,
- leveling,
- backup,
- notifications,
- statistics.

### Services

Logika biznesowa współdzielona przez moduły. Moduły nie powinny bezpośrednio implementować powtarzalnej logiki infrastrukturalnej.

### Database

Dostęp do danych będzie odseparowany od logiki biznesowej. Pierwszą implementacją będzie SQLite. Interfejs ma umożliwić późniejszą migrację do PostgreSQL.

### API

Publiczne API będzie korzystało z tej samej warstwy usług co bot, zamiast bezpośrednio manipulować bazą danych.

## Skalowanie

Docelowo bot będzie mógł działać w wielu shardach. Stan współdzielony między procesami nie powinien zależeć od pamięci pojedynczego procesu.

## Zasada projektowa

Nowa funkcja powinna być możliwie samodzielnym modułem. Nie będziemy tworzyć jednego centralnego pliku zawierającego całą logikę bota.
