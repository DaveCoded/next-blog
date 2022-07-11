import { useRouter } from 'next/router'
import styled from 'styled-components'
import { isBlogPostRoute } from '@/lib/strings'

type Props = {
    children: React.ReactNode
}

export default function PageLayout({ children }: Props) {
    const route = useRouter().route

    return <Main route={route}>{children}</Main>
}

const Main = styled.main<{ route: string }>`
    background-color: ${(props) =>
        isBlogPostRoute(props.route) ? 'var(--white)' : 'var(--black)'};
    padding: var(--space-xl) var(--space-xl) var(--space-xxl) var(--space-xxxl);
    min-height: calc(100vh - 220px - 121px);

    @media (min-width: 1600px) {
        padding: var(--space-xl) 15vw var(--space-xxl);
    }

    @media (max-width: 700px) {
        padding: var(--space-xl) 5% var(--space-lg);
    }
`
