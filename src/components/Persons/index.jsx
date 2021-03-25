import React, {useEffect, useState} from 'react';
import './styles.css';
import ReactDragListView from "react-drag-listview";
import {List, Avatar, Button} from 'antd';
import PersonDetails from "../Modal/PersonDetails";
import LoadButton from "../LoadButton";
import {BsBuilding} from 'react-icons/bs';
import ContactsOutlined from '@ant-design/icons';


const Persons = ({updatePersons}) => {
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [start, setStart] = useState(0);
    const [persons, setPersons] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [focusPerson, setFocusPerson] = useState(null);


    useEffect(() => {
        console.log('getPersons');
        getPersons();
    }, [start, updatePersons]);


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
                let allPersons = [...persons, ...data.data];
                console.log('Persons');
                console.log(allPersons);
                console.log(data);


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

    const deletePerson = (personId) => {
        console.log(personId);
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
                setIsLoading(false);
            })
            .catch(err => {
                console.log("Error fetching data: " + err);
                setError(err);
                setIsLoading(false);
            })
    };

    const openModal = (personObj) => {
        setFocusPerson(personObj);
        setIsModalVisible(true);
    };

    const handleClose = () => {
        setFocusPerson(null);
        setIsModalVisible(false);
    };

    const onDragEnd = (fromIndex, toIndex) => {
        if (toIndex < 0) return; // Ignores if outside designated area
        const newItems = [...persons];
        const item = newItems.splice(fromIndex, 1)[0];
        newItems.splice(toIndex, 0, item);
        setPersons(newItems);

    };

    const loadMorePersons = () => {
        setStart(pagination.next_start);
    };


    const getPersonInitials = (name) => {
        const fullName = name.split(' ');
        const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0).toUpperCase();
        return initials;
    };

    const [initLoading, setInitLoading] = useState();

    const loadMore =
        !initLoading && !isLoading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={loadMorePersons}>loading more</Button>
            </div>
        ) : null;


    return (
        <>
            <body className="persons-container">
                <ReactDragListView
                    nodeSelector=".ant-list-item.draggble"
                    onDragEnd={onDragEnd}
                >
                    <List
                        className=""
                        size="small"
                        bordered
                        loading={initLoading}
                        loadMore={loadMore}
                        dataSource={persons}
                        renderItem={item => {
                            return (
                                <List.Item
                                    className='draggble'
                                    extra={
                                        <Avatar>{getPersonInitials(item.name)}</Avatar>}

                                    // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>

                                    onClick={() => openModal(item)}
                                >
                                    <List.Item.Meta
                                        title={item.name}
                                        description={<span
                                            className="person-organization"><BsBuilding/> {item.org_name}</span>}
                                    />
                                </List.Item>
                            );
                        }}
                    />
                </ReactDragListView>

                {isModalVisible &&
                <PersonDetails visible={isModalVisible}
                               handleClose={handleClose}
                               handleDelete={deletePerson}
                               person={focusPerson}/>
                }
            </body>

            {/*{pagination?.more_items_in_collection &&*/}
            {/*<LoadButton triggerLoad={loadMore}/>*/}
            {/*}*/}
        </>
    )

};

export default Persons;
// export default SortableContainer(Persons);