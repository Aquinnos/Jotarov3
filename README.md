# Discord Bot

Discord Bot to aplikacja, która oferuje różne funkcje, takie jak system antyspamowy, antyreklama, zarządzanie doświadczeniem użytkowników i inne. Bot jest napisany w JavaScript przy użyciu biblioteki Discord.js.

## Funkcje

- **Antyspam**: Automatycznie mutuje użytkowników, którzy wysyłają zbyt wiele wiadomości w krótkim czasie.
- **Antyreklama**: Automatycznie usuwa wiadomości zawierające zaproszenia do innych serwerów Discord i nadaje użytkownikowi rolę "zoo".
- **System doświadczenia**: Śledzi doświadczenie użytkowników na podstawie ich aktywności na czacie.
- **Komendy**: Różne komendy do zarządzania botem i interakcji z użytkownikami, takie jak `pl`, `top`, `resetexp`, `zoo`, `ora`, `timeout`.

## Wymagania

- Node.js (wersja 16.6.0 lub nowsza)
- Discord.js (wersja 13.0.0 lub nowsza)
- Konto Discord i serwer, na którym bot będzie działał

## Instalacja

1. Sklonuj repozytorium na swój lokalny komputer:

    ```bash
    git clone https://github.com/yourusername/discord-bot.git
    cd discord-bot
    ```

2. Zainstaluj wymagane zależności:

    ```bash
    npm install
    ```

3. Utwórz plik [.env](http://_vscodecontentref_/0) w głównym katalogu projektu i dodaj swój token bota Discord:

    ```env
    TOKEN=your-discord-bot-token
    ```

4. Upewnij się, że masz plik [config.json](http://_vscodecontentref_/1) z odpowiednimi wartościami:

    ```json
    {
      "testServer": "", // ID serwera testowego
      "clientId": "",  // ID bota
      "devs": [""] 
    }
    ```

## Uruchomienie

1. Aby uruchomić bota lokalnie, użyj polecenia:

    ```bash
    node index.js
    ```

2. Alternatywnie, możesz użyć `nodemon` do automatycznego restartowania bota podczas zmian w kodzie:

    ```bash
    nodemon index.js
    ```

3. Aby uruchomić bota na serwerze produkcyjnym, możesz użyć `pm2`:

    ```bash
    pm2 start index.js --name "discord-bot"
    ```

## Struktura projektu

- `index.js`: Główny plik uruchamiający bota.
- `handlers/`: Katalog zawierający różne moduły obsługi zdarzeń, takie jak `antiSpamHandler.js`, `antiInviteHandler.js`, `expHandler.js`.
- `commands/`: Katalog zawierający pliki z komendami bota, takie jak `pl.js`, `top.js`, `resetExp.js`, `zoo.js`, `ora.js`, `timeout.js`.
- `utils/`: Katalog zawierający pomocnicze moduły, takie jak `commandLoader.js`.

## Użycie

### Komendy

- **pl**: Pokazuje twój poziom mocy.
- **top**: Wyświetla top użytkowników z najwyższym poziomem mocy.
- **resetexp**: Resetuje wszystkie dane EXP.
- **zoo**: Wysyła użytkownika do zoo.
- **ora**: Wykonuje sekwencję cutscenki i banuje użytkownika.
- **timeout**: Mutuje użytkownika na określony czas.

### Przykłady

- Aby sprawdzić swój poziom mocy, użyj komendy:

    ```bash
    /pl
    ```

- Aby wyświetlić top użytkowników, użyj komendy:

    ```bash
    /top
    ```

- Aby zresetować wszystkie dane EXP, użyj komendy:

    ```bash
    /resetexp
    ```

## Wkład

Jeśli chcesz przyczynić się do rozwoju projektu, zapraszam do forka repozytorium i tworzenia pull requestów. Proszę upewnij się, że Twoje zmiany są dobrze udokumentowane i przetestowane.
