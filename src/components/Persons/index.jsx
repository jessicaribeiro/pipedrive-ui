import React, {useEffect, useState} from 'react';
import Person from "../Person";
import LoadButton from "../LoadButton";

const Persons = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        setIsLoading(true);
        const url = 'https://jessica_ribeiro.pipedrive.com/api/v1/persons?api_token=c3e6b60ccb63ae0250796d80b091545351776f0b';

        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } throw response;
                })
            .then(data => setData(data))
            .catch(err => {
                console.log("Error fetching data: " + err);
                setError(err);
            }).finally(() => setIsLoading(false),     console.log(data),
    );


    }, []);

    if (isLoading) {return null;}


    //todo
    //get all persons
    // or filter them by search

    // const person = {
    //     name: 'Jessica',
    //     organization: 'guuru',
    // };

    // todo
    //foreach person
    return (
        data.map((person) => {
            con
            // return <Person person={person}/>
        })

    // <>
    //     {data.map((person) => {
    //         <Person person={person}/>
    //     }
    // }))
    //
    //
    //         <LoadButton/>
    //     </>
    );
};

export default Persons;