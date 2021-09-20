import styled from 'styled-components'

export default function FacultyTable() {
    return (
        <Styles>
            <table>
                <thead>
                    <tr>
                        <th>Faculty ID</th>
                        <th>Faculty Name</th>
                        <th>Faculty Hire Date</th>
                        <th>Course Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Snarky Bufflins</td>
                        <td>05/11/1984</td>
                        <td>CS150</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Randy Botellini</td>
                        <td>01/03/1991</td>
                        <td>The Canterbury Ales: Chaucer and his beers</td>
                    </tr>
                </tbody>
            </table>
        </Styles>
    )
}

const Styles = styled.div`
    padding-top: var(--space-md);

    table {
        border-spacing: 0;
        border: 1px solid black;

        tr {
            :last-child {
                td {
                    border-bottom: 0;
                }
            }
        }

        th,
        td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: 1px solid black;

            :last-child {
                border-right: 0;
            }
        }
    }
`
