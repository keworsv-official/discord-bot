# Testowanie

## Lokalnie

Zainstaluj zależności:

```bash
npm ci
```

Uruchom pełną walidację:

```bash
npm run check
```

Testy można uruchomić bez połączenia z Discord Gateway, ponieważ usługi bezpieczeństwa są projektowane jako niezależne od klienta Discord.

## Zakres

Przed wydaniem należy pokrywać testami przede wszystkim:

- walidację konfiguracji,
- moderację i hierarchię ról,
- AutoMod,
- Anti-Spam,
- Anti-Raid,
- Anti-Nuke,
- rate limiting,
- migracje SQLite,
- backup i odtwarzanie,
- krytyczne ścieżki ticketów.

## CI

GitHub Actions uruchamia `npm ci` i `npm run check` dla zmian kierowanych do `main` oraz `develop`. Pull Request nie powinien być traktowany jako gotowy do merge bez przejścia CI.
