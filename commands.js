console.log("SUP!");

var session = {
  startTime:123456789, // timestamp
  endTime:123456789 // timestamp
};

var commands = [{
  timestamp:123456789,// timestamp
  commandName:'Lock', // human readable command
  commandType:'lock', // font awesome icon name without prefix
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


var layoutCommands = function(session, commands, students, teachers){

};

    // <div class="time-stamp">
    //   <div class="initial-text">10:30am</div>
    //   <span class="fa-stack fa-lg">
    //     <i class="fa fa-circle-thin fa-stack-2x"></i>
    //     <i class="fa fa-lock fa-stack-1x"></i>
    //   </span>
    //   <div class="hover-space"></div>
    // </div>
    // <div class="time-line">
    //   <div class="left-side"></div>
    //   <div class="middle"></div>
    //   <div class="right-side"></div>
    // </div>