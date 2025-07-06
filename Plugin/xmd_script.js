
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Fetch information about a GitHub repository.",
    react: "🎗️",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/fel255/skiddxdm.git';

    try {
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repository details using GitHub API
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const repoData = await response.json();

        // Format the repository information
        const formattedInfo = `
╭─❄️ *WELCOME TO - ♛꧁༒☾FELICIAN☽༒꧂♛ W.A BOT*
│  👋 Hello dear user!              
│  🔥 Simple, Cold & Feature-Rich Bot
│  💖 Thank you for using *MULLER MD*
│  ⭐ Don’t forget to *star* & *fork* us!
│  🔗 https://github.com/fel255/skiddxdm.git
╰────────────────────────╯

${readMore}

╭─⛄ *BOT INFO* ⛄─╮
│❄️ BOT NAME: ${repoData.name}
│👨‍💻 OWNER:  ${repoData.owner.login}
│🌟 STARS: ${repoData.stargazers_count}
│🍴 FORKS: ${repoData.forks_count}
│📃 DESCRIPTION: ${repoData.description || 'No description'}
╰────────────────╯

> *©️  ♛꧁༒☾FELICIAN☽༒꧂♛* ☃️`;

        // Send an image with the formatted info as a caption and context info
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/78ywr9.jpg` },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363419079746471@newsletter',
                    newsletterName: '120363419079746471 REPO💫',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
        
        
        } catch (error) {
        console.error("Error in repo command:", error);
        reply("Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
});
