

//FC data processing
var fc_data_action=[];
function fetch_data(){
    d3.csv('data/d3/commodities.csv', function(f_data) {
        fc_data_action = d3.nest()
            .key(function(d) { return d.pffID;})
            .rollup(function(d) { 
                return {
                    emp: d3.sum(d, function(g) {return g.emp; }),
                    est: d3.sum(d, function(g) {return g.est; })
                };
            })
            .entries(f_data);
    });
}
function getFCdata(fc, source){
    if(fc_data_action.length < 1){
        fetch_data();
    }
    for(var i = 0; i < fc_data_action.length; i++){
        if(fc_data_action[i].pffID === fc){
            return numeral(fc_data_action[i].values[source]).format('0,0');
        }
    }

}

//Freight Centers
function clkFreightCenter(e) {
    initializeHL(e);
    var fclass;
    header = '<p>' + props.NAME + '</p>',
    content = "<div id='baseInfo'>"
                        +"<div class='datafield'>" + props.CENTER_TYP + "</div><div class='labelfield'>Type</div>"
                        +"<div class='datafield'>" + props.TOWNSHIP_S + "</div><div class='labelfield'>Municipality(ies): </div>"
                        +"</div><!--close baseInfo-->"
                        +"<div class='infoDivider'></div>"
                        +"<div id='indactorInfo'>"
                        +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
                        +"<li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul></ul>"
                        +"<div id='indicator' class='tab-content'><!--tab panes-->"
                        +"<div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>"
                                +"<table class='table table-hover'>"
                                +"<tr class='active'><td><strong>Acres: </strong></td><td>" + numeral(props.ACRES_1).format('0,0.0') + "</td></tr>"
                                +"<tr class='active'><td><strong>Employment: </strong></td><td>"+ getFCdata(props.PFF_ID, 'emp') +"not available</td></tr></table>"
                                +"<tr class='active'><td><strong>Establishments: </strong></td><td>"+ getFCdata(props.PFF_ID, 'emp') +"not available</td></tr></table>"
                        +"</div></div>"
                        +"<div class='labelfield source'>Data Source: " + props.SOURCE + "</div></div>";
                        // +"<p>" + props.REPORT + "</p>";
    if (props.CENTER_TYP === 'Intermediate'){
            fclass = 'fcinter';
    }else if(props.CENTER_TYP === 'Major'){
            fclass = 'fcmajor';
    }else if (props.CENTER_TYP === 'Mega'){
            fclass = 'fcmega';
    }else{}

    featureName = '<p>Type: '+ props.CENTER_TYP +' Freight Center</p>',
    featureClass = ''+ fclass +'cl',
    featureIcon = ''+ fclass +'icon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

//Airports
//commercial/reliever
function clkairport(e) {
    initializeHL(e);
    var aclass;
    header = '<p>(' + props.PFF_ID + ') ' + props.NAME + '</p>',
    content = "<div id='baseInfo'>"
            +"<div class='datafield'>" + props.TYPE + "</div><div class='labelfield'>Type</div>"
            +"<div class='datafield'>" + props.OWNER + "</div><div class='labelfield'>Owner</div>"
            +"<div class='datafield'>" + props.TOWNSHIP + "</div><div class='labelfield'>Municipality(ies): </div>"
            +"</div><!--close baseInfo-->"
            +"<div class='infoDivider'></div>"
            +"<div id='indactorInfo'>"
            +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
            +"<li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>"
            +"<div id='indicator' class='tab-content'><!--tab panes-->"
            +"<div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>"
                    +"<table class='table table-hover'>"
                    +"<tr class='active'><td><strong>Runway(s): </strong></td><td>" + props.CAP_1 + "</td></tr>"
                    +"<tr class='active'><td><strong>Runway Length(s): </strong></td><td> " + props.CAP_2 + " </td></tr>"
                    +"<tr class='active'><td><strong>Total Acreage: </strong></td><td>" + props.CAP_3 + "</td></tr>"
                    +"<tr class='active'><td><strong> <a title='Count of annual takeoffs and landings' data-toggle='infotooltip'>Annual Operations</a>: </strong></td><td> " + numeral(props.ACTIVITY_1).format('0,0') + " </td></tr></table>"
            +"</div></div>"
            +"<div class='labelfield source'>Data Source: " + props.SOURCE + "</div></div>";
    if (props.TYPE === 'Commercial'){
            aclass = 'comm';
    }else if(props.TYPE === 'Reliever'){
            aclass = 'rel';
    } else{}
    featureName = '<p>Type: '+ props.TYPE +' Airport</p>',
    featureClass = ''+ aclass +'aircl',
    featureIcon = ''+ aclass +'icon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};
//heliports
function clkheliport(e) {
    initializeHL(e);
    header = '<p>(' + props.PFF_ID + ") " +props.FACILITY + '</p>',
    content = "<div id='baseInfo'>"
                +"<div class='datafield'>" + props.OWNER + "</div><div class='labelfield'>Owner</div>"
                +"<div class='datafield'>" + props.CITY + "</div><div class='labelfield'>Municipality(ies): </div>"
                +"</div><!--close baseInfo-->"
                +"<div class='infoDivider'></div>"
                +"<div id='indactorInfo'>"
                +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
                +"<li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>"
                +"<div id='indicator' class='tab-content'><!--tab panes-->"
                +"<div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>"
                        +"<table class='table table-hover'>"
                        +"<tr class='active'><td><strong>Diameter: </strong></td><td>" + props.SIZE_ + " ft</td></tr>"
                        +"<tr class='active'><td><strong>Annual Operations: </strong></td><td>not available</td></tr></table>"
                +"</div></div>"
                +"<div class='labelfield source'>Data Source: 2013 DVRPC</div></div>",
    featureName = '<p>Type: Heliport</p>',
    featureClass = 'heliportcl',
    featureIcon = 'heliporticon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

//Energy-Utilities
//pipelines
function clkpipelines(e) {
    initializeHL(e);
    header = '<p>Pipeline</p>',
    content = "<div id='baseInfo'>"
            +"<div class='datafield'>" + props.TYPE + "</div><div class='labelfield'>Material Transported</div>"
            +"<div class='datafield'>" + props.COUNTY + "</div><div class='labelfield'>County</div>"
            +"<div class='labelfield source'>Data Source: " + props.SOURCE + "</div></div>",
    featureName = '<p>Type: Pipeline</p>',
    featureClass = 'energycl',
    featureIcon = 'pipelineicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

//Community
//Freight as Good Neighbor
function clkfgneighbor(e) {
    initializeHL(e);
    header = '<p>Freight as a Good Neighbor</p>',
    content = "<div id='baseInfo'>"
            +"<div class='datafield'>" + props.MUNICIPALI + "</div><div class='labelfield'>Municipality</div>"
            +"<div class='datafield'>" + props.COUNTY + " County</div><div class='labelfield'>County</div>"
            +"<div class='datafield'> " + props.DESCR1 + props.DESCR2 +" "+ props.DESCR3 + " </div>"
            +"<div class='labelfield source'>Data Source: 2012 DVRPC</div></div>",
    featureName = '<p>Type: Freight as a Good Neighbor</p>',
    featureClass = 'communcl',
    featureIcon = 'communicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};



            /////////////////////////////////////////////////////
            //////////////////////////////////////////////////
            /////// Regional Highcharts graphs


$(document).ready(function() {
    
    

    $( 'a[href="#"]' ).click( function(e) {
      e.preventDefault();
     });
    
    /*Highcharts.setOptions({
        chart: {
                type: 'pie',
                backgroundColor: '#396AB2'

            },
        title: {
                verticalAlign: 'middle',
                align: 'center',
                floating: true,
                useHTML: true
            },
        yAxis: {
                title: {
                    text: ''
                }
            },
        credits: {
                enabled: false
            },
        plotOptions: {
                pie: {
                    shadow: false,
                    dataLabels: {
                        enabled: false},
                    borderColor: '#335e9f',
                    borderWidth: 0,
                    colors: ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69'],
                }
            },
        series: [{ 
                size: '230%',
                innerSize: '130%', 
            }]

    });

    $.getJSON('data/valueRegion.json', function(data) {
                    var valueData = [], tonData=[], data1 = data.region, dataLen = data1.length;
                    for (var i = 0; i < dataLen; i++){ 
                        valueData.push({
                            name: data1[i].type,
                            y:  data1[i].value}),
                        tonData.push({
                            name: data1[i].type,
                            y: data1[i].tons
                        })
                    }
                    
                    var ValChart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'containerValue',
                        },
                        
                        title: {
                            text: '<div style="text-align:center;line-height: 0.8;"><span class="chartPrefix">by</span><br><span class="chartLabel">VALUE</span></div>',
                            y: -55
                        },
                        tooltip: {
                            formatter: function() {
                                return '<b>' + this.key + '</b><br/><b>$'+ this.y + '</b> billion<br/>'+ Math.round(this.percentage*100)/100 +'%';
                            }
                        },
                        plotOptions: {
                            pie: {
                                center: ['50%', '-15%'],
                                colors: ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69'],
                                startAngle: 90,
                                endAngle: 270

                            }
                        },
                        series: [{
                            id: 'Values',
                            name: 'Value', 
                            size: '230%',
                            innerSize: '130%', 
                            data: valueData
                        }]
                    });

                    var tonChart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'containerTon',
                        },
                        
                        title: {
                            text: '<div style="text-align:center;line-height: 0.8;"><span class="chartPrefix">by</span><br><span class="chartLabel">TONNAGE</span></div>',
                            y: 55
                        },
                        tooltip: {
                            formatter: function() {
                                return '<b>' + this.key + '</b><br/><b>'+ this.y + '</b> tons<br/>'+ Math.round(this.percentage*100)/100 +'%';
                            }
                        },
                        plotOptions: {
                            pie: {
                                center: ['50%', '120%'],
                                colors: ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69'],
                                startAngle: -90,
                                endAngle: 90

                            }
                        },
                        series: [{
                            id: 'Tons',
                            name: 'Ton', 
                            size: '230%',
                            innerSize: '130%', 
                            data: tonData
                        }]
                    });

     });*/

});
function activateTooltip() {
    $("[data-toggle=infotooltip]").tooltip({ placement: 'left'});
}
//custom button functionality
function modalLink(modal, tab){
    var element =  document.getElementById(modal);
    if (typeof(element) != 'undefined' && element != null){ 
        $('#'+modal+' li:eq('+ tab +') a').tab('show'); 
    }else{
        setTimeout(function(){
          $('#'+modal+' li:eq('+ tab +') a').tab('show');
        }, 0);
    }
} 

//topoJSON handling

L.TopoJSON = L.GeoJSON.extend({  
  addData: function(jsonData) {    
    if (jsonData.type === "Topology") {
      for (key in jsonData.objects) {
        geojson = topojson.feature(jsonData, jsonData.objects[key]);
        L.GeoJSON.prototype.addData.call(this, geojson);
      }
    }    
    else {
      L.GeoJSON.prototype.addData.call(this, jsonData);
    }
  }  
});
// Copyright (c) 2013 Ryan Clark
