import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import Persons from "./components/Persons";
import Footer from "./components/Footer";
import './App.css';
import AddPersonForm from './components/Modal/AddPersonForm';
import {LoadingOutlined} from '@ant-design/icons';
import PersonDetails from "./components/Modal/PersonDetails";

function App() {

    const [persons, setPersons] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

    const [filteredPersons, setFilteredPersons] = useState([]);
    const [start, setStart] = useState(0);
    const [pagination, setPagination] = useState(null);
    const [focusPerson, setFocusPerson] = useState(null);


    useEffect(() => {
        getPersons();
    }, [start]);

    const openAddModal = () => {
        setIsAddModalVisible(true);
    };
    const closeAddModal = () => {
        setIsAddModalVisible(false);
    };


    const closeDetailsModal = () => {
        setIsDetailsModalVisible(false);
    };

    const openDetailsModal = (focusPerson) => {
        setIsDetailsModalVisible(true);
        setFocusPerson(focusPerson);
    };

    const addPerson = (values) => {
        console.log(values);

        let {name, org_id, email, phone} = values;

        closeAddModal();
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
                console.log('NEW PERSON');
                let newPersons = [data.data, ...persons];
                setPersons(newPersons);
            })
            .catch(err => {
                console.log("Error fetching data: " + err);
                setError(err);
            }).finally(() => {
            setIsLoading(false);
        })
    };

    const searchPerson = (term) => {
        console.log('SEARCH PERSON');
        console.log(term.target.value);

        if (!term.target.value) {
            getPersons();
        }

        setIsLoading(true);
        const name = term.target.value;

        const token = 'c3e6b60ccb63ae0250796d80b091545351776f0b';
        const url = `https://api.pipedrive.com/v1/persons/search?term=${name}&fields=name&start=0&api_token=${token}`;

        const requestOptions = {
            method: 'GET',
            headers: {
                "Accept": "application/json",
            },
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                console.log('result');
                console.log(data.data);
                const filteredData = data.data.items.map((el) => {
                    return el.item
                });
                console.log('FILTEREDDATA');
                console.log(filteredData);
                setPersons(filteredData);
            })
            .catch(err => {
                console.log("Error fetching data: " + err);
                setError(err);
            }).finally(() => {
            setIsLoading(false);

        })
    };

    const deletePerson = (personId) => {
        console.log('DELETE ' + personId);
        setIsLoading(true);

        const token = 'c3e6b60ccb63ae0250796d80b091545351776f0b';
        const endpoint = `persons/${personId}`;
        const url = `https://api.pipedrive.com/v1/${endpoint}?api_token=${token}`;

        const requestOptions = {
            method: 'DELETE',
            headers: {"Accept": "application/json"},
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(data => {
                console.log('DELETEE');
                console.log(data);

                let deletedId = data.data.id;
                let newPersons = [...persons];
                newPersons.filter((el) => el.id !== deletedId);
                setPersons(newPersons);
                console.log('Person deleted with success!');
            })
            .catch(err => {
                console.log("Error fetching data: " + err);
                setError(err);
            })
            .finally(() => {
                    closeDetailsModal();
                    setIsLoading(false);
                }
            )
    };


    const getPersons = () => {
        setIsLoading(true);


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
                // let allPersons = [...persons, ...data.data];
                // console.log('Persons');
                // console.log(allPersons);

                setPersons(data.data);
                setPagination(data.additional_data.pagination);
            })
            .catch(err => {
                console.log("Error fetching data: " + err);
                setError(err);
            }).finally(() => {
            setIsLoading(false);
        })
    };

    const loadMorePersons = () => {
        setStart(pagination.next_start);
    };


    const onDragEnd = (fromIndex, toIndex) => {
        if (toIndex < 0) return; // Ignores if outside designated area
        const newItems = [...persons];
        const item = newItems.splice(fromIndex, 1)[0];
        newItems.splice(toIndex, 0, item);
        setPersons(newItems);

    };

    return (
        <div className="App">
            <Header openAddPersonModal={openAddModal}
                    searchPerson={searchPerson}/>
            <Persons persons={persons} deletePerson={deletePerson}
                     openDetailsModal={openDetailsModal}
                     loadMorePersons={loadMorePersons}
                     onDragEnd={onDragEnd}
            />
            <Footer/>

            {isAddModalVisible &&
            <AddPersonForm
                visible={isAddModalVisible}
                handleClose={closeAddModal}
                handleSubmit={addPerson}/>
            }

            {isDetailsModalVisible &&
            <PersonDetails
                visible={isDetailsModalVisible}
                handleClose={closeDetailsModal}
                handleDelete={deletePerson}
                person={focusPerson}/>
            }

        </div>
    );
}

export default App;
