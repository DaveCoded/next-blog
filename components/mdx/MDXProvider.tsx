import { MDXProvider } from '@mdx-js/react'
import { HTMLAttributes } from 'react'

export default function MDXCompProvider(
    providerProps: HTMLAttributes<HTMLDivElement>
) {
    const state = {
        h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
            <h1
                {...props}
                style={{
                    color: 'plum',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    ...props.style
                }}
            />
        )
    }
    return (
        <MDXProvider components={state}>
            <div {...providerProps} />
        </MDXProvider>
    )
}
