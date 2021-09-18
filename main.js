const fs = require('fs');
const {
    setActionArray,
    isTimeInValid,
    checkBookingInSameDay,
    isBufferTime,
    checkTimeIn15MinInterval,
    findMeARoom,
    getVacantRoom,
    resetRooms} = require('./component/helper');

function main(filename)
{
    var output = [];
    var action_array = [];
    
    var lines = fs.readFileSync(filename,'utf-8')
            .split("\r\n")
            .filter(Boolean);
    
    action_array = setActionArray(lines);

    action_array.forEach(action => {
        if(isTimeInValid(action.start_time) || isTimeInValid(action.end_time) || !checkBookingInSameDay(action.start_time,action.end_time)){
            // console.log('INCORRECT_INPUT');
            output.push('INCORRECT_INPUT');
            return;
        }
    
        if(!checkTimeIn15MinInterval(action.start_time,action.end_time))
        {
            // console.log('INCORRECT_INPUT');
            output.push('INCORRECT_INPUT');
            return;
        }
    
        if(isBufferTime(action.start_time,action.end_time)){
            // console.log('NO_VACANT_ROOM');
            output.push('NO_VACANT_ROOM');
            return;
        }
    
    
        if(action.type === 'BOOK' && (action.rooms_required < 2 || action.rooms_required > 20))
        {
            // console.log('NO_VACANT_ROOM');
            output.push('NO_VACANT_ROOM');
            return;
        }
    
        if(action.type === 'BOOK'){
            const myRoom = findMeARoom(action)
            output.push(myRoom);
        }else if(action.type === 'VACANCY'){
            const myRoom = getVacantRoom(action);
            output.push(myRoom)
        }
    })

    resetRooms();
    return output;
}

module.exports = {main};