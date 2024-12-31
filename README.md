# Discord Bot Jotarov3

Discord Bot Jotarov3 is an application that offers various features such as anti-spam, anti-invite, user experience management, and more. The bot is written in JavaScript using the Discord.js library.

## Features

- **Anti-Spam**: Automatically mutes users who send too many messages in a short period.
- **Anti-Invite**: Automatically deletes messages containing invites to other Discord servers and assigns the "zoo" role to the user.
- **Experience System**: Tracks user experience based on their activity in the chat.
- **Commands**: Various commands for managing the bot and interacting with users, such as `pl`, `top`, `resetpl`, `zoo`, `ora`, `timeout`.

## Requirements

- Node.js (version 16.6.0 or higher)
- Discord.js (version 13.0.0 or higher)
- A Discord account and a server where the bot will operate

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/yourusername/discord-bot.git
    cd discord-bot
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/0) file in the root directory of the project and add your Discord bot token:

    ```env
    TOKEN=your-discord-bot-token
    ```

4. Ensure you have a [config.json](http://_vscodecontentref_/1) file with the appropriate values:

    ```json
    {
      "testServer": "", 
      "clientId": "", 
      "devs": [""] 
    }
    ```

## Running the Bot

1. To run the bot locally, use the command:

    ```bash
    node index.js
    ```

2. Alternatively, you can use `nodemon` to automatically restart the bot when changes are made:

    ```bash
    nodemon index.js
    ```

3. To run the bot in a production environment, you can use `pm2`:

    ```bash
    pm2 start index.js --name "discord-bot"
    ```

## Project Structure

- `index.js`: Główny plik uruchamiający bota.
- `handlers/`: Katalog zawierający różne moduły obsługi zdarzeń, takie jak `antiSpamHandler.js`, `antiInviteHandler.js`, `expHandler.js`.
- `commands/`: Katalog zawierający pliki z komendami bota, takie jak `pl.js`, `top.js`, `resetExp.js`, `zoo.js`, `ora.js`, `timeout.js`.
- `utils/`: Katalog zawierający pomocnicze moduły, takie jak `commandLoader.js`.

## Usage

### Commands

- **pl**: Shows your power level.
- **top**: Displays the top users with the highest power levels.
- **resetpl**: Resets all EXP data.
- **zoo**: Sends a user to the zoo.
- **ora**: Executes a cutscene sequence and bans a user.
- **timeout**: Mutes a user for a specified duration.

### Examples

- To check your power level, use the command:

    ```bash
    /pl
    ```

- To display the top users, use the command:

    ```bash
    /top
    ```

- To reset all EXP data, use the command:

    ```bash
    /resetpl
    ```

## Contributing

If you would like to contribute to the project, feel free to fork the repository and create pull requests. Please ensure that your changes are well-documented and tested.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
