import styled from 'styled-components'
import Modal from 'react-modal'
import { GitHub, LinkedIn, Twitter, Mail } from '../icons'
import { GITHUB_LINK, LINKEDIN_LINK, MAILTO_LINK, TWITTER_LINK } from '../../constants/links'
import ExternalLink from '../ExternalLink'

type Props = {
    isContactOpen: boolean
    closeContact: () => void
}

// todo: write blog post about using react-modal in Next.js
Modal.setAppElement('#__next')

export default function ContactModal({ isContactOpen, closeContact }: Props) {
    return (
        <Modal
            isOpen={isContactOpen}
            onRequestClose={closeContact}
            closeTimeoutMS={500}
            style={modalStyles}
        >
            <Button onClick={closeContact}>&times;</Button>
            <UL>
                <LI>
                    <ExternalLink href={GITHUB_LINK} newTab>
                        <Span>
                            <GitHub width={30} height={33} />
                        </Span>{' '}
                        <Span>Github</Span>
                    </ExternalLink>
                </LI>
                <LI>
                    <ExternalLink href={LINKEDIN_LINK} newTab>
                        <Span>
                            <LinkedIn width={30} height={33} />
                        </Span>{' '}
                        <Span>LinkedIn</Span>
                    </ExternalLink>
                </LI>
                <LI>
                    <ExternalLink href={TWITTER_LINK} newTab>
                        <Span>
                            <Twitter width={30} height={33} />
                        </Span>{' '}
                        <Span>Twitter</Span>
                    </ExternalLink>
                </LI>
                <LI>
                    <ExternalLink href={MAILTO_LINK} newTab>
                        <Span>
                            <Mail width={30} height={33} />
                        </Span>{' '}
                        <Span>Email</Span>
                    </ExternalLink>
                </LI>
            </UL>
        </Modal>
    )
}

const Button = styled.button`
    background: none;
    border: none;
    color: var(--light-grey);
    font-size: var(--text-lg);
    line-height: 0;
    position: absolute;
    top: var(--space-md);
    right: var(--space-xs);
    cursor: pointer;
    transition: var(--link-hover-transition);

    &:hover,
    &:focus {
        color: var(--purple);
    }
`

const UL = styled.ul`
    width: 100%;
`

const LI = styled.li`
    list-style: none;
    /* Keep this at 1.3rem for focus outline style */
    font-size: 1.3rem;
    line-height: 0;
    margin: 1.4rem 0;

    a:hover,
    a:focus {
        color: inherit;
        span {
            text-decoration: underline;
        }
    }
`

const Span = styled.span`
    vertical-align: middle;
    display: inline-block;
    margin-right: 0.6rem;
    font-weight: 600;
`

const modalStyles: ReactModal.Styles = {
    content: {
        width: '17rem',
        height: '22rem',
        inset: '50% 0px 0px 50%', // top, right, bottom, left offests!
        transform: 'translate(-50%, -50%)',
        display: 'grid',
        placeItems: 'center',
        padding: '0 3.4rem',
        border: '2px solid var(--black)',
        background: 'var(--light-black)'
    },
    overlay: {
        backgroundColor: 'var(--dark-grey-see-through)'
    }
}
