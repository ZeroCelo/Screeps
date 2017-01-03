var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var manSourceInit = require('man_source_init');
var manSource = require('man_source');

//manSourceInit.run();

module.exports.loop = function () {
    //TestArea
    
    //Init scripts
    manSourceInit.run();
    
    //-----Debug values
    //console.log('--> Source Status: ' + JSON.stringify(Game.getObjectById('77930773ce4f30e').memory));
    //console.log('--> Source Status: ' + JSON.stringify(Game.getObjectById('8b320773ce4b827').memory));
    /*for(var roomName in Game.rooms){//Loop through all rooms your creeps/structures are in
        var room = Game.rooms[roomName];
        console.log('Room Status: ' + room.name);
        for(var i in room.memory.sources){
            var src = room.memory.sources[i];
            console.log('--> Source Status: ' + JSON.stringify(src_free));
        }
    }*/
    
    //Population control by role
    var pop_harv = 3;
    var pop_buil = 4;
    var pop_up = 5;
    
    //Creeps Memory cleaning
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    /*-----------------------Creep creation by role----------------------- */
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < pop_harv) {
        var bod = [WORK,CARRY,MOVE];
        //var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        var newName = Game.spawns['Spawn1'].createCreep(bod, undefined, {role: 'harvester'});
        console.log('Spawning harvester: ' + newName);
    }
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    
    if(builders.length < pop_buil) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        console.log('Spawning builder: ' + newName);
    }
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgrader: ' + upgraders.length);
    
    if(upgraders.length < pop_up) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning upgrader: ' + newName);
    }
    /*-----------------------Creep creation by role----------------------- */


    //-----Creep running functions
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            creep.memory.srcid = -1;
            if(creep.memory.harvesting == true){
                var src_free = manSource.run(creep);
                //console.log('Harvester Source: ' + JSON.stringify(src_free));
                creep.memory.srcid = src_free.id;
                //if(src_free.workers < src_free.workers_cap)src_free.workers+=1;
                roleHarvester.run(creep,src_free);
            }
            else{
                roleHarvester.run(creep,null);
            }
            
        }
        if(creep.memory.role == 'upgrader') {
            creep.memory.srcid = -1;
            if(creep.memory.upgrading == false){
                var src_free = manSource.run(creep);
                //console.log('Upgrader Source: ' + JSON.stringify(src_free));
                //console.log('Upgrader Source: ' + src_free.id);
                creep.memory.srcid = src_free.id;
                //if(src_free.workers < src_free.workers_cap)src_free.workers+=1;
                roleUpgrader.run(creep,src_free);
            }
            else{
                roleUpgrader.run(creep,null);
            }
        }
        if(creep.memory.role == 'builder') {
            creep.memory.srcid = -1;
            if(creep.memory.building == false){
                var src_free = manSource.run(creep);
                //console.log('Builder Source: ' + JSON.stringify(src_free));
                //console.log('Upgrader Source: ' + src_free.id);
                creep.memory.srcid = src_free.id;
                //if(src_free.workers < src_free.workers_cap)src_free.workers+=1;
                roleBuilder.run(creep,src_free);
            }
            else{
                //if(src_free.workers > 0)src_free.workers-=1;
                roleBuilder.run(creep,null);
            }
        }
    }
    //-----Creep running functions
    
    
    //-----Debug values
    console.log('--> Source Status: ' + JSON.stringify(Game.getObjectById('77930773ce4f30e').memory));
    console.log('--> Source Status: ' + JSON.stringify(Game.getObjectById('8b320773ce4b827').memory));
    /*for(var roomName in Game.rooms){
        var room = Game.rooms[roomName];
        console.log('Room Status: ' + room.name);
        for(var i in room.memory.sources){
            var src = room.memory.sources[i];
            console.log('--> Source Status: ' + JSON.stringify(src_free));
        }
    }*/
}