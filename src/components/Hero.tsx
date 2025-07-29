"use client"
import React, { ReactNode, useRef } from "react"
import { Button } from "./ui/button"
import {
    Atom,
    Book,
    Brain,
    Globe,
    GraduationCap,
    Mic2,
    Paintbrush,
    Pen,
    Plus,
    TabletSmartphone,
    Telescope,
    Trophy,
} from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

// gsap.registerPlugin(gsap.utils)

type MovingElement = HTMLElement

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    useGSAP(
        () => {
            console.log("useGSAP hook started.")

            // Early exit if containerRef.current is null (e.g., during SSR)
            if (!containerRef.current) {
                console.warn("Container ref is not attached to the DOM.")
                return
            }

            const elements: MovingElement[] = gsap.utils.toArray(
                ".moving-icon",
                containerRef.current
            )

            console.log("Elements found by GSAP:", elements.length, elements)

            if (elements.length === 0) {
                console.warn(
                    "No elements with class 'moving-icon' found within the container."
                )
                return
            }

            // Get dimensions of the *container*
            const containerRect = containerRef.current.getBoundingClientRect()
            const containerWidth = containerRect.width
            const containerHeight = containerRect.height

            console.log(
                "Container Dimensions:",
                containerWidth,
                "x",
                containerHeight
            )

            elements.forEach((el: MovingElement, index) => {
                // Get the actual rendered dimensions of the element
                // These should now reflect your CSS width/height (e.g., 60px)
                const elementWidth = el.offsetWidth
                const elementHeight = el.offsetHeight

                console.log(
                    `Element ${index} Dimensions:`,
                    elementWidth,
                    "x",
                    elementHeight,
                    el
                )

                if (elementWidth === 0 || elementHeight === 0) {
                    console.warn(
                        `Element ${index} (class 'moving-icon') has zero width or height! Cannot animate.`
                    ) // Debug 7
                    // You might want to skip this element or provide a default size if it's always zero.
                    // For now, let's proceed but this is a red flag.
                }

                // Initial position: center it relative to the CONTAINER
                // (containerWidth / 2) & (containerHeight / 2) is the center of the container
                gsap.set(el, {
                    x: containerWidth / 2,
                    y: containerHeight / 2,
                    xPercent: -50, // Shift left by half its own width
                    yPercent: -50, // Shift up by half its own height
                    opacity: 0, // Start invisible to prevent FOUC, then fade in
                    scale: 0.4, // Start smaller
                    // Add a custom property for debugging initial position
                    // This will be useful if the elements are still top-left
                    _gsapDebug: `Initial set to x: ${containerWidth / 2}, y: ${
                        containerHeight / 2
                    }`,
                })

                const createNextTween = () => {
                    // Calculate a new random target point *within bounds*
                    const targetX = gsap.utils.random(
                        0,
                        containerWidth - elementWidth
                    )
                    const targetY = gsap.utils.random(
                        0,
                        containerHeight - elementHeight
                    )

                    gsap.to(el, {
                        x: targetX,
                        y: targetY,
                        opacity: 0.8, // Ensure visible
                        scale: 1, // Ensure correct size
                        duration: gsap.utils.random(5, 8),
                        delay: gsap.utils.random(0.1, 0.2),
                        ease: gsap.utils.random([
                            "power1.inOut",
                            "power2.inOut",
                            "power3.inOut",
                            "back.inOut",
                        ]),
                        onComplete: createNextTween, // When this animation finishes, queue the next one
                        overwrite: "auto", // Important: ensures no conflicts if animation restarts before finishing
                    })
                }

                // Start the very first animation for this element after a slight delay
                // The initial `gsap.set` will position it, then the first tween will fade it in
                gsap.to(el, {
                    delay: gsap.utils.random(0.5, 1), // Stagger initial starts
                    duration: 0.8, // Small duration for fade-in/scale-up
                    opacity: 0.1,
                    scale: 1,
                    onComplete: createNextTween, // Once faded in, start the continuous movement
                })
            })
        },
        { scope: containerRef, dependencies: [] }
    )
    return (
        <div
            className="hero relative overflow-hidden w-full"
            ref={containerRef}
        >
            <div className="px-16 py-8 rounded-4xl flex flex-col items-center justify-center gap-8 z-50 backdrop-blur-2xl">
                <h1 className="text-8xl">THE HÜB</h1>
                <p className="text-xl font-semibold opacity-90">
                    Your one-stop site for fun and educational quizzes
                </p>
                <div className="flex items-center gap-16 mt-8">
                    <Link href={"/quiz"}>
                        <Button
                            size={"icon"}
                            className="w-fit px-8 py-6 text-lg flex gap-4"
                        >
                            <GraduationCap className="size-8" />
                            Take a quiz
                        </Button>
                    </Link>
                    <Link href={"/jokes"}>
                        <Button
                            className="w-fit px-8 py-6 text-lg flex gap-4"
                            variant={"outline"}
                            size={"icon"}
                        >
                            <Mic2 className="size-6" />
                            Jokes
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="absolute inset-0 [&>div]:absolute [&>div]:opacity-0 [&>div]:w-12 [&>div]:aspect-square [&>div_svg]:w-full [&>div_svg]:h-full">
                <div className="moving-icon">
                    <Globe size={40} />
                </div>
                <div className="moving-icon">
                    <TabletSmartphone size={40} />
                </div>
                <div className="moving-icon">
                    <Trophy size={40} />
                </div>
                <div className="moving-icon">
                    <Atom size={40} />
                </div>
                <div className="moving-icon">
                    <Brain size={40} />
                </div>
                <div className="moving-icon">
                    <Book size={40} />
                </div>
                <div className="moving-icon">
                    <Paintbrush size={40} />
                </div>
                <div className="moving-icon">
                    <Plus size={40} />
                </div>
                <div className="moving-icon">
                    <Telescope size={40} />
                </div>
                <div className="moving-icon">
                    <Pen size={40} />
                </div>
            </div>
        </div>
    )
}

export default Hero
