import {
    BlockquoteHTMLAttributes,
    DetailedHTMLProps,
    HTMLAttributes,
    ImgHTMLAttributes
} from 'react'
import { MDXProvider } from '@mdx-js/react'
import { P, Blockquote, CodeBlock, H2, H3, H4, H5 } from './typography'
import styled from 'styled-components'
import ExternalLink from '../ExternalLink'

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
        ul: (props: HTMLAttributes<HTMLUListElement>) => <UL {...props} />,
        hr: (props: HTMLAttributes<HTMLElement>) => <hr {...props} />,
        img: (props: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => (
            <ImgContainer>
                <img {...props} alt={props.alt} width="100%" />
            </ImgContainer>
        ),
        pre: (props: HTMLAttributes<HTMLPreElement>) => <CodeBlock {...props} />,
        a: (props: any) => {
            const href: string = props.href
            if (href.startsWith('#')) {
                return (
                    <a href={href} style={{ color: 'var(--link-pink)' }}>
                        {props.children}
                    </a>
                )
            }
            return (
                <ExternalLink href={href} style={{ color: 'var(--link-pink)' }} newTab {...props}>
                    {props.children}
                </ExternalLink>
            )
        }
    }

    return (
        <MDXProvider components={state}>
            <div {...providerProps} />
        </MDXProvider>
    )
}

const UL = styled.ul`
    padding-inline-start: 1.5rem;
    margin-bottom: var(--space-md);
`

const ImgContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
`
