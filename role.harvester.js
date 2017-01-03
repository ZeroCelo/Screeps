var roleHarvester = {

    /** @param {Creep} creep **/
    
    //run: function(creep) {
    run: function(creep,src) {
        if(creep.carry.energy < creep.carryCapacity) {
            creep.memory.harvesting = true;
            //creep.say('harvesting');
            
        }
        else {
            creep.memory.harvesting = false;
            //creep.say('moving');
        }
        
        
        if(creep.memory.harvesting){
            /*var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }*/
            
            if(src){
                var srce = Game.getObjectById(src.id);
                if(creep.harvest(srce) == ERR_NOT_IN_RANGE){
                    creep.moveTo(srce);
                    //if(srce.memory.workers < srce.memory.workers_cap)srce.memory.workers+=1;
                    var src_dist = PathFinder.search(creep.pos,src.pos);
                    var min_cost = 10;
                    if(src_dist.cost <= min_cost){
                        if(srce.memory.workers < srce.memory.workers_cap)srce.memory.workers+=1;
                    }
                }
                else{
                    if(srce.memory.workers < srce.memory.workers_cap)srce.memory.workers+=1;
                }
                //srce.workers+=1;
                //console.log('SourceFor: ' + JSON.stringify(sources[0]));
                //console.log('SourceFor: ' + JSON.stringify(src));
            }
            else{
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)creep.moveTo(sources[0]);
                
            }
        }
        else{
            if(creep.memory.srcid != -1){
                var srce = Game.getObjectById(creep.memory.srcid);
                if(srce.memory.workers > 0)srce.memory.workers-=1;
                creep.memory.srcid = -1;
            }
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                creep.memory.working = false;
                var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
                creep.moveTo(spawn);
            }
        }
    }
};

module.exports = roleHarvester;