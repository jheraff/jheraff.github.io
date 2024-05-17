window.addEventListener('load', function() {
    const audioElement = document.getElementById('background-music');
    const muteToggleButton = document.getElementById('unmute-button');

    // Try to play the audio muted
    audioElement.muted = true;
    audioElement.play().then(() => {
        console.log('Audio autoplay started (muted).');
        muteToggleButton.textContent = 'Unmute';
    }).catch((error) => {
        console.log('Autoplay failed:', error);
        muteToggleButton.textContent = 'Play Music';
    });

    muteToggleButton.addEventListener('click', function() {
        if (audioElement.paused) {
            audioElement.muted = false;
            audioElement.play();
            muteToggleButton.textContent = 'Mute';
        } else {
            if (audioElement.muted) {
                audioElement.muted = false;
                muteToggleButton.textContent = 'Mute';
            } else {
                audioElement.muted = true;
                muteToggleButton.textContent = 'Unmute';
            }
        }
    });
});
