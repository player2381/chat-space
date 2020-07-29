$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Message-box" data-message-id=${message.id}>
          <div class="Message-info">
            <div class="Message-info__username">
              ${message.user_name}
            </div>
            <div class="Message-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="Message-box" data-message-id=${message.id}>
        <div class="Message-info">
          <div class="Message-info__username">
            ${message.user_name}
          </div>
          <div class="Message-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="Message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.Main-form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Main-messages').append(html);      
      $('.Main-form')[0].reset();
      $('.Main-messages').animate({ scrollTop: $('.Main-messages')[0].scrollHeight});
      $('.Main-form__submit').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.Main-form__submit').prop("disabled", false);
    });
  });
});






