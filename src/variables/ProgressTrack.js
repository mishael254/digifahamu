import React from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Col,
    Row,
    Table,
} from "reactstrap";
import Skeleton from 'react-loading-skeleton';
import Api from 'views/dataviews/reduximplementation/Api';

const ProgressTrack = () => {

    const { statLogs, isLoading, messages } = Api();

    // Count occurrences of each messageUuid
    const messageCounts = statLogs.reduce((counts, log) => {
        counts[log.messageuuid] = (counts[log.messageuuid] || 0) + 1;
        return counts;
    }, {});

    // Filter messages that occur more than once
    const recurringMessages = Object.keys(messageCounts)
        .filter(messageUuid => messageCounts[messageUuid] > 1);

    // Find the corresponding project information for recurring messages
    const projectInfo = recurringMessages.map(messageUuid => {
        const message = messages.find(message => message.messageuuid === messageUuid);
        const count = messageCounts[messageUuid];
        return { ...message, count };
    });

    return (
        <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="shadow">
                <CardHeader className="border-0">
                    <Row className="align-items-center">
                        <div className="col">
                            <h3 className="mb-0">Progress track</h3>
                        </div>
                        <div className="col text-right">
                            <Button
                                color="primary"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                                size="sm"
                            >
                                See all
                            </Button>
                        </div>
                    </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Project</th>
                            <th scope="col">Messages</th>
                            <th scope="col">Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            // Render skeleton loading if data is loading
                            <tr>
                                <td colSpan="3">
                                    <Skeleton height={100} count={4} />
                                </td>
                            </tr>
                        ) : (
                            // Map over projectInfo to generate table rows dynamically
                            projectInfo.map((project, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <a className="avatar rounded-circle" href="#pablo">
                                                <img 
                                                    src={project.playlist?.deployment?.project?.theme} 
                                                    alt="Project Theme" 
                                                    className="img-fluid rounded-circle" 
                                                    style={{ width: '40px', height: '40px' }} 
                                                />
                                            </a>
                                            <span className="ml-3">{project.messageuuid || 'No Message uuid'}</span>
                                            <span className="ml-3">{project.playlist?.deployment?.project?.projectName || 'No project name'}</span>
                                        </div>
                                    </td>
                                    <td>{project.count}</td>
                                    <td>
                                        <div className="progress-xs mb-0 progress">
                                            <div
                                                className="progress-bar bg-orange"
                                                role="progressbar"
                                                aria-valuenow="60"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{ width: '60%' }}
                                            ></div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                {!isLoading && projectInfo.length === 0 && (
                    <CardBody>No recurring projects found.</CardBody>
                )}
            </Card>
        </Col>
    );
};

export default ProgressTrack;
