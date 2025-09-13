'use client'

import { motion } from 'framer-motion'

const logos = [
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        alt: 'Google',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg',
        alt: 'Notion',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png',
        alt: 'Slack',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg',
        alt: 'Dropbox',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
        alt: 'GitHub',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
        alt: 'Microsoft',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
        alt: 'Apple',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Figma-1-logo.png',
        alt: 'Figma',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
        alt: 'IBM',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Amazon_icon.svg',
        alt: 'Amazon',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Trello_logo.svg',
        alt: 'Trello',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png',
        alt: 'Meta',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Twitter_logo_2023.svg',
        alt: 'Twitter',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Atlassian-Logo.png',
        alt: 'Atlassian',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
        alt: 'Spotify',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Adobe_Corporate_Logo.png',
        alt: 'Adobe',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Yahoo%21_logo.svg',
        alt: 'Yahoo',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Zoom_Communications_Logo.svg',
        alt: 'Zoom',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Airbnb_Logo_Bélo.svg',
        alt: 'Airbnb',
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Netflix_logo.svg',
        alt: 'Netflix',
    },
]

export default function TrustedBy() {
    const repeatedLogos = [...logos, ...logos] // ensure seamless loop

    return (
        <section
            className="py-20 bg-black text-gray-400 overflow-hidden"
            aria-labelledby="trusted-heading"
        >
            <div className="max-w-6xl mx-auto px-4 text-center">
                <p
                    id="trusted-heading"
                    className="text-sm uppercase tracking-widest mb-12 text-gray-500"
                >
                    Trusted by teams at
                </p>

                <div className="relative overflow-hidden w-full h-20">
                    <motion.div
                        className="flex gap-20 w-max"
                        initial={{ x: 0 }}
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{
                            repeat: Infinity,
                            duration: 30,
                            ease: 'linear',
                        }}
                    >
                        {repeatedLogos.map((logo, index) => (
                            <img
                                key={index}
                                src={logo.src}
                                alt={logo.alt}
                                className="h-10 w-auto grayscale hover:grayscale-0 hover:scale-105 transition duration-300"
                                loading="lazy"
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
