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

  const validCommands = ['list', 'help'];

  if (validCommands.includes(cmd)) {
    const mainMenu = `
    = `╭━〔 *SKIDDXDM* 〕━┈⊷`
┃╭──────────────────
‎┃│🍹 *_𝐔𝐬𝐞𝐫 :_* ${pushname}
‎┃│🦄 *_𝐌𝐨𝐝𝐞 :_* ${config.MODE}
‎┃│🦋 *_𝐏𝐫𝐞𝐟𝐢𝐱 :_* ${config.PREFIX}
┃│💫 *_𝐂𝐫𝐞𝐚𝐭𝐨𝐫 :_* \`SKIDDBMX\`
‎┃│⭐️ *_𝐕𝐞𝐫𝐬𝐢𝐨𝐧 :_* \`1.0.0\`
┃│🤖 *_𝐁𝐨𝐭-𝐍𝐚𝐦𝐞 :_* ${config.BOT_NAME}
┃│〽️ *_𝐀𝐥𝐰𝐚𝐲𝐬 𝐎𝐧𝐥𝐢𝐧𝐞 :_* 𝐀𝐜𝐭𝐢𝐯𝐞
‎┃╰──────────────────
╰━━━━━━━━━━━━━━━━━━━
> ${pushwish} *${m.pushName}*!

*\`ʙᴏᴛ-ᴍᴇɴᴜ\`*
> ╭────────────────❍
> ├➩ *.ᴠᴇʀsɪᴏɴ*
> ├➩ *.ᴘʀᴇᴍɪᴜᴍ*
> ├➩ *.ʀᴇᴘᴏ*
> ├➩ *.ᴍᴇɴᴜ*
> ├➩ *.ᴄʜᴇᴄᴋᴜᴘᴅᴀᴛᴇ*
> ├➩ *.ᴜᴘᴅᴀᴛᴇ*
> ├➩ *.ᴍᴏᴅᴇ*
> ├➩ *.ᴀᴜᴛᴏᴛʏᴘɪɴɢ*
> ├➩ *.ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ*
> ├➩ *.ᴀᴜᴛᴏʀᴇᴄᴏʀᴅɪɴɢ*
> ├➩ *.ᴀᴜᴛᴏʀᴇᴀᴅsᴛᴀᴛᴜs*
> ├➩ *.ᴀɴᴛɪʙᴀᴅ*
> ├➩ *.ᴀᴜᴛᴏsᴛɪᴄᴋᴇʀ*
> ├➩ *.ᴀᴜᴛᴏʀᴇᴘʟʏ*
> ├➩ *.ᴀᴜᴛᴏʀᴇᴀᴄᴛ*
> ├➩ *.ᴀɴᴛɪʟɪɴᴋ*
> ┕────────────────❍
> *2025 POWERED BY SKIDDYBMX*
> *Reply with the number (1-9)*`;

    // Function to get menu image
    const getMenuImage = async () => {
      if (config.MENU_IMAGE && config.MENU_IMAGE.trim() !== '') {
        try {
          const response = await axios.get(config.MENU_IMAGE, { responseType: 'arraybuffer' });
          return Buffer.from(response.data, 'binary');
        } catch (error) {
          console.error('Error fetching menu image from URL, falling back to local image:', error);
          return fs.readFileSync('https://files.catbox.moe/yhy4en.jpg');
        }
      } else {
        return fs.readFileSync('https://files.catbox.moe/yhy4en.jpg');
      }
    };

    const menuImage = await getMenuImage();

    const sentMessage = await Matrix.sendMessage(m.from, {
      image: menuImage,
      caption: mainMenu,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363419079746471@newsletter',
          newsletterName: "SKIDDYBMX",
          serverMessageId: 143
        }
      }
    }, {
      quoted: m
    });

    // Send audio after sending the menu
    await Matrix.sendMessage(m.from, {
      audio: { url: 'https://files.catbox.moe/s7hcy1.m4a' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: m });

    // Set up listener for menu selection
    Matrix.ev.on('messages.upsert', async (event) => {
      const receivedMessage = event.messages[0];
      if (!receivedMessage?.message?.extendedTextMessage) return;

      const receivedText = receivedMessage.message.extendedTextMessage.text.trim();
      if (receivedMessage.message.extendedTextMessage.contextInfo?.stanzaId !== sentMessage.key.id) return;

      let menuResponse;
      let menuTitle;
      
      switch (receivedText) {
        case "1":
          menuTitle = "Download Menu";
          menuResponse = `
*\`ᴅᴏᴡɴʟᴏᴀᴅ-ᴍᴇɴᴜ\`*
> ╭────────────────❍
> ├➩ *.ғʙ*
> ├➩ *.ɪɴꜱᴛᴀ*
> ├➩ *.ᴠɪᴅᴇᴏ*
> ├➩ *.ɢᴅʀɪᴠᴇ*
> ├➩ *.ᴛᴡɪᴛᴛᴇʀ*
> ├➩ *.ᴛᴛ*
> ├➩ *.ᴍᴇᴅɪᴀғɪʀᴇ*
> ├➩ *.ᴘʟᴀʏ*
> ├➩ *.sᴏɴɢ*
> ├➩ *.ᴠɪᴅᴇᴏ*
> ├➩ *.sᴘᴏᴛɪꜰʏ*
> ├➩ *.ᴠɪᴅᴇᴏ4*
> ├➩ *.ɪᴍɢ*
> ├➩ *.Lʏʀɪᴄs*
> ├➩ *.ᴀᴘᴋ*
> ├➩ *.ʙᴀɪsᴄᴏᴘᴇ*
> ├➩ *.ɢɪɴɪsɪsɪʟᴀ*
> ┕────────────────❍
> *2025 POWERED BY SKIDDYBMX*`;
          break;
          
        case "2":
          menuTitle = "Converter Menu";
          menuResponse = `
*\`ᴄᴏɴᴠᴇʀᴛ-ᴍᴇɴᴜ\`*
> ╭────────────────❍
> ├➩ *.sᴛɪᴄᴋᴇʀ*
> ├➩ *.ᴛᴀᴋᴇ*
> ├➩ *.ᴛʀᴛ*
> ├➩ *.ᴛᴛs*
> ├➩ *.ꜰᴀɴᴄʏ*
> ├➩ *.ᴜʀʟ*
> ├➩ *.sᴇɴᴅɪᴍᴀɢᴇ*
> ├➩ *.Aɢᴇ*
> ├➩ *.Cᴏɴᴠᴇʀᴛ*
> ├➩ *.ᴛɪɴʏ*
> ├➩ *.ᴛɢs*
> ┕────────────────❍
> *2025 POWERED BY SKIDDYBMX*`;
          break;
          
        case "3":
          menuTitle = "AI Menu";
          menuResponse = `
*\`ᴀɪ-ɢᴘᴛ-ᴍᴇɴᴜ\`*
> ╭────────────────❍
> ├➩ *.ɢᴘᴛ*
> ├➩ *.ᴀɪ*
> ├➩ *.ᴀɴᴀʟʏsᴇ*
> ├➩ *.ʟʟᴀᴍᴀ3*
> ┕────────────────❍
> *2025 POWERED BY SKIDDYBMX*`;
          break;
          
        case "4":
          menuTitle = "Tools Menu";
          menuResponse = `
*\`ɪɴғᴏ-ᴍᴇɴᴜ\`*.  
> ╭────────────────❍
> ├➩ *.ᴀʙᴏᴜᴛ*
> ├➩ *.Dᴇᴠ*
> ├➩ *.ᴀʟɪᴠᴇ*
> ├➩ *.ʀᴇǫᴜᴇsᴛ*
> ├➩ *.ʙᴏᴛɪɴꜰᴏ*
> ├➩ *.ꜱᴛᴀᴛᴜꜱ*
> ├➩ *.ᴘɪɴɢ*
> ├➩ *.ᴘɪɴɢ2*
> ├➩ *.ꜱʏꜱᴛᴇᴍ*
> ┕────────────────❍
> *2025 POWERED BY SKIDDYBMX*`;
          break;
          
        case "5":
          menuTitle = "Group Menu";
          menuResponse = `
*\`ɢʀᴏᴜᴘ-ᴍᴇɴᴜ\`*
> ╭────────────────❍
> ├➩ *.ʀᴇᴍᴏᴠᴇ*
> ├➩ *.ᴅᴇʟ*
> ├➩ *.ᴀᴅᴅ*
> ├➩ *.ᴋɪᴄᴋ*
> ├➩ *.ᴋɪᴄᴋᴀʟʟ*
> ├➩ *.sᴇᴛɢᴏᴏᴅʙʏᴇ*
> ├➩ *.sᴇᴛᴡᴇʟᴄᴏᴍᴇ*
> ├➩ *.ᴘʀᴏᴍᴏᴛᴇ*
> ├➩ *.ᴅᴇᴍᴏᴛᴇ*
> ├➩ *.ᴛᴀɢᴀʟʟ*
> ├➩ *.ɢᴇᴛᴘɪᴄ*
> ├➩ *.ɪɴᴠɪᴛᴇ*
> ├➩ *.ʀᴇᴠᴏᴋᴇ*
> ├➩ *.ᴘᴏʟʟ*
> ├➩ *.ʀᴀɴᴅᴏᴍsʜɪᴘ*
> ├➩ *.ɴᴇᴡɢᴄ*
> ├➩ *.ᴊᴏɪɴʀᴇǫᴜᴇsᴛs*
> ├➩ *.ᴀʟʟʀᴇǫ*
> ├➩ *.ᴍᴜᴛᴇ*
> ├➩ *.ᴜɴᴍᴜᴛᴇ*
> ├➩ *.ʟᴏᴄᴋɢᴄ*
> ├➩ *.ᴜɴʟᴏᴄᴋɢᴄ*
> ├➩ *.ʟᴇᴀᴠᴇ*
> ├➩ *.ɢɴᴀᴍᴇ*
> ├➩ *.ɢᴅᴇsᴄ*
> ├➩ *.ᴊᴏɪɴ*
> ├➩ *.ʜɪᴅᴇᴛᴀɢ*
> ├➩ *.ɢɪɴғᴏ*
> ├➩ *.ᴇᴘʜᴇᴍᴇʀᴀʟ ᴏɴ*
> ├➩ *.ᴇᴘʜᴇᴍᴇʀᴀʟ ᴏғғ*
> ├➩ *.ᴇᴘʜᴇᴍᴇʀᴀʟ 7ᴅ 24ʜ 90ᴅ*
> ├➩ *.sᴇɴᴅᴅᴍ*
> ┕────────────────❍
> *2025 POWERED BY SKIDDYBMX*`;
          break;
          
        case "6":
          menuTitle = "Search Menu";
          menuResponse = `
*\`sᴇᴀʀᴄʜ-ᴍᴇɴᴜ\`*
> ╭────────────────❍
> ├➩ *.ʏᴛꜱ*
> ├➩ *.ʏᴛᴀ*
> ├➩ *.ᴍᴏᴠɪᴇɪɴғᴏ*
> ├➩ *.ᴍᴏᴠɪᴇ*
> ├➩ *.Gᴏᴏɢʟᴇ*
> ├➩ *.ᴡᴇᴀᴛʜᴇʀ*
> ├➩ *.sᴛɪᴄᴋsᴇᴀʀᴄʜ*
> ┕────────────────❍
> *2025 POWERED BY SKIDDYBMX*`;
          break;
          
        case "7":
          menuTitle = "Main Menu";
          menuResponse = `
*\`ʙᴏᴛ-ᴍᴇɴᴜ\`*
> ╭────────────────❍
> ├➩ *.ᴠᴇʀsɪᴏɴ*
> ├➩ *.ᴘʀᴇᴍɪᴜᴍ*
> ├➩ *.ʀᴇᴘᴏ*
> ├➩ *.ᴍᴇɴᴜ*
> ├➩ *.ᴄʜᴇᴄᴋᴜᴘᴅᴀᴛᴇ*
> ├➩ *.ᴜᴘᴅᴀᴛᴇ*
> ├➩ *.ᴍᴏᴅᴇ*
> ├➩ *.ᴀᴜᴛᴏᴛʏᴘɪɴɢ*
> ├➩ *.ᴀʟᴡᴀʏsᴏɴʟɪɴᴇ*
> ├➩ *.ᴀᴜᴛᴏʀᴇᴄᴏʀᴅɪɴɢ*
> ├➩ *.ᴀᴜᴛᴏʀᴇᴀᴅsᴛᴀᴛᴜs*
> ├➩ *.ᴀɴᴛɪʙᴀᴅ*
> ├➩ *.ᴀᴜᴛᴏsᴛɪᴄᴋᴇʀ*
> ├➩ *.ᴀᴜᴛᴏʀᴇᴘʟʏ*
> ├➩ *.ᴀᴜᴛᴏʀᴇᴀᴄᴛ*
> ├➩ *.ᴀɴᴛɪʟɪɴᴋ*
> ┕────────────────❍
> *2025 POWERED BY SKIDDYBMX*`;
          break;
          
        case "8":
          menuTitle = "Owner Menu";
          menuResponse = `
*\`ᴏᴡɴᴇʀ-ᴍᴇɴᴜ\`*
> ╭────────────────❍
> ├➩ *.ᴜᴘᴅᴀᴛᴇᴄᴍᴅ*
> ├➩ *.sᴇᴛᴛɪɴɢs*
> ├➩ *.ᴏᴡɴᴇʀ*
> ├➩ *.ʀᴇᴘᴏ*
> ├➩ *.ꜱʏꜱᴛᴇᴍ*
> ├➩ *.ꜱᴛᴀᴛᴜꜱ*
> ├➩ *.Aʙᴏᴜᴛ*
> ├➩ *.ʙʟᴏᴄᴋ*
> ├➩ *.ᴇᴠᴀʟ*
> ├➩ *.ᴜɴʙʟᴏᴄᴋ*
> ├➩ *.sʜᴜᴛᴅᴏᴡɴ*
> ├➩ *.ᴄʟᴇᴀʀᴄʜᴀᴛs*
> ├➩ *.sᴇᴛᴘᴘ*
> ├➩ *.ʙʀᴏᴀᴅᴄᴀsᴛ*
> ├➩ *.ᴊɪᴅ*
> ├➩ *.ɢᴊɪᴅ*
> ├➩ *.ᴘᴀɪʀ*
> ├➩ *.sᴀᴠᴇ*
> ├➩ *.ᴄᴀʟᴄ*
> ├➩ *.ʀᴇꜱᴛᴀʀᴛ*
> ├➩ *.sᴇᴛsᴜᴅᴏ*
> ┕────────────────❍
> *2025 POWERED BY SKIDDYBMX*`;
          break;
          
        case "9":
          menuTitle = "Stalk Menu";
          menuResponse = `
*\`ʀᴀɴᴅᴏᴍ-ᴍᴇɴᴜ\`*
> ╭────────────────❍
> ├➩ *.ᴅᴏɢ*
> ├➩ *.ᴄᴀᴛ*
> ├➩ *.ᴅɪᴀʀʏ*
> ├➩ *.ᴀɴɪᴍᴇ*
> ├➩ *.ᴄᴏᴜᴘʟᴇᴘᴘ*
> ├➩ *.ꜰɪɴᴅɴᴀᴍᴇ*
> ├➩ *.ʟᴏʟɪ*
> ├➩ *.ᴡᴀɪꜰᴜ*
> ├➩ *.ᴄᴏsᴘʟᴀʏ*
> ├➩ *.ɴᴇᴋᴏ*
> ├➩ *.ʀᴀɴᴅᴏᴍᴀɴɪᴍᴇ*
> ├➩ *.Sᴇɴᴅɪᴍᴀɢᴇ*
> ├➩ *.ᴀɴɪᴍᴇɢɪʀʟ*
> ├➩ *.ᴀɴɪᴍᴇɢɪʀʟ1*
> ├➩ *.ᴀɴɪᴍᴇɢɪʀʟ2*
> ├➩ *.ᴀɴɪᴍᴇɢɪʀʟ3*
> ├➩ *.ᴀɴɪᴍᴇɢɪʀʟ4*
> ├➩ *.ᴀɴɪᴍᴇɢɪʀʟ5*
> ├➩ *.ᴘɪᴄᴋᴜᴘʟɪɴᴇ*
> ┕────────────────❍
> *©powered by SKIDDYBMX*`;
          break;
          
        default:
          menuTitle = "Invalid Choice";
          menuResponse = "*Invalid Reply Please Reply With A Number Between 1 to 9*";
      }

      // Format the full response with title and description
      const fullResponse = `
╭━━━〔 *${config.BOT_NAME} - ${menuTitle}* 〕━━━┈⊷
┃★╭──────────────
┃★│• Owner : *${config.OWNER_NAME}*
┃★│• User : *${m.pushName}*
┃★│• Prefix : [${prefix}]
┃★│• Version : *1.0.0*
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷

${menuResponse}

> *${config.DESCRIPTION}*`;

      // Send the response with image and context info
      await Matrix.sendMessage(m.from, {
        image: menuImage,
        caption: fullResponse,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363419079746471@newsletter',
            newsletterName: "SKIDDYBMX",
            serverMessageId: 143
          }
        }
      }, {
        quoted: receivedMessage
      });
    });
  }
};

export default menu;
