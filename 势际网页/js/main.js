// 导航栏缩小效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.height = '60px';
    } else {
        navbar.style.height = '80px';
    }
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 导航菜单激活状态
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');

    function setActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
});

// 轮播图功能
class Slider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.slideInterval = 5000; // 5秒切换一次
        this.init();
    }

    init() {
        // 启动自动轮播
        this.autoPlay();
    }

    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.slides[index].classList.add('active');
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
    }

    autoPlay() {
        setInterval(() => this.nextSlide(), this.slideInterval);
    }
}

// 图片加载动画
function initializeImageCards() {
    const environments = [
        { title: '现代化会议室', id: 1001 },
        { title: '休闲娱乐区', id: 1002 },
        { title: '开放式办公区', id: 1003 },
        { title: '创意讨论区', id: 1004 },
        { title: '员工餐厅', id: 1005 },
        { title: '健身房', id: 1006 }
    ].map(env => ({
        ...env,
        src: `https://picsum.photos/800/600?random=${env.id}`
    }));

    const teams = [
        { name: '团建活动', id: 1007 },
        { name: '项目研讨', id: 1008 },
        { name: '技术分享', id: 1009 },
        { name: '年会盛典', id: 1010 },
        { name: '户外拓展', id: 1011 },
        { name: '节日庆祝', id: 1012 },
        { name: '培训课程', id: 1013 },
        { name: '志愿服务', id: 1014 },
        { name: '运动比赛', id: 1015 }
    ].map(team => ({
        ...team,
        src: `https://picsum.photos/600/400?random=${team.id}`
    }));

    const products = [
        { name: '智能办公解决方案', id: 1016 },
        { name: '数据分析平台', id: 1017 },
        { name: '协同办公系统', id: 1018 },
        { name: '企业安全防护', id: 1019 },
        { name: '云端存储服务', id: 1020 },
        { name: '移动办公套件', id: 1021 },
        { name: '人工智能应用', id: 1022 },
        { name: '区块链技术', id: 1023 }
    ].map(product => ({
        ...product,
        src: `https://picsum.photos/400/300?random=${product.id}`
    }));

    // 创建图片卡片的函数
    function createImageCard(item, className) {
        return `
            <div class="image-card ${className}">
                <img src="${item.src}" alt="${item.name || item.title}" loading="lazy" onload="this.classList.add('loaded')">
                <div class="overlay">
                    <h3>${item.name || item.title}</h3>
                </div>
            </div>
        `;
    }

    // 添加环境照片
    const environmentGrid = document.querySelector('.environment .grid-2');
    if (environmentGrid) {
        environmentGrid.innerHTML = environments.map(env => createImageCard(env, 'environment-card')).join('');
    }

    // 添加团队照片
    const teamGrid = document.querySelector('.team .grid-3');
    if (teamGrid) {
        teamGrid.innerHTML = teams.map(team => createImageCard(team, 'team-card')).join('');
    }

    // 添加产品照片
    const productGrid = document.querySelector('.products .grid-4');
    if (productGrid) {
        productGrid.innerHTML = products.map(product => createImageCard(product, 'product-card')).join('');
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new Slider();
    initializeImageCards();
});

// 图片全屏预览
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && e.target.parentElement.classList.contains('image-card')) {
        const img = e.target;
        img.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    }
});

// 图片加载处理
document.addEventListener('DOMContentLoaded', function() {
    // 处理所有团队成员图片
    const teamImages = document.querySelectorAll('.member-img');
    teamImages.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
            this.parentElement.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            // 图片加载失败时显示默认头像
            this.src = 'images/default-avatar.png';
            // 如果默认头像也不存在，添加替代背景色
            this.addEventListener('error', function() {
                this.style.display = 'none';
                this.parentElement.style.backgroundColor = '#f5f5f5';
                // 添加用户名首字母作为替代显示
                const name = this.alt;
                if (name) {
                    const initial = document.createElement('div');
                    initial.className = 'member-initial';
                    initial.textContent = name.charAt(0);
                    this.parentElement.appendChild(initial);
                }
            });
        });
    });

    // 处理导航链接点击
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // 更新活动链接状态
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}); 