import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import { Box } from '@material-ui/core';
import { Modal, Button } from "react-bootstrap";
import CreateConfirmation from '../layout/CreateConfirmation';
import { v4 } from "uuid";
import { useParams } from 'react-router-dom';
import { getTree } from '../../actions/trees';
import { connect } from 'react-redux';

export function bfs(
    id,
    tree,
    node
) {
    const queue = [];

    queue.unshift(tree);

    while (queue.length > 0) {
        const curNode = queue.pop();

        if (curNode.attributes?.id === id) {
            curNode.children.push(node);

            return { ...tree };
        }

        const len = curNode.children.length;

        for (let i = 0; i < len; i++) {
            queue.unshift(curNode.children[i]);
        }
    }
}


function TreeView(props) {
    const { id, title } = useParams();
    const [tree, setTree] = useState({
        name: `${title}`,
        children: [],
    });

    const [node, setNode] = useState();
    const [nodeTitle, setNodeTitle] = useState("");
    const [treeDetailModal, setTreeDetailModal] = useState();

    const closeTreeDetailModal = () => setTreeDetailModal(undefined);

    const close = () => setNode(undefined);

    useEffect(() => {
        props.getTree(id, title);
    }, []);

    const handleNodeClick = (datum) => {
        setTreeDetailModal(datum);
    };

    const handleCreateLeafClick = (datum) => {
        setNode(datum)
        closeTreeDetailModal();
    };

    const handleSubmit = () => {
        const newTree = bfs(node.attributes?.id, tree, {
            name: nodeTitle,
            attributes: {
                id: v4(),
            },
            children: [],
        });
        if (newTree) {
            setTree(newTree);
        }

        setNode(undefined);
    };

    const renderRectSvgNode = (
        customProps,
        click
    ) => {
        const { nodeDatum } = customProps;

        return (
            <g>
                <circle r="15" fill={"#00F02E"} onClick={() => click(nodeDatum)} />
                <text fill="black" strokeWidth="0.5" x="20" y="-5">
                    {nodeDatum.name}
                </text>
            </g>
        );
    };

    const addNodeForm = (
        <div>
            <form id="tree-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        onChange={(event) => setNodeTitle(event.target.value)}
                        value={nodeTitle}
                    />
                </div>
            </form>
        </div>
    );
    return (
        <Box width="100%" height="92vh">
            <Tree
                data={tree}
                /*orientation='vertical'*/
                separation={{ nonSiblings: 0.5, siblings: 0.5 }}
                nodeSize={{ x: 330, y: 200 }}
                translate={{
                    x: 50,
                    y: 350,
                }}
                pathFunc='step'
                renderCustomNodeElement={(nodeInfo) =>
                    renderRectSvgNode(nodeInfo, handleNodeClick)
                }
                centered
            />
            <Modal show={Boolean(treeDetailModal)} onHide={closeTreeDetailModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{props.tree.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.tree.description}</Modal.Body>
                <Modal.Footer>
                    <Button variant="default" onClick={closeTreeDetailModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={closeTreeDetailModal}>
                        Delete
                    </Button>
                    <Button variant="primary" onClick={() => handleCreateLeafClick(treeDetailModal)}>
                        Leaf
                    </Button>
                    <Button variant="success" onClick={() => { console.log(props.tree.is_completed); closeTreeDetailModal() }}>
                        Complete
                    </Button>
                </Modal.Footer>
            </Modal>
            <CreateConfirmation showModal={Boolean(node)} hideModal={close} confirmModal={handleSubmit} content={addNodeForm} title={'Add Leaf'} />
        </Box>
    )
}

const mapStateToProps = (state) => ({
    tree: state.trees.tree,
});

export default connect(mapStateToProps, { getTree })(TreeView)
