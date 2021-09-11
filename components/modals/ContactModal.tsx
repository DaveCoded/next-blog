import styled from 'styled-components'
import Modal from 'react-modal'
import { GitHub, LinkedIn, Twitter, Mail } from '../icons'

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
                    <a href="">
                        <Span>
                            <GitHub width={30} height={33} />
                        </Span>{' '}
                        <Span>Github</Span>
                    </a>
                </LI>
                <LI>
                    <a href="">
                        <Span>
                            <LinkedIn width={30} height={33} />
                        </Span>{' '}
                        <Span>LinkedIn</Span>
                    </a>
                </LI>
                <LI>
                    <a href="">
                        <Span>
                            <Twitter width={30} height={33} />
                        </Span>{' '}
                        <Span>Twitter</Span>
                    </a>
                </LI>
                <LI>
                    <a href="">
                        <Span>
                            <Mail width={30} height={33} />
                        </Span>{' '}
                        <Span>Email me</Span>
                    </a>
                </LI>
            </UL>
        </Modal>
    )
}

const Button = styled.button`
    background: none;
    border: none;
    color: var(--light-grey);
    font-size: 2.2rem;
    position: absolute;
    top: 0.1rem;
    right: 0.4rem;
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
    font-size: 1.3rem;
    line-height: 0;
    margin: 1.4rem 0;

    a:hover,
    a:focus {
        color: var(--teal);
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
        border: '2px solid var(--black-background)',
        background: 'var(--light-black)'
    },
    overlay: {
        backgroundColor: 'var(--dark-grey-see-through)'
    }
}
