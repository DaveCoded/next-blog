declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_ALGOLIA_APP_ID: string
            ALGOLIA_SEARCH_ADMIN_KEY: string
            NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: string
            NODE_ENV: 'development' | 'production'
            PORT?: string
            PWD: string
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
