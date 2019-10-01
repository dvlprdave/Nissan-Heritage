function init() {
  const slides = document.querySelectorAll('.slide')
  const pages = document.querySelectorAll('.page')
  const backgrounds = [
    `radial-gradient(#2B3760, #0B1023)`,
    `radial-gradient(#4E3022, #161616)`,
    `radial-gradient(#4E4342, #161616)`
  ]

  let current = 0 // Page tracker
  let scrollSlide = 0

  slides.forEach((slide, index) => {
    slide.addEventListener('click', function () {
      changeDots(this)
      nextSlide(index)
      scrollSlide = index
    })
  })

  function changeDots(dot) {
    slides.forEach(slide => slide.classList.remove('active'))
    dot.classList.add('active')
  }

  function nextSlide(pageNumber) {
    const nextPage = pages[pageNumber]
    const currentPage = pages[current]

    const nextLeft = nextPage.querySelectorAll('.hero .model-left')
    const nextRight = nextPage.querySelectorAll('.hero .model-right')
    const currentLeft = currentPage.querySelectorAll('.hero .model-left')
    const currentRight = currentPage.querySelectorAll('.hero .model-right')

    const nextText = nextPage.querySelectorAll('.details')
    const portfolio = document.getElementById('portfolio')

    /* ----------------------------- TimeLineMax / Page Dot Animations----------------------------- */

    const timeLine = new TimelineMax()

    timeLine
      .fromTo(currentLeft, 0.3, { y: '-10%' }, { y: '-100%' })
      .fromTo(currentRight, 0.3, { y: '10%' }, { y: '-100%' }, '-=0.2')
      .to(portfolio, 0.3, { backgroundImage: backgrounds[pageNumber] })
      .fromTo(
        currentPage,
        0.3,
        { opacity: 1, pointerEvents: 'all' },
        { opacity: 0, pointerEvents: 'none' }
      )
      .fromTo(
        nextPage,
        0.3,
        { opacity: 0, pointerEvents: 'none' },
        { opacity: 1, pointerEvents: 'all' },
        '-=0.6'
      )
      .fromTo(nextLeft, 0.3, { y: '-100%' }, { y: '-10%' }, '-=0.6')
      .fromTo(nextRight, 0.3, { y: '-100%' }, { y: '10%' }, '-=0.8')
      .fromTo(nextText, 0.3, { opacity: 0, y: 0 }, { opacity: 1, y: 0 })
      // Fix left and right image hover
      .set(nextLeft, { clearProps: 'all' })
      .set(nextRight, { clearProps: 'all' })

    current = pageNumber
  }

  // Don't execute more than once every 1400ms
  document.addEventListener('wheel', throttle(scrollChange, 1400))
  document.addEventListener('touchmove', throttle(scrollChange, 1400)) // allow on mobile

  function switchDots(dotNumber) {
    const activeDot = document.querySelectorAll('.slide')[dotNumber]
    slides.forEach(slide => slide.classList.remove('active'))
    activeDot.classList.add('active')
  }

  // Track dot(page) number when scrolling 
  function scrollChange(e) {
    if (e.deltaY > 0) {
      scrollSlide += 1
    } else {
      scrollSlide -= 1
    }

    if (scrollSlide > 2) {
      scrollSlide = 0
    }
    if (scrollSlide < 0) {
      scrollSlide = 2
    }

    switchDots(scrollSlide)
    nextSlide(scrollSlide)
  }

  /**************************************
   Throttling makes it so a function is 
   called a set number of times over a 
   given period. 
  ****************************************/
  function throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  /* ------------------------------ Hamburger ------------------------------ */

  const hamburger = document.querySelector('.menu')
  const hamburgerLines = document.querySelectorAll('.menu line')
  const navOpen = document.querySelector('.nav-open')
  const contact = document.querySelector('.contact')
  const social = document.querySelector('.social')
  const logo = document.getElementById('logo')

  const timeLine = new TimelineMax({ paused: true, reversed: true })
  timeLine.to(navOpen, 0.5, { y: 0 })
    .fromTo(contact, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.1")
    .fromTo(social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=0.5")
    .fromTo(logo, 0.2, { color: "white" }, { color: "black" }, "-=1")
    .fromTo(
      hamburgerLines,
      0.2,
      { stroke: "white" },
      { stroke: "black" },
      "-=1"
    )

  hamburger.addEventListener('click', () => {
    timeLine.reversed()
      ? timeLine.play()
      : timeLine.reverse()
  })
}

init()