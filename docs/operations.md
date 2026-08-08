# Operacje produkcyjne

## Uruchomienie

1. Pobierz zatwierdzone wydanie.
2. Skonfiguruj `.env` poza repozytorium.
3. Wykonaj `npm ci`.
4. Uruchom `npm run check`.
5. Uruchom `npm start` przez nadzorowany proces.

## Backup

Przed aktualizacją wykonaj backup SQLite i sprawdź, czy plik został utworzony.

## Aktualizacja

- zatrzymaj proces,
- wykonaj backup,
- pobierz nową wersję,
- wykonaj `npm ci`,
- wykonaj `npm run check`,
- uruchom proces,
- sprawdź `/health` i `/ping`.

## Awaria

Jeżeli bot przestaje odpowiadać:

1. sprawdź logi procesu,
2. sprawdź dostępność Discord API,
3. sprawdź poprawność tokenu,
4. sprawdź stan SQLite,
5. uruchom `npm run check`,
6. w razie potrzeby wróć do poprzedniego wydania i odtwórz backup.

## Monitoring

Minimalny monitoring powinien obserwować uptime procesu, błędy logowania do Discord, błędy bazy danych oraz nietypowy wzrost zdarzeń Anti-Spam/Anti-Raid.
