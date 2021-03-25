import React, {useEffect, useState} from 'react';
import './styles.css';
import ReactDragListView from "react-drag-listview";
import {Avatar, Button, List} from 'antd';
import PersonDetails from "../Modal/PersonDetails";
import {BsBuilding} from 'react-icons/bs';
import {LoadingOutlined} from "@ant-design/icons";


const Persons = ({persons, openDetailsModal, loadMorePersons, onDragEnd}) => {
    const [isLoading, setIsLoading] = useState(false);

    const [initLoading,] = useState();



    const getPersonInitials = (name) => {
        const fullName = name.split(' ');
        return fullName.shift()?.charAt(0) + fullName.pop()?.charAt(0).toUpperCase();
    };


    const loadMore =
        !isLoading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={loadMorePersons}>Load more</Button>
            </div>
        ) : null;


    if (isLoading) {
        return <LoadingOutlined style={{fontSize: 24}} spin/>;
    }

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
                    loading={isLoading}
                    loadMore={loadMore}
                    dataSource={persons}
                    renderItem={item => {
                        return (
                            <List.Item
                                className='draggble'
                                extra={
                                    <Avatar>{getPersonInitials(item.name)}</Avatar>}

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

            </body>
        </>
    )

};

export default Persons;