let currentData = '';

$.ajaxSetup({
  headers: {'Authorization': API_KEY},
});

$(function() {
  $.get(API_URL_JOBS, function(response) {
    console.log(response.data);
    const data = response.data;
    data.map((item) => {
      $('#vac').append('<option value=' + item.id + '>' + item.name + '</option>');
      $('#vac').select2({
        placeholder: 'Вакансия не выбрана'
      });
    });
  }).fail(function() {
    notif.show('error', MESSAGE_ERROR);
  });

});

$('.getData').on('click', () => {
  let query = {active: true, currentWindow: true};
  chrome.tabs.query(query, (tabs) => {
    var currentTab = tabs[0]; // there will be only one in this array
    console.log(currentTab);

    chrome.tabs.sendMessage(currentTab.id, 'getData', function(response) {
      if (response.status == 'error') {
        notif.show(response.status, response.message);
      } else {
        currentData = response.data;

        $('.photo').html('<img id="avatar" src="' + currentData.avatar + '" />');
        $('.name').val(currentData.name.split(' ')[0]);
        $('.last_name').val(currentData.name.split(' ')[1]);
        $('.portfolio').val(currentData.portfolio);
        $('.contacts').val(currentData.contacts);
      }
    });
  });

  console.log($('#vac').select2('data'));
});

$('.send_data').on('click', () => {
  $('.send_data').html('<img src="/img/loader.gif" />').attr('disabled', true);

  let form_data = {};
  form_data['applicant[job_id]'] = $('#vac').select2('data')[0].id;
  form_data['applicant[first_name]'] = $('.name').val();
  form_data['applicant[last_name]'] = $('.last_name').val();
  form_data['applicant[email]'] = $('.contacts').val();
  form_data['applicant[source]'] = currentData.source;
  form_data['applicant[source_type]'] = 'sourced';
  form_data['applicant[events][][type]'] = 'Event::Comment';
  form_data['applicant[events][][body]'] = '' +
      '<img id="avatar" src="' + currentData.avatar + '" /><br><br>' +
      'Портфолио: ' + $('.portfolio').val() + '<br>';

  $.ajax({
    type: 'POST',
    url: API_URL,
    data: form_data,
    dataType: 'multipart/form-data',
    complete: function(response) {
      $('.send_data').html(SUBMIT_BUTTON_TEXT).attr('disabled', false);
      if (response.status == 200) {
        notif.show('success', MESSAGE_CANDIDATE_ADDED);
      } else {
        notif.show('error', MESSAGE_ERROR);
      }
    },
  });
});