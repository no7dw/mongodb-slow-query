var j=0;
var _DEF_TIME=10; //设置慢查询时间
for (var i in db.currentOP().inprog) {
    var op = "";
    var opid;
    var memProg={}
    if (typeof(undefined) == typeof(db.currentOP().inprog[i])) {
        continue;
    }
    memProg=db.currentOP().inprog[i];
    op = memProg.op;
    opid = memProg.opid;
    print(i);
    if (op=="query") {
        if (memProg.hasOwnProperty('secs_running')) {
            var useTime  = memProg.secs_running;
            if (useTime >= _DEF_TIME) {
                db.killOp(opid);
                j++;
                print("killed "+j+ memProg.ns + " "+ memProg.query+" Query Operation!");
            }
        }
    }
}
//./mongo 10.15.107.154:30000 < ./killslow.js
