var isProtected = false;

var checkboxes = document.getElementsByTagName('input');

for(var i = 0, l = checkboxes.length; i < l; i++){
  checkboxes[i].addEventListener('click', function(e) {
    if(this.checked === true){
      $(this).attr("checked","checked");
    } else {
      $(this).removeAttr("checked");
    }
  });
}

$('li').dblclick(function() {
  if ($(this).find('.notice').length === 0) {
    var input = $(this).append('<textarea class="notice"></textarea>');
  }else {
    $(this).find('.notice').remove();
  }
});

if ($('.save').length === 0) {
  $('script').before('<div class="save">保護</div>');
}

$('.save').click(function(){
  disableCheckboxes(checkboxes);
});


function disableCheckboxes(checkboxes) {
  isProtected = !isProtected;

  if(isProtected) $('.save').text('保護解除');
  else $('.save').text('保護');

  for(var i = 0, l = checkboxes.length; i < l; i++){
    if(isProtected) {
      $(checkboxes[i]).attr('disabled','disabled');
    }else{
      $(checkboxes[i]).removeAttr('disabled');
    }
  }
  var text;
  if(isProtected) {
    var textAreas = document.getElementsByTagName('textarea');
    for (i = 0, l = textAreas.length; i < l; i++) {
      text = $(textAreas[i]).val();
      $(textAreas[i]).after('<pre class="notice--saved">' + text + '</pre>');
      $(textAreas[i]).remove();
    }
  } else {
    var pres = document.getElementsByTagName('pre');
    for (i = 0, l = pres.length; i < l; i++) {
      text = $(pres[i]).text();
      $(pres[i]).after('<textarea class="notice">' + text + '</textarea>');
      $(pres[i]).remove();
    }
  }

}
