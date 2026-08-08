# Architektura

Projekt jest podzielony na warstwy, aby komendy Discord nie zawierały całej logiki biznesowej.

## `src/config`

Walidacja i odczyt konfiguracji środowiskowej.

## `src/core`

Elementy infrastrukturalne aplikacji: kontener zależności, rejestr komend, loader, obsługa interakcji, publikowanie slash commands oraz pomocnicze funkcje bezpieczeństwa.

## `src/commands`

Cienkie wejścia użytkownika Discord. Komenda powinna walidować dane wejściowe i delegować logikę do usług.

## `src/services`

Logika biznesowa i dostęp do danych: konfiguracja serwerów, moderacja, audyt, AutoMod, Anti-Spam, Anti-Raid, tickety, rate limiting i backupy.

## `src/events`

Reakcje na zdarzenia Gateway, niezależne od pojedynczych komend.

## `src/database`

SQLite, migracje i inicjalizacja bazy.

## `tests`

Testy automatyczne. Krytyczne usługi powinny być testowane bez potrzeby uruchamiania prawdziwego klienta Discord.

## Zasada zależności

Komendy zależą od usług, a usługi nie powinny zależeć od implementacji pojedynczej komendy. Discord jest warstwą wejściową, a SQLite warstwą trwałości danych.

Przed wydaniem produkcyjnym nowe moduły powinny przejść przez testy, walidację uprawnień, obsługę błędów i dokumentację.
