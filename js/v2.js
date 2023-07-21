let arr = [];

$(document).ready(function() {
  initNumber();
  
  $('#btn_select').on('click', function() {
    var index = Math.floor(Math.random() * 100);
    while(index < 1 || index > (arr.length-1)) {
      index = Math.floor(Math.random() * 100);
    }
    
    var randomVal = arr[index];
    arr.splice(index, 1);
    
    $('div.log').last().append(
      '<span style="margin-right: 10px;">'+ randomVal +'</span>'
    );
    
    suffle(arr);
    
    if($('span', $('div.log')).length % 6 == 0) {
        $('div.container').append(
            '<div class="row">'+
            '<div class="col d-flex justify-content-center log"></div>'+
            '</div>'
        )
        initNumber();
    }
  });
});

function suffle() {
  for (let index = arr.length - 1; index > 0; index--) {
    // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
    const randomPosition = Math.floor(Math.random() * (index + 1));

    // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
    const temporary = arr[index];
    arr[index] = arr[randomPosition];
    arr[randomPosition] = temporary;
  }
}

function initNumber() {
  arr = [];
  for(let i = 1; i <= 45; i++) {
    arr.push(i);
  }
  suffle(arr);
}