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
    //count all messages
    const totalAllMessagesCount =messages.length;

    // Count occurrences of each messageUuid
    const messageCounts = statLogs.reduce((counts, log) => {
        counts[log.messageuuid] = (counts[log.messageuuid] || 0) + 1;
        return counts;
    }, {});

    // Filter messages that occur more than once
    const recurringMessages = Object.keys(messageCounts)
        .filter(messageUuid => messageCounts[messageUuid] > 1);

    // Group recurring messages by project name
    const groupedMessages = recurringMessages.reduce((groups, messageUuid) => {
        const message = messages.find(message => message.messageuuid === messageUuid);
        const projectName = message?.playlist?.deployment?.project?.projectName || 'No project name';
        const projectTheme = message?.playlist?.deployment?.project?.theme || 'No project theme';
        if (!groups[projectName]) {
            groups[projectName] = { messages: [], theme: projectTheme };
        }
        groups[projectName].messages.push({ messageUuid, count: messageCounts[messageUuid] });
        return groups;
    }, {});

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
                            <th scope="col">Total Messages listened</th>
                            <th scope="col">Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            // Render skeleton loading if data is loading
                            <tr>
                                <td colSpan="4">
                                    <Skeleton height={100} count={4} />
                                </td>
                            </tr>
                        ) : (
                            // Map over groupedMessages to generate table rows dynamically
                            Object.entries(groupedMessages).map(([projectName, { messages, theme }], index) => (
                                
                                <tr key={index}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <a className="avatar rounded-circle" href="#pablo">
                                                <img 
                                                    src={theme} 
                                                    alt="Project Theme" 
                                                    className="img-fluid rounded-circle" 
                                                    style={{ width: '40px', height: '40px' }} 
                                                />
                                            </a>
                                            <span className="ml-3">{projectName}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {messages.map((message, messageIndex) => (
                                            <div key={messageIndex}>
                                                {message.messageUuid} ({message.count} x)
                                            </div>
                                        ))}
                                    </td>
                                    <td>{messages.length}</td>
                                    <td>
                                        <div className="progress-xs mb-0 progress">
                                            <div
                                                className="progress-bar bg-orange"
                                                role="progressbar"
                                                aria-valuenow={messages.length/totalAllMessagesCount*100}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{ width: `${messages.length/totalAllMessagesCount*100}%` }}
                                            ></div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                {!isLoading && Object.keys(groupedMessages).length === 0 && (
                    <CardBody>No recurring projects found.</CardBody>
                )}
            </Card>
        </Col>
    );
};

export default ProgressTrack;
