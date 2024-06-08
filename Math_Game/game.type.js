export function getLogMessages(data) {
    const percent = Math.round((data["Win"] / data["Played"]) * 100)
    const logMessages = {
        HELP: `
            Commands
             ⁍• G - Start Game 
             ⁍• Help - View this text about commands 
             ⁍• P - Profile 
             ⁍• Name - change nickname 
             ⁍• R - View right answer. Cost: 50 coins 
             ⁍• E - Exit and save all 
        `,
        PROFILE: `
            Your Profile
             ⁍• Nickname: ${data.Nickname}
             ⁍• Played Games: ${data.Played}
             ⁍• Coins: ${data.Money}
             ⁍• Wins: ${data.Win}
             ⁍• Lose: ${data.Lose}
             ⁍• Winning percentage: ${percent}%
        `
    };

    return logMessages;
}
