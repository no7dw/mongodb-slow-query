var LONG_TIME=10; //slow query secs
for (var i in db.currentOP().inprog) {
    var op = "";
    var opid;
    var memProg={}
    if (typeof(undefined) == typeof(db.currentOP().inprog[i])) {
        continue;
    }
    memProg=db.currentOP().inprog[i];
    if(!memProg) continue;
    
    op = memProg.op;
    ns = memProg.ns;
    cmd = JSON.stringify(memProg.command);
    opid = memProg.opid;
   
    if (op=="query"|| (op=="getmore" && ns != "local.oplog.rs" )|| (op== "command" )) { 
        if (memProg.hasOwnProperty('secs_running')) {
            var useTime  = memProg.secs_running;
            if (useTime >= LONG_TIME) {
                db.killOp(opid);
                
                print("killed "+ memProg.ns + " "+  op +" Operation!");
            }
        }
    }
}
//mongo localhost:37017 < ./killslow.js
