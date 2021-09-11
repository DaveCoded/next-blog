import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
        /* Colors */
        --black-background: #191B1F;
        --light-black: #2a2b2c;
        --dark-grey: #444549;
        --mid-grey: #909CA2;
        --cool-grey: #9dadbc;
        --light-grey: #DCD6CD;
        --off-white: #E8E1D8;
        --purple: #707BD9;
        --teal: #85D0D7;

        /* Code block styles */
        --prism-theme-white: #fff;
        --prism-theme-background: hsl(222deg 51% 13%);
        --prism-theme-char: #d8dee9;
        --prism-theme-comment: #b2b2b2;
        --prism-theme-keyword: #c5a5c5;
        --prism-theme-primitive: #5a9bcf;
        --prism-theme-string: #8dc891;
        --prism-theme-variable: #d7deea;
        --prism-theme-boolean: #ff8b50;
        --prism-theme-punctuation: #88c6be;
        --prism-theme-tag: #fc929e;
        --prism-theme-function: #79b6f2;
        --prism-theme-className: #fac863;
        --prism-theme-method: #6699cc;
        --prism-theme-operator: #fc929e;
        --prism-theme-highlight: #353b45;
        --code-font-family: 'Ubuntu Mono';

        /* Measurements */
        --highlight-before-width: 0.43em;
        --nav-height: 5.6rem;

        /* Transitions */
        --link-hover-transition: all .2s cubic-bezier(0.65, 0.05, 0.36, 1);
    }

    * {
        box-sizing: border-box;
    }

    html {
        -webkit-font-smoothing: antialiased;
    }

    html,
    body {
        padding: 0;
        margin: 0;
        color: var(--black);
        font-family: 'Open Sans', sans-serif;
    }

    body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background: var(--black-background);
        color: var(--off-white);
    }

    strong {
        font-weight: 600;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        line-height: 1.3;
    }

    h1 {
        font-family: 'Yeseva One', cursive;
        font-size: 2.2rem;
        color: var(--purple)
    }

    h2 {
        color: var(--off-white);
    }

    h3 {
        color: var(--light-grey);
    }

    code {
        background: hsl(350deg 43% 82% / 0.2);
        color: var(--black);
        font-family: var(--code-font-family);
        border-radius: 4px;
        white-space: pre-wrap;
    }

    p {
        color: var(--cool-grey)
    }

    p > code {
        font-size: 1.1rem;
        padding: 0.2rem 0.4rem;
    }

    a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
        transition: var(--link-hover-transition);

        &:hover {
            color: var(--purple);
        }
    }

    ul {
        padding: 0;
    }

    .external-link {
        color: var(--teal);
        text-decoration: underline;
        font-weight: inherit;
    }

    .external-link:hover,
    .external-link:visited,
    .external-link:active {
        color: var(--purple);
    }

    ol {
        padding-inline-start: 1.5rem;
    }

    /* ======================================================= */
    /* ==================  PRISM THEME  ====================== */
    /* ======================================================= */

    code[class*='language-'],
    pre[class*='language-'] {
        color: var(--prism-theme-white);
        background: none;
        font-family: var(--code-font-family), Consolas, Monaco, 'Andale Mono', monospace;
        font-size: 1.12rem;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;
        tab-size: 4;
        hyphens: none;
        scrollbar-width: none; /* needed for Firefox */
    }

    /* Code blocks */
    pre[class*='language-'] {
        padding: 1.5rem;
        margin: 0px 0px 2.5em;
        overflow: auto;
        border-radius: 0 0 10px 10px;
    }

    :not(pre) > code[class*='language-'],
    pre[class*='language-'] {
        background: var(--prism-theme-background);
    }

    pre[class*='language-']::-webkit-scrollbar {
        display: none; /* Hides scrollbar but allows scrolling */
    }

    /* Inline code */
    :not(pre) > code[class*='language-'] {
        padding: 0.1em;
        border-radius: 10px;
        white-space: normal;
    }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
        color: var(--prism-theme-comment);
    }

    .token.punctuation {
        color: var(--prism-theme-punctuation);
    }

    .namespace {
        opacity: 0.7;
    }

    .token.property,
    .token.number,
    .token.constant,
    .token.symbol,
    .token.deleted {
        color: var(--prism-theme-primitive);
    }

    .token.function {
        color: var(--prism-theme-function);
    }

    .token.boolean {
        color: var(--prism-theme-boolean);
    }

    .token.tag {
        color: var(--prism-theme-tag);
    }

    .token.attr-name {
        color: var(--prism-theme-keyword);
    }

    .token.string {
        color: var(--prism-theme-string);
    }

    .token.selector,
    .token.char,
    .token.builtin,
    .token.inserted {
        color: var(--prism-theme-char);
    }

    .token.operator,
    .token.entity,
    .token.url,
    /* .language-css .token.string,
    .style .token.string, */
    .token.variable {
        color: var(--prism-theme-variable);
    }

    .token.atrule,
    .token.class-name {
        color: var(--prism-theme-className);
    }

    .token.attr-value {
        color: var(--prism-theme-string);
    }

    .token.keyword {
        color: var(--prism-theme-keyword);
    }

    /* .token.regex, */
    .token.important {
        font-weight: 400;
    }

    .token.bold {
        font-weight: 700;
    }

    .token.italic {
        font-style: italic;
    }

    .token.entity {
        cursor: help;
    }

    /* Highlight line! */
    .mdx-marker {
        background: var(--prism-theme-highlight);
        position: relative;
        left: -0.57em;
        padding-left: 0.57em;
        /* Add width of padding left and right, and width of highlight */
        width: calc(100% + 1.14em + 0.43em);
    }

    .mdx-marker::before {
        content: '';
        height: 100%;
        width: 0.43em;
        left: -0.43em;
        background: #8b9fc6;
        position: absolute;
    }

    /* ======================================================= */
    /* ================  PRISM THEME END  ==================== */
    /* ======================================================= */

    /* UTILS */
    .center-space-between {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    h1::selection,
    h2::selection,
    h3::selection,
    h4::selection,
    h5::selection {
        background: none;
        text-shadow: 2px 2px #15cedb;
    }
`
