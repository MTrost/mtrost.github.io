$(function () {
  $(".date-picker").datepicker();
});
$('.date-picker').datepicker({
    onSelect: function(dateText, inst) {
      $("input[name='datepicker']").val(dateText);
    }
});
