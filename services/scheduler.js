const schedule= require('node-schedule'); 

function matching(){
    console.log("매칭 시작");
    //매칭로직
}

const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;

const job = schedule.scheduleJob(rule, matching());