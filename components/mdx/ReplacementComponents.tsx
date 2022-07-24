import React, {
    HTMLAttributes,
    BlockquoteHTMLAttributes,
    DetailedHTMLProps,
    ImgHTMLAttributes,
    AnchorHTMLAttributes
} from 'react'
import styled, { StyledComponent } from 'styled-components'
import bidirectionalLinksData from 'links.json'
import { Blockquote, CodeBlock, H2, H3, H4, H5, P } from '@/components/mdx/typography'
import ExternalLink from '@/components/ExternalLink'
import BacklinkTooltip from './BacklinkTooltip'
import InternalLink from './InternalLink'

import { unified } from 'unified'
import markdown from 'remark-parse'
import html from 'rehype-stringify'
import remark2rehype from 'remark-rehype'
import rehypeTruncate from 'rehype-truncate'

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

const HeadingLink = styled.a`
    &:hover {
        color: currentColor;
    }
`

const TooltipTitle = styled.h3`
    margin-bottom: var(--space-sm);
    color: #edf1f6;
    font-size: var(--text-md);
    font-family: 'Headline';
    line-height: 1.125;
`

const Excerpt = styled.div`
    p {
        color: #edf1f6;
        font-size: 1.05rem;
        line-height: 1.3;

        &:last-child {
            margin-bottom: 0;
        }
    }
`

const wrapHeadingInLink = (
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
    Heading: StyledComponent<'h2' | 'h3' | 'h4' | 'h5', any, {}, never>,
    props: HTMLAttributes<HTMLHeadingElement>
) => {
    if (props.id) {
        return (
            <Heading {...props}>
                <HeadingLink href={`#${props.id}`}>{props.children}</HeadingLink>
            </Heading>
        )
    }
    return <Heading {...props} />
}

const ReplacementComponents = {
    h2: (props: HTMLAttributes<HTMLHeadingElement>) => wrapHeadingInLink(H2, props),
    h3: (props: HTMLAttributes<HTMLHeadingElement>) => wrapHeadingInLink(H3, props),
    h4: (props: HTMLAttributes<HTMLHeadingElement>) => wrapHeadingInLink(H4, props),
    h5: (props: HTMLAttributes<HTMLHeadingElement>) => wrapHeadingInLink(H5, props),
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
    a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
        const { href, className, children } = props
        if (className?.includes('post-backlink')) {
            // This relies on the options passed to the remark plugin in [slug].tsx
            const alias = href?.split('#/page/')[1]
            if (!alias || !bidirectionalLinksData) return <>children</>

            const linkData = bidirectionalLinksData.find((post) => post.ids.includes(alias))
            const { slug, title, content } = linkData || { slug: '' }

            const previewHtml = unified()
                .use(markdown)
                .use(remark2rehype)
                .use(rehypeTruncate, { maxChars: 150 })
                .use(html)
                .processSync(content)
                .toString()

            console.log({ previewHtml })

            return (
                <BacklinkTooltip
                    content={
                        <div>
                            <TooltipTitle>{title}</TooltipTitle>
                            <Excerpt dangerouslySetInnerHTML={{ __html: previewHtml }} />
                        </div>
                    }
                >
                    <InternalLink href={`/blog/${slug}`}>{children}</InternalLink>
                </BacklinkTooltip>
            )
        }
        if (href?.startsWith('#')) {
            return <a style={{ color: 'var(--link-pink)' }} {...props} />
        }
        return (
            <ExternalLink style={{ color: 'var(--link-pink)' }} newTab {...props}>
                {props.children}
            </ExternalLink>
        )
    }
}

export default ReplacementComponents
