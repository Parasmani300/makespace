let {rooms} = require('./rooms');
const resetRooms = () => {
    rooms = [
        {
            name:"C-Cave",
            capacity:3,
            status:{
                filled:false,
                start_time:null,
                end_time:null
            }
        },
        {
            name:'D-Tower',
            capacity:7,
            status:{
                filled:false,
                start_time:null,
                end_time:null
            }
        },
        {
            name:'G-Manison',
            capacity:20,
            status:{
                filled:false,
                start_time:null,
                end_time:null
            }
        }
    ]
}
const setActionArray = (lines) => {
    var action_array = [];

    lines.forEach(line => {
        const splitArray = line.trim().split(" ");
        if(splitArray.length > 0){
        if(splitArray[0] === 'VACANCY')
        {
            myAction = {
                type:splitArray[0],
                start_time:splitArray[1],
                end_time:splitArray[2]
            }
            
           action_array = [...action_array,myAction]
        }else if(splitArray[0] === 'BOOK'){
            myAction = {
                type:splitArray[0],
                start_time:splitArray[1],
                end_time:splitArray[2],
                rooms_required:splitArray[3]
            }
            
            action_array = [...action_array,myAction]
        }

    }
        
    })

    return action_array;
}

const isTimeInValid = (time) => {
    const myTime = time.trim().split(":")
    const hh = myTime[0];
    const mm = myTime[1];

    if((parseInt(hh)>= 0 && parseInt(hh) < 24) && (parseInt(mm) >= 0 && parseInt(mm) < 60)){
        return false;
    }else{
        return true;
    }
}

const checkBookingInSameDay = (start_time,end_time) => {
    const start = start_time.split(":");
    const end = end_time.split(":");

    const s_hh = parseInt(start[0]);
    const s_mm = parseInt(start[1]);

    const e_hh = parseInt(end[0]);
    const e_mm = parseInt(end[1]);

    if(s_hh > e_hh)
        return false;
    return true;
}

const isBufferTime = (start_time,end_time) => {
    const start = start_time.split(":");
    const end = end_time.split(":");

    const s_hh = parseInt(start[0]);
    const s_mm = parseInt(start[1]);

    const e_hh = parseInt(end[0]);
    const e_mm = parseInt(end[1]);

    if(
        ((s_hh === 9 && (s_mm > 0 && s_mm < 15)) || ( e_hh === 9 && (e_mm > 0 && e_mm < 15))) ||
        ((s_hh === 13 && (s_mm > 15 && s_mm < 45)) || ( e_hh === 13 && (e_mm > 15 && e_mm < 45))) ||
        ((s_hh === 18 && (s_mm > 45 && s_mm < 60)) || ( e_hh === 18 && (e_mm > 45 && e_mm <= 59)) || ( e_hh === 19 && (e_mm === 0)))
    ){
        return true;
    }

    return false;
}

const checkTimeIn15MinInterval = (start_time,end_time) => {
    const start = start_time.split(":");
    const end = end_time.split(":");
    const s_mm = parseInt(start[1]);
    const e_mm = parseInt(end[1]);

    if(s_mm%15 != 0 || e_mm%15 != 0)
        return false;
    return true;
}

const findMeARoom = (requirement) => {
    const myStartTime = requirement.start_time;
    const myEndTime = requirement.end_time;
    
    const start_arr = myStartTime.split(":");
    const s_hh = parseInt(start_arr[0]);
    const s_mm = parseInt(start_arr[1]);

    
    const required_room = rooms.filter(room => {
        const roomEndTime = room.status.end_time;
        
        if(roomEndTime === null && requirement.rooms_required <= room.capacity){
            return true;
        }else if(roomEndTime !== null){
            const endTime = roomEndTime.split(":");
            const e_hh = parseInt(endTime[0]);
            const e_mm = parseInt(endTime[1]);

            if((s_hh > e_hh || (s_hh === e_hh && (s_mm >= e_mm))) && requirement.rooms_required <= room.capacity)
            {
                return true;
            }
        }
        
        return false;
    })

    if(required_room == null || required_room === undefined || required_room.length === 0)
    {
        // console.log('NO_VACANT_ROOM');
        return 'NO_VACANT_ROOM';
    }

    const tagged_room = required_room.sort((a,b) => a.capacity - b.capacity)[0];
    
    // console.log(tagged_room.name);
    rooms = [...rooms.filter(room => room != tagged_room),{...tagged_room,status:{
        filled:true,
        start_time:myStartTime,
        end_time:myEndTime
    }}]

    return tagged_room.name;
}

const getVacantRoom = (requirement) => {
    const myStartTime = requirement.start_time;
    const myEndTime = requirement.end_time;
    
    const start_arr = myStartTime.split(":");
    const s_hh = parseInt(start_arr[0]);
    const s_mm = parseInt(start_arr[1]);

    
    var required_room = rooms.filter(room => {
        const roomEndTime = room.status.end_time;
        
        if(roomEndTime === null){
            return true;
        }else if(roomEndTime !== null){
            const endTime = roomEndTime.split(":");
            const e_hh = parseInt(endTime[0]);
            const e_mm = parseInt(endTime[1]);

            if((s_hh > e_hh || (s_hh === e_hh && (s_mm >= e_mm))))
            {
                return true;
            }
        }
        
        return false;
    })

    if(required_room == null || required_room === undefined || required_room.length === 0)
    {
        // console.log('NO_VACANT_ROOM');
        return 'NO_VACANT_ROOM';
    }

    var printStr = "";
    required_room.forEach(room =>
       printStr = printStr + room.name + " ");
    // console.log(printStr);
    return printStr;
}

module.exports = {
    setActionArray,
    isTimeInValid,
    checkBookingInSameDay,
    isBufferTime,
    checkTimeIn15MinInterval,
    findMeARoom,
    getVacantRoom,
    resetRooms}