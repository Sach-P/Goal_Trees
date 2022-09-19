import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTrees, deleteTree } from '../../actions/trees';
import DeleteConfirmation from '../layout/DeleteConfirmation';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AddTreeForm from './AddTreeForm';
import { Link, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingTop: theme.spacing(3),
        paddingBottom: '5px'
    },
    root: {
        padding: theme.spacing(3),
    }
}));

export function TreeList(props) {

    const classes = useStyles();
    const [id, setId] = useState(null);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [createTreeModal, setCreateTreeModal] = useState(false);

    const showCreateTreeModal = () => {
        setCreateTreeModal(true);
    };

    const hideCreateTreeModal = () => {
        setCreateTreeModal(false);
    };

    const showDeleteModal = (id) => {
        setId(id);

        setDeleteMessage(`Are you sure you want to delete the tree "${props.trees.find((tree) => tree.id === id).title}" ? The tree's data will be lost.`);

        setDisplayConfirmationModal(true);
    };

    const submitDelete = (id) => {
        props.deleteTree(id);
        setDisplayConfirmationModal(false);
    }

    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };

    const { url } = useRouteMatch();

    useEffect(() => {
        props.getTrees();
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <h2>My Trees</h2>
                <Button variant="outlined" size="small" color="primary" onClick={() => { showCreateTreeModal() }}><AddIcon />New Tree</Button>
                <AddTreeForm showModal={createTreeModal} hideModal={hideCreateTreeModal} />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Date Created</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {props.trees.map((tree) => (
                        <tr key={tree.id}>
                            <td>{tree.title}</td>
                            <td>{tree.is_completed ? <p>Completed</p> : <p>In Progress</p>}</td>
                            <td>{tree.created_at.slice(0, 10)}</td>
                            <td><Link to={`${url}/${tree.id}/${tree.title}`}><button className="btn btn-success btn-sm">View</button></Link></td>
                            <td><button onClick={() => { showDeleteModal(tree.id) }} className="btn btn-danger btn-sm">{' '}Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    trees: state.trees.trees,
});

export default connect(mapStateToProps, { getTrees, deleteTree })(TreeList);
