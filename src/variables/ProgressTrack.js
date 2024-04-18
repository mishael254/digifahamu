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
    //count each message in messages

    //group the messages by project name

    //count now the messages for each project

    //update the progress with the value that you had gotten above after counting the messages for each project and convert it to percentage

    
    /***starting from here is okay dont touch here  */
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
        if (!groups[projectName]) {
            groups[projectName] = [];
        }
        groups[projectName].push({ messageUuid, count: messageCounts[messageUuid] });
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
                            Object.entries(groupedMessages).map(([projectName, messages], index) => {
                                const totalUniqueMessages = messages.length; // Total unique messages for the project
                                const totalMessagesListened = messages.reduce((acc, msg) => acc + msg.count, 0); // Total messages listened for the project
                                const progress = (totalMessagesListened / totalUniqueMessages) * 100; // Calculate progress percentage

                                return (
                                    <tr key={index}>
                                        <td>{projectName}</td>
                                        <td>
                                            {messages.map((message, messageIndex) => (
                                                <div key={messageIndex}>
                                                    {message.messageUuid} ({message.count} x)
                                                </div>
                                            ))}
                                        </td>
                                        <td>{totalUniqueMessages}</td>
                                        <td>
                                            <div className="progress-xs mb-0 progress">
                                                <div
                                                    className="progress-bar bg-orange"
                                                    role="progressbar"
                                                    aria-valuenow={progress}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
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
