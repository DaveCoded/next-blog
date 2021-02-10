import { BlockquoteHTMLAttributes, HTMLAttributes } from 'react'
import { MDXProvider } from '@mdx-js/react'
import Image, { ImageProps } from 'next/image'

export default function MDXCompProvider(
    providerProps: HTMLAttributes<HTMLDivElement>
) {
    const state = {
        h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h1
                {...props}
                style={{
                    fontSize: '4.209rem',
                    lineHeight: 1.32,
                    textShadow: '2px 3px var(--accent-orange)',
                    ...props.style
                }}
            />
        ),
        h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h2
                {...props}
                style={{
                    fontFamily: 'Permanent Marker',
                    fontSize: '3.157rem',
                    lineHeight: 1.32,
                    textShadow: '2px 3px var(--accent-blue)'
                }}
            />
        ),
        h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h3
                {...props}
                style={{
                    fontFamily: 'Permanent Marker',
                    fontSize: '2.369rem',
                    lineHeight: 1.32,
                    textShadow: '1px 2px var(--accent-green)'
                }}
            />
        ),
        h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h4
                {...props}
                style={{
                    fontFamily: 'Permanent Marker',
                    lineHeight: 1.32,
                    fontSize: '1.777rem'
                }}
            />
        ),
        blockquote: (props: BlockquoteHTMLAttributes<HTMLElement>) => (
            <blockquote
                {...props}
                style={{
                    background: 'rgb(211 231 238)',
                    margin: 0,
                    padding: '1rem 40px',
                    borderRadius: '10px',
                    boxShadow:
                        '2px 2px 4px 2px rgb(112 123 126 / 20%), 3px 3px 6px 6px rgb(112 123 126 / 6%)'
                }}
            />
        ),
        hr: (props: HTMLAttributes<HTMLElement>) => (
            <hr
                {...props}
                style={{
                    width: '30%',
                    height: '2px',
                    margin: '4rem auto',
                    border: '1px solid #F68E6E'
                }}
            />
        ),
        img: (props: ImageProps) => (
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Image {...props} />
            </div>
        )
    }
    return (
        <MDXProvider components={state}>
            <div {...providerProps} />
        </MDXProvider>
    )
}
