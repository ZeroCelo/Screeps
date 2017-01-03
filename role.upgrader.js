var roleUpgrader = {
    
    /** @param {Creep} creep **/
    //run: function(creep) {
    run: function(creep,src) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('U: harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('U: Control');
        }


        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            if(creep.memory.srcid != -1){
                var srce = Game.getObjectById(creep.memory.srcid);
                if(srce.memory.workers > 0)srce.memory.workers-=1;
                creep.memory.srcid = -1;
            }
        }
        else {
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
                
                //console.log('SourceFor: ' + JSON.stringify(sources[0]));
                //console.log('SourceFor: ' + JSON.stringify(src));
            }
            else{
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)creep.moveTo(sources[0]);
            }
        }
    }
};

module.exports = roleUpgrader;