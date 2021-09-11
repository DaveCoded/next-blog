type Props = {
    width?: number
    height?: number
    children: JSX.Element
}

export default function Svg({ width = 24, height = 24, children }: Props) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill='url("#myGradient")'>
            <defs>
                <linearGradient id="myGradient" gradientTransform="rotate(90)">
                    <stop offset="5%" stopColor="#8f97e2" />
                    <stop offset="95%" stopColor="var(--purple)" />
                </linearGradient>
            </defs>
            {children}
        </svg>
    )
}
