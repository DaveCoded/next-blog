import { BlockquoteHTMLAttributes, HTMLAttributes } from 'react'
import { MDXProvider } from '@mdx-js/react'
import Image, { ImageProps } from 'next/image'

export default function MDXCompProvider(providerProps: HTMLAttributes<HTMLDivElement>) {
    const state = {
        h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h4
                {...props}
                style={{
                    fontSize: '1.84rem',
                    lineHeight: 1.25,
                    fontWeight: 600,
                    color: 'var(--heading-lavender)'
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
