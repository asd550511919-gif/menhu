// 全局导航挂件功能
(function() {
    let isExpanded = false;
    let widget = null;
    let widgetItems = null;
    let isAnimating = false;

    function initNavWidget() {
        widget = document.querySelector('.nav-widget');
        if (!widget) return;

        widgetItems = widget.querySelectorAll('.nav-widget-item');
        if (!widgetItems.length) return;
        
        // 初始状态为收起，只显示小方框
        widget.classList.remove('expanded');
        isExpanded = false;

        // 鼠标悬浮事件
        widget.addEventListener('mouseenter', function() {
            if (!isAnimating && !isExpanded) {
                expandWidget();
            }
        });

        widget.addEventListener('mouseleave', function() {
            if (!isAnimating && isExpanded) {
                collapseWidget();
            }
        });

        // 点击事件
        widgetItems.forEach(function(item) {
            item.addEventListener('click', function() {
                var page = this.getAttribute('data-page');
                if (page) {
                    navigateToPage(page);
                }
            });
        });
    }

    function expandWidget() {
        isAnimating = true;
        widget.classList.add('expanded');
        isExpanded = true;
        
        setTimeout(function() {
            isAnimating = false;
        }, 300);
    }

    function collapseWidget() {
        isAnimating = true;
        widget.classList.remove('expanded');
        isExpanded = false;
        
        setTimeout(function() {
            isAnimating = false;
        }, 300);
    }

    function navigateToPage(pageName) {
        // 添加淡出动画
        var wrapper = document.querySelector('.frame-wrapper');
        if (wrapper) {
            wrapper.style.opacity = '0';
            wrapper.style.transform = 'scale(1.1)';
            wrapper.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            setTimeout(function() {
                window.location.href = pageName;
            }, 300);
        } else {
            window.location.href = pageName;
        }
        
        // 点击后立即收起
        isAnimating = true;
        widget.classList.remove('expanded');
        isExpanded = false;
        
        setTimeout(function() {
            isAnimating = false;
        }, 300);
    }

    // 页面显示时重置缩放状态
    function resetPageScale() {
        // 检查是否存在 frame-wrapper 并重置其样式
        var wrapper = document.querySelector('.frame-wrapper');
        if (wrapper) {
            // 重置透明度和缩放
            wrapper.style.opacity = '';
            wrapper.style.transform = '';
            wrapper.style.transition = '';
        }
        
        // 如果是通过浏览器返回按钮回到此页面，确保页面正常显示
        setTimeout(function() {
            if (wrapper) {
                // 确保页面是正常状态
                wrapper.style.opacity = '1';
                wrapper.style.transform = 'scale(1)';
                wrapper.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        }, 100);
    }

    // 监听页面可见性变化
    if ('visibilityState' in document) {
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                resetPageScale();
            }
        });
    }

    // 监听页面聚焦事件
    window.addEventListener('focus', function() {
        setTimeout(resetPageScale, 100);
    });

    // 监听页面加载完成事件
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) { // 当页面是从缓存中加载时
            resetPageScale();
        }
    });

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavWidget);
    } else {
        initNavWidget();
    }
})();
