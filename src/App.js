import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import Persons from "./components/Persons";
import Footer from "./components/Footer";
import './App.css';
import LoadButton from "./components/LoadButton";
import AddPersonForm from './components/Modal/AddPersonForm';


function App() {

    const [persons, setPersons] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [newPerson, setNewPerson] = useState(null);

    if (isLoading || !persons) {
        return null;
    }




    const openModal = () => {
        setIsModalVisible(true);
    };
    const closeModal = () => {
        setIsModalVisible(false);
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
                setNewPerson(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log("Error fetching data: " + err);
                setError(err);
            }).finally(() => {

        })
    };


    return (
        <div className="App">
            <Header addPerson={openModal}/>
            {/*<Persons items={persons} onSortEnd={onSortEnd} distance={1} lockAxis="y" />*/}
            <Persons updatePersons={newPerson}/>


            <Footer/>


            {isModalVisible &&
                <AddPersonForm visible={isModalVisible} handleClose={closeModal} handleSubmit={addPerson}/>
            }

        </div>
    );
}

export default App;
