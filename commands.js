//Command Timeline by Adam Hedgpeth

//Below is simply some sample data used for testing.
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
  sentTo:[67,89,100,44,55,66,99] // student ids
}];

var students = [{
  id:67,
  name:'JaneDoe'
},
{
  id:89,
  name:'JohnDoe'
},
{
  id:100,
  name:'OldBlue'
},
{
  id:44,
  name:'JohnDoe'
},
{
  id:55,
  name:'OldBlue'
},
{
  id:66,
  name:'JohnDoe'
},
{
  id:99,
  name:'OldBlue'
}];

var teachers = [{
  id:1,
  name:'Mrs.Teacher'
}];


//The templates below are used to populate timeline data.
var timeLineTemplate = '<div class="time-line add"> \
      <div class="left-side"></div> \
      <div class="middle"></div> \
      <div class="right-side"></div> \
    </div>';

var layoutTemplate = '<div class="time-stamp entry"> \
      <div class="initial-text time">10:30am</div> \
      <span class="fa-stack fa-lg"> \
        <i class="fa fa-circle-thin fa-stack-2x"></i> \
        <i class="fa myIcon fa-stack-1x"></i> \
      </span> \
      <div class="bubble-container bubble-hide add"> \
        <div class="bubble-aarow"></div> \
        <div class="bubble"> \
          <div id="command-name" class="bubble-text bold">blah</div> \
          <div id="teacher-name" class="bubble-text">blah</div> \
          <div id="student-count" class="bubble-text bold">blah</div> \
          <div id="student-names" class="bubble-text">blah blah blah blah blah blah blah</div> \
          <div id="more-link" class="bubble-text more bubble-hide"></div> \
        </div> \
      </div> \
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

//Given an ID and a student array, return the student name.
var findStudentName = function(id, students){
  for (var i = 0; i < students.length; i ++){
    if(students[i].id === id){
      return students[i].name;
    }
  }
  return undefined;
};

//Given an ID and a teacher array, return the teacher name.
var findTeacherName = function(id, teachers){
  for (var i = 0; i < teachers.length; i ++){
    if(teachers[i].id === id){
      return teachers[i].name;
    }
  }
  return undefined;
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
//quite a bit of jquery here.  But I was glad to be able to do this in a 
//modular way.
var makeTimelineEntry = function(command, students, teachers){
  var result = $(layoutTemplate);
  $(result).find(".time").text(makeTimeStamp(command.timestamp));
  $(result).find(".myIcon").addClass("fa-" + command.commandType);
  $(result).last().addClass(command.id);
  console.log(findTeacherName(command.createdBy, teachers));
  $(result).find("#command-name").text(command.commandName.toUpperCase());
  $(result).find("#teacher-name").text("Sent by " + findTeacherName(command.createdBy, teachers));
  $(result).find("#student-count").text(("Sent to " + command.sentTo.length + " students").toUpperCase());
  var studentNames = "";
  for(var i = 0; i < command.sentTo.length && i < 6; i ++){
    studentNames = studentNames.concat(findStudentName(command.sentTo[i], students));
    if(i < command.sentTo.length - 1 && i < 5){
      studentNames = studentNames.concat(", ");
    }
  }
  if(command.sentTo.length > 6){
    $(result).find(".more").text("(and " + (command.sentTo.length - 6) + " more)");
    $(result).find(".more").removeClass("bubble-hide");
    $(result).find(".more").data("id", command.id);
    $(result).find("#student-names").addClass("more");
  }
  $(result).find("#student-names").text(studentNames);
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
  //capture the commands passed for future functions to use.
  session = session;
  commands = commands;
  students = students;
  teachers = teachers;
  //remove all previous timeline entries.
  $(".entry").remove();
  $(".add").remove();
  $(".first").find(".time").text(makeTimeStamp(session.startTime));
  $(".final").find(".time").text(makeTimeStamp(session.endTime));
  commands.sort(sortCommands);
  makeIDs(commands);
  //add the commands to the timeline one by one.
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

//A function that removes all hovers.
var removeHovers = function(){
  var bubbles = $(".bubble-container");
  for(var i = 0; i < bubbles.length; i ++){
    $(bubbles[i]).addClass("bubble-hide");
  }
};

$(document).ready(function(){
  //When the document is clicked, check if it is a timeline entry
  //and expand the bubble.  If it is a more link, expand the student
  //names.
  $("body").click(function(obj){
    var myObj = $(obj.target).parent().parent();
    if($(obj.target).data("id")){
      console.log("Time to show more students.");
      var myId = $(obj.target).data("id");
      var studentNames = "";
      for(var i = 0; i < commands.length; i ++){
        if(commands[i].id === myId){
          for(var j = 0; j < commands[i].sentTo.length; j ++){
            studentNames = studentNames.concat(findStudentName(commands[i].sentTo[j], students));
            if(j < commands[i].sentTo.length - 1){
              studentNames = studentNames.concat(", ");
            }
          }
        }
      }
      $(obj.target).parent().find("#student-names").text(studentNames);
      $(obj.target).addClass("bubble-hide");
    //check if it is a timeline entry and make the corresponding hover visible.
    } else if($(myObj).hasClass("entry")){
      removeHovers();
      $(myObj).find(".bubble-container").removeClass("bubble-hide");
    }
  });

});