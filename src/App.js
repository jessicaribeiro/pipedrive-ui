import React, {useEffect, useState} from "react";
import './App.css';
import Header from "./components/Header";
import Persons from "./components/Persons";
import Footer from "./components/Footer";
import AddPersonForm from './components/Modal/AddPersonForm';
import PersonDetails from "./components/Modal/PersonDetails";

function App() {

    const [persons, setPersons] = useState([]);

    const [isLoadingPersons, setIsLoadingPersons] = useState(false);
    const [isLoadingAddPerson, setIsLoadingAddPerson] = useState(false);
    const [isLoadingDeletePerson, setIsLoadingDeletePerson] = useState(false);

    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

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
        setIsLoadingAddPerson(true);

        const token = 'c3e6b60ccb63ae0250796d80b091545351776f0b';
        const url = `https://api.pipedrive.com/v1/persons?&api_token=${token}`;

        let {name, org_id, email, phone} = values;

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
                let newPersons = [data.data, ...persons];
                setPersons(newPersons);
                console.log('Add person with success!');
            })
            .catch(err => {
                console.log("Error fetching data: " + err);
            })
            .finally(() => {
                setIsLoadingAddPerson(false);
                closeAddModal();
            })
    };

    const searchPerson = (term) => {
        // if is an empty search, display all people
        if (!term.target.value) {
            return getPersons(true);
        }

        setIsLoadingPersons(true);
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
                const filteredData = data.data.items.map((el) => {
                    return el.item
                });
                setPersons(filteredData);
                console.log('Search person with success!');
            })
            .catch(err => {
                console.log("Error fetching data: " + err);
            })
            .finally(() => {
                setIsLoadingPersons(false);
            })
    };

    const deletePerson = (personId) => {
        setIsLoadingDeletePerson(true);

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
                let deletedId = data.data.id;
                let newPersons = persons.filter((el) => el.id !== deletedId);
                setPersons(newPersons);
                console.log('Person deleted with success!');
            })
            .catch(err => {
                console.log("Error fetching data: " + err);
            })
            .finally(() => {
                    setIsLoadingDeletePerson(false);
                    closeDetailsModal();
                }
            )
    };

    const getPersons = (isEmptySearch) => {
        setIsLoadingPersons(true);

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
                let allPersons;

                if (isEmptySearch) {
                    allPersons = data.data;
                } else {
                    allPersons = [...persons, ...data.data];
                }

                setPersons(allPersons);
                setPagination(data.additional_data.pagination);

                console.log('Get persons with success!');
            })
            .catch(err => {
                console.log("Error fetching data: " + err);
            }).finally(() => {
            setIsLoadingPersons(false);
        })
    };

    const loadMorePersons = () => {
        setStart(pagination.next_start);
    };


    const onDragEnd = (fromIndex, toIndex) => {
        if (toIndex < 0) return; // Ignores if outside area
        const newItems = [...persons];
        const item = newItems.splice(fromIndex, 1)[0];
        newItems.splice(toIndex, 0, item);
        setPersons(newItems);
    };

    return (
        <div className="App">
            <Header
                openAddPersonModal={openAddModal}
                searchPerson={searchPerson}
            />
            <Persons
                persons={persons} deletePerson={deletePerson}
                openDetailsModal={openDetailsModal}
                loadMorePersons={loadMorePersons}
                onDragEnd={onDragEnd}
                isLoadingPersons={isLoadingPersons}
            />
            <Footer/>

            {isAddModalVisible &&
            <AddPersonForm
                visible={isAddModalVisible}
                handleClose={closeAddModal}
                handleSubmit={addPerson}
                isLoadingAddPerson={isLoadingAddPerson}
            />
            }

            {isDetailsModalVisible &&
            <PersonDetails
                visible={isDetailsModalVisible}
                handleClose={closeDetailsModal}
                handleDelete={deletePerson}
                person={focusPerson}
                isLoadingDeletePerson={isLoadingDeletePerson}
            />
            }
        </div>
    );
}

export default App;
