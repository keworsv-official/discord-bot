# Checklist przed wydaniem

## Kod

- [ ] `npm ci` kończy się poprawnie.
- [ ] `npm run check` przechodzi bez błędów.
- [ ] Brak sekretów w repozytorium.
- [ ] `.env.example` jest aktualny.
- [ ] Migracje SQLite są kompletne.
- [ ] Krytyczne ścieżki mają testy.

## Discord

- [ ] Token produkcyjny nie jest zapisany w repozytorium.
- [ ] Application ID jest skonfigurowane.
- [ ] Wymagane Gateway Intents są włączone.
- [ ] Bot ma tylko wymagane uprawnienia.
- [ ] Slash commands publikują się poprawnie.
- [ ] `/setup` działa na czystym serwerze.
- [ ] Moderacja respektuje hierarchię ról.

## Dane i bezpieczeństwo

- [ ] Wykonano backup SQLite.
- [ ] AutoMod i Anti-Spam zostały przetestowane.
- [ ] Anti-Raid nie powoduje niepożądanych blokad.
- [ ] Logi nie ujawniają tokenów ani sekretów.
- [ ] Obsługa błędów nie kończy procesu przy pojedynczej awarii komendy.

## Release

- [ ] Zaktualizowano wersję w `package.json`.
- [ ] Przygotowano Release Notes.
- [ ] Wymieniono nowe funkcje.
- [ ] Wymieniono poprawki i zmiany techniczne.
- [ ] Wymieniono znane problemy.
- [ ] Wymieniono wymagane zmiany konfiguracji.
- [ ] PR `develop -> main` został zaakceptowany.
- [ ] Utworzono GitHub Release i tag wersji.
