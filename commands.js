console.log("SUP!");

var session = {
  startTime:123456789, // timestamp
  endTime:123456789 // timestamp
};

var commands = [{
  timestamp:123456790,// timestamp
  commandName:'Lock', // human readable command
  commandType:'lock', // font awesome icon name without prefix
  createdBy:1, // teacher id
  sentTo:[67,89,100] // student ids
},
{
  timestamp:123456790,// timestamp
  commandName:'shop', // human readable command
  commandType:'calendar', // font awesome icon name without prefix
  createdBy:1, // teacher id
  sentTo:[67,89,100] // student ids
},
{
  timestamp:123456791,// timestamp
  commandName:'grind', // human readable command
  commandType:'cog', // font awesome icon name without prefix
  createdBy:1, // teacher id
  sentTo:[67,89,100] // student ids
}];

var students = [{
  id:67,
  name:'JaneDoe'
}];

var teachers = [{
  id:1,
  name:'Mrs.Teacher'
}];

var timeLineTemplate = '<div class="time-line"> \
      <div class="left-side"></div> \
      <div class="middle"></div> \
      <div class="right-side"></div> \
    </div>';

var layoutTemplate = '<div class="time-stamp"> \
      <div class="initial-text time">10:30am</div> \
      <span class="aHover fa-stack fa-lg"> \
        <i class="fa fa-circle-thin fa-stack-2x"></i> \
        <i class="fa myIcon fa-stack-1x"></i> \
      </span> \
      <div class="hover-space"></div> \
    </div>';

//Given a date, create the right timestamp for the UI
var makeTimeStamp = function(time){
  if(!time || typeof time !== "number"){
    throw new error();
  }
  var result = "";
  var date = new Date(time);
  result = result.concat(date.getHours() % 12).concat(":");
  var mins = date.getMinutes();
  if (mins < 10){
    result = result.concat("0").concat(mins);
  } else {
    result = result.concat(mins);
  }
  if(date.getHours() / 12 > 1){
    result = result.concat("pm");
  } else {
    result = result.concat("am");
  }
  return result;
};


var createHover = function(){

};

//sorts incoming commands by timestamp
var sortCommands = function(a, b){
  if (a.timestamp < b.timeStamp){
    return -1;
  } else if (a.timestamp > b.timestamp){
    return 1;
  } else return 0;
};

//function that takes a timeline entry template and curates it to a command.
var makeTimelineEntry = function(command, students, teachers){
  var result = $(layoutTemplate);
  $(result).find(".time").text(makeTimeStamp(command.timestamp));
  $(result).find(".myIcon").addClass("fa-" + command.commandType);
  $(result).last().addClass(command.id);
  return result;
};


//adds unique ID's to each command so lookups can be done.
var makeIDs = function(commands){
  for(var i = 0; i < commands.length; i ++){
    commands[i].id = "command-"+i;
  }
};

//function that lays out all of the commands onto the timeline with timestamps
var layoutCommands = function(session, commands, students, teachers){
  $(".first").find(".time").text(makeTimeStamp(session.startTime));
  $(".final").find(".time").text(makeTimeStamp(session.endTime));
  commands.sort(sortCommands);
  makeIDs(commands);
  var command;
  var element = $(".first");
  for(var i = 0; i < commands.length; i ++){
    prevCommand = command;
    command = makeTimelineEntry(commands[i], students, teachers);
    if(i === 0){
      $(".first").before(command);
    } else {
      $(prevCommand).before(command);
    }
    $(command).after(timeLineTemplate);
  }
};