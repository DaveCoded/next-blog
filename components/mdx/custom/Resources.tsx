import styled from 'styled-components'

interface Resource {
    title: string
    url: string
    author?: string
}

interface ResourcesProps {
    resources: Resource[]
}

export default function Resources({ resources }: ResourcesProps) {
    return (
        <>
            <Divider />
            <Heading>References and further reading</Heading>
            <List>
                {resources.map(({ title, url, author }) => (
                    <ListItem key={title}>
                        <div>
                            <Title href={url} target="_blank" rel="noopener noreferrer">
                                {title}
                            </Title>
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
                            <Arrow src="/images/arrow-right-bold.svg" aria-hidden />
                        </div>
                        {author && <Author>{author}</Author>}
                    </ListItem>
                ))}
            </List>
        </>
    )
}

const Divider = styled.hr`
    border: none;
    border-top: 1px solid #ccc;
    margin-top: var(--space-xxl);
    margin-bottom: var(--space-xl);
`

const Heading = styled.h3`
    color: var(--dark-grey);
    font-weight: 300;
    margin-bottom: var(--space-md);
`

const List = styled.ol`
    font-size: 1.2rem;
    list-style: none;
    padding: 0;
`

const ListItem = styled.li`
    margin-bottom: var(--space-sm);
`

const Title = styled.a`
    font-weight: 600;
    transition: none;

    &:hover {
        color: var(--link-pink);
        text-decoration: underline;
    }
`

const Author = styled.div`
    color: var(--dark-grey);
`

const Arrow = styled.img`
    width: 1em;
    position: relative;
    top: 0.15em;
    margin-left: var(--space-xs);
`
