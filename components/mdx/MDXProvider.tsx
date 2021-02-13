import { BlockquoteHTMLAttributes, HTMLAttributes } from 'react'
import { MDXProvider } from '@mdx-js/react'
import Image, { ImageProps } from 'next/image'

export default function MDXCompProvider(providerProps: HTMLAttributes<HTMLDivElement>) {
    const state = {
        p: (props: HTMLAttributes<HTMLParagraphElement>) => (
            <p
                {...props}
                style={{
                    fontSize: '1.34rem',
                    lineHeight: 1.7,
                    ...props.style
                }}
            />
        ),
        h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h1
                {...props}
                style={{
                    fontFamily: 'Freight Sans',
                    fontSize: '72px',
                    fontWeight: 300,
                    lineHeight: '75px',
                    ...props.style
                }}
            />
        ),
        h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h2
                {...props}
                style={{
                    fontFamily: 'Freight Display',
                    fontSize: '2.7rem',
                    fontWeight: 500,
                    lineHeight: 1.32
                }}
            />
        ),
        h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h3
                {...props}
                style={{
                    fontFamily: 'Freight Display',
                    fontSize: '2rem',
                    fontWeight: 500,
                    lineHeight: 1.32
                }}
            />
        ),
        h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h4
                {...props}
                style={{
                    fontFamily: 'Freight Sans',
                    lineHeight: 1.32,
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    color: '#181875'
                }}
            />
        ),
        blockquote: (props: BlockquoteHTMLAttributes<HTMLElement>) => (
            <blockquote className="blockquote" {...props} />
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
