export function videoTeaser() {
    const startedClass = 'is_started';
    const savingClass = 'device-suspended-mode';
    const offsetPause = 400;
    const selectorVideo = '#video-teaser';

    const vd = document.querySelector(selectorVideo);

    // change video source on HD
    // let hdVideoUrl = './video/video.h264.mp4'; ($(window).width() >=960)? vd.src = hdVideoUrl : null;

    function playPause() {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop; const
            state = vd.paused;
        if (+scrolled >= offsetPause && !state) { vd.pause(); } else if (+scrolled < offsetPause && state) { vd.play(); }
    }

    const readyPlay = vd.play();
    if (readyPlay !== undefined) {
        readyPlay.then(() => {
            window.addEventListener('scroll', playPause);
            vd.classList.add(startedClass);
        }).catch((err) => { // console.warn('Automatic playback failed.');
            vd.classList.add(savingClass);

            document.body.addEventListener('touchstart',()=> {if (!vd.playing) { vd.play(); vd.classList.add(startedClass); }
                console.log('video started');
            });
        });
    }
}
