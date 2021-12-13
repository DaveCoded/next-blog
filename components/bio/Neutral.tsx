import ExternalLink from '../ExternalLink'

export default function Neutral() {
    return (
        <>
            <p>
                I&apos;m a Frontend Developer with polyglot ambitions. I currently work at Feed, a
                creative agency in London. In my day-to-day, I build complex interactive interfaces
                with React, TypeScript and MobX. And also design Node APIs, using MySQL for a DBMS.
            </p>
            <p>
                In a former life, I was in book publishing. I still spend a lot of my spare time
                reading, both for pleasure and to learn new things (which is also a pleasure).
            </p>
            <p>
                My more unusual experiences include climbing Mount Stanley in Uganda and playing a
                Victorian policeman in an interactive murder mystery at the Edinburgh Fringe.
                I&apos;ll still answer to Constable Crowley.
            </p>{' '}
            <p>
                Music has always been very important to me. I have sung Mozart&apos;s Requiem Mass
                and been to see NOFX live on five occasions. They were, respectively, average,
                brilliant, disinterested, very drunk, and then brilliant again. I&apos;m currently
                trying to learn{' '}
                <ExternalLink
                    href="https://www.youtube.com/watch?v=L42sbnQxEmw&ab_channel=Rousseau"
                    newTab
                    style={{ color: 'var(--link-pink)' }}
                >
                    Un Sospiro
                </ExternalLink>{' '}
                by Liszt on the piano; wish me luck!
            </p>
        </>
    )
}
