import React from 'react';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

const PositFilter = ({filter, setFilter}) => {
    const options = [
        {value: 'title', name: 'Sort by name'},
        {value: 'body', name: 'Sort by description'}
    ]
    return (
        <div>
            <MyInput value={filter.search}
                     onChange={(e) => setFilter(prevValue => ({...prevValue, search: e.target.value}))}/>
            <MySelect options={options} defaultValue='Sort by...' value={filter.sort}
                      onChange={(e) => setFilter(prevValue => ({...prevValue, sort: e.target.value}))}/>

        </div>
    );
};

export default PositFilter;