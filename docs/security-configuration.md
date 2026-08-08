# Konfiguracja ochrony serwera

Bot posiada niezależne ustawienia ochrony dla każdego serwera.

## Moduły

- AutoMod — automatyczne wykrywanie wybranych niedozwolonych treści.
- Anti-Spam — ogranicza szybkie serie wiadomości i powtarzanie treści.
- Anti-Raid — wykrywa gwałtowny napływ nowych członków.
- Anti-Nuke — wykrywa podejrzanie dużą liczbę działań destrukcyjnych.

Stan można sprawdzić przez:

```text
/security status
```

Moduł można włączyć lub wyłączyć przez:

```text
/security ustaw moduł:<moduł> włączone:<true|false>
```

Konfiguracja jest zapisywana w SQLite i dotyczy tylko bieżącego serwera.

## Zalecenia

Na produkcji nie należy automatycznie nakładać maksymalnych sankcji tylko na podstawie heurystyki. Najpierw powinien zostać zapisany audyt zdarzenia i sprawdzona allowlista.
