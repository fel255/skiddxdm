
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
    const githubRepoURL = 'https://github.com/MRABDUL13/Muller-MD';

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
╭─❄️ *WELCOME TO MULLER W.A BOT*
│  👋 Hello dear user!              
│  🔥 Simple, Cold & Feature-Rich Bot
│  💖 Thank you for using *MULLER MD*
│  ⭐ Don’t forget to *star* & *fork* us!
│  🔗 github.com/MRABDUL13/Muller-MD
╰────────────────────────╯

${readMore}

╭─⛄ *BOT INFO* ⛄─╮
│❄️ BOT NAME: ${repoData.name}
│👨‍💻 OWNER:  ${repoData.owner.login}
│🌟 STARS: ${repoData.stargazers_count}
│🍴 FORKS: ${repoData.forks_count}
│📃 DESCRIPTION: ${repoData.description || 'No description'}
╰────────────────╯

> *©️ POWERED BY MULLER* ☃️`;

        // Send an image with the formatted info as a caption and context info
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/57aduv.png ` },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363419333086422@newsletter',
                    newsletterName: 'MULLER MD REPO💫',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
        
        
        } catch (error) {
        console.error("Error in repo command:", error);
        reply("Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
});
