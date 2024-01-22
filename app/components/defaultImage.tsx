"use client"

import { HTMLProps, useState } from "react"

interface Props extends HTMLProps<HTMLImageElement> {
    img: string,
    fallback: string
}

const DefaultImage = (p: Props) => { 
    const [src, setSrc] = useState(p.img || p.fallback);

    return <img {...p} title="img" src={src} onError={() => { setSrc(p.fallback) }} />
}

export default DefaultImage