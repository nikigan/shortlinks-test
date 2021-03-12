import React from 'react';
import './CreateLinkPage.scss';
import CreateLinkForm from '../../components/CreateLinkForm/CreateLinkForm';
import { Container, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import LinkResult from '../../components/LinkResult/LinkResult';

const CreateLinkPage = () => {

    const result = useSelector(state => state.shortLink.result);

    return (
        <div className="create-link__content">
            <Container>
                <Paper className="p-2 p-md-5">
                    { result && <LinkResult/>}
                    { !result && <CreateLinkForm/> }
                </Paper>
            </Container>
        </div>

    );
};

export default CreateLinkPage;
