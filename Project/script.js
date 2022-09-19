gsap.registerPlugin(ScrollTrigger);

function LocomotiveScrollCode() {
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

function slides() {
    let allSlides = document.querySelectorAll(".sld");
    allSlides = [...allSlides];

    var isHovered = null;

    allSlides.forEach(function (elem) {
        elem.addEventListener("mouseover", function (dets) {
            isHovered = "#opener" + dets.target.dataset.index;
            document.querySelector(isHovered).style.width = "100%";
        })

        elem.addEventListener("mouseleave", function (dets) {
            isHovered = "#opener" + dets.target.dataset.index;
            document.querySelector(isHovered).style.width = "0%";
        })
    });

    document.querySelector(".goalgoal")
        .addEventListener("mousemove", function (dets) {
            var bndrectvals = document.querySelector(".goalgoal").getBoundingClientRect()
            var xVal = dets.clientX - bndrectvals.x;
            var yVal = dets.clientY - bndrectvals.y;

            document.querySelector("#playBall").style.top = yVal + "px";
            document.querySelector("#playBall").style.left = xVal + "px";
            document.querySelector("#playBall").style.boxShadow = "0 0 10px 3px green";
        })

    document.querySelector(".goalgoal")
        .addEventListener("mouseleave", function (dets) {
            document.querySelector("#playBall").style.top = 50 + "%";
            document.querySelector("#playBall").style.left = 50 + "%";

            document.querySelector("#playBall").style.boxShadow = "none";
        })
}

function Animations() {
    document.querySelectorAll(".rowtxts")
        .forEach(function (row) {
            row.innerHTML = `<div class="textwrapper">${row.innerHTML}</div>`;
        })



    document.querySelectorAll(".textwrapper")
        .forEach(txt => {
            let clutter = "";
            txt.textContent.split(" ").forEach(wrd => {
                clutter += `<span>${wrd}</span>`;
            })

            txt.innerHTML = clutter;
        })

        gsap.set(".rowtxts span", {y: "200%"})

        document.querySelectorAll(".rowtxts")
        .forEach(function(elem){
            gsap.from(elem, {
                scrollTrigger: {
                    scroller: "#main",
                    trigger: elem,
                    start: "top 60%",
                    // markers:true,
                },
                onStart: function(){
                    gsap.to(elem.children[0].children, {
                        y: 0,
                        ease: Power4,
                        duration: .3,
                        stagger: .2
                    })
                }
            })
            gsap.from(".row #line",{
                width:"0%",
                duration:1,
                delay:.5

            })
        })
}

function gsapCode() {
    gsap.to(".row", {
        scrollTrigger: {
            scroller: "#main",
            trigger: "#video",
            start: "top 60%",
            end: "top 10%",
            scrub: 2,
        },
        opacity: 0,
        ease: Expo
    })
}

function workAnimationCode(){
    gsap.to("#work .card", {
        scrollTrigger: {
            scroller: "#main",
            trigger: "#work",
            start: "top 0%",
            scrub:1,
            pin:true
        },
        top: "-100%",
        ease: Power4,
        stagger: .08
    });
    var para = document.querySelector(".card p"); 
    var photo=document.querySelector(".photu img");
    photo.addEventListener("mouseover",function(){
        document.querySelector("#work").style.backgroundColor = "red";
    });
}

function lookAnimationCode(){
    gsap.to("#look #allwork", {
        scrollTrigger: {
            scroller: "#main",
            trigger: "#look",
            start: "top 0%",
            scrub:1,
            pin:true
        },
        top: "50%",
        ease: Power4,
        stagger: .08
    })
}

LocomotiveScrollCode();
slides();
gsapCode();
Animations();
workAnimationCode();
lookAnimationCode();
