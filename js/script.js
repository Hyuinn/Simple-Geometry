var current;
	if (!localStorage.getItem('theme')) {
		current = 'blue';
	}
	else {
		current = localStorage.getItem('theme');
	}

$(document).ready(function() {
	$('body').addClass(current);
	alertChange(current);
	$('.btn-theme').click(function(event) {
		themeChange(event.target.id);		
		alertChange(event.target.id);
		if (event.target.id == current) {
			return;
		}
		else {
			$('body').removeClass(current);
			$('body').toggleClass(event.target.id);
			localStorage.setItem('theme', (event.target.id));
			current = localStorage.getItem('theme');
		}
	});
	$('.btn-menu').click(function() {
		$(this).toggleClass('active');
	});
});

function themeChange(id) {
	var root = document.documentElement;
	root.style.setProperty('--theme-color', getThemeProperty(id)[0]);
	root.style.setProperty('--button-color', getThemeProperty(id)[1]);
	root.style.setProperty('--font-color', getThemeProperty(id)[2]);
	root.style.setProperty('--keyword', getThemeProperty(id)[3]);
}

function getThemeProperty(id) {
	var theme = document.getElementById(id);
	var styleArray = [];
	styleArray.push(getComputedStyle(theme).getPropertyValue('--theme-color'));
	styleArray.push(getComputedStyle(theme).getPropertyValue('--button-color'));
	styleArray.push(getComputedStyle(theme).getPropertyValue('--font-color'));
	styleArray.push(getComputedStyle(theme).getPropertyValue('--keyword'));
	return styleArray;
}

function alertChange(id) {
	var color = document.getElementById(id);
	var keyword = getComputedStyle(color).getPropertyValue('--keyword');
	$('.alert-color').removeClass('alert-danger alert-success alert-primary alert-dark').addClass('alert-'+$.trim(keyword));
	$('.btn-color').removeClass('btn-danger btn-success btn-primary btn-dark').addClass('btn-'+$.trim(keyword));
}