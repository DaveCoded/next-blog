import { BlockquoteHTMLAttributes, HTMLAttributes } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { P, A, Blockquote, CodeBlock, H2, H3, H4, H5 } from './typography'
import Image, { ImageProps } from 'next/image'

export default function MDXCompProvider(providerProps: HTMLAttributes<HTMLDivElement>) {
    const state = {
        h2: (props: HTMLAttributes<HTMLHeadingElement>) => <H2 {...props} />,
        h3: (props: HTMLAttributes<HTMLHeadingElement>) => <H3 {...props} />,
        h4: (props: HTMLAttributes<HTMLHeadingElement>) => <H4 {...props} />,
        h5: (props: HTMLAttributes<HTMLHeadingElement>) => <H5 {...props} />,
        p: (props: HTMLAttributes<HTMLParagraphElement>) => <P {...props} />,
        blockquote: (props: BlockquoteHTMLAttributes<HTMLElement>) => (
            <Blockquote {...props}>{props.children}</Blockquote>
        ),
        hr: (props: HTMLAttributes<HTMLElement>) => <hr {...props} />,
        img: (props: ImageProps) => <Image {...props} alt={props.alt} />,
        pre: (props: HTMLAttributes<HTMLPreElement>) => <CodeBlock {...props} />,
        a: (props: HTMLAttributes<HTMLAnchorElement>) => <A {...props}>{props.children}</A>
    }

    return (
        <MDXProvider components={state}>
            <div {...providerProps} />
        </MDXProvider>
    )
}
