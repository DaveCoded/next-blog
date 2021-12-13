import { motion, AnimateSharedLayout } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { BioTone } from '../../pages/about'

type Props = {
    bios: ReadonlyArray<BioTone>
    activeBio: string
    setActiveBio: Dispatch<SetStateAction<BioTone>>
}

export default function Backlinks({ bios, activeBio, setActiveBio }: Props) {
    return (
        <AnimateSharedLayout>
            <List>
                {bios.map((bio, i) => {
                    const isActive = bio === activeBio
                    return (
                        <ListItem
                            isActive={isActive}
                            whileTap={isActive ? { scale: 0.95 } : { opacity: 0.8 }}
                            key={bio}
                        >
                            <Button
                                onClick={() => setActiveBio(bio)}
                                // Prevents focus state from appearing on click
                                onMouseDown={(e) => e.preventDefault()}
                                type="button"
                            >
                                {isActive && <ActiveControl layoutId="SegmentedControlActive" />}
                                <Label>{bio}</Label>
                            </Button>
                        </ListItem>
                    )
                })}
            </List>
        </AnimateSharedLayout>
    )
}

const List = styled.ol`
    display: inline-flex;
    margin: 0;
    padding: 3px;
    list-style: none;
    background-color: var(--dark-grey-see-through);
    border-radius: 10px;
    margin-bottom: var(--space-sm);
`

const ListItem = styled(motion.li)<{ isActive: boolean }>`
    position: relative;
    margin-bottom: 0;
    line-height: 1;

    &:after {
        position: absolute;
        top: 15%;
        right: -0.5px;
        display: block;
        width: 1px;
        height: 70%;
        background-color: rgb(0 0 0 / 25%);
        opacity: ${({ isActive }) => (isActive ? 0 : 1)};
        transition: opacity 200ms ease-out;
        content: '';
    }

    &:last-of-type {
        &:after {
            display: none;
        }
    }
`

const Label = styled.span`
    color: var(--off-white);
    opacity: 0.8;
    position: relative;
    z-index: 2;
    white-space: nowrap;
    transition: opacity 350ms ease-out;
`

const Button = styled.button`
    font-family: inherit;
    font-weight: 600;
    font-size: var(--text-xs);
    position: relative;
    margin: 0;
    padding: 8px 22px;
    line-height: 1;
    background: transparent;
    border: none;
    outline: none;

    &:hover,
    &:focus {
        cursor: pointer;
    }

    &:focus ${Label} {
        outline: var(--light-grey) solid 3px;
        outline-offset: 4px;
    }
`

const ActiveControl = styled(motion.div)`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: var(--light-black);
    border-radius: 7px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    content: '';

    & + ${Label} {
        opacity: 1;
    }
`
