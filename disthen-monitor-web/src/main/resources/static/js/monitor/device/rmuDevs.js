var assetLink,statusInfo,cardId,lockId,interval = 0,rmuImg,/*Atemp,Btemp,Ctemp,*/FStatus,ARunPower,BRunPower,CRunPower,OutageStatus,Amdts,Bmdts,Cmdts;
$(document).ready(function() {
    // Atemp=$("#Atemp");
    // Btemp=$("#Btemp");
    // Ctemp=$("#Ctemp");
    Amdts = $("#Amdts");
    Bmdts = $("#Bmdts");
    Cmdts = $("#Cmdts");
    rmuImg=$("#rmuImg");
    FStatus=$("#FStatus");
    OutageStatus=$("#OutageStatus");
    ARunPower=$("#ARunPower");
    BRunPower=$("#BRunPower");
    CRunPower=$("#CRunPower");
    statusInfo = $("#statusInfo");
    assetLink = $("#assetLink");
    updateRmu();
    clearInterval(interval);
    //定时刷新页面数据
    interval = setInterval(updateRmu, 5000);

});

function updateRmu(){
    var selectedDevice=window.top.scopeToShare.selectedRmu;
    updateRmuNode(selectedDevice);
}

function updateRmuNode(node) {
    var cables = node.bindlogiccables;
    var onlineStat=node.onlineStat;
    var sInfo="<font size=2><b>当前状态&nbsp;:&nbsp;</b>"+('on'==onlineStat?"<font color=green>在线</font>":"离线")+"&nbsp;&nbsp;<b>最新时间&nbsp;:&nbsp;</b>"+(node.lastedDataTimeStr==null?"无":node.lastedDataTimeStr)+"</b></font>";
    statusInfo.html(sInfo);
    if(node.assetId&&node.assetId!='0'){
        assetLink.attr("href","/pro_asset/assetInfo?assetId="+node.assetId);
        assetLink.show();
    }
    cables && $.each(cables, function(index, ts) {
        var type = ts.dataType, value = ts.value;
        // if (type == "RmuCh1") {
        //     $("#Atemp_N").css("visibility","visible");
        //     $("#Atemp").css("visibility","visible");
        //     lockId = ts.id;
        //     Atemp.text(value+"℃");
        // }else if(type == "RmuCh2") {
        //     $("#Btemp_N").css("visibility","visible");
        //     $("#Btemp").css("visibility","visible");
        //     lockId = ts.id;
        //     Btemp.text(value+"℃");
        // }else if(type == "RmuCh3") {
        //     $("#Ctemp_N").css("visibility","visible");
        //     $("#Ctemp").css("visibility","visible");
        //     lockId = ts.id;
        //     Ctemp.text(value+"℃");
        //}

        if(type == "RmuCh4") {
            $("#ARunPower_N").css("visibility","visible");
            $("#ARunPower").css("visibility","visible");
            lockId = ts.id;
            ARunPower.text(value+"A");
        }else if(type == "RmuCh5") {
            $("#BRunPower_N").css("visibility","visible");
            $("#BRunPower").css("visibility","visible");
            lockId = ts.id;
            BRunPower.text(value+"A");
        }else if(type == "RmuCh6") {
            $("#CRunPower_N").css("visibility","visible");
            $("#CRunPower").css("visibility","visible");
            lockId = ts.id;
            CRunPower.text(value+"A");
        }else if(type == "RmuCh7") {
            $("#OutageStatus_N").css("visibility","visible");
            $("#OutageStatus").css("visibility","visible");
            lockId = ts.id;
            if("1"==value){
                rmuImg.attr('src','../../../static/images/monitor/rmu_alarm.gif');
                OutageStatus.html("<font color=red>正常</font>");
            }else{
                rmuImg.attr('src','../../../static/images/monitor/rmu.png');
                OutageStatus.html("<font color=green>断电</font>");
            }
        }else if(type == "RmuCh8") {
            $("#FStatus_N").css("visibility","visible");
            $("#FStatus").css("visibility","visible");
            lockId = ts.id;
            if("1"==value){
                rmuImg.attr('src','../../../static/images/monitor/rmu_alarm.gif');
                FStatus.html("<font color=red>故障</font>");
            }else{
                rmuImg.attr('src','../../../static/images/monitor/rmu.png');
                FStatus.html("<font color=green>正常</font>");
            }
        }else if(type == "RmuCh10") {
            $("#Amdts_N").css("visibility","visible");
            $("#Amdts").css("visibility","visible");
            lockId = ts.id;
            Amdts.text(value+"℃");
        }else if(type == "RmuCh11") {
            $("#Bmdts_N").css("visibility","visible");
            $("#Bmdts").css("visibility","visible");
            lockId = ts.id;
            Bmdts.text(value+"℃");
        }else if(type == "RmuCh12") {
            $("#Cmdts_N").css("visibility","visible");
            $("#Cmdts").css("visibility","visible");
            lockId = ts.id;
            Cmdts.text(value+"℃");
        }
    });
}
