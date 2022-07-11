import LightGallery from 'lightgallery/react'

import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'
import styled from 'styled-components'
import { SROnly } from '@/styles/accessibility'

type LightboxProps = {
    src: string
    alt: string
    width?: React.CSSProperties['width']
}

function Lightbox({ src, alt, width }: LightboxProps) {
    return (
        <Wrapper>
            <ZoomButton>
                <SROnly>Zoom in</SROnly>
                <img
                    src="/images/magnifying-glass-plus-bold.svg" // Icon from https://phosphoricons.com/
                    width="20px"
                    aria-hidden
                    alt="Magnifying glass icon"
                />
            </ZoomButton>
            <LightGallery speed={500}>
                <a href={src}>
                    <img alt={alt} src={src} style={{ width: width || '100%' }} />
                </a>
            </LightGallery>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;
    width: 800px; // Same width as h1 and metadata
    max-width: 100%;
    min-width: 100%;
`

const ZoomButton = styled.button`
    position: absolute;
    right: 0px;
    top: 0px;
    background: none;
    border: none;
    cursor: pointer;
    pointer-events: none;
`

export default Lightbox
