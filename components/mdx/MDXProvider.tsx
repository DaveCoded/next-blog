import { MDXProvider } from '@mdx-js/react'
import { HTMLAttributes } from 'react'

export default function MDXCompProvider(
    providerProps: HTMLAttributes<HTMLDivElement>
) {
    const state = {
        h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h1
                {...props}
                style={{
                    fontWeight: 700,
                    textDecoration: 'underline',
                    fontSize: '3.998rem',
                    lineHeight: 1.13,
                    ...props.style
                }}
            />
        ),
        h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h2
                {...props}
                style={{
                    fontFamily: 'Permanent Marker',
                    fontSize: '2.827rem'
                }}
            />
        ),
        h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h3
                {...props}
                style={{
                    fontFamily: 'Permanent Marker',
                    fontSize: '1.999rem'
                }}
            />
        )
    }
    return (
        <MDXProvider components={state}>
            <div {...providerProps} />
        </MDXProvider>
    )
}
