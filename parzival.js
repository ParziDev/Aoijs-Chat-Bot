const parzival = require("aoi.js")
var fs = require('fs')
const parzi = new parzival.Bot({
    token:process.env.token,
    prefix:"."
})
parzi.onJoined()
parzi.onLeave()
parzi.onMessage()
var reader = fs.readdirSync("./komutlar/").filter(file => file.endsWith(".js"))
for(const file of reader) {    
    const command = require(`./komutlar/${file}`)
    parzi.command({
        name: command.name,
        code: command.code,
        aliases: command.aliases
    })
}

////////// STATUS \\\\\\\\\\\
parzi.status({
  text:"ParzivâL Chat Bot Altyapısı",
  type:"PLAYING",
  status:"dnd",
  time: 12
  })

////////// VARİABLES \\\\\\\\\\
parzi.variables({
  chatbot:""
  })

/////////// COMMANDS \\\\\\\\\\
parzi.command({
  name:"chatbot",
  code:`
  $if[$message[1]==ayarla]
  ✅ ChatBot kanalı <#$mentionedChannels[1]> olarak ayarlandı!
  $setServerVar[chatbot;$mentionedChannels[1]]
  $onlyIf[$mentionedChannels[1]!=;❎ Bir kanal etiketle.]
  $onlyIf[$getServerVar[chatbot]==;❎ ChatBot kanalı zaten ayarlanmış.]
  $endif
  $if[$message[1]==sıfırla]
  ✅ ChatBot kanalı sıfırlandı!
  $setServerVar[chatbot;]
  $onlyIf[$getServerVar[chatbot]!=;❎ ChatBot kanalı zaten ayarlanmamış.]
  $endif
  $onlyIf[$checkContains[$toLowercase[$message[1]];ayarla;sıfırla]==true;❎ **ayarla** , **sıfırla** seçenekilerini kullanın.]
  $onlyPerms[admin;❎ Bunu kullanamazsın.]
  `
  })

parzi.command({
  name:"$alwaysExecute",
  code:`
  $reply[$messageID;$jsonRequest[https://api.codare.fun/sor/$replaceText[$message; ;+;-1];cevap];yes]
  $onlyForChannels[$getServerVar[chatbot];]
  `
})
