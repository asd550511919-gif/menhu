document.addEventListener('DOMContentLoaded', function() {
    // 预加载音效
    const hoverSound = new Audio('../sounds/ticket-tear.mp3');
    hoverSound.volume = 0.5;
    hoverSound.playbackRate = 4.0;

    // 解决浏览器自动播放限制：首次用户点击后解锁音频
    const unlockAudio = () => {
        hoverSound.play().then(() => {
            hoverSound.pause();
            hoverSound.currentTime = 0;
        }).catch(() => {});
        document.removeEventListener('click', unlockAudio);
    };
    document.addEventListener('click', unlockAudio);

    // 获取所有需要音效的元素
    // 包括新按钮(.siena-btn)、导航挂件(.nav-widget-item)、首页箭头(.group11)、首页ENTER(.eNter)
    const buttons = document.querySelectorAll('.siena-btn, .nav-widget-item, .group11, .eNter');

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            // 重置并播放
            hoverSound.currentTime = 0;
            hoverSound.play().catch(e => {
                // 忽略未交互前的播放错误
                console.log('Audio play failed (interaction needed):', e);
            });
        });
    });

    // 浏览器返回按钮的页面显示处理
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            const wrapper = document.querySelector('.frame-wrapper, .frame2-wrapper, .frame3-wrapper');
            if (wrapper) {
                wrapper.classList.remove('fade-out');
                wrapper.style.opacity = '1';
                wrapper.style.transform = 'none';
            }
        }
    });
});
