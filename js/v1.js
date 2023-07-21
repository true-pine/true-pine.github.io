$(document).ready(function () {
  makeInput();

  $("#btn_get_number").on("click", function () {
    var numList = [];
    $("input[type=checkbox]:checked").each(function () {
      numList.push($(this).val());
    });

    // console.log("Number List: " + numList);

    var lottoNum = [];

    while (lottoNum.length < 6) {
      var random = Math.random();
      var randomIndex = Math.floor(random * 100);

      while (randomIndex >= numList.length) {
        random = Math.random();
        randomIndex = Math.floor(random * 100);
      }

    //   console.log("Random Index: " + randomIndex);

      var selectedNum = numList[randomIndex];
      if (!lottoNum.includes(selectedNum)) {
        lottoNum.push(selectedNum);
      }
    }

    lottoNum.sort(function (a, b) {
      return a - b;
    });

    // console.log("Result: " + lottoNum);
    $('#result').append(
        '<div class="row">'+
        '<div class="col d-flex justify-content-center">' +
        lottoNum +
        '</div>' +
        '</div>'
    );
  });
});

function makeInput() {
  var row = '<div class="row">';

  for (var i = 1; i <= 45; i++) {
    var template =
      '<div class="col form-check">' +
      '<input class="form-check-input" type="checkbox" name="lottoNum" id="input'+ i +'" value="' + i +'" checked>' +
      '<label class="form-check-label" for="input'+ i +'">'+
      i +
      "</label>" +
      "</div>";

    row += template;

    if (i % 10 == 0) {
      row += "</div>" + '<div class="row">';
    }
  }

  row += "</div>";

  $("#number_list").html(row);
}