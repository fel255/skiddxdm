const { cmd } = require('../command');
const config = require('../config');

// ============================
// 🔁 .vv — Forward quoted message
// ============================
cmd(
  {
    pattern: 'vv',
    alias: ['sendme'],
    react: '👀',
    desc: 'Owner Only - Forwards quoted message back to user',
    category: 'owner',
    filename: __filename,
  },
  async (bot, message, args, { from: sender, isOwner }) => {
    try {
      if (!isOwner) {
        return await bot.sendMessage(
          sender,
          { text: '*📛 This is an owner-only command.*' },
          { quoted: message }
        );
      }

      if (!args.quoted) {
        return await bot.sendMessage(
          sender,
          { text: '*👀 Please reply to a message to save it!*' },
          { quoted: message }
        );
      }

      const mediaData = await args.quoted.download();
      const messageType = args.quoted.mtype;
      const options = { quoted: message };
      let forwardData = {};

      switch (messageType) {
        case 'imageMessage':
          forwardData = {
            image: mediaData,
            caption: args.quoted.text || '',
            mimetype: args.quoted.mimetype || 'image/jpeg',
          };
          break;

        case 'videoMessage':
          forwardData = {
            video: mediaData,
            caption: args.quoted.text || '',
            mimetype: args.quoted.mimetype || 'video/mp4',
          };
          break;

        case 'audioMessage':
          forwardData = {
            audio: mediaData,
            mimetype: 'audio/mp4',
            ptt: args.quoted.ptt || false,
          };
          break;

        case 'stickerMessage':
          forwardData = { sticker: mediaData };
          break;

        case 'documentMessage':
          forwardData = {
            document: mediaData,
            mimetype: args.quoted.mimetype || 'application/octet-stream',
            fileName: args.quoted.fileName || 'document',
          };
          break;

        default:
          if (args.quoted.text) {
            forwardData = { text: args.quoted.text };
          } else {
            return await bot.sendMessage(
              sender,
              { text: '❌ Unsupported message type for forwarding' },
              { quoted: message }
            );
          }
      }

      await bot.sendMessage(sender, forwardData, options);

    } catch (error) {
      console.error('Forward Error:', error);
      await bot.sendMessage(
        sender,
        { text: '❌ Error forwarding message:\n' + error.message },
        { quoted: message }
      );
    }
  }
);

// ============================
// 👁️ .tovv — Make media view-once
// ============================
cmd(
  {
    pattern: 'tovv',
    alias: ['toviewonce'],
    react: '📥',
    desc: 'Owner Only - Converts quoted image/video to view-once',
    category: 'owner',
    filename: __filename,
  },
  async (bot, message, args, { from: sender, isOwner }) => {
    try {
      if (!isOwner) {
        return await bot.sendMessage(
          sender,
          { text: '*📛 This is an owner-only command.*' },
          { quoted: message }
        );
      }

      if (!args.quoted) {
        return await bot.sendMessage(
          sender,
          { text: '*👀 Please reply to a message to transform it into a view-once media!*' },
          { quoted: message }
        );
      }

      let mediaData;
      try {
        mediaData = await args.quoted.download();
      } catch (err) {
        console.error('Download Error:', err);
        return await bot.sendMessage(
          sender,
          { text: '❌ Error downloading the media:\n' + err.message },
          { quoted: message }
        );
      }

      const messageType = args.quoted.mtype;
      const options = { quoted: message };
      let forwardData = {};

      switch (messageType) {
        case 'imageMessage':
          forwardData = {
            image: mediaData,
            caption: args.quoted.text || '',
            mimetype: args.quoted.mimetype || 'image/jpeg',
            viewOnce: true,
          };
          break;

        case 'videoMessage':
          forwardData = {
            video: mediaData,
            caption: args.quoted.text || '',
            mimetype: args.quoted.mimetype || 'video/mp4',
            viewOnce: true,
          };
          break;

        default:
          return await bot.sendMessage(
            sender,
            { text: '❌ Only image and video messages can be sent as view-once.' },
            { quoted: message }
          );
      }

      await bot.sendMessage(sender, forwardData, options);

    } catch (error) {
      console.error('ViewOnce Error:', error);
      await bot.sendMessage(
        sender,
        { text: '❌ Error sending view-once message:\n' + error.message },
        { quoted: message }
      );
    }
  }
);
