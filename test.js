var titleBox = document.getElementById('title-box');

titleBox.addEventListener('blur',function () {
    if(titleBox.innerHTML === ''){
       titleBox.innerHTML = 'Click here to add title';
    }
    else if(titleBox.innerHTML !== 'Click here to add title'){
      titleBox.style.outline = '0';

    }

});


titleBox.addEventListener('focus',function () {
    if(titleBox.innerHTML === 'Click here to add title'){
       titleBox.innerHTML = '';
    }

    titleBox.style.outline = '1px solid #d3d3d3';


});
