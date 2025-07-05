import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../config.cjs';
import axios from 'axios';

// Get total memory and free memory in bytes
const totalMemoryBytes = os.totalmem();
const freeMemoryBytes = os.freemem();

// Define unit conversions
const byteToKB = 1 / 1024;
const byteToMB = byteToKB / 1024;
const byteToGB = byteToMB / 1024;

// Function to format bytes to a human-readable format
function formatBytes(bytes) {
  if (bytes >= Math.pow(1024, 3)) {
    return (bytes * byteToGB).toFixed(2) + ' GB';
  } else if (bytes >= Math.pow(1024, 2)) {
    return (bytes * byteToMB).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes * byteToKB).toFixed(2) + ' KB';
  } else {
    return bytes.toFixed(2) + ' bytes';
  }
}

// Bot Process Time
const uptime = process.uptime();
const day = Math.floor(uptime / (24 * 3600)); // Calculate days
const hours = Math.floor((uptime % (24 * 3600)) / 3600); // Calculate hours
const minutes = Math.floor((uptime % 3600) / 60); // Calculate minutes
const seconds = Math.floor(uptime % 60); // Calculate seconds

// Uptime
const uptimeMessage = `*I am alive now since ${day}d ${hours}h ${minutes}m ${seconds}s*`;
const runMessage = `*☀️ ${day} Day*\n*🕐 ${hours} Hour*\n*⏰ ${minutes} Minutes*\n*⏱️ ${seconds} Seconds*\n`;

const xtime = moment.tz("Africa/Dar es Salaam").format("HH:mm:ss");
const xdate = moment.tz("Africa/Dar es Salaam").format("DD/MM/YYYY");
const time2 = moment().tz("Africa/Dar es Salaam").format("HH:mm:ss");
let pushwish = "";

if (time2 < "05:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "11:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "15:00:00") {
  pushwish = `Good Afternoon 🌅`;
} else if (time2 < "18:00:00") {
  pushwish = `Good Evening 🌃`;
} else if (time2 < "19:00:00") {
  pushwish = `Good Evening 🌃`;
} else {
  pushwish = `Good Night 🌌`;
}

const menu = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const mode = config.MODE === 'public' ? 'public' : 'private';
  const pref = config.PREFIX;

  const validCommands = ['professeur', 'menu', 'bot'];

  if (validCommands.includes(cmd)) {
    const str = `
╭━━〔 🔮*${config.BOT_NAME}*🔮 〕━━┈⊷
┃©️┃❂❂❂❂❂❂❂❂❂❂❂❂❂❂❂❂❂❂❂❂
┃©️┃➲ Owner : *${config.OWNER_NAME}*
┃©️┃➲ User : *${m.pushName}*
┃©️┃➲ Baileys : *Multi Device*
┃©️┃➲ Type : *NodeJs*
┃©️┃➲ Mode : *${mode}*
┃©️┃➲ Platform : *${os.platform()}*
┃©️┃➲ Prefix : [${prefix}]
┃©️┃➲ Version : *1.0.0*
┃©️┃➲ Ram : *⊏▒▒▒▒▒▒▒⊐*
╰━━━━━━━━━━━━━━━┈⊷

> ${pushwish} *${m.pushName}*!

╭━━〔 🦾*DOWNLOAD MENU*🦾 〕━━┈⊷
┃©️◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙
┃©️┃➤ *apk*
┃©️┃➤ *facebook*
┃©️┃➤ *mediafire*
┃©️┃➤ *pinterestd*
┃©️┃➤ *gitclone*
┃©️┃➤ *gdrive*
┃©️┃➤ *insta*
┃©️┃➤ *ytmp3*
┃©️┃➤ *ytmp4*
┃©️┃➤ *play*
┃©️┃➤ *song*
┃©️┃➤ *video*
┃©️┃➤ *ytmp3doc*
┃©️┃➤ *ytmp4doc*
┃©️┃➤ *tiktok*
┃©️└───────────┈⊷
╰──────────────┈⊷

╭━━〔 📹*CONVERTER MENU*📹 〕━┈⊷
┃©️◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙
┃©️┃➤ *attp*
┃©️┃➤ *attp2*
┃©️┃➤ *attp3*
┃©️┃➤  *ebinary*
┃©️┃➤ *dbinary*
┃©️┃➤ *emojimix*
┃©️┃➤ *mp3*
┃©️└───────────┈⊷
╰──────────────┈⊷

╭━━〔 🤖*AI MENU*🤖 〕━━┈⊷
┃©️◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙
┃©️┃➤ *ai*
┃©️┃➤ *bug*
┃©️┃➤ *report*
┃©️┃➤ *gpt*
┃©️┃➤ *dalle*
┃©️┃➤ *remini*
┃©️┃➤ *gemini*
┃©️└───────────┈⊷
╰──────────────┈⊷

╭━━〔 ⚙️*TOOLS MENU*⚙️ 〕━━┈⊷
┃©️◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙
┃©️┃➤ *calculator*
┃©️┃➤ *tempmail*
┃©️┃➤ *checkmail*
┃©️┃➤ *trt*
┃©️┃➤ *tts*
┃©️└───────────┈⊷
╰──────────────┈⊷

╭━━〔 💏*GROUP MENU*💏 〕━━┈⊷
┃©️◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙
┃©️┃➤ *linkgc*
┃©️┃➤ *setppgc*
┃©️┃➤ *setname*
┃©️┃➤ *setdesc*
┃©️┃➤ *group*
┃©️┃➤ *gcsetting*
┃©️┃➤ *welcome*
┃©️┃➤ *add*
┃©️┃➤ *kick*
┃©️┃➤ *kickall*
┃©️┃➤ *promote*
┃©️┃➤ *promoteall*
┃©️┃➤ *demote*
┃©️┃➤ *demoteall*
┃©️┃➤ *hidetag*
┃©️┃➤ *tagall*
┃©️┃➤ *antilink*
┃©️┃➤ *antitoxic*
┃©️┃➤ *getbio*
┃©️└───────────┈⊷
╰──────────────┈⊷

╭━━〔🛸 *SEARCH MENU*🛸 〕━━┈⊷
┃©️◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙
┃©️┃➤ *play*
┃©️┃➤ *yts*
┃©️┃➤ *imdb*
┃©️┃➤ *google*
┃©️┃➤ *gimage*
┃©️┃➤ *pinterest*
┃©️┃➤ wallpaper
┃©️┃➤ wikimedia
┃©️┃➤ ytsearch
┃©️┃➤ ringtone
┃©️┃➤ lyrics
┃©️└───────────┈⊷
╰──────────────┈⊷

╭━━〔 🗽*MAIN MENU*🗽 〕━━┈⊷
┃©️ ◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙
┃©️┃➤ *ping*
┃©️┃➤ *alive*
┃©️┃➤ *owner*
┃©️┃➤ *menu*
┃©️┃➤ *infobot*
┃©️└───────────┈⊷
╰──────────────┈⊷

╭━━〔 👑*OWNER MENU*👑 〕━━┈⊷
┃ ©️◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙
┃ ©️┃➤*join*
┃ ©️┃➤*leave*
┃ ©️┃➤*block*
┃ ©️┃➤*unblock*
┃ ©️┃➤*setppbot*
┃ ©️┃➤*anticall*
┃ ©️┃➤*setstatus*
┃ ©️┃➤*setnamebot*
┃ ©️┃➤*autotyping*
┃ ©️┃➤*alwaysonline*
┃ ©️┃➤*autoread*
┃ ©️┃➤*autosview*
┃ ©️└───────────┈⊷
╰──────────────┈⊷

╭━━〔 💾*STALK MENU*💾 〕━━┈⊷
┃ ©️◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙◙
┃ ©️┃➤*truecaller*
┃ ©️┃➤*instastalk*
┃ ©️┃➤*githubstalk*
┃ ©️└───────────┈⊷
╰──────────────┈⊷
> *${config.DESCRIPTION}*`;

    // Check if MENU_IMAGE exists in config and is not empty
    let menuImage;
    if (config.MENU_IMAGE && config.MENU_IMAGE.trim() !== '') {
      try {
        // Try to fetch the image from URL
        const response = await axios.get(config.MENU_IMAGE, { responseType: 'arraybuffer' });
        menuImage = Buffer.from(response.data, 'binary');
      } catch (error) {
        console.error('Error fetching menu image from URL, falling back to local image:', error);
        menuImage = fs.readFileSync('https://files.catbox.moe/vk39vl.jpg');
      }
    } else {
      // Use local image if MENU_IMAGE is not configured
      menuImage = fs.readFileSync('https://files.catbox.moe/uf8r83.jpg');
    }

    await Matrix.sendMessage(m.from, {
      image: menuImage,
      caption: str,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363419079746471@newsletter',
          newsletterName: "- ♛꧁༒☾FELICIAN☽༒꧂♛",
          serverMessageId: 143
        }
      }
    }, {
      quoted: m
    });

    // Send audio after sending the menu
    await Matrix.sendMessage(m.from, {
      audio: { url: 'https://files.catbox.moe/5mldf0.mp4' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: m });
  }
};

export default menu;

