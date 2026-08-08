# Konfiguracja

## Zmienne środowiskowe

| Zmienna | Wymagana | Domyślna | Opis |
|---|---|---|---|
| `DISCORD_TOKEN` | tak | brak | Token bota Discord |
| `DISCORD_CLIENT_ID` | zalecana | brak | Application ID aplikacji Discord |
| `NODE_ENV` | nie | `development` | Środowisko uruchomieniowe |
| `LOG_LEVEL` | nie | `info` | Poziom logowania |
| `DATABASE_PATH` | nie | `./data/bot.sqlite` | Ścieżka bazy SQLite |

## Bezpieczeństwo

Token jest sekretem. Nie przechowuj go w kodzie źródłowym, issue, PR, dokumentacji ani logach.

Plik `.env.example` zawiera wyłącznie nazwy zmiennych i przykładową strukturę. Prawdziwy `.env` pozostaje lokalny.

## Konfiguracja serwera

Ustawienia serwera są przechowywane niezależnie dla każdego `guild_id`. Kanały logów, moderacji i reportów konfiguruje się przez `/setup`.

## Baza danych

SQLite jest aktualnym backendem danych. Migracje uruchamiają się przy starcie aplikacji. Nie usuwaj ręcznie tabel `schema_migrations` ani nie zmieniaj istniejących migracji po wydaniu.
