// Main JavaScript for 2hcy.com blog
class BlogApp {
    constructor() {
        this.init();
    }

    init() {
        this.initLucideIcons();
        this.initNavigation();
        this.initSearch();
        this.initArticleFilter();
        this.initScrollEffects();
        this.initAnimations();
        this.initNewsletterForm();
        this.initLoadMore();
    }

    // Initialize Lucide icons
    initLucideIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Navigation functionality
    initNavigation() {
        const navbar = document.getElementById('navbar');
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        const searchBtn = document.getElementById('search-btn');

        // Navbar scroll effect
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.7)';
                navbar.style.backdropFilter = 'blur(12px)';
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });

        // Mobile menu toggle
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
        }

        // Active nav link highlighting
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Search functionality
    initSearch() {
        const searchBtn = document.getElementById('search-btn');
        const searchOverlay = document.getElementById('search-overlay');
        const searchClose = document.getElementById('search-close');
        const searchInput = document.getElementById('search-input');

        if (searchBtn && searchOverlay) {
            searchBtn.addEventListener('click', () => {
                searchOverlay.classList.add('active');
                searchInput?.focus();
            });
        }

        if (searchClose && searchOverlay) {
            searchClose.addEventListener('click', () => {
                searchOverlay.classList.remove('active');
            });
        }

        // Close search on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay?.classList.contains('active')) {
                searchOverlay.classList.remove('active');
            }
        });

        // Search input functionality
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    }

    // Article filtering
    initArticleFilter() {
        const filterTags = document.querySelectorAll('.filter-tag');
        const articles = document.querySelectorAll('.article-card');

        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                // Update active state
                filterTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');

                // Filter articles
                const filter = tag.dataset.filter;
                this.filterArticles(filter, articles);
            });
        });
    }

    // Filter articles based on category
    filterArticles(filter, articles) {
        articles.forEach(article => {
            const category = article.dataset.category;
            
            if (filter === 'all' || category === filter) {
                article.style.display = 'block';
                article.classList.add('fade-in');
            } else {
                article.style.display = 'none';
            }
        });
    }

    // Search functionality
    handleSearch(query) {
        const articles = document.querySelectorAll('.article-card');
        const searchTerm = query.toLowerCase().trim();

        if (searchTerm === '') {
            // Show all articles if search is empty
            articles.forEach(article => {
                article.style.display = 'block';
            });
            return;
        }

        articles.forEach(article => {
            const title = article.querySelector('.article-title').textContent.toLowerCase();
            const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
            const tags = Array.from(article.querySelectorAll('.tag'))
                .map(tag => tag.textContent.toLowerCase())
                .join(' ');

            const isMatch = title.includes(searchTerm) || 
                          excerpt.includes(searchTerm) || 
                          tags.includes(searchTerm);

            if (isMatch) {
                article.style.display = 'block';
                article.classList.add('fade-in');
            } else {
                article.style.display = 'none';
            }
        });
    }

    // Scroll effects
    initScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe article cards
        document.querySelectorAll('.article-card').forEach(card => {
            observer.observe(card);
        });

        // Observe sidebar widgets
        document.querySelectorAll('.widget, .author-card').forEach(widget => {
            observer.observe(widget);
        });
    }

    // Initialize animations
    initAnimations() {
        // Add staggered animation to article cards
        const articleCards = document.querySelectorAll('.article-card');
        articleCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Newsletter form
    initNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('.newsletter-input').value;
                
                if (email) {
                    this.subscribeToNewsletter(email);
                }
            });
        }
    }

    // Newsletter subscription
    subscribeToNewsletter(email) {
        // Simulate API call
        const btn = document.querySelector('.newsletter-btn');
        const originalText = btn.textContent;
        
        btn.textContent = '订阅中...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = '已订阅 ✓';
            btn.style.background = '#34C759';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.background = '#007AFF';
                document.querySelector('.newsletter-input').value = '';
            }, 2000);
        }, 1000);
    }

    // Load more articles
    initLoadMore() {
        const loadMoreBtn = document.querySelector('.load-more-btn');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreArticles();
            });
        }
    }

    // Load more articles (simulated)
    loadMoreArticles() {
        const btn = document.querySelector('.load-more-btn');
        const originalText = btn.textContent;
        const articlesGrid = document.getElementById('articles-grid');
        
        btn.textContent = '加载中...';
        btn.disabled = true;
        
        setTimeout(() => {
            // Simulate loading more articles
            const newArticles = this.generateMockArticles();
            newArticles.forEach(article => {
                articlesGrid.appendChild(article);
                // Trigger animation
                setTimeout(() => {
                    article.classList.add('fade-in');
                }, 100);
            });
            
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    }

    // Generate mock articles for "load more"
    generateMockArticles() {
        const mockArticles = [
            // Web3分类文章
            {
                title: "超低门槛将数字货币进行外汇&CFD交易",
                excerpt: "每天从上百个出海微信群和几万个出海微信好友私聊中，挑选一个大家的小问题来写一篇文章。今天介绍数字货币外汇&CFD交易的超低门槛方法。",
                date: "2025-10-27",
                readTime: "8分钟阅读",
                category: "web3",
                tags: ["数字货币", "CFD", "外汇"]
            },
            {
                title: "无需护照，仅需中国大陆身份注册芝麻开门Gate.io",
                excerpt: "Gate.io芝麻开门注册教程，使用身份证作为地址证明的简化流程，支持中国支付方式交易，无需海外地址凭证。",
                date: "2025-05-10",
                readTime: "10分钟阅读",
                category: "web3",
                tags: ["Gate.io", "交易所", "注册教程"]
            },
            {
                title: "无需实名KYC，交易手续费超低的海外web3交易平台",
                excerpt: "介绍0手续费的交易所NeverLess，提供科普介绍和安全提醒，帮助用户了解低手续费交易的优势。",
                date: "2025-05-04",
                readTime: "12分钟阅读",
                category: "web3",
                tags: ["NeverLess", "0手续费", "交易平台"]
            },
            {
                title: "仅需大陆身份证10分钟在线开通瑞士银行账户",
                excerpt: "瑞士银行账户在线申请教程，0管理费万事达卡特色，仅需大陆身份证即可在线申请。",
                date: "2025-04-14",
                readTime: "15分钟阅读",
                category: "web3",
                tags: ["瑞士银行", "万事达卡", "0管理费"]
            },
            // 跨境电商分类文章
            {
                title: "亚马逊联盟用WISE如何收款",
                excerpt: "有些朋友反馈亚马逊联盟收款用派安盈账户收款有年费问题，今天就介绍WISE账户相当于海外支付宝的使用方法。",
                date: "2024-05-11",
                readTime: "8分钟阅读",
                category: "ecommerce",
                tags: ["亚马逊联盟", "WISE", "收款"]
            },
            {
                title: "无心搭建Amazon联盟站意外赚数千美金",
                excerpt: "上次在生财受到邀请，在海外工具站大航海中做了一次分享，关于亚马逊联盟的促销站赚佣金的实战经验。",
                date: "2023-12-19",
                readTime: "12分钟阅读",
                category: "ecommerce",
                tags: ["Amazon联盟", "佣金", "实战"]
            },
            // 海外金融分类文章
            {
                title: "支持海外收款收单的光子易PhotonPay在线申请开通教程",
                excerpt: "文章开始前，提一句这两天几乎大部分人都知道的事儿，中国香港汇丰银行支持官方手机APP线上申请。",
                date: "2024-11-20",
                readTime: "10分钟阅读",
                category: "finance",
                tags: ["PhotonPay", "海外收款", "开户教程"]
            },
            {
                title: "大陆用户超低门槛超便捷一站式办理中国澳门的银行账户",
                excerpt: "出差一个星期，回来2天了，还是继续一大堆消息没回复，一大堆工作没处理完，都忙忘了还有日更文章忘记写了。",
                date: "2024-11-14",
                readTime: "14分钟阅读",
                category: "finance",
                tags: ["中国澳门银行", "一站式办理", "超低门槛"]
            },
            // 独立站分类文章
            {
                title: "更文直播1周亲身实践改善海外联盟网站",
                excerpt: "刚过去的2023年7月份一个废弃的网站啥也没干又躺赚近150美金，但复制的十几个网站好像却一毛没有。",
                date: "2023-12-19",
                readTime: "16分钟阅读",
                category: "website",
                tags: ["联盟网站", "实战经验", "躺赚"]
            },
            {
                title: "Shopify网站如何给某个页面做重定向",
                excerpt: "像一般我们的客户会创建一些保修激活的页面，然后大部分建好的页面，shopify默认给的链接就是xxx.com/pages/warranty。",
                date: "2023-07-13",
                readTime: "6分钟阅读",
                category: "website",
                tags: ["Shopify", "页面重定向", "建站教程"]
            },
            // 海外营销分类文章
            {
                title: "国外Mailgun邮件服务账号验证不成功怎么办",
                excerpt: "在海外营销过程中，邮件服务验证是一个重要的环节。今天分享一些解决Mailgun验证问题的实用方法。",
                date: "2023-12-19",
                readTime: "7分钟阅读",
                category: "marketing",
                tags: ["Mailgun", "邮件服务", "验证问题"]
            },
            {
                title: "如何将1个域名的所有子账号邮箱的邮件转发到个人邮箱",
                excerpt: "在海外营销中，管理多个邮箱账号是常见需求。本文介绍如何高效地设置邮箱转发功能。",
                date: "2023-08-21",
                readTime: "8分钟阅读",
                category: "marketing",
                tags: ["邮箱转发", "域名邮箱", "营销工具"]
            },
            // AI人工智能分类文章
            {
                title: "2025年AI在跨境电商中的实战应用",
                excerpt: "随着AI技术的快速发展，跨境电商行业正在经历深刻变革。本文探讨AI在产品推荐、客户服务、供应链优化等方面的应用。",
                date: "2025-09-15",
                readTime: "12分钟阅读",
                category: "ai",
                tags: ["AI", "跨境电商", "智能推荐"]
            },
            {
                title: "ChatGPT在海外营销中的高级使用技巧",
                excerpt: "分享我在海外营销实战中使用ChatGPT的高级技巧，包括内容创作、广告文案优化、用户调研等应用场景。",
                date: "2025-08-20",
                readTime: "10分钟阅读",
                category: "ai",
                tags: ["ChatGPT", "海外营销", "内容创作"]
            },
            // 出海基建分类文章
            {
                title: "2023年10月最新海外版抖音TikTok注册教程",
                excerpt: "其实TikTok注册教程现在很多，我觉得没什么难度，但是昨天发了海外版微信WhatsApp后，有公众号读者询问介绍下TikTok注册方法。",
                date: "2023-09-29",
                readTime: "8分钟阅读",
                category: "infrastructure",
                tags: ["TikTok", "注册教程", "海外版抖音"]
            }
        ];

        return mockArticles.map(article => {
            const articleEl = document.createElement('article');
            articleEl.className = 'article-card';
            articleEl.dataset.category = article.category;
            
            articleEl.innerHTML = `
                <div class="article-header">
                    <div class="article-meta">
                        <span class="article-date">${article.date}</span>
                        <span class="article-read-time">${article.readTime}</span>
                    </div>
                    <div class="article-tags">
                        ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-footer">
                    <span class="article-author">小渔</span>
                </div>
            `;
            
            return articleEl;
        });
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogApp();
});

// Global utility functions
window.BlogUtils = {
    // Copy to clipboard
    copyToClipboard: function(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('已复制到剪贴板');
        });
    },
    
    // Show notification
    showNotification: function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#34C759' : '#FF3B30'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    },
    
    // Format date
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Reading time estimation
    estimateReadingTime: function(text) {
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes}分钟阅读`;
    }
};

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);