# Instalacja i wdrożenie

## Wymagania

- Node.js 22 lub nowszy
- npm 10 lub nowszy
- aplikacja Discord utworzona w Discord Developer Portal
- bot z wymaganymi intentami
- uprawnienia do dodania bota na serwer

## 1. Pobranie projektu

```bash
git clone https://github.com/keworsv-official/discord-bot.git
cd discord-bot
git checkout main
```

Jeżeli chcesz testować najnowszy kod deweloperski:

```bash
git checkout develop
```

## 2. Instalacja zależności

```bash
npm install
```

## 3. Konfiguracja Discord Developer Portal

Utwórz aplikację Discord i dodaj do niej bota. Skopiuj token bota oraz Application ID.

W zakładce Bot włącz tylko te Privileged Gateway Intents, których faktycznie wymaga konfiguracja serwera. Projekt korzysta między innymi z obsługi członków i wiadomości, dlatego przy funkcjach zależnych od tych danych odpowiednie intenty muszą być włączone.

Nie publikuj tokenu bota w repozytorium, logach, screenshotach ani wiadomościach. Jeżeli token wycieknie, natychmiast go zresetuj w Discord Developer Portal.

## 4. Konfiguracja `.env`

Skopiuj przykład:

```bash
cp .env.example .env
```

Uzupełnij:

```env
DISCORD_TOKEN=token_bota
DISCORD_CLIENT_ID=application_id
NODE_ENV=production
LOG_LEVEL=info
DATABASE_PATH=./data/bot.sqlite
```

`.env` nie powinien być commitowany. Jest ignorowany przez Git.

## 5. Uruchomienie

Tryb developerski:

```bash
npm run dev
```

Tryb produkcyjny:

```bash
npm start
```

Sprawdzenie jakości:

```bash
npm run check
```

## 6. Dodanie bota na serwer

Wygeneruj URL instalacyjny aplikacji w Discord Developer Portal z zakresem `bot` oraz `applications.commands` i wymaganymi uprawnieniami.

Nie przyznawaj administratora bez potrzeby. Uprawnienia powinny odpowiadać funkcjom używanym na danym serwerze.

## 7. Pierwsza konfiguracja serwera

Po uruchomieniu użyj `/setup` i wskaż kanały logów, moderacji oraz zgłoszeń.

Następnie sprawdź podstawowe funkcje:

- `/health`
- `/ping`
- `/serverinfo`
- `/userinfo`
- `/setup`
- `/report`

Dla administracji sprawdź również narzędzia moderacyjne oraz system ticketów.

## 8. Produkcja

Dla małego serwera bot może działać jako pojedynczy proces Node.js. Proces powinien być uruchamiany przez manager usług, np. systemd, Docker lub inny nadzorowany proces.

Przykładowy start po wdrożeniu:

```bash
NODE_ENV=production npm start
```

Bazę SQLite należy objąć regularnym backupem. Nie kopiuj aktywnej bazy bez zachowania spójności danych; najlepiej zatrzymać aplikację albo użyć mechanizmu backupu SQLite.

## Aktualizacja

Przed aktualizacją wykonaj backup bazy danych i sprawdź changelog wydania.

```bash
git fetch --tags
git checkout main
git pull --ff-only
npm ci
npm run check
npm start
```

## Rozwiązywanie problemów

### Bot nie uruchamia się

Sprawdź `DISCORD_TOKEN`, wersję Node.js i log startowy.

### Komendy nie pojawiają się na serwerze

Sprawdź `DISCORD_CLIENT_ID`, zakres `applications.commands`, log publikowania komend oraz uprawnienia aplikacji.

### AutoMod nie działa

Sprawdź wymagane Gateway Intents oraz uprawnienia bota do odczytu i usuwania wiadomości.

### Tickety lub logi nie działają

Sprawdź konfigurację kanałów przez `/setup` oraz uprawnienia bota do tworzenia kanałów, wysyłania wiadomości i zarządzania uprawnieniami.
