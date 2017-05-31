const socket = window.io();
const moment = window.moment;
const Mustache = window.Mustache;
const getPosition = (options) => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(resolve, reject, options);
});
const formatTime = (time) => moment(time).format('HH:mm');
const scrollToBottom = () => {
  const $messages = $('#messages');
  const $newMessage = $messages.children('li:last-child');

  const clientHeight = $messages.prop('clientHeight');
  const scrollTop = $messages.prop('scrollTop');
  const scrollHeight = $messages.prop('scrollHeight');

  const newMessageHeight = $newMessage.innerHeight();
  const lastMessageHeight = $newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    $messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', ({from, text, createdAt}) => {
  const template = $('#message-template').html();
  const html = Mustache.render(template, { from, text, createdAt: formatTime(createdAt) });
  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', ({ from, url, createdAt }) => {
  const template = $('#location-message-template').html();
  const html = Mustache.render(template, { from, url, createdAt: formatTime(createdAt) });
  $('#messages').append(html);
  scrollToBottom();
});

$('#message-form').on('submit', (e) => {
  e.preventDefault();
  const $messageInput = $('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: $messageInput.val()
  }, () => {
    $messageInput.val('');
  });
});

const $locationButton = $('#send-location');
$locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }
  $locationButton.attr('disabled', 'disabled').text('Send location...');
  getPosition()
    .then((position) => {
    $locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    })
    .catch(() => {
      $locationButton.removeAttr('disabled').text('Send location');
      alert('Unable to fetch location.');
    });
});
