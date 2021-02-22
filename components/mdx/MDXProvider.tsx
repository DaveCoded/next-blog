import { BlockquoteHTMLAttributes, HTMLAttributes } from 'react'
import { MDXProvider } from '@mdx-js/react'
import Image, { ImageProps } from 'next/image'

export default function MDXCompProvider(providerProps: HTMLAttributes<HTMLDivElement>) {
    const state = {
        h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h1
                {...props}
                style={{
                    fontFamily: 'Playfair Display',
                    fontSize: '3.6rem',
                    fontWeight: 200,
                    lineHeight: 1.2,
                    ...props.style
                }}
            />
        ),
        h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h2
                {...props}
                style={{
                    fontSize: '2.8rem',
                    fontWeight: 400,
                    lineHeight: 1.25
                }}
            />
        ),
        h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h3
                {...props}
                style={{
                    fontSize: '1.9rem',
                    fontWeight: 400,
                    lineHeight: 1.25
                }}
            />
        ),
        h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h4
                {...props}
                style={{
                    fontFamily: 'Poppins',
                    lineHeight: 1.25,
                    fontWeight: 600,
                    fontSize: '1.4rem',
                    color: '#582293'
                }}
            />
        ),
        blockquote: (props: BlockquoteHTMLAttributes<HTMLElement>) => (
            <blockquote className="blockquote" {...props} />
        ),
        hr: (props: HTMLAttributes<HTMLElement>) => <hr {...props} />,
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
