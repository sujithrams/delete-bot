const Telegraf = require('telegraf');

const bot = new Telegraf('6665822068:AAGh0w8s5-b_8rEIohscFFKbcVy9xMq00MI');

bot.command('deleteall', async (ctx) => {
    let res = await ctx.reply('deleting');
    console.log(res);

    let consecutiveErrors = 0;

    for (let i = res.message_id; i >= 0; i--) {
        console.log(`chat_id: ${ctx.chat.id}, message_id: ${i}`);
        try {
            let res = await ctx.telegram.deleteMessage(ctx.chat.id, i);
            console.log(res);
            consecutiveErrors = 0; // Reset consecutive errors counter on success
        } catch (e) {
            console.error(e);
            consecutiveErrors++;
            if (consecutiveErrors >= 3) {
                console.error(`Too many consecutive errors. Stopping the deletion process.`);
                break;
            }
        }

        // Add a delay between each deletion to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
});

bot.launch();
