let arr = [];
let suffleInterval = 0;
let loopFlag = false;
const intArray = new Uint8Array(1);

$(document).ready(function() {
  initNumber();
  
  // 번호생성 button 클릭
  $('#btn_select').on('click', function() {
    if($('input:radio[name=generateType]:checked').val() === 'SEQ') {
      if(loopFlag) {
        return;
      }
  
      if(!$('#suffleInterval').val() || !$('#selectInterval').val()) {
        alert('입력란은 필수값입니다.');
        return;
      }
  
      loopFlag = true;
      $('#btn_select').text('생성중...');
      $('#suffleInterval, #selectInterval').prop('disabled', true);
      startSuffle();
  
      var selectIntervalNumber = $('#selectInterval').val();
      var interval = setInterval(() => {
        window.crypto.getRandomValues(intArray);
        var randomNumber = intArray[0] % 45 + 1;
        while(arr.indexOf(randomNumber) == -1) {
          window.crypto.getRandomValues(intArray);
          randomNumber = intArray[0] % 45 + 1;
        }
        
        const index = arr.findIndex((e) => e === randomNumber);
        arr.splice(index, 1);
        
        $('div.log').last().append(
          '<span class="me-3">'+ randomNumber +'</span>'
        );
        
        if($('span', $('div.log')).length % 6 == 0) {
          initNumber();
          
          $('div.container').append(
              '<div class="row">'+
              '<div class="col d-flex justify-content-center log"></div>'+
              '</div>'
          );
          
          clearInterval(interval);
          clearTimeout(suffleInterval);
          $('#btn_select').text('번호생성');
          $('#suffleInterval, #selectInterval').prop('disabled', false);
          loopFlag = false;
        }
      }, selectIntervalNumber);
    } else {
      const selectedNumberList = selectNumbersAtOnce();
      $.each(selectedNumberList, function(idx, obj) {
        $('div.log').last().append(
          '<span class="me-3">'+ obj +'</span>'
        );
      });
      $('div.container').append(
        '<div class="row">'+
        '<div class="col d-flex justify-content-center log"></div>'+
        '</div>'
      );
    }
  });
  
  // number 이벤트
  $('#suffleInterval, #selectInterval').on('input', function() {
    $(this).val($(this).val().replace(/[^0-9]/g, ''));
  });
  $('#suffleInterval, #selectInterval').on('blur', function() {
    if($(this).val() < $(this).attr('min')) {
      $(this).val($(this).attr('min'));
    }
  });

  // radio 이벤트
  $('input:radio[name=generateType]').on('change', function() {
    if($(this).val() === 'SEQ') {
      $('#parameterSeqType').show();
    } else {
      $('#parameterSeqType').hide();
    }
    $('div.row').each(function() {
      if(!$(this).hasClass('mt-3')) {
        $(this).remove();
      }
    });
    $('span.me-3').remove();
  });
});

// 배열에 숫자를 1-45로 초기화
function initNumber() {
  arr = [];

  for(let i = 0; i < 45; i++) {
    window.crypto.getRandomValues(intArray);
    let number = intArray[0] % 45 + 1;
    while(arr.indexOf(number) != -1) {
      window.crypto.getRandomValues(intArray);
      number = intArray[0] % 45 + 1;
    }
    arr.push(number);
  }
}

// suffleInterval 주기로 suffle() 메서드를 호출
function startSuffle() {
  var intervalNumber = $('#suffleInterval').val();
  suffleInterval = setTimeout(() => {
    suffle();
  }, intervalNumber);
}

// 배열을 한번 섞음
function suffle() {
  for(let i = 0; i < arr.length; i++) {
    // 배열에 존재하는 값이 나올 때까지 랜덤한 값 선택
    window.crypto.getRandomValues(intArray);
    let randomNumber1 = intArray[0] % 45 + 1;
    while(arr.indexOf(randomNumber1) == -1) {
      window.crypto.getRandomValues(intArray);
      randomNumber1 = intArray[0] % 45 + 1;
    }
    // arr에서 랜덤한 값과 일치하는 요소의 index 반환. 섞을 대상 A
    const suffleIndexA = arr.findIndex((e) => e === randomNumber1);
  
    // 배열에 존재하는 값이 나올 때까지 랜덤한 값 선택
    window.crypto.getRandomValues(intArray);
    let randomNumber2 = intArray[0] % 45 + 1;
    while(arr.indexOf(randomNumber2) == -1) {
      window.crypto.getRandomValues(intArray);
      randomNumber2 = intArray[0] % 45 + 1;
    }
    // arr에서 랜덤한 값과 일치하는 요소의 index 반환. 섞을 대상 B
    const suffleIndexB = arr.findIndex((e) => e === randomNumber2);
  
    // 임시로 원본 값을 저장하고, A와 B를 바꾼다.
    const temp = arr[suffleIndexA];
    arr[suffleIndexA] = arr[suffleIndexB];
    arr[suffleIndexB] = temp;
  }
}

// 1-45까지의 숫자 중 6개 선택
function selectNumbersAtOnce() {
  const selectedNumber = [];
  const array = new Uint8Array(1);

  while(selectedNumber.length < 6) {
    window.crypto.getRandomValues(array);
    const randomNumber = array[0] % 45 + 1;
    if(selectedNumber.indexOf(randomNumber) == -1) {
      selectedNumber.push(randomNumber);
    }
  }

  selectedNumber.sort((a, b) => a - b);

  return selectedNumber;
}