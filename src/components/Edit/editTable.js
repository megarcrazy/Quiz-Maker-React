import React from 'react';
// Components

function EditTable({number, data}) {
    const question = 
    <tr>
        <td>
            <div className="fill">
                <div className="table-row-key">{number + 1}.</div> 
                <div className="fill">
                    <input type="text" className="fill large-text"
                    id={`${number}question`} name={`${number}question`} 
                    placeholder={`${data["Questions"][number]}`} 
                    required/>
                </div>
            </div>
        </td>
    </tr>
    
    const choices = data["Choices"];
    const tableChoices = Object.keys(choices).map((key) => 
        <tr key={key}>
            <td>
                <div className="fill">
                    <div className="table-row-key">{key}.</div> 
                    <div className="fill">
                        <input type="text" className="inline fill"
                        id={`question${number}${key}`} name={`question${number}${key}`} 
                        placeholder={`${choices[key][number]}`} 
                        required/>
                    </div>
                </div>
            </td>
        </tr>
    );

    return (
        <form className="add-input">
            <table key={number} className="quiz-table middle">
                <thead className="thead-light">{question}</thead>
                <tbody>{tableChoices}</tbody>
            </table>
        </form>
    )
}

export default EditTable;
