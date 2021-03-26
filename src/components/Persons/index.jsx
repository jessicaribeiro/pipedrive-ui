import React from 'react';
import './styles.css';
import ReactDragListView from "react-drag-listview";
import {Avatar, Button, List} from 'antd';
import {BsBuilding} from 'react-icons/bs';

const Persons = (
    {
        persons,
        openDetailsModal,
        loadMorePersons,
        onDragEnd,
        isLoadingPersons
    }
) => {

    const getPersonInitials = (name) => {
        const fullName = name.split(' ');
        return fullName.shift()?.charAt(0) + fullName.pop()?.charAt(0).toUpperCase();
    };

    const loadMore =
        (persons.length > 5) ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button style={{fontWeight: 'bold', fontSize: 12}} onClick={loadMorePersons}>Load more</Button>
            </div>
        ) : null;


    return (
        <>
            <div className="persons-container">
                <ReactDragListView
                    nodeSelector=".ant-list-item.draggble"
                    onDragEnd={onDragEnd}
                    lineClassName="draggable-line"
                >
                    <List
                        className=""
                        size="small"
                        bordered
                        loading={isLoadingPersons}
                        loadMore={loadMore}
                        dataSource={persons}
                        renderItem={item => {
                            return (
                                <List.Item
                                    className='draggble'
                                    extra={
                                        <Avatar className="person-avatar">{getPersonInitials(item.name)}</Avatar>}

                                    // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>

                                    onClick={() => openDetailsModal(item)}
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

            </div>
        </>
    )
};

export default Persons;