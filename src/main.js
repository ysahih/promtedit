import './style.css'

// ─── Scroll Reveal ───
const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal')
    const windowHeight = window.innerHeight

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top
        const elementVisible = 120

        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('visible')
        }
    })
}

window.addEventListener('scroll', revealElements)
window.addEventListener('load', revealElements)

// ─── Navbar scroll effect ───
const navbar = document.getElementById('navbar')
let lastScroll = 0

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY

    if (currentScroll > 50) {
        navbar.classList.add('nav-scrolled')
    } else {
        navbar.classList.remove('nav-scrolled')
    }

    lastScroll = currentScroll
})

// ─── Mobile menu toggle ───
const menuBtn = document.getElementById('mobile-menu-btn')
const mobileMenu = document.getElementById('mobile-menu')
const menuClose = document.getElementById('mobile-menu-close')

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('open')
        document.body.style.overflow = 'hidden'
    })

    menuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open')
        document.body.style.overflow = ''
    })

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open')
            document.body.style.overflow = ''
        })
    })
}

// ─── Smooth scroll for anchor links ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    })
})

// ─── Counter animation for stats ───
const animateCounters = () => {
    const counters = document.querySelectorAll('[data-count]')

    counters.forEach(counter => {
        if (counter.dataset.animated) return

        const rect = counter.getBoundingClientRect()
        if (rect.top > window.innerHeight) return

        counter.dataset.animated = 'true'
        const target = parseInt(counter.dataset.count)
        const suffix = counter.dataset.suffix || ''
        const duration = 2000
        const start = Date.now()

        const tick = () => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.floor(eased * target)

            counter.textContent = current.toLocaleString() + suffix

            if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
    })
}

window.addEventListener('scroll', animateCounters)
window.addEventListener('load', animateCounters)

// ─── Typing effect for hero ───
const typeWriter = () => {
    const el = document.getElementById('typing-text')
    if (!el) return

    const words = ['Faster', 'Smarter', 'Better', 'Bolder']
    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false

    const type = () => {
        const currentWord = words[wordIndex]

        if (isDeleting) {
            el.textContent = currentWord.substring(0, charIndex - 1)
            charIndex--
        } else {
            el.textContent = currentWord.substring(0, charIndex + 1)
            charIndex++
        }

        let delay = isDeleting ? 50 : 120

        if (!isDeleting && charIndex === currentWord.length) {
            delay = 2000
            isDeleting = true
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false
            wordIndex = (wordIndex + 1) % words.length
            delay = 500
        }

        setTimeout(type, delay)
    }

    type()
}

window.addEventListener('load', typeWriter)
