import { BlockquoteHTMLAttributes, HTMLAttributes } from 'react'
import { MDXProvider } from '@mdx-js/react'
// import Image, { ImageProps } from 'next/image'
import CodeBlock from './CodeBlock'

export default function MDXCompProvider(providerProps: HTMLAttributes<HTMLDivElement>) {
    const state = {
        p: (props: HTMLAttributes<HTMLParagraphElement>) => (
            <p {...props} className="BlogPost__Paragraph" />
        ),
        blockquote: (props: BlockquoteHTMLAttributes<HTMLElement>) => (
            <blockquote className="blockquote" {...props}>
                {props.children}
            </blockquote>
        ),
        hr: (props: HTMLAttributes<HTMLElement>) => <hr {...props} />,
        img: (props: any) => (
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '1.5rem'
                }}
            >
                <img src={props.src} alt={props.alt} width="100%" />
            </div>
        ),
        // img: (props: ImageProps) => (
        //     <div
        //         style={{
        //             width: '100%',
        //             display: 'flex',
        //             justifyContent: 'center',
        //             marginBottom: '1.5rem'
        //         }}
        //     >
        //         <Image {...props} />
        //     </div>
        // ),
        pre: (props: HTMLAttributes<HTMLPreElement>) => <CodeBlock {...props} />
    }
    return (
        <MDXProvider components={state}>
            <div {...providerProps} />
        </MDXProvider>
    )
}
