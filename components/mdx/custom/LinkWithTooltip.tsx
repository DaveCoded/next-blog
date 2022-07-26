import { ReactNode } from 'react'
import styled from 'styled-components'
import { unified } from 'unified'
import markdown from 'remark-parse'
import html from 'rehype-stringify'
import remark2rehype from 'remark-rehype'
import rehypeTruncate from 'rehype-truncate'

import BacklinkTooltip from '../BacklinkTooltip'
import InternalLink from '../InternalLink'

import bidirectionalLinksData from 'links.json'

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

interface LinkWithTooltipProps {
    children: ReactNode
    href?: string
}

export default function LinkWithTooltip({ href, children }: LinkWithTooltipProps) {
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
