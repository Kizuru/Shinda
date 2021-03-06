const snekfetch = require('snekfetch');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    let embed = new RichEmbed().setColor(0xf44141);

    await snekfetch.get(`https://api.takohell.com/v1/images/nom`).set({
            Authorization: client.config.CUTE_API_KEY,
            TypeMine: 'Content-Type: application/json'
        })
        .then(r => {
            embed.addField('Auteur', r.body.auteur, true);
            embed.addField('Type', r.body.type, true).addField('NSFW', r.body.nsfw, true);
            embed.addField('Tags', '`' + r.body.tag.join('`, `') + '`', true);
            embed.setImage(r.body.url);
            return message.channel.send(embed);
        })
        .catch(err => {
            return client.no(message, `Aucune image trouvée, ajoutez en une sur <https://api.takohell.com/> !`);
        });
};

exports.config = {
    aliases: ['neom'],
    permLevel: 0
};

exports.help = {
    name: 'Nom',
    description: 'Voir une image de qqn qui mange un truc ;-;.',
    usage: 'nom',
    category: 'Fun'
};