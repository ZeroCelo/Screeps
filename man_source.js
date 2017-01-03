/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('man_source');
 * mod.thing == 'a thing'; // true
 */

var manSource = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //Game.rooms[creep.room.id].memory.sources[0];
        //var src_free = creep.room.memory.sources[0];
        //var src_free = Game.rooms[creep.room.id].sources[0];
        //var src_free_dist = PathFinder.search(creep.pos,src_free.pos);
        var src_short = null;
        var src_short_dist = null;
        var src_free = null;
        var src_free_dist = null;
        for(var i in creep.room.memory.sources){
            var src = creep.room.memory.sources[i];
            //console.log('SourceFor: ' + JSON.stringify(src));
            //console.log('SourceFor: ' + src.pos.x);
            if(!src_free){
                src_free = src;
                //src_free_dist = PathFinder.search(creep.pos,src_free.pos);
                src_free_dist = PathFinder.search(creep.pos, {pos: src.pos, range: 1});
                src_short = src;
                src_short_dist = src_free_dist;
            }
            else{
                //var src_dist = PathFinder.search(creep.pos,src.pos);
                var src_dist = PathFinder.search(creep.pos, {pos: src.pos, range: 1});
                if(src_dist.cost < src_short_dist.cost){
                    src_short = src;
                    src_short_dist = src_dist;
                }
                if(src.workers < src.workers_cap){
                    if(src_free.workers >= src_free.workers_cap){
                        src_free = src;
                        src_free_dist = src_dist;
                    }
                }
                /*if(src_dist.cost < src_free_dist.cost){
                    src_free = src;
                    src_free_dist = src_dist;
                }*/
            }
        }
        if(src_free.id != src_short.id) return src_free;
        else return src_short;
    }
};

module.exports = manSource;