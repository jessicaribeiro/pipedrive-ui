import React, {useEffect, useState} from 'react';
import Person from "../Person";
import {SortableContainer} from 'react-sortable-hoc';
import './styles.css';

const Persons = ({items}) => {

    return (
        <>
            <div className="persons-container">
                {items?.map((person, index) => {
                    return <Person
                        person={person}
                        index={index}
                        key={person.id}
                    />
                })}
            </div>
        </>
    )

};

export default SortableContainer(Persons);