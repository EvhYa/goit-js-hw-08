import Player from '@vimeo/player';
import _ from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.on(
  'timeupdate',
  _.throttle(
    function (data) {
      //   console.log(data.seconds);
      localStorage.setItem(
        'videoplayer-current-time',
        JSON.stringify(data.seconds)
      );
    },
    1000,
    {
      leading: false,
      trailing: true,
    }
  )
);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
