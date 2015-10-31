$(function() {
	
	//****************************
	// preset variables
	var packer = sm.packer();
			
	var currDir = 'in',
		measure = 'ton', 
		mode = 'all',
		currCty = 42017,
		county = 'none', 
		target = 'network',
		dt_width = $('#content').width(), 
		singleComm, bLabel, commItem, circle_scaler, offset, county_data,
		projection = d3.geo.albersUsa().scale(900).translate([dt_width, 430 / 2]);
		
	var tabs = {'region':'Overview','network':'Network','freight_centers':'Freight Centers','domestic_trade':'Domestic Trade Patterns'},
		countyCodes = {'bucks':42017,'burlington':34005,'camden':34007,'gloucester':34015,'mercer':34021,'chester':42029,'delaware':42045,'montgomery':42091,'philadelphia':42101};
	
	//******************************
	// launch initial page
	var url = document.location.toString();
		if (url.match('#')) {
			var hash_load = url.split('#')[1].split('/');
			if(hash_load.length > 1){
				region_navigation(hash_load);
			}else{
				buildCountyMap();
			}   
		}
	function buildCountyMap(){
		var ct_width = $('#c-map-wrapper').width(),
			ct_height = 420 ;
		if ($('#c-region-map').length === 0) {
			d3.json('data/county5k.js', function(county5k) {
				county_data = county5k;
				var svg = d3.select('#c-county-map').append('svg')
					.attr('width', ct_width)
					.attr('height', ct_height)
					.attr('id', 'c-region-map');
			
				var counties = svg.append('g')
						.attr('width', ct_width)
						.attr('height', ct_height)
						.attr('id', 'counties');
				var county_labels = svg.append('g')
						.attr('width', ct_width)
						.attr('height', ct_height)
						.attr('id', 'cty_labels');
				var cty_projection = d3.geo.mercator().scale(1).translate([0, 0]).precision(0);

                var cty_path = d3.geo.path().projection(cty_projection);
                var bounds = cty_path.bounds(county5k);

                var c_scale = 1 / Math.max((bounds[1][0] - bounds[0][0]) / (ct_width), ((bounds[1][1] - bounds[0][1]) / ct_height));

                var transl = [(ct_width - c_scale * (bounds[1][0] + bounds[0][0])) / 2, (ct_height - c_scale * (bounds[1][1] + bounds[0][1])) / 2];

                cty_projection.scale(c_scale).translate(transl);

				counties.selectAll('path')
					.data(county5k.features) 
					.enter().append('path')
					.attr('d', cty_path)
					.attr('id', function(d) { return 'c-'+d.properties.NAME.toLowerCase();})
					.attr('class','county_outlines')
					.on("mouseover",function(){
					  	var sel = d3.select(this);
					  	sel.moveToFront();
					}) 
					.on('click', function(){
						$('#c-county-prompt').hide();
						var county_str = d3.select(this).attr('id').split('-');
						county = county_str[1];
						currCty = countyCodes[county];
						window.location.hash = 'region/'+county+'/'+target; 
						
						//$('#c-steps li a[data-target='+target+'] ').trigger('click');
					});
				var label = county_labels.selectAll("text")
				    .data(county5k.features)
				    .enter()
				    .append("text")
				      .attr("class", "c-county-label")
				      .attr("transform", function(d) { return "translate(" + cty_path.centroid(d) + ")"; })
				      .text(function(d) { return d.properties.NAME;} );
			});
		}
	}

	function region_navigation(hash_elem){
		county = (hash_elem.length > 1) ? hash_elem[1] : 'none';
		target = (hash_elem.length > 1) ? hash_elem[2] : 'region';
		currCty = countyCodes[county];
		//$('#content').empty().html('');
		var el = $('#c-steps li a[data-target="c-'+target+'"] ');
		$('.c-step-current').find('svg.c-step-nav circle:first').attr('r', 5);
		$('.c-step-current').find('svg.c-step-nav circle:nth-child(2)').attr('r',6);
		$('.c-step-current').toggleClass('c-step-current');
		el.closest('li').toggleClass('c-step-current');
		el.find('svg.c-step-nav circle:first').attr('r', 8);
		el.find('svg.c-step-nav circle:nth-child(2)').attr('r',3);
		$('.c-region-tab').hide();
		$('#c-'+target).show();
		$('#c-name').html(capitalizeFirstLetter(county)+' County');
		$('#c-tab').html(tabs[target]);
		if(target === 'region'){
			dt_width = $('#content').width();
			buildCountyMap();
			target = 'network'; 
			county = 'none';
			$('#c-name').html('DVRPC Region');
		}else if(target === 'domestic_trade'){
			$('#loading_panel').show();
			load_trade_data();
		}
	}

	$( 'a[href="#"]' ).click( function(e) {
    	e.preventDefault();
   	} );

	//****************************************************
	//handle sub page navigation events in region tool
   	$(window).bind('hashchange', function() {
   		if(getLocationHash() === 'region'){
   			var full_hash = window.location.hash.substring(1),
			hash_elements = full_hash.split('/');
   			region_navigation(hash_elements);
   		}
   	});

   	// dot navigation events
   	$(document.body).on('click', '#c-steps li a ',function(){
		target = $(this).attr('data-target').split('-')[1];
		if(county === 'none'){
			$('#c-county-prompt').show();
			flash_county_prompt();
		}else{
			if(target === 'region') {window.location.hash = 'region';}
			else{window.location.hash = 'region/'+county+'/'+target;}
		}	
	});
 
	//**************************************************************
	// required functions
	function setIntervalX(callback, delay, repetitions) {
	    var x = 0;
	    var intervalID = window.setInterval(function () {

	       callback();

	       if (++x === repetitions) {
	           window.clearInterval(intervalID);
	       }
	    }, delay);
	}
	function prompt_color(){
		if($('#c-county-prompt').hasClass('c-light')){
			$('#c-county-prompt').css('background-color','#312867').toggleClass('c-light');
		}else{
			$('#c-county-prompt').css('background-color','#7a6aa2').toggleClass('c-light');
		}	
	}
	function flash_county_prompt(){
		setIntervalX(prompt_color, 250, 10);
	}
	$('#c-county-prompt').on('click',function(){$('#c-county-prompt').hide();});

	//*****************************************************
	// ripple effects on the navigation
	$('#c-steps li a svg').bind('mouseover', function(){
		ripple_effect($(this).parent().find('svg.c-ripple'));
	});

	function ripple_effect(ripple){
		function resetripple(){
			ripple.find('circle').attr('r', 8).attr('stroke-width', 0).attr('stroke-opacity',1);
		}
		setTimeout(resetripple, 351);
		ripple.find('circle').attr('r', 20).attr('stroke-width', 1).attr('stroke-opacity', 0);
	}
	
	function capitalizeFirstLetter(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// ********************************
	// county map mouseover toFront
	d3.selection.prototype.moveToFront = function() {
		return this.each(function(){
			this.parentNode.appendChild(this);
		});
	};

	var regions, flows, comm_data, stccs, state_data, metrosCombined, sizing = false;
	// load data
	function load_trade_data(){
		d3.csv('data/d3/commRegions_v2.csv', function(regionLookup) {
		d3.csv('data/d3/totalFlowsBEA.csv', function(regionData) {
		d3.csv('data/d3/commodities.csv', function(CoData) {
		d3.csv('data/d3/stcc.csv', function(stcc) {	
		d3.json('data/d3/us_states_shapes.json', function(json) {
			regions = regionLookup;
			flows = regionData;
			comm_data = CoData;
			stccs = stcc;
			state_data = json;
			if(target === 'domestic_trade'){
				buildMap();
			} 
		});});});});});//close all d3 functions	
	}	
 	

	// ********************************
	// domestic trade tool map function
	function buildMap(){
		dt_width = $('#content').width();
		if ($('#tradeMap').length === 0) {
			currDir = 'in'; measure = 'ton'; mode = 'all';
			// put circles on map (standard radius)
			var svg = d3.select('#content').append('svg')
				.attr('width', dt_width)
				.attr('height', 430)
				.attr('id', 'tradeMap');
		
			var states = svg.append('g')
					.attr('width', dt_width)
					.attr('height', 430)
					.attr('id', 'states');
						
			svg.append('g')
				.attr('width', dt_width)
				.attr('height', 430)
				.attr('id', 'metros');
			
			svg.append('g')
				.attr('width', dt_width)
				.attr('height', 430)
				.attr('id', 'temp');

			/*var projection = d3.geo.albersUsa().scale(900).translate([dt_width, 430 / 2]),
				offset;
			*/	
			var path = d3.geo.path()
				.projection(projection); 

			// draw state outlines
			var bounds = path.bounds(state_data);

			var scale_width = (bounds[1][0] - bounds[0][0] - 15) / (dt_width-50),
				scale_height = (bounds[1][1] - bounds[0][1]) / 430,
				scale_level = scale_width > scale_height ? (900 / scale_width) : 900,
				scale_multiplier = scale_width > scale_height ? scale_width : 1;
				circle_scaler = scale_multiplier > 1 ? 1 / scale_multiplier : 1;
			
			offset = ((1/scale_multiplier)*(bounds[1][0] - bounds[0][0]))/2;
			
			var transl = [offset, 430 / 2];
  			
  			projection.scale(scale_level).translate(transl);

			states.selectAll('path')
				.data(state_data.features)
				.enter().append('path')
				.attr('d', path)
				.attr('class','states_outline');
					
						
			// generate list of all metros (both primary and related)	
			var metrosPrimary = [],
				metrosRelated = [];
				
			for (var i = 0; i < flows.length; i++) {
				metrosPrimary.push(parseInt(flows[i].region_id));
				metrosRelated.push(parseInt(flows[i].rel_region_id));
			}

			// remove duplicates
			metrosPrimary = sortedAndDeDuped(metrosPrimary);
			metrosRelated = sortedAndDeDuped(metrosRelated);
			
			metrosCombined = sortedAndDeDuped(metrosPrimary.concat(metrosRelated));
			
			// add metro circles to the map
			addCirclesToMap(metrosCombined, 3);

			sizeMetros(currCty, currDir);
			$('#loading_panel').fadeOut();
			sizing = false;
		}else{
			$('#metros').empty();
			currDir = 'in'; measure = 'ton'; mode = 'all';
			addCirclesToMap(metrosCombined, 3);
			sizeMetros(currCty, currDir);
			$('#radio_'+measure).trigger('click');
			$('#radio_'+currDir).trigger('click');
			$('#'+mode).trigger('click');
			$('#comm-in').prop('checked',true);
			$('#tradeDirection').html('Inbound <span class=\'caret\'></span>');
			$('#comm-ton').prop('checked',true);
			$('#tradeMeasure').html('Volume <span class=\'caret\'></span>');
			$('#comm-'+ measure).prop('checked',true);
			$('#loading_panel').fadeOut();
		}
	}					
		
	//***********************************************
	// load commodity data 
	
	function loadCommodities(c, m, d, mo){
		var cty = c, meas = m, cdir = d, cmode = mo, matchComm = [], sortFunction, l;
		
		for(l = 0; l < comm_data.length; l++){
			var comm = comm_data[l];
			
			if(comm.dir === cdir && parseInt(comm.region) === cty && comm.mode.toLowerCase() === cmode){
				matchComm.push(comm);
			}
		}
		var sortedComms = sortCommodities(matchComm, meas);
		buildBarChart(sortedComms);	
	}

	function sortCommodities(c, meas){
		if(meas === 'ton'){
			c.sort(function(a,b){return b.ton - a.ton;});
		}else{
			c.sort(function(a,b){return b.value - a.value;});
		}
		return c;
	}

	// **********************************************
	// Create bar chart of commodities

	function buildBarChart(comms){
		var stccNames = [], values = [];
		$('#commChart').empty().html('');
		
		// define the data variables
		var commColors= ['#312A6A','#323576','#35478A','#36559A','#2E5EA5','#396ab2','#4276c2','#5584c9','#6992cf','#7ca0d5'];
		
		var commodityName = function(stccCode){
			var result = null, p;
			for (p= 0; p < stccs.length; p++) {
				var code = stccs[p];
				if (parseInt(code.stcc) === parseInt(stccCode.stcc4)) {
					result = code.name;
				}
			}
			return result;
		};

		function prepChartData(citem){
				var ci = commodityName(citem);
				if(measure === 'ton'){
					values.push(parseInt(citem.ton));
				}else{
					values.push(parseInt(citem.value));
				}
				stccNames.push(ci);
		}
		var k;

		if(comms.length < 10){
			for (k = 0; k < comms.length; k++){				
				singleComm = comms[k];
				prepChartData(singleComm);		
			}
		}else{
			for (k = 0; k < 10; k++){
				singleComm = comms[k];
				prepChartData(singleComm);
			}
		} 
		
		// define chart size and presets
		var width = $('#topCommoditiesChart').width(),
		    height = 305,
		    xheight = 275;

		var barHeight = (height-30) / values.length;
		
		// build the chart
		var chart = d3.select('#commChart')
		    .attr('width', width)
		    .attr('height', height);

		var colorScale = d3.scale.quantize()
			.domain([0,stccNames.length])
			.range(commColors);

		var x = d3.scale.linear()
		    .range([0, width-250])
		    .domain([0, d3.max(values)]);

		var yscale = d3.scale.linear()
			.domain([0,stccNames.length])
			.range([0,xheight]);

		function make_x_axis() {        
		    return d3.svg.axis()
		        .scale(x)
		         .orient('bottom')
		         .ticks(5);         
		}

		function xLabel(){
			if(measure==='ton'){return 'thousand tons of activity';}
				else{return 'million dollars of activity';}
		}

		function formatValues(d){
			var dv;
			if(measure === 'ton'){
				dv = numeral(round((d*0.001),2)).format('0,0');
			}else{
				dv = '$ '+ numeral(round((d*0.000001),2)).format('0,0');
			}
			return dv;
		}

		// add axis, labels, and grid
		var	yAxis = d3.svg.axis()
			.orient('left')
			.scale(yscale)
			.ticks(stccNames.length)
			.tickSize(0)
			.tickFormat(function(d,i){ return stccNames[i]; });

		chart.append('g')
		      .attr('class', 'x axis')
		      .attr('transform', 'translate(220,' + xheight + ')')
		      .call(make_x_axis()
		      	.tickSize(2)
		      	.tickFormat(formatValues)
		 		);

		chart.append('g')         
	        .attr('class', 'grid')
	        .attr('transform', 'translate(220,' + xheight + ')')
	        .style('stroke-dasharray', ('1, 2'))
	        .call(make_x_axis()
	            .tickSize(-xheight, 0, 0)
	            .tickFormat('')
	        );

	    var y_xis = chart.append('g')
			  .attr('transform', 'translate(220,0)')
			  .attr('id','yaxis')
			  .call(yAxis)
			  		.selectAll('text')
		      		.attr('y', barHeight/2 );

		chart.append('text')
		    .attr('class', 'x-label')
		    .attr('text-anchor', 'end')
		    .attr('x', (width/2) + 110 )
		    .attr('y', height-2)
		    .text(xLabel);	

	    //build bars
	    var bar = chart.append('g')
	    	.attr('transform', 'translate(220, 0)')
	    	.attr('id', 'bars')
	    	.selectAll('rect')
				.data(values)
		    .enter();
	   					
		bar.append('rect')
			.attr('transform', function(d, i) { return 'translate(0, ' + i * barHeight + ')'; })
		    .attr('width', 0)
			.attr('height', barHeight - 2)
			.attr('class', 'barTip')
			.style('fill',function(d,i){ return colorScale(i); })
		    .transition()
			      .delay(function(d, i) { return i * 100; })
			      .duration(400)
			      .attr('width', x)
			      .attr('val', function(d,i){ return d; });


		$('.barTip').tipsy({ 
	        gravity: 'n', 
	        html: true, 
	        title: function() {
	          var a = this.getAttribute('val');
	          if(measure === 'ton'){ bLabel = numeral(round((a*0.001),2)).format('0,0.0') +' ktons';
	          }else{ bLabel = '$ '+ numeral(round((a*0.000001),2)).format('0,0.0') + ' M';
	          }
	          return bLabel ; 
	        }
	      });	      
	}

	// *************************************************
	// Populate the table based on commodities  

	function populateTable(comms){
		$('#commList1').html('');
		$('#commList2').html('');
		var value = function(c){
			var mv;
			if(measure === 'ton'){
				mv = numeral(round((c.ton*0.001),2)).format('0,0.0') +' ktons';
			}else{
				mv = '$ '+ numeral(round((c.value*0.000001),2)).format('0,0.0') + ' M';
			}
			return mv;
		};
		var commodityName = function(stccCode){
			var result = null, s;
		
			for (s = 0; s < stcc.length; s++) {
				var code = stcc[s];
				if (parseInt(code.stcc) === parseInt(stccCode.stcc4)) {
					result = code.name;
				}
			}
			return result;
		};
		var commItem, number, ciString, cu;
		
		for (cu = 0; cu < 5; cu++){
				commItem = comms[cu],
				number = cu + 1,
				ciString = '<li class=\'list-group-item\'><span class=\'badge\'>' + value(commItem) + '</span><span class=\'rankNumber\'>'+ number + '</span> <b>' + commodityName(commItem) + '</b></li>';
			$(ciString).appendTo('#commList1');
		}
		for (cu = 5; cu < 10; cu++){
				commItem = comms[cu],
				number = cu + 1,
				ciString = '<li class=\'list-group-item\'><span class=\'badge\'>'+ value(commItem) +'</span><span class=\'rankNumber\'>'+ number + '</span> <b>'+ commodityName(commItem) +'</b></li>';
			$(ciString).appendTo('#commList2');
		}
	}

		// **********************************************
		// commodity flow button controls

		$('input[name=\'dir\']').change(function() {
			
			currDir = $(this).val();
			var dirName = ((currDir==='in') ? 'Inbound' : 'Outbound');
			sizeMetros(currCty, currDir);
			//if(sizing === false) {sizeMetros(currCty, currDir);}else{console.log('already sizing');}
			$('#comm-'+ currDir).prop('checked',true);
			$('#tradeDirection').html(dirName+ ' <span class=\'caret\'></span>');
		});


		$('input[name=\'measure\']').change(function() {
			
			measure = $(this).val();
			var measureName = ((measure==='ton') ? 'Volume' : 'Value');
			//if(sizing === false) {sizeMetros(currCty, currDir, 'measure');}else{console.log('already sizing');}
			sizeMetros(currCty, currDir, 'measure');
			$('#comm-'+ measure).prop('checked',true);
			$('#tradeMeasure').html(measureName+ ' <span class=\'caret\'></span>');
		});

		$('input[name=\'mode\']').change(function() {
			mode = $(this).val();
			sizeMetros(currCty, currDir, 'measure');
			//if(sizing === false) {sizeMetros(currCty, currDir, 'measure');}else{console.log('already sizing');}
		});
		
		$('input[name=\'tradeMeasure\']').change(function() {
			measure = $(this).val();
			$('#radio_'+measure).trigger('click');
		});

		$('input[name=\'tradeDirection\']').change(function() {
			currDir = $(this).val();
			$('#radio_'+currDir).trigger('click');
		});

        $('.btn').mouseup(function(){
            $(this).blur();
        });
        $(document.body).on('mouseover', '#tradeList .list-group-item', function() {
        	var region_code = $(this).attr('data-id');
        	d3.select('#metros #metro_'+ region_code)
        		.select('circle')
        			.classed('list_circle', true);
        });
        $(document.body).on('mouseout', '#tradeList .list-group-item', function() {
        	var region_code = $(this).attr('data-id');
            d3.select('#metros #metro_'+ region_code)
        		.select('circle')
        			.classed('list_circle', false);
        });
		
		// key functions
		// **********************************************
		
		function sortNumber(a, b) {
			return a - b;
		}
		
		// **********************************************
		
		function sortedAndDeDuped(a) {
		
			a = a.sort(sortNumber);
		
			var trimmed = [], o;
			for (o = 0; o < a.length; o++) {
				if (a[o] !== a[o - 1]) {
					trimmed.push(a[o]);
				}
			}
			return trimmed;
		}
	
		// **********************************************
		
		function getMetro(id) {
						
			var result = null, gm;
			
			for (gm = 0; gm < regions.length; gm++) {
				var metro = regions[gm];
				if (parseInt(metro.id) === parseInt(id)) {
					result = metro;
				}
			}
			return result;
		}
	
		// **********************************************
		
		function addCirclesToMap(a, r) {
			var pixelLoc = d3.geo.albersUsa(), cl;
	
			for (cl = 0; cl < a.length; cl++) {
				var metro = getMetro(a[cl]);
				
				if (metro) {
					var xy = projection([metro.lon, metro.lat]);
					
					var element = d3.select('#metros').append('g')
						.attr('transform', 'translate(' + Math.round(xy[0]) + ',' + Math.round(xy[1]) + ')')
						.attr('r', r)
						.attr('id', 'metro_' + metro.id)
						.attr('class', 'metro related');
					
					element.append('circle')
						.attr('r', r);
					
					var useName = metro.id;
				}
			}	
		}

		//**********************************************
		
		function buttonsActive(){
			$('.flowBtn').attr('disabled', false);
			
			if(county === 'bucks'){
				$('#dt-county-prev').prop('disabled', true);
			}else if(county === 'philadelphia'){
				$('#dt-county-next').prop('disabled', true);
			}else{ $('#dt-county-next').prop('disabled', false);
				$('#dt-county-prev').prop('disabled', false);}
		}
		
		// **********************************************

		function sortRegions(regions, measure){
			if(measure === 'ton'){regions.sort(function(a,b){return b.ton - a.ton;});
				}else{regions.sort(function(a,b){return b.val - a.val;});}
			return regions;

		}

		function round(value, decimals) {
		    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
		}

		// **********************************************
		
		function sizeMetros(metroId, dir, source) {
			$('.flowBtn').attr('disabled', true);
			$('#tradeList').html('');

			setTimeout(buttonsActive, 520);
			//identify range based on data
			var sortedRegions = sortRegions(flows, measure);

			var scaleRange = [], minSize = [], maxSize = [], listItems = [], j=0, h;
			for (h = 0; h < sortedRegions.length; h++) {
				var d = sortedRegions[h];
				if(parseInt(d.region_id) === metroId && d.rel_region_id != d.region_id && d.dir === dir && d.mode === mode){
					if(measure === 'ton'){
						scaleRange.push(parseInt(d.ton));
					}else{scaleRange.push(parseInt(d.val));}
				}
			}

			minSize = d3.min(scaleRange);
			maxSize = d3.max(scaleRange);
			var	scale = d3.scale.pow()
					.exponent(0.6)
					.domain([minSize, maxSize])
					.range([2, 35*circle_scaler]);
			d3.select('#metros .sel_primary')
				.classed('prevSelection', true);
			d3.selectAll('#metros .sel_related')
				.classed('prevSelection', true);
			// return circles to starting size
			d3.selectAll('#metros .metro')
				.classed('sel_primary', false)
				.classed('sel_related', false)
				.classed('in', false)
				.classed('out', false);
			

			
			$('svg circle').unbind('mouseenter mouseleave');
			
			// size primary metro
			d3.select('#metro_' + metroId)
				.attr('r', 15)
				.classed('sel_primary', true)
				.classed('prevSelection', false)
				.select('circle')
					.attr('r', 15);

			// loop through data and size metros related to primary
			var q;
			for (q = 0; q < sortedRegions.length; q++) {
				var t = sortedRegions[q], r, ttLabel, num, formatNum;
					//r = scale(Math.sqrt(d.val / Math.PI));
				//identify measurement of moves	
				if(measure === 'ton'){
					r = scale(t.ton);
					num = t.ton;
					formatNum = numeral(round((num*0.001),2)).format('0,0.0') +' ktons';
				}else{
					r = scale(t.val);
					num = t.val;
					formatNum = '$ '+ numeral(round((num*0.000001),2)).format('0,0.0') + ' M';
				}
										

				if (parseInt(t.region_id) === metroId && t.dir === dir && t.rel_region_id != t.region_id && t.mode === mode) {						
						var elem = d3.select('#metro_' + t.rel_region_id),
							a = getMetro(t.rel_region_id),
							reg_id = a.id;
						var	name = a.familiar_name;
						if(num > 0){
							var listItem = '<li class=\'list-group-item\' data-id=\''+ reg_id + '\'><span class=\'badge partner-val\'>'+ formatNum +'</span>'+name+'</li>'; 
							listItems.push(listItem);
						}
						
						elem.classed('prevSelection', false);
						elem.classed('sel_related', true)
							.attr('r', r)
							.classed(dir, true)
							.select('circle')
								.transition()
								.duration(500)
									.attr('r', r)
									.attr('i', j)
									.attr('val', num)
									.attr('name', name);
						j++;												
				}
			}

			var dl;

			if(listItems.length>0){
				for (i = 0; i < 10; i++) {
					dl = listItems[i];
					$(dl).appendTo('#tradeList');
				}
			}else{
				var capitalized = county.slice(0,1).toUpperCase() + county.slice(1, county.length);
				dl = '<li class=\'list-group-item\'><b>'+ capitalized +' County</b> has no domestic trade using <b>'+ mode +' transportation.</b></li>';
				if(mode === 'air' && metroId === 42101)
					{dl += '<li class=\'list-group-item\'>Air transportation through Philadelphia International Airport is captured by Delaware County.</li>';}
				$(dl).appendTo('#tradeList');
			}

			d3.selectAll('#metros .prevSelection')
				.classed('prevSelection', false)
				.attr('r', 3)
				.select('circle')
					.transition()
					.duration(500)
						.attr('r', 3); 
			packMetros();

			//process commodities
			 

			// add tooltip and formatting

			$('svg .sel_related circle').tipsy({ 
		        gravity: 'n', 
		        html: true, 
		        title: function() {
		          var a = this.getAttribute('val'), n = this.getAttribute('name'); var ra = round(a,2);
		          if(measure === 'ton'){ ttLabel = numeral(round((a*0.001),2)).format('0,0.0') +' ktons';
		          }else{ ttLabel = '$ '+ numeral(round((a*0.000001),2)).format('0,0.0') + ' M';
		          }
		          return '<b>'+n+'</b><br>' + ttLabel ; 
		        }
		     });
			 // metro mouseover effect
			d3.selectAll('.metro circle').on('mouseover', null);
			d3.selectAll('.metro circle').on('mouseout', null);
			d3.selectAll('.sel_related circle')
				.on('mouseover', function(e) {
					//if (!packer.animating) {
						d3.select(this).classed('active', true);//.style('stroke-width', 3);
					//}
				})
				.on('mouseout', function(e) {
					d3.select(this).classed('active', false);//.style('stroke-width', 0);			
				});
			
			loadCommodities(currCty, measure, dir, mode);
				
		}
		
		// **********************************************
		
		function packMetros() {
			var elements = d3.selectAll('#metros .metro')[0];
			packer.elements(elements).start();
		}

		function rebuildpage(){
			if ($('#tradeMap').length === 0) {buildMap();}
			loadCommodities(currCty, measure, currDir, mode);
		}

		$(window).bind('resize', function () { 
			rebuildpage();
		});
	
});