# Bezpieczeństwo

## Sekrety

Token Discord jest sekretem produkcyjnym. Nie commituj `.env`, tokenów, webhooków ani innych credentiali.

## Uprawnienia Discord

Bot powinien otrzymywać minimalny zestaw uprawnień potrzebny do aktywnych modułów. Szczególnie nie należy przyznawać `Administrator`, jeśli konfiguracja serwera tego nie wymaga.

## Hierarchia ról

Operacje moderacyjne muszą respektować hierarchię Discord. Bot nie może moderować właściciela serwera ani użytkownika znajdującego się na poziomie równym lub wyższym od najwyższej roli bota.

## Anti-Spam i AutoMod

Mechanizmy ochronne są heurystyczne. Progi powinny być konfigurowalne i testowane na konkretnym serwerze, aby ograniczyć false positive.

## Anti-Raid i Anti-Nuke

Wykrycie anomalii nie powinno być automatycznie traktowane jako dowód nadużycia. Przed wdrożeniem automatycznych sankcji należy dodać allowlistę zaufanych użytkowników, kontrolę uprawnień oraz pełny audyt decyzji.

## Backup

Backup SQLite powinien być przechowywany poza repozytorium i objęty polityką retencji. Pliki backupów mogą zawierać dane użytkowników i należy traktować je jako dane wrażliwe operacyjnie.

## Raportowanie błędów

Logi nie powinny zawierać tokenów ani pełnych sekretów. Błędy z Discord API powinny być rejestrowane z kontekstem operacji, ale bez ujawniania credentiali.

## Release security gate

Przed wydaniem sprawdź zależności, sekrety, uprawnienia aplikacji, migracje bazy, backup/restore oraz zachowanie przy błędach API.
