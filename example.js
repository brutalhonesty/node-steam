var Steam = require('./');

var bot = new Steam.SteamClient();
bot.logOn('username', 'password');

bot.on('connected', function() {
  console.log('Connected!');
});

bot.on('loggedOn', function() {
  console.log('Logged in!');
  bot.setPersonaState(Steam.EPersonaState.Online); // to display your bot's status as "Online"
  bot.setPersonaName('Haruhi'); // to change its nickname
  bot.joinChat('103582791431621417'); // the group's SteamID as a string
});

bot.on('chatInvite', function(chatRoomID, chatRoomName, patronID) {
  console.log('Got an invite to ' + chatRoomName + ' from ' + bot.getFriendPersonaName(patronID));
  bot.joinChat(chatRoomID); // autojoin on invite
});

bot.on('chatMsg', function(chatter, message, chatRoom, msgType) {
  console.log('Received message: ' + message);
  if (message == 'ping') {
    bot.sendChatRoomMessage(chatRoom, 'pong', Steam.EChatEntryType.ChatMsg); // ChatMsg by default
  }
});

bot.on('kicked', function(chatterActedOn, steamIdChat, chatterActedBy) {
  if (chatterActedOn == bot.steamID()) {
    bot.joinChat(steamIdChat);  // autorejoin!
  }
});

bot.on('announcement', function(group, headline) { 
  console.log('Group with SteamID ' + group + ' has posted ' + headline);
});
