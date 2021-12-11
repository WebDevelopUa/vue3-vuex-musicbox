export default {

  // time in seconds => minutes:seconds
  // time is undefined or NAN => 0
  formatTime(time) {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.round((time - minutes * 60) || 0);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  },
};
