const playSound = (path: string) => {
    const audio = document.createElement('audio');
    audio.style.display = 'none';
    audio.src = path;
    audio.autoplay = true;
    audio.onended = function () {
      audio.remove();
    };
    document.body.appendChild(audio);
};

export default playSound;
