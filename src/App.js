import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import Persons from "./components/Persons";
import Footer from "./components/Footer";
import {Form} from 'antd';

import arrayMove from 'array-move';

import './App.css';
import LoadButton from "./components/LoadButton";
import ModalView from "./components/ModalView";
import PersonForm from "./components/PersonForm";


function App() {

    const [persons, setPersons] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState(null);
    const [start, setStart] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const openModal = () => {
        setIsModalVisible(true);
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };

    const getPersons = () => {
        // const account = 'jessica_ribeiro';
        const token = 'c3e6b60ccb63ae0250796d80b091545351776f0b';
        const endpoint = `persons?start=${start}&limit=4`;
        const url = `https://api.pipedrive.com/v1/${endpoint}&api_token=${token}`;

        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                console.log(data);
                let allPersons = [...persons, ...data.data];
                console.log(allPersons);

                setPersons(allPersons);
                setPagination(data.additional_data.pagination);
                setIsLoading(false);
            })
            .catch(err => {
                console.log("Error fetching data: " + err);
                setError(err);
            }).finally(() => {

        })
    };

    const addPerson = (values) => {
        console.log(values);

        let {name, org_id, email, phone} = values;

        setIsModalVisible(false);
        setIsLoading(true);

        const token = 'c3e6b60ccb63ae0250796d80b091545351776f0b';
        const url = `https://api.pipedrive.com/v1/persons?&api_token=${token}`;

        const requestOptions = {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "org_id": org_id,
                "email": email,
                "phone": phone,
            })
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                console.log(data);
                getPersons();
                setIsLoading(false);
            })
            .catch(err => {
                console.log("Error fetching data: " + err);
                setError(err);
            }).finally(() => {

        })

    };


    useEffect(() => {
        setIsLoading(true);
        getPersons();
    }, [start]);


    if (isLoading || !persons) {
        return null;
    }

    const onSortEnd = (e) =>{
        let newPersons = arrayMove(persons, e.oldIndex, e.newIndex );
        setPersons(newPersons)
    };

    const loadMore = () => {
      setStart(pagination.next_start);
    };




    return (
        <div className="App">
            <Header addPerson={openModal}/>
            <Persons items={persons} onSortEnd={onSortEnd} distance={1} lockAxis="y" />
            {pagination?.more_items_in_collection &&
            <LoadButton triggerLoad={loadMore}/>
            }
            <Footer/>


            {isModalVisible &&
                <PersonForm visible={isModalVisible} handleClose={handleClose} handleSubmit={addPerson}/>
            }

        </div>
    );
}

export default App;
