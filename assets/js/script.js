var begin_entered=false;
var insideDiv="";
var intrativeContainer = "";
var columns = "";
var col=3;
var row=4;
var temp=0;
$(document).ready(function(){
	if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||/Edge\/\d./i.test(navigator.userAgent)) {
	}
	
	for (var j=1; j <= col; j++) {

		for (i=temp; i < color.length; i++) {

			insideDiv +='<div class="item"><div class="box '+color[i]+'"></div><div class="label" role="none">'+label[i]+'</div><div class="checkBox" role="checkbox" aria-label="'+label[i]+'" id="check_'+(i+1)+'" aria-checked="false"></div></div>'
			if(i==3 && j==1)break;
			else if(i==7 && j==2)break;
			
		}	
		temp=i+1;
		columns+='<div class="column column'+j+'">'+insideDiv+'</div>';
		insideDiv="";
	}
	intrativeContainer = "<div class='intrativeHeading' role='heading' aria-level='2'>Terrestrial Biomes</div>"+columns;
	$('.intrativeContainer').html(intrativeContainer);
	
	$('#text_container').html(direction_text);
	$('#begin_btn').off('click').on('click',function(){
			begin_entered=true
			$('#begin_page').hide();
			setTimeout(function(){
				$('#text_container,#responsive_container,#restart').fadeIn(500);resizeApp();
				$('.hotspot').attr('aria-hidden','false');
			},1000);
			
			resizeApp();
			set_tab();
			if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ||/Edge\/\d./i.test(navigator.userAgent)) {
				$('#main_container').removeAttr('role');
			}else{
				$('#main_container').attr('role','application');
			}
			$('#linkId').attr('href','#restart');
	})
	
	$('.checkBox').off('click').on('click',function(e){
		if($(this).hasClass("clicked")){
	
				$(this).removeClass("clicked");
				$(this).attr('aria-checked','false')

				id = $(this).attr('id');
				indexId = id.substr(id.indexOf("_") + 1);

				console.log(indexId);
				$('.graph_'+indexId).css('display','none');
				
		}else{
	
				$(this).addClass("clicked");
				$(this).attr('aria-checked','true')
				
				id = $(this).attr('id');
				indexId = id.substr(id.indexOf("_") + 1);

				console.log(indexId);
				$('.graph_'+indexId).css('display','block');		
		}	
	});
	$('#restart').off('click').on('click',function(e){
		begin_entered=false;
		$('#begin_page').fadeIn();
		$('#text_container,#responsive_container,#restart').hide()
			$('.checkBox').removeClass("clicked");
			$('.graph').hide();
		resizeApp();
		set_tab();
		//setTimeout(function(){
			$('#begin_focus').focus();
		//},200);
		$('#linkId').attr('href','#begin_btn');
	})
	setTimeout(function(){
			resizeApp();
		},2000);
	
	set_tab();
	

	$('#begin_focus').on('focus',function(){
		$('.tab_index').eq(1).focus();	
	})
	$('#begin_end_focus').on('focus',function(){
		$('.tab_index').eq(1).focus();
	})
	

	$("#begin_container,#image_container").mouseenter(function(){
		if(!begin_entered) $("#begin_container").attr("title","World Map");
  		else $("#image_container").attr("title","World Map");
	});
	
	$("#begin_container,#image_container").mouseleave(function() {
  		$("#begin_container,#image_container").removeAttr('title');
	});
	
	
	$('#focus_guard_1').on('focus',function(){
		$('.tab_index').eq(1).focus();
		$('#main_container').removeAttr('role');
	})
	$('#focus_guard_2').on('focus',function(){
		$('.tab_index').eq(0).focus();
	})
	
	$('#text_container').attr('aria-label',$('#text_container').text());
	
	document.body.onkeyup = function(e){
		if(e.keyCode == 32 || e.keyCode == 13){
			e.preventDefault(e);
			if(e.target.id!='label_head_1'||e.target.id!='label_head_2'||e.target.id!='label_head_3'){
				$('#'+e.target.id).trigger('click');
				$('#'+e.target.id).focus();
			}
			
		}
		
	}

});
window.onresize = function() {
    resizeApp();
}

function set_tab(){
	if(begin_entered==false){
		$('.tab_index').removeClass('tab_index').removeAttr('tabindex');
		$('#begin_container').addClass('tab_index');
		$('#begin_btn').addClass('tab_index');
		$('#begin_focus,#begin_end_focus').addClass('tab_index');
	}else{
		$('.tab_index').removeClass('tab_index').removeAttr('tabindex');
		$('#text_container').addClass('tab_index');
		$('#image_container').addClass('tab_index');

		$('.intrativeHeading').addClass('tab_index');
		$('.header').addClass('tab_index');
		$('.label').addClass('tab_index');
		$('.checkBox').addClass('tab_index');
		
		$('#restart').addClass('tab_index');
		$('#focus_guard_1,#focus_guard_2,.dummy_popup,.hotspot_dummy').addClass('tab_index');
	}

	$('.tab_index').each(function(){
    		$('.tab_index').attr('tabindex','0');
	});
	
}
