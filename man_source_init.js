/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('man_source_init');
 * mod.thing == 'a thing'; // true
 */

var manSourceInit = {

    /** @param {Creep} creep **/
    run: function() {

        for(var roomName in Game.rooms){//Loop through all rooms your creeps/structures are in
            var room = Game.rooms[roomName];
            console.log('SourceInit Room: ' + room.name);
            if(!room.memory.sources){//If this room has no sources memory yet
                //console.log('Type: ' + JSON.stringify(ter));
                room.memory.sources = {}; //Add it
            }
            else{//The memory already exists so lets add a shortcut to the sources its memory
                delete room.memory.sources;
                room.memory.sources = {}; //Add it
                /*var sources = room.find(FIND_SOURCES);//Find all sources in the current room
                for(var i in sources){
                    var source = sources[i];
                    source.memory = room.memory.sources[source.id]; //Set the shortcut
                    //if(!source.memory.workers_cap)source.memory.workers_cap=0;
                    //if(!source.memory.workers)source.memory.workers=0;
                    //console.log('Source Init: ' + JSON.stringify(source));
                }*/
            }
            
            var sources = room.find(FIND_SOURCES);//Find all sources in the current room
            for(var i in sources){
                var source = sources[i];
                var position = sources[i].pos;
                //JSON.parse(position);
                source.memory = room.memory.sources[source.id] = {}; //Create a new empty memory object for this source
                //Now you can do anything you want to do with this source
                //for example you could add a worker counter:
                source.memory.id = source.id;
                source.memory.pos = position;
                //source.memory.pos = JSON.parse(position);
                source.memory.workers_cap = 0;
                source.memory.workers = 0;
                //console.log('Source: ' + JSON.stringify(source));
            
                //console.log('SourcePos: (' + source.pos.x + ' , ' + source.pos.y + ')');
                //console.log('SourcePos: (' + (source.pos.x - 1) + ' , ' + (source.pos.y - 1) + ')');
                //console.log('SourcePos: (' + (source.pos.x + 1) + ' , ' + (source.pos.y + 1) + ')');
                var terrain = room.lookAtArea(source.pos.y - 1, source.pos.x - 1,source.pos.y + 1, source.pos.x + 1,true);
                //var terrain = Game.rooms[0].lookForAtArea(LOOK_TERRAIN, 28, 4,30, 6);
                for(var i in terrain){
                    var ter = terrain[i];
                    //if(!ter.pos.x == source.pos.x && !ter.pos.y == source.pos.y)
                    if(ter.type == 'terrain'){
                        if(ter.terrain != 'wall'){
                            source.memory.workers_cap += 1;
                            //console.log('Terrain: ' + JSON.stringify(ter));
                        }
                    }
                    //console.log('Terrain: ' + JSON.stringify(ter));
                }
                //console.log('SourceMem: ' + source.memory.workers_cap);
                //console.log('Type: ' + JSON.stringify(terrain));
                //terrain[5][10] == 'plain'; // tile at y=5 x=10 is plain land
                //console.log('Source Init: ' + source.memory.workers_cap);
                //console.log('Source Init: ' + JSON.stringify(source));
            }
        }
    }
};

module.exports = manSourceInit;