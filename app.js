    // 粒子背景系统
    class ParticleBackground {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.init();
        }

        init() {
            this.resize();
            window.addEventListener('resize', () => this.resize());
            
            // 创建粒子
            for(let i = 0; i < 80; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    size: Math.random() * 2 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    color: `rgba(255,255,255,${Math.random() * 0.3})`
                });
            }
            
            this.animate();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                if(particle.x > this.canvas.width) particle.x = 0;
                if(particle.x < 0) particle.x = this.canvas.width;
                if(particle.y > this.canvas.height) particle.y = 0;
                if(particle.y < 0) particle.y = this.canvas.height;
                
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = particle.color;
                this.ctx.fill();
            });
            
            requestAnimationFrame(() => this.animate());
        }
    }

    // 实时时钟
    function updateClock() {
        const options = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false 
        };
        document.getElementById('realtime-clock').textContent = 
            new Date().toLocaleTimeString('zh-CN', options);
    }

    // 初始化
    document.addEventListener('DOMContentLoaded', () => {
        new ParticleBackground('particles-canvas');
        setInterval(updateClock, 1000);
    });





    // 滚动动画触发器
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.25 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });





    // 增强版主题管理
    class ThemeManager {
        constructor() {
            this.themeToggle = document.getElementById('theme-toggle');
            this.themeIcon = this.themeToggle.querySelector('i');
            this.init();
        }

        init() {
            this.setInitialTheme();
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        setInitialTheme() {
            const savedTheme = localStorage.getItem('theme');
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
                document.documentElement.classList.add('dark');
                this.themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
        }

        toggleTheme() {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', 
                document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            );
            this.themeIcon.classList.toggle('fa-moon');
            this.themeIcon.classList.toggle('fa-sun');
        }
    }

    // 数字动画增强
    class CounterAnimator {
        constructor(selector = '[data-count]') {
            this.counters = document.querySelectorAll(selector);
            this.init();
        }

        init() {
            this.counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                this.animateValue(counter, 0, target, 1500);
            });
        }

        animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                element.textContent = Math.floor(progress * (end - start) + start);
                progress < 1 && requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }
    }

    // 初始化
    document.addEventListener('DOMContentLoaded', () => {
        new ThemeManager();
        new CounterAnimator();
        
        // 滚动动画
        const animateOnScroll = () => {
            document.querySelectorAll('.chart-bar').forEach(bar => {
                const rect = bar.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    bar.style.transform = 'scaleX(1)';
                }
            });
        };
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // 初始触发
    });



  
    // 节点坐标数据
    const routeCoordinates = [
        [29.3417, 120.0975],   // 义乌
        [31.8206, 117.2274],   // 合肥
        [34.3418, 108.9398],   // 西安
        [34.7473, 113.6249],   // 郑州
        [36.0611, 103.8342],   // 兰州
        [43.8163, 87.6233],    // 乌鲁木齐
        [45.1667, 82.5667],    // 阿拉山口
        [51.4344, 6.7623],     // 杜伊斯堡
        [40.4168, -3.7038]     // 马德里
    ];

    // 详细节点信息
    const countries = [
        {
            name: "义乌",
            coords: [29.3417, 120.0975],
            image: "./OIP-C.jpg",
            description: "全球最大小商品集散中心，班列始发站，日均发送货物200标箱"
        },
        {
            name: "合肥",
            coords: [31.8206, 117.2274],
            image: "./OIP-C.jpg",
            description: "长三角重要物流枢纽，连接江浙沪与内陆的货物集散中心"
        },
        {
            name: "西安",
            coords: [34.3418, 108.9398],
            image: "./OIP-C.jpg",
            description: "西北地区核心集散中心，中欧班列集结中心示范工程"
        },
        {
            name: "郑州",
            coords: [34.7473, 113.6249],
            image: "./OIP-C.jpg",
            description: "全国铁路心脏枢纽，拥有亚洲最大的列车编组站"
        },
        {
            name: "阿拉山口",
            coords: [45.1667, 82.5667],
            image: "./OIP-C.jpg",
            description: "中国最大陆路口岸，中哈铁路轨距转换站，日均通关10列"
        },
        {
            name: "杜伊斯堡",
            coords: [51.4344, 6.7623],
            image: "./OIP-C.jpg",
            description: "欧洲最大内陆港，班列欧洲终点站，辐射欧洲28国"
        },
        {
            name: "马德里",
            coords: [40.4168, -3.7038],
            image: "./OIP-C.jpg",
            description: "南欧物流中心，连接地中海地区的重要枢纽"
        }
    ];

    // 初始化变量
    let map = null;
    let dynamicRoute = null;
    let currentIndex = 0;

    // 播放路线演示
    document.getElementById('play-route').addEventListener('click', async () => {
        const preview = document.getElementById('map-preview');
        const playButton = document.getElementById('play-route');
        
        preview.style.opacity = '0';
        await new Promise(r => setTimeout(r, 500));
        preview.remove();

        if (!map) {
            map = L.map('dynamic-map', {
                zoomControl: false,
                attributionControl: false
            }).setView([34.7473, 113.6249], 4);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
        }

        dynamicRoute = L.polyline([], {
            color: '#4ecdc4',
            weight: 4,
            opacity: 0.8
        }).addTo(map);

        playButton.disabled = true;
        animateRoute();
    });

    // 路线动画
    async function animateRoute() {
        if (currentIndex >= routeCoordinates.length) return;

        const start = routeCoordinates[currentIndex];
        const end = routeCoordinates[currentIndex + 1];
        const steps = 100; // Number of intermediate steps for smooth animation
        const duration = 1500; // Total duration for each segment
        const interval = duration / steps;

        if (end) {
            for (let i = 0; i <= steps; i++) {
                const lat = start[0] + (end[0] - start[0]) * (i / steps);
                const lng = start[1] + (end[1] - start[1]) * (i / steps);
                dynamicRoute.addLatLng([lat, lng]);
                map.panTo([lat, lng], { animate: false });
                await new Promise(r => setTimeout(r, interval));
            }
        }

        updateNodeInfo(countries[currentIndex]);
        currentIndex++;
        setTimeout(animateRoute, 500); // Delay before moving to the next segment
    }
    // 更新节点信息
    function updateNodeInfo(data) {
        const infoContainer = document.getElementById('node-info');
        document.getElementById('current-node').textContent = data.name;

        const nodeCard = document.createElement('div');
        nodeCard.className = 'node-card';
        nodeCard.innerHTML = `
            <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg 
                    flex items-center justify-center">
                    <i class="fas fa-train text-blue-600 dark:text-blue-300"></i>
                </div>
                <div>
                    <h5 class="font-bold text-lg">${data.name}</h5>
                    <p class="text-sm text-gray-500">坐标：${data.coords.join(', ')}</p>
                </div>
            </div>
            <img src="${data.image}" 
                class="w-full h-40 object-cover rounded-lg mb-4"
                onerror="this.src='./placeholder.jpg'">
            <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                ${data.description}
            </p>
            <div class="mt-4 flex items-center justify-between text-sm">
                <span class="px-2 py-1 bg-green-100 dark:bg-green-900 
                    text-green-600 dark:text-green-300 rounded-full">
                    第 ${currentIndex + 1} 站
                </span>
                <span class="text-gray-500 text-xs">
                    ${new Date().toLocaleTimeString()}
                </span>
            </div>
        `;

        infoContainer.prepend(nodeCard);
        infoContainer.scrollTo({ top: 0, behavior: 'smooth' });

        // 保留最近5条记录
        if (infoContainer.children.length > 5) {
            infoContainer.removeChild(infoContainer.lastChild);
        }
    }


    
    
   // 创建自定义图标
   const countryIcon = L.divIcon({
    className: 'country-marker',
    iconSize: [24, 24]
});

// 确保地图已初始化后添加国家标记
document.getElementById('play-route').addEventListener('click', async () => {
    if (!map) {
        map = L.map('dynamic-map', {
            zoomControl: false,
            attributionControl: false
        }).setView([34.7473, 113.6249], 4);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
    }

    countries.forEach(country => {
        L.marker(country.coords, { icon: countryIcon })
            .addTo(map)
            .bindTooltip(country.name, { permanent: true, direction: 'top', className: 'country-label' });
    });
});