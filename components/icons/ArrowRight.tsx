import { SVGProps } from 'react'

type ArrowRightProps = SVGProps<SVGSVGElement> & { fillColor?: string }

export default function ArrowRight({ fillColor, ...props }: ArrowRightProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="192"
            height="192"
            fill={fillColor || '#000'}
            viewBox="0 0 256 256"
            {...props}
        >
            <rect width="256" height="256" fill="none"></rect>
            <line
                x1="40"
                y1="128"
                x2="216"
                y2="128"
                fill="none"
                stroke={fillColor || '#000'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
            ></line>
            <polyline
                points="144 56 216 128 144 200"
                fill="none"
                stroke={fillColor || '#000'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
            ></polyline>
        </svg>
    )
}
