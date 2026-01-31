<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>XL MUSIC WORLD</title>
    <link rel="manifest" href="manifest.json">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="XL MUSIC">
    <link rel="apple-touch-icon" href="https://cdn-icons-png.flaticon.com/512/3669/3669986.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="preload" as="image" href="https://images.unsplash.com/photo-1470219556762-1771e7f9427d?q=80&w=1600&auto=format&fit=crop">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
            --text-white: #ffffff;
            --text-dim: rgba(255, 255, 255, 0.4);
            --text-strong: rgba(255, 255, 255, 0.8);
            --font-main: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            --glass-bg: rgba(255, 255, 255, 0.08);
            --glass-border: rgba(255, 255, 255, 0.15);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; -webkit-font-smoothing: antialiased; -webkit-tap-highlight-color: transparent; }
        body, html {
            height: 100vh; width: 100vw; background: #050505; font-family: var(--font-main); color: var(--text-white); overflow: hidden; overscroll-behavior: none;
        }
        header {
            position: fixed; top: 0; width: 100%; height: 80px; padding-top: env(safe-area-inset-top); display: flex; justify-content: center; align-items: center; gap: 40px; z-index: 1000; background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent); backdrop-filter: blur(2px);
        }
        .nav-link {
            font-size: 11px; color: var(--text-dim); text-decoration: none; text-transform: uppercase; letter-spacing: 3px; cursor: pointer; transition: 0.3s; position: relative; display: flex; flex-direction: column; align-items: center; font-weight: 500; padding: 10px;
        }
        .nav-link:hover { color: var(--text-strong); }
        .nav-link.active { color: #fff; text-shadow: 0 0 10px rgba(255,255,255,0.3); }
        .nav-link.active::after {
            content: ''; position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); width: 20px; height: 2px; background: #fff; border-radius: 1px;
        }
        .bottom-identity {
            position: fixed; bottom: 25px; width: 100%; padding-bottom: env(safe-area-inset-bottom); display: flex; justify-content: center; align-items: center; z-index: 1000; font-size: 10px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 4px; pointer-events: none; opacity: 0.6;
        }
        .viewport { display: flex; width: 300vw; height: 100vh; transition: transform 0.8s cubic-bezier(0.65, 0, 0.35, 1); }
        .section { width: 100vw; height: 100vh; position: relative; flex-shrink: 0; display: flex; align-items: center; overflow: hidden; }
        .bg-img {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; filter: brightness(0.5) contrast(1.1); z-index: -1; transition: transform 1.5s ease; transform: scale(1);
        }
        .section.active .bg-img { transform: scale(1.05); }
        .section:nth-child(3) .bg-img { filter: brightness(0.4); }
        .hero-left {
            position: absolute; left: 10vw; top: 50%; transform: translateY(-50%); opacity: 0; transition: all 0.8s 0.2s ease-out; z-index: 10;
        }
        .section.active .hero-left { opacity: 1; transform: translateY(-50%); }
        .main-title { 
            font-size: clamp(40px, 5vw, 80px); font-weight: 900; line-height: 0.9; text-transform: uppercase; letter-spacing: -2px; cursor: pointer; transition: 0.3s; background: linear-gradient(to right, #fff, rgba(255,255,255,0.7)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-right-container, .intel-right-container {
            position: absolute; right: 8vw; top: 50%; transform: translateY(-50%); width: 65vw; max-width: 900px; display: flex; align-items: center; z-index: 5; gap: 15px; opacity: 0; transform: translateY(-40%); transition: all 0.8s 0.4s ease-out;
        }
        .section.active .hero-right-container, .section.active .intel-right-container { opacity: 1; transform: translateY(-50%); }
        .intel-right-container { flex-direction: column; align-items: flex-end; gap: 30px; }
        .scroll-wrapper, .intel-scroll-wrapper {
            display: flex; gap: 20px; overflow-x: auto; padding: 30px 10px; scrollbar-width: none; scroll-snap-type: x mandatory; flex: 1; width: 100%; mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent); scroll-behavior: smooth;
        }
        .scroll-wrapper::-webkit-scrollbar, .intel-scroll-wrapper::-webkit-scrollbar { display: none; }
        .sw-card {
            flex: 0 0 240px; height: 320px; border-radius: 16px; overflow: hidden; position: relative; text-decoration: none; color: #fff; border: 1px solid var(--glass-border); transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); opacity: 0; transform: translateY(30px); scroll-snap-align: start; background: #000;
        }
        .section.active .sw-card:nth-child(1) { transition-delay: 0.1s; opacity: 1; transform: translateY(0); }
        .section.active .sw-card:nth-child(2) { transition-delay: 0.2s; opacity: 1; transform: translateY(0); }
        .section.active .sw-card:nth-child(3) { transition-delay: 0.3s; opacity: 1; transform: translateY(0); }
        .section.active .sw-card:nth-child(4) { transition-delay: 0.4s; opacity: 1; transform: translateY(0); }
        .section.active .sw-card:nth-child(5) { transition-delay: 0.5s; opacity: 1; transform: translateY(0); }
        .sw-card:hover, .sw-card:active { transform: translateY(-10px) scale(1.02); border-color: rgba(255,255,255,0.5); }
        .card-bg { 
            position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; transition: transform 0.6s ease; z-index: 1; opacity: 0.8;
        }
        .sw-card:hover .card-bg { transform: scale(1.1); opacity: 1; }
        .card-content { 
            position: relative; z-index: 3; height: 100%; padding: 20px; display: flex; flex-direction: column; justify-content: flex-end; background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, transparent 100%); 
        }
        .sw-name { font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .sw-desc { font-size: 11px; color: rgba(255,255,255,0.7); line-height: 1.4; }
        .group-block { width: 100%; }
        .scroll-title { font-size: 10px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 3px; margin-bottom: 10px; padding-left: 5px; font-weight: 600; }
        .scroll-group { display: flex; align-items: center; gap: 10px; }
        .data-card {
            flex: 0 0 140px; height: 120px; background: var(--glass-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--glass-border); border-radius: 16px; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer; transition: all 0.3s ease; scroll-snap-align: start;
        }
        .data-card:active { background: rgba(255, 255, 255, 0.2); transform: scale(0.95); }
        .card-icon { font-size: 32px; margin-bottom: 12px; transition: 0.3s; }
        .card-name { font-size: 10px; color: var(--text-strong); text-transform: uppercase; font-weight: 600; letter-spacing: 1px; }
        .nav-arrow {
            color: var(--text-dim); width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: 0.3s; border-radius: 50%; background: rgba(255,255,255,0.05); flex-shrink: 0;
        }
        @media (max-width: 1024px) {
            .hero-left { left: 5vw; } .hero-right-container, .intel-right-container { right: 5vw; width: 55vw; }
        }
        @media (max-width: 768px) {
            header { height: 60px; background: rgba(0,0,0,0.8); } .nav-link { font-size: 9px; letter-spacing: 1px; } .section { flex-direction: column; justify-content: flex-start; padding-top: 100px; }
            .hero-left { position: relative; left: auto; top: auto; transform: none !important; width: 100%; padding: 0 25px; margin-bottom: 20px; }
            .main-title { font-size: 42px; text-align: left; }
            .hero-right-container, .intel-right-container { position: relative; right: auto; top: auto; transform: none !important; width: 100%; padding: 0 10px; opacity: 1; }
            .sw-card { flex: 0 0 160px; height: 240px; } .data-card { flex: 0 0 100px; height: 100px; } .card-icon { font-size: 24px; }
            .nav-arrow { display: none; } .scroll-wrapper, .intel-scroll-wrapper { padding: 10px 15px; mask-image: none; }
            .section { overflow-y: auto; height: 100vh; display: block; } .viewport { height: 100vh; }
        }
    </style>
</head>
<body>
    <header>
        <div class="nav-link active" onclick="goTo(0)">MUSIC</div>
        <div class="nav-link" onclick="goTo(1)">MEDIA</div>
        <div class="nav-link" onclick="goTo(2)">RELEASE</div>
    </header>
    <div class="bottom-identity">XL MUSIC WORLD</div>
    <div class="viewport" id="viewport">
        <section class="section active">
            <div class="bg-img" style="background-image: url('https://images.unsplash.com/photo-1470219556762-1771e7f9427d?q=80&w=1600&auto=format&fit=crop')"></div>
            <div class="hero-left"><h1 class="main-title">XL SONIC<br>UNIVERSE</h1></div>
            <div class="hero-right-container">
                <div class="nav-arrow" onclick="scrollArea('market-scroll', -260)"><i class="fa-solid fa-chevron-left"></i></div>
                <div class="scroll-wrapper" id="market-scroll">
                    <a href="https://suno.com" target="_blank" class="sw-card">
                        <div class="card-bg" style="background-image: url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=600&auto=format&fit=crop')"></div>
                        <div class="card-content"><div class="sw-name">Suno V4</div><div class="sw-desc">AI音频生成与伴奏</div></div>
                    </a>
                    <a href="https://gemini.google.com" target="_blank" class="sw-card">
                        <div class="card-bg" style="background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop')"></div>
                        <div class="card-content"><div class="sw-name">Gemini 1.5</div><div class="sw-desc">歌词创意统筹</div></div>
                    </a>
                    <a href="https://www.apple.com/logic-pro/" target="_blank" class="sw-card">
                        <div class="card-bg" style="background-image: url('https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=600&auto=format&fit=crop')"></div>
                        <div class="card-content"><div class="sw-name">Logic Pro</div><div class="sw-desc">专业宿主混音</div></div>
                    </a>
                </div>
                <div class="nav-arrow" onclick="scrollArea('market-scroll', 260)"><i class="fa-solid fa-chevron-right"></i></div>
            </div>
        </section>
        <section class="section">
            <div class="bg-img" style="background-image: url('https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?q=80&w=1600&auto=format&fit=crop')"></div>
            <div class="hero-left"><h1 class="main-title">VISUAL<br>GRAVITY</h1></div>
            <div class="hero-right-container">
                <div class="nav-arrow" onclick="scrollArea('prod-scroll', -260)"><i class="fa-solid fa-chevron-left"></i></div>
                <div class="scroll-wrapper" id="prod-scroll">
                    <a href="https://runwayml.com" target="_blank" class="sw-card">
                        <div class="card-bg" style="background-image: url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop')"></div>
                        <div class="card-content"><div class="sw-name">Runway Gen-3</div><div class="sw-desc">电影级视频生成</div></div>
                    </a>
                    <a href="https://higgsfield.ai" target="_blank" class="sw-card">
                        <div class="card-bg" style="background-image: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop')"></div>
                        <div class="card-content"><div class="sw-name">Higgsfield</div><div class="sw-desc">动作一致性控制</div></div>
                    </a>
                     <a href="https://www.midjourney.com" target="_blank" class="sw-card">
                        <div class="card-bg" style="background-image: url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop')"></div>
                        <div class="card-content"><div class="sw-name">Midjourney</div><div class="sw-desc">封面视觉设计</div></div>
                    </a>
                </div>
                <div class="nav-arrow" onclick="scrollArea('prod-scroll', 260)"><i class="fa-solid fa-chevron-right"></i></div>
            </div>
        </section>
        <section class="section">
            <div class="bg-img" style="background-image: url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1600&auto=format&fit=crop')"></div>
            <div class="hero-left"><h1 class="main-title">GALACTIC<br>HUB</h1></div>
            <div class="intel-right-container">
                <div class="group-block">
                    <div class="scroll-title">Strategic Media</div>
                    <div class="scroll-group">
                        <div class="nav-arrow" onclick="scrollArea('media-scroll', -200)"><i class="fa-solid fa-chevron-left"></i></div>
                        <div class="intel-scroll-wrapper" id="media-scroll">
                            <div class="data-card" onclick="window.open('https://www.tiktok.com/')"><i class="fa-brands fa-tiktok card-icon text-white"></i><span class="card-name">TikTok</span></div>
                            <div class="data-card" onclick="window.open('https://www.instagram.com/')"><i class="fa-brands fa-instagram card-icon text-pink-500"></i><span class="card-name">Instagram</span></div>
                            <div class="data-card" onclick="window.open('https://www.youtube.com/')"><i class="fa-brands fa-youtube card-icon text-red-600"></i><span class="card-name">YouTube</span></div>
                        </div>
                        <div class="nav-arrow" onclick="scrollArea('media-scroll', 200)"><i class="fa-solid fa-chevron-right"></i></div>
                    </div>
                </div>
                <div class="group-block">
                    <div class="scroll-title">Music Distribution</div>
                    <div class="scroll-group">
                        <div class="nav-arrow" onclick="scrollArea('music-scroll', -200)"><i class="fa-solid fa-chevron-left"></i></div>
                        <div class="intel-scroll-wrapper" id="music-scroll">
                            <div class="data-card" onclick="window.open('https://music.apple.com/')"><i class="fa-brands fa-apple card-icon text-white"></i><span class="card-name">Apple</span></div>
                            <div class="data-card" onclick="window.open('https://spotify.com/')"><i class="fa-brands fa-spotify card-icon text-green-500"></i><span class="card-name">Spotify</span></div>
                            <div class="data-card" onclick="window.open('https://music.163.com/')"><i class="fa-solid fa-cloud-music card-icon text-red-600"></i><span class="card-name">NetEase</span></div>
                        </div>
                        <div class="nav-arrow" onclick="scrollArea('music-scroll', 200)"><i class="fa-solid fa-chevron-right"></i></div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <script>
        // 注册 Service Worker (加入错误捕获，防止在不支持的环境中报错)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .then(reg => console.log('Service Worker 注册成功', reg))
                    .catch(err => console.log('Service Worker 注册失败 (可能是预览环境不支持，不影响真机使用):', err));
            });
        }

        function goTo(index) {
            const viewport = document.getElementById('viewport'); viewport.style.transform = `translateX(-${index * 100}vw)`;
            document.querySelectorAll('.nav-link').forEach((link, i) => link.classList.toggle('active', i === index));
            document.querySelectorAll('.section').forEach((sec, i) => { if(i === index) sec.classList.add('active'); else sec.classList.remove('active'); });
        }
        function scrollArea(id, amount) { document.getElementById(id).scrollBy({ left: amount, behavior: 'smooth' }); }
        let touchStartX = 0; let touchEndX = 0;
        document.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, {passive: true});
        document.addEventListener('touchend', e => { touchEndX = e.changedTouches[0].screenX; handleGesture(); }, {passive: true});
        function handleGesture() {
            const current = document.querySelector('.section.active'); const sections = document.querySelectorAll('.section'); let index = Array.from(sections).indexOf(current);
            if (touchEndX < touchStartX - 50 && index < 2) goTo(index + 1); if (touchEndX > touchStartX + 50 && index > 0) goTo(index - 1);
        }
    </script>
</body>
</html>
