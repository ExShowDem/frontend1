(function($) {
    $(document).ready(function(){

		var caret = '<span class="caret"></span>';
		var firstLang = $('#lang-opts .dropdown-menu li')[0];
		$('#lang-label').html( $(firstLang).find('a').text() + caret );
		
		$('#lang-opts .dropdown-menu a').click(function(){
			$('#lang-label').html( $(this).text() + caret );
		});
		
		
		$('ul.nav > li > form#search-icon').css('display', 'table-cell');
		$('ul.nav > li > form#search-real').css('display', 'none');
		
		$('form#search-icon button').click(function(){
			$('ul.nav > li > form#search-real').css('display', 'table-cell');
			$('ul.nav > li > form#search-icon').css('display', 'none');
		});

		// Note to future developers: DO NOT configure multiple bxsliders at once by using the same class name
		
		$('#slides .slides').bxSlider({
            pager: false,
            minSlides: 3,
            maxSlides: 3,
            slideWidth: 300,
            slideMargin: 50,
            touchEnabled: false, // Mobile touch issue: https://github.com/stevenwanderski/bxslider-4/issues/1240 
            responsive: true,

            // https://stackoverflow.com/questions/39081994/bx-slider-custom-controls
			nextSelector: '#slides .bxNext',
			prevSelector: '#slides .bxPrev',
			// nextText: '<i class="fa fa-arrow-right"></i>',
			// prevText: '<i class="fa fa-arrow-left"></i>', 
			nextText: '<img src="images/R.png" height="80" width="36"/>',
			prevText: '<img src="images/L.png" height="80" width="36"/>',

			wrapperClass: 'slides_holder',

			//onSliderLoad: align_bxslider_arrows,
			//onSliderResize: align_bxslider_arrows,
		});
		
		$('#sponsors .slides').bxSlider({
            pager: false,
            minSlides: 4,
            maxSlides: 4,
            slideWidth: 300,
            touchEnabled: false,
            responsive: true,

            nextSelector: '#sponsors .bxNext',
			prevSelector: '#sponsors .bxPrev',
			nextText: '<img src="images/R.png" height="30" width="20"/>',
			prevText: '<img src="images/L.png" height="30" width="20"/>',

			wrapperClass: 'sponsors_holder',
		});
		
		$('#supports .slides').bxSlider({
            pager: false,
            minSlides: 4,
            maxSlides: 4,
            slideWidth: 300,
            touchEnabled: false,
            responsive: true,

            nextSelector: '#supports .bxNext',
			prevSelector: '#supports .bxPrev',
			nextText: '<img src="images/R.png" height="30" width="20"/>',
			prevText: '<img src="images/L.png" height="30" width="20"/>',

			wrapperClass: 'supports_holder',
		});

		var gallery_slider = $('.modal.gallery .slides').bxSlider({
            pager: false,
            minSlides: 4,
            maxSlides: 4,
            slideWidth: 150,
            touchEnabled: false,
            responsive: true,
            slideMargin: 20,
		});
		$('.modal.gallery').on('shown.bs.modal', function (e) {
				gallery_slider.reloadSlider(); // https://stackoverflow.com/questions/19194394/bxslider-not-working-with-bootstrap-modal-box/32326082#32326082
		});

        // Gallery
        var expandImg = $("img#expandedImg");
        var initImg = $('.actual-modal-content ul.slides').find('li:first-child').find('img').attr('src');
        expandImg.attr('src', initImg);

        $("img.gallery_slide").each(function() {
            var gallerySlide = new Hammer(this);

            gallerySlide.on("tap press", function(ev) {
                expandImg.attr('src', $(ev.target).attr("src"));
            });    
        });        

        // Application form wizard
		var outerWizard = $('#outer_wizard').bootstrapWizard({
			'onTabShow': function (tab, navigation, index) {

				if (index === 3)
				{
					$('button.outer_next').css('display', 'none');
					$('button.inner_next').css('display', 'block');

					$('button.outer_prev').css('display', 'none');
					$('button.inner_prev').css('display', 'block');
				}
				else
				{
					$('button.outer_next').css('display', 'block');
					$('button.inner_next').css('display', 'none');

					$('button.outer_prev').css('display', 'block');
					$('button.inner_prev').css('display', 'none');
				}

				if (index === 0)
				{
					$('button.outer_prev').closest('div.col-md-3').css('display', 'none');
				}
				else
				{
					$('button.outer_prev').closest('div.col-md-3').css('display', 'block');
				}
			}
		});

		$('button.outer_next').click(function(e) {
			e.preventDefault();
			outerWizard.bootstrapWizard('next');

			if (outerWizard.bootstrapWizard('currentIndex') === 3)
			{
				innerWizard.bootstrapWizard('show', 0);
			}

			return false;
		});

		$('button.outer_prev').click(function(e) {
			e.preventDefault();
			outerWizard.bootstrapWizard('previous');
			return false;
		});

		var innerWizard = $('#inner_wizard').bootstrapWizard();

		$('button.inner_next').click(function(e) {
			e.preventDefault();

			if (innerWizard.bootstrapWizard('currentIndex') === 3)
			{
				window.location.href = 'application_form_submitted.html'
			}
			else
			{
				innerWizard.bootstrapWizard('next');
			}
			
			return false;
		});

		$('button.inner_prev').click(function(e) {
			e.preventDefault();

			if (innerWizard.bootstrapWizard('currentIndex') === 0)
			{
				outerWizard.bootstrapWizard('show', 2);
			}
			else
			{
				innerWizard.bootstrapWizard('previous');
			}
			
			return false;
		});

		// Direct access via URL to vertical tabs on About and Application pages
		if ($('#about_content').length || $('#application_content').length)
		{
			// https://stackoverflow.com/questions/7862233/twitter-bootstrap-tabs-go-to-specific-tab-on-page-reload-or-hyperlink
			var url = document.location.toString();

			// Javascript to enable link to tab - from another page
			show_tab(url);
			show_banner(url);

			// https://ustutorials.com/javascript-tutorials/javascript-hash-change.php#fc0
			window.addEventListener("hashchange", function (e) {
				// Javascript to enable link to tab - from the same page
				show_tab(e.newURL);
				show_banner(e.newURL);
			});

			// Change hash for page-reload
			$('.nav-tabs a').on('shown.bs.tab', function (e) {
			    window.location.hash = e.target.hash;
			});
		}

		// Timeline events alternation
		timeline_swap_even();
		align_bxslider_arrows();
    });

	window.onresize = function() 
	{
	    timeline_swap_even();
		align_bxslider_arrows();
	}

})(jQuery);

function align_bxslider_arrows()
{
	if ($('#slides').length)
	{
		$('#slides .controls').width( $('#slides .slides_holder').width() );
		$('#slides .controls').css( 'margin-left', $('#slides .slides_holder').css('margin-left') );
	}
	
	if ($('#sponsors').length)
	{
		$('#sponsors .controls').width( $('#sponsors .sponsors_holder').width() );
		$('#sponsors .controls').css( 'margin-left', $('#sponsors .sponsors_holder').css('margin-left') );
	}
	
	if ($('#supports').length)
	{
		$('#supports .controls').width( $('#supports .supports_holder').width() );
		$('#supports .controls').css( 'margin-left', $('#supports .supports_holder').css('margin-left') );
	}
}

function show_tab(url)
{
	if (url.match('#')) 
	{
	    $('.nav-tabs a[href="#' + url.split('#')[1] + '"]').tab('show');
	} 
}
function show_banner(url)
{
	if (url.match('#')) 
	{
		switch(url.split('#')[1]) 
		{
			case 'sponsor_s':
				$('#about_banner').css('display', 'none');
				$('#sponsor_banner').css('display', 'flex');
				$('#support_banner').css('display', 'none');

				break;
			case 'supporting_organizations':
				$('#about_banner').css('display', 'none');
				$('#sponsor_banner').css('display', 'none');
				$('#support_banner').css('display', 'flex');

				break;
			default:
				$('#about_banner').css('display', 'flex');
				$('#sponsor_banner').css('display', 'none');
				$('#support_banner').css('display', 'none');
		}
	}
}

function timeline_swap_even()
{
	// Swapping left-to-right every even timeline content entry
	$('#dates_content .event.row').each(function(index, value) {
		if (index % 2 !== 0)
		{
		    if (window.innerWidth > 992) 
			{
				$(value).prepend($(value).find('.date'));
				$(value).prepend($(value).find('.content'));
			}
			else
			{
				$(value).prepend($(value).find('.content'));
				$(value).prepend($(value).find('.date'));
			}
		}
	});
}

// Multi-file drop-upload
var fileobj;
function upload_file(e) 
{
    e.preventDefault();
    ajax_file_upload(e.dataTransfer.files);
}
 
function file_explorer() 
{
    document.getElementById('selectfile').click();
    document.getElementById('selectfile').onchange = function() {
        files = document.getElementById('selectfile').files;
        ajax_file_upload(files);
    };
}
 
function ajax_file_upload(file_obj) 
{
    if(file_obj != undefined) 
    {
        var form_data = new FormData();

        for(i=0; i<file_obj.length; i++) 
        {  
            form_data.append('file[]', file_obj[i]);  
        }
        
        // AJAX POST - @todo: Up to you how exactly you implement this AJAX call
        $.ajax({
            type: 'POST',
            url: '',
            contentType: false,
            processData: false,
            data: form_data,
            xhr: function() 
            { // Custom XMLHttpRequest
        		var myXhr = $.ajaxSettings.xhr();
        		console.dir(myXhr);

	            if (myXhr.upload)
	            { // Check if upload property exists
	                myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
	            }

	            return myXhr;
	        },
            success: function(response) 
            {
                alert(response);
                $('#selectfile').val('');
            }
        });
    }
}

function progressHandlingFunction(e)
{
	if (e.lengthComputable)
	{
	    $('progress').attr({value:e.loaded, max:e.total});
	}
}

/** Scroll to top. https://webdevtrick.com/javascript-scroll-to-top **/
document.addEventListener('DOMContentLoaded', function () {
    let gototop = document.querySelector('.gototop');
    let body = document.documentElement;

    window.addEventListener('scroll', check);

    function check() {
        pageYOffset >= 500 && gototop.classList.add('visible');
        pageYOffset < 500 && gototop.classList.remove('visible');
    }


    gototop.onclick = function() {
        animate({
            duration: 700,
            timing: gogototopEaseOut,
            draw: progress =>
                body.scrollTop = (body.scrollTop * (1 - progress / 7))
        });
    }

    let circ = timeFraction =>
        1 - Math.sin(Math.acos(timeFraction > 1 ? timeFraction = 1 : timeFraction));

    let makeEaseOut = timing => timeFraction => 1 - timing(1 - timeFraction);
    let gogototopEaseOut = makeEaseOut(circ);
});

function animate(options) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / options.duration;
        timeFraction > 1 && (timeFraction = 1);

        let progress = options.timing(timeFraction)

        options.draw(progress);
        timeFraction < 1 && requestAnimationFrame(animate);
    });
}