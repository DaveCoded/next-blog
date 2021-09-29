import styled from 'styled-components'

type Props = {
    id: string
    children: string
}

const MarginNote = ({ id, children }: Props) => {
    return (
        <Span>
            <label htmlFor={id} className="margin-toggle sidenote-number"></label>
            <input type="checkbox" id={id} className="margin-toggle" />
            <span className="sidenote">{children}</span>
        </Span>
    )
}

// todo: clean this up
const Span = styled.span`
    .sidenote,
    .marginnote {
        float: right;
        clear: right;
        margin-right: -51%;
        width: 43%;
        margin-top: 0;
        margin-bottom: 0;
        font-size: 0.82em;
        opacity: 85%;
        line-height: 1.3;
        vertical-align: baseline;
        position: relative;
        border-left: 2px solid var(--light-grey);
        padding-left: 1em;
    }

    label {
        cursor: pointer;
    }

    .sidenote-number {
        counter-increment: sidenote-counter;
    }

    .sidenote-number:after,
    .sidenote:before {
        position: relative;
        vertical-align: baseline;
    }

    .sidenote-number:after {
        content: '[' counter(sidenote-counter) ']';
        font-size: 0.8em;
        top: -0.5rem;
        left: -0.1em;
        padding-right: 0px;
    }

    .sidenote:before {
        content: counter(sidenote-counter) ' ';
        font-size: 0.9em;
        top: -0.3rem;
        padding-right: 8px;
    }

    blockquote .sidenote,
    blockquote .marginnote {
        margin-right: -82%;
        min-width: 59%;
        text-align: left;
    }

    label.sidenote-number {
        display: inline;
    }

    label.margin-toggle:not(.sidenote-number) {
        display: none;
    }

    input.margin-toggle {
        display: none;
    }

    @media (max-width: 1080px) {
        label.margin-toggle:not(.sidenote-number) {
            display: inline;
        }

        .sidenote,
        .marginnote {
            display: none;
        }

        .margin-toggle:checked + .sidenote,
        .margin-toggle:checked + .marginnote {
            display: block;
            float: left;
            left: 1rem;
            clear: both;
            width: 95%;
            margin: 1rem 2.5%;
            position: relative;
        }
    }
`

export default MarginNote
